// LoRA 管理相關變數
let loraCount = 0;
const maxLoras = 4;

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    restore_options();
    setupEventListeners();
    addLoraItem(); // 預設添加一個 LoRA 項目
});

// 設定事件監聽器
function setupEventListeners() {
    document.getElementById('save').addEventListener('click', save_options);
    document.getElementById('addLora').addEventListener('click', addLoraItem);
}

// 儲存設定
function save_options() {
    const geminiApiKey = document.getElementById('geminiApiKey').value;
    const runpodApiKey = document.getElementById('runpodApiKey').value;
    const promptPrefix = document.getElementById('promptPrefix').value;
    const imageSize = document.querySelector('input[name="imageSize"]:checked').value;
    
    // 收集 LoRA 設定
    const loras = [];
    const loraItems = document.querySelectorAll('.lora-item');
    loraItems.forEach(item => {
        const path = item.querySelector('.lora-path').value.trim();
        const scale = parseFloat(item.querySelector('.lora-scale').value) || 1.0;
        
        if (path) { // 只保存有路徑的 LoRA
            loras.push({ path, scale });
        }
    });
    
    // 驗證必要欄位
    if (!geminiApiKey || !runpodApiKey) {
        showStatus('請填入所有必要的 API Key', 'error');
        return;
    }
    
    // 儲存到 Chrome storage
    chrome.storage.local.set({
        geminiApiKey: geminiApiKey,
        runpodApiKey: runpodApiKey,
        promptPrefix: promptPrefix,
        imageSize: imageSize,
        seed: -1, // 固定值
        loras: loras
    }, function() {
        if (chrome.runtime.lastError) {
            showStatus('儲存失敗: ' + chrome.runtime.lastError.message, 'error');
        } else {
            showStatus('設定已成功儲存！', 'success');
        }
    });
}

// 載入已儲存的設定
function restore_options() {
    chrome.storage.local.get([
        'geminiApiKey', 'runpodApiKey', 'promptPrefix', 
        'imageSize', 'loras'
    ], function(result) {
        // 載入 API Keys
        if (result.geminiApiKey) {
            document.getElementById('geminiApiKey').value = result.geminiApiKey;
        }
        if (result.runpodApiKey) {
            document.getElementById('runpodApiKey').value = result.runpodApiKey;
        }
        
        // 載入提示詞前綴
        if (result.promptPrefix) {
            document.getElementById('promptPrefix').value = result.promptPrefix;
        }
        
        // 載入圖片解析度設定
        if (result.imageSize) {
            const radioButton = document.querySelector(`input[name="imageSize"][value="${result.imageSize}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
        }
        
        // 載入 LoRA 設定
        if (result.loras && Array.isArray(result.loras)) {
            // 清空現有的 LoRA 容器
            document.getElementById('loraContainer').innerHTML = '';
            loraCount = 0;
            
            // 添加已儲存的 LoRA 項目
            result.loras.forEach(lora => {
                addLoraItem(lora.path, lora.scale);
            });
            
            // 如果沒有 LoRA 項目，至少添加一個空的
            if (result.loras.length === 0) {
                addLoraItem();
            }
        }
    });
}

// 添加 LoRA 項目
function addLoraItem(path = '', scale = 1.0) {
    if (loraCount >= maxLoras) {
        showStatus(`最多只能添加 ${maxLoras} 個 LoRA 模組`, 'error');
        return;
    }
    
    loraCount++;
    const container = document.getElementById('loraContainer');
    
    const loraDiv = document.createElement('div');
    loraDiv.className = 'lora-item';
    loraDiv.innerHTML = `
        <button type="button" class="remove-lora" onclick="removeLoraItem(this)" title="刪除此 LoRA">🗑️</button>
        <div class="lora-fields">
            <div>
                <label>LoRA 模組路徑:</label>
                <input type="text" class="lora-path" placeholder="輸入 LoRA 模組的完整路徑" value="${path}">
            </div>
            <div>
                <label>權重 (0.01-2.0):</label>
                <input type="number" class="lora-scale" min="0.01" max="2.0" step="0.01" value="${scale}">
            </div>
        </div>
    `;
    
    container.appendChild(loraDiv);
    
    // 更新添加按鈕狀態
    updateAddLoraButton();
}

// 移除 LoRA 項目
function removeLoraItem(button) {
    const loraItem = button.parentElement;
    loraItem.remove();
    loraCount--;
    
    // 如果沒有任何 LoRA 項目，至少保留一個
    if (loraCount === 0) {
        addLoraItem();
    }
    
    updateAddLoraButton();
}

// 更新添加 LoRA 按鈕狀態
function updateAddLoraButton() {
    const addButton = document.getElementById('addLora');
    if (loraCount >= maxLoras) {
        addButton.disabled = true;
        addButton.textContent = `已達上限 (${maxLoras}/${maxLoras})`;
        addButton.classList.add('btn-disabled');
    } else {
        addButton.disabled = false;
        addButton.textContent = `+ 添加 LoRA (${loraCount}/${maxLoras})`;
        addButton.classList.remove('btn-disabled');
    }
}

// 顯示狀態訊息
function showStatus(message, type = 'success') {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = type === 'success' ? 'status-success' : 'status-error';
    status.style.display = 'block';
    
    // 3秒後自動隱藏
    setTimeout(function() {
        status.style.display = 'none';
    }, 3000);
}

// 將 removeLoraItem 函數設為全域，以便 HTML 中的 onclick 可以使用
window.removeLoraItem = removeLoraItem;