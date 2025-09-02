// LoRA 管理相關變數
let loraCount = 0;
const maxLoras = 4;

// 多語言字典
const translations = {
    'zh-tw': {
        title: 'Copy Style 設定',
        tutorial_video_title: '教學影片',
        api_keys_title: 'API 金鑰設定',
        gemini_api_key: 'Gemini API Key:',
        runpod_api_key: 'RUNPOD API Key:',
        gemini_placeholder: '請輸入您的 Gemini API Key',
        runpod_placeholder: '請輸入您的 RUNPOD API Key',
        get_runpod_key: '取得 RunPod API Key',
        prompt_settings_title: '提示詞設定',
        prompt_prefix: '正向提示詞前綴:',
        prompt_prefix_placeholder: '輸入要添加到 LLM 回傳提示詞前面的前綴內容（可選）',
        image_settings_title: '圖片設定',
        image_resolution: '圖片解析度:',
        quality_normal: '普通品質 (600×800)',
        quality_standard: '標準品質 (1024×1024)',
        quality_high: '高品質 (1024×1368)',
        quality_ultra: '高品質 (1024×1536)',
        lora_settings_title: 'LoRA 模組設定',
        add_lora: '+ 添加 LoRA',
        save_settings: '儲存設定',
        usage_guide_title: '使用說明',
        sponsor_btn: '贊助打賞',
        face_swap_btn: '一鍵換臉',
        ai_novel_btn: 'AI小說生成',
        save_success: '設定已成功儲存！',
        save_error: '儲存失敗',
        api_key_required: '請填入所有必要的 API Key',
        lora_limit: '最多只能添加 4 個 LoRA 模組',
        lora_path_label: 'LoRA 模組路徑:',
        lora_path_placeholder: '輸入 LoRA 模組的完整路徑',
        lora_scale_label: '權重 (0.01-2.0):',
        remove_lora_title: '刪除此 LoRA',
        lora_limit_reached: '已達上限'
    },
    'zh-cn': {
        title: 'Copy Style 设置',
        tutorial_video_title: '教学视频',
        api_keys_title: 'API 密钥设置',
        gemini_api_key: 'Gemini API Key:',
        runpod_api_key: 'RUNPOD API Key:',
        gemini_placeholder: '请输入您的 Gemini API Key',
        runpod_placeholder: '请输入您的 RUNPOD API Key',
        get_runpod_key: '获取 RunPod API Key',
        prompt_settings_title: '提示词设置',
        prompt_prefix: '正向提示词前缀:',
        prompt_prefix_placeholder: '输入要添加到 LLM 返回提示词前面的前缀内容（可选）',
        image_settings_title: '图片设置',
        image_resolution: '图片分辨率:',
        quality_normal: '普通品质 (600×800)',
        quality_standard: '标准品质 (1024×1024)',
        quality_high: '高品质 (1024×1368)',
        quality_ultra: '高品质 (1024×1536)',
        lora_settings_title: 'LoRA 模块设置',
        add_lora: '+ 添加 LoRA',
        save_settings: '保存设置',
        usage_guide_title: '使用说明',
        sponsor_btn: '赞助打赏',
        face_swap_btn: '一键换脸',
        ai_novel_btn: 'AI小说生成',
        save_success: '设置已成功保存！',
        save_error: '保存失败',
        api_key_required: '请填入所有必要的 API Key',
        lora_limit: '最多只能添加 4 个 LoRA 模块',
        lora_path_label: 'LoRA 模块路径:',
        lora_path_placeholder: '输入 LoRA 模块的完整路径',
        lora_scale_label: '权重 (0.01-2.0):',
        remove_lora_title: '删除此 LoRA',
        lora_limit_reached: '已达上限'
    },
    'en': {
        title: 'Copy Style Settings',
        tutorial_video_title: 'Tutorial Video',
        api_keys_title: 'API Keys Settings',
        gemini_api_key: 'Gemini API Key:',
        runpod_api_key: 'RUNPOD API Key:',
        gemini_placeholder: 'Enter your Gemini API Key',
        runpod_placeholder: 'Enter your RUNPOD API Key',
        get_runpod_key: 'Get RunPod API Key',
        prompt_settings_title: 'Prompt Settings',
        prompt_prefix: 'Positive Prompt Prefix:',
        prompt_prefix_placeholder: 'Enter prefix content to add before LLM returned prompts (optional)',
        image_settings_title: 'Image Settings',
        image_resolution: 'Image Resolution:',
        quality_normal: 'Normal Quality (600×800)',
        quality_standard: 'Standard Quality (1024×1024)',
        quality_high: 'High Quality (1024×1368)',
        quality_ultra: 'Ultra Quality (1024×1536)',
        lora_settings_title: 'LoRA Module Settings',
        add_lora: '+ Add LoRA',
        save_settings: 'Save Settings',
        usage_guide_title: 'Usage Guide',
        sponsor_btn: 'Sponsor',
        face_swap_btn: 'Face Swap',
        ai_novel_btn: 'AI Novel',
        save_success: 'Settings saved successfully!',
        save_error: 'Save failed',
        api_key_required: 'Please fill in all required API Keys',
        lora_limit: 'Maximum 4 LoRA modules allowed',
        lora_path_label: 'LoRA Module Path:',
        lora_path_placeholder: 'Enter the full path of LoRA module',
        lora_scale_label: 'Weight (0.01-2.0):',
        remove_lora_title: 'Remove this LoRA',
        lora_limit_reached: 'Limit Reached'
    },
    'ja': {
        title: 'Copy Style 設定',
        tutorial_video_title: 'チュートリアル動画',
        api_keys_title: 'APIキー設定',
        gemini_api_key: 'Gemini API Key:',
        runpod_api_key: 'RUNPOD API Key:',
        gemini_placeholder: 'Gemini API Keyを入力してください',
        runpod_placeholder: 'RUNPOD API Keyを入力してください',
        get_runpod_key: 'RunPod API Keyを取得',
        prompt_settings_title: 'プロンプト設定',
        prompt_prefix: 'ポジティブプロンプトプレフィックス:',
        prompt_prefix_placeholder: 'LLM返信プロンプトの前に追加するプレフィックス内容を入力（オプション）',
        image_settings_title: '画像設定',
        image_resolution: '画像解像度:',
        quality_normal: '通常品質 (600×800)',
        quality_standard: '標準品質 (1024×1024)',
        quality_high: '高品質 (1024×1368)',
        quality_ultra: '超高品質 (1024×1536)',
        lora_settings_title: 'LoRAモジュール設定',
        add_lora: '+ LoRAを追加',
        save_settings: '設定を保存',
        usage_guide_title: '使用方法',
        sponsor_btn: 'スポンサー',
        face_swap_btn: '顔交換',
        ai_novel_btn: 'AI小説',
        save_success: '設定が正常に保存されました！',
        save_error: '保存に失敗しました',
        api_key_required: '必要なAPIキーをすべて入力してください',
        lora_limit: '最大4つのLoRAモジュールまで追加可能',
        lora_path_label: 'LoRAモジュールパス:',
        lora_path_placeholder: 'LoRAモジュールの完全パスを入力',
        lora_scale_label: '重み (0.01-2.0):',
        remove_lora_title: 'このLoRAを削除',
        lora_limit_reached: '上限に達しました'
    },
    'ko': {
        title: 'Copy Style 설정',
        tutorial_video_title: '튜토리얼 비디오',
        api_keys_title: 'API 키 설정',
        gemini_api_key: 'Gemini API Key:',
        runpod_api_key: 'RUNPOD API Key:',
        gemini_placeholder: 'Gemini API Key를 입력하세요',
        runpod_placeholder: 'RUNPOD API Key를 입력하세요',
        get_runpod_key: 'RunPod API Key 받기',
        prompt_settings_title: '프롬프트 설정',
        prompt_prefix: '포지티브 프롬프트 접두사:',
        prompt_prefix_placeholder: 'LLM 반환 프롬프트 앞에 추가할 접두사 내용 입력 (선택사항)',
        image_settings_title: '이미지 설정',
        image_resolution: '이미지 해상도:',
        quality_normal: '일반 품질 (600×800)',
        quality_standard: '표준 품질 (1024×1024)',
        quality_high: '고품질 (1024×1368)',
        quality_ultra: '초고품질 (1024×1536)',
        lora_settings_title: 'LoRA 모듈 설정',
        add_lora: '+ LoRA 추가',
        save_settings: '설정 저장',
        usage_guide_title: '사용 가이드',
        sponsor_btn: '후원',
        face_swap_btn: '얼굴 교체',
        ai_novel_btn: 'AI 소설',
        save_success: '설정이 성공적으로 저장되었습니다!',
        save_error: '저장 실패',
        api_key_required: '모든 필수 API Key를 입력해주세요',
        lora_limit: '최대 4개의 LoRA 모듈까지 추가 가능',
        lora_path_label: 'LoRA 모듈 경로:',
        lora_path_placeholder: 'LoRA 모듈의 전체 경로 입력',
        lora_scale_label: '가중치 (0.01-2.0):',
        remove_lora_title: '이 LoRA 삭제',
        lora_limit_reached: '한계 도달'
    }
};

// 현재 언어
let currentLanguage = 'zh-tw';

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
    restore_options();
    setupEventListeners();
    addLoraItem(); // 預設添加一個 LoRA 項目
    updateLanguage();
});

// 設定事件監聽器
function setupEventListeners() {
    document.getElementById('save').addEventListener('click', save_options);
    document.getElementById('addLora').addEventListener('click', addLoraItem);
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);
}

// 載入語言偏好
function loadLanguagePreference() {
    chrome.storage.local.get(['language'], function(result) {
        if (result.language && translations[result.language]) {
            currentLanguage = result.language;
            document.getElementById('languageSelect').value = currentLanguage;
        }
    });
}

// 更改語言
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    if (translations[selectedLanguage]) {
        currentLanguage = selectedLanguage;
        
        // 保存語言偏好
        chrome.storage.local.set({ language: currentLanguage });
        
        // 更新界面
        updateLanguage();
    }
}

// 更新語言顯示
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // 更新所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // 更新所有帶有 data-i18n-placeholder 屬性的元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            element.placeholder = t[key];
        }
    });
    
    // 更新使用說明步驟
    updateUsageSteps();
    
    // 更新 LoRA 按鈕文字
    updateAddLoraButton();
}

// 更新使用說明步驟
function updateUsageSteps() {
    const t = translations[currentLanguage];
    const stepsElement = document.querySelector('[data-i18n="usage_steps"]');
    
    if (stepsElement) {
        const steps = {
            'zh-tw': [
                '首先在上方設定您的 Gemini API Key 和 RUNPOD API Key',
                '可選擇性設定提示詞前綴，讓生成的圖片更符合您的需求',
                '選擇適合的圖片解析度（解析度越高，生成時間越長）',
                '可添加最多4個 LoRA 模組來微調圖片風格',
                '在任何網頁上右鍵點擊圖片，選擇「Copy Style」開始分析',
                '等待 AI 分析完成後，會自動生成相似風格的新圖片',
                '生成的圖片會自動下載到您的下載資料夾'
            ],
            'zh-cn': [
                '首先在上方设置您的 Gemini API Key 和 RUNPOD API Key',
                '可选择性设置提示词前缀，让生成的图片更符合您的需求',
                '选择合适的图片分辨率（分辨率越高，生成时间越长）',
                '可添加最多4个 LoRA 模块来微调图片风格',
                '在任何网页上右键点击图片，选择「Copy Style」开始分析',
                '等待 AI 分析完成后，会自动生成相似风格的新图片',
                '生成的图片会自动下载到您的下载文件夹'
            ],
            'en': [
                'First, set up your Gemini API Key and RUNPOD API Key above',
                'Optionally set prompt prefix to make generated images more suitable for your needs',
                'Choose appropriate image resolution (higher resolution takes longer to generate)',
                'Add up to 4 LoRA modules to fine-tune image style',
                'Right-click on any image on any webpage and select "Copy Style" to start analysis',
                'Wait for AI analysis to complete, then similar style images will be generated automatically',
                'Generated images will be automatically downloaded to your download folder'
            ],
            'ja': [
                'まず上記でGemini API KeyとRUNPOD API Keyを設定してください',
                'オプションでプロンプトプレフィックスを設定し、生成される画像をニーズに合わせます',
                '適切な画像解像度を選択してください（解像度が高いほど生成時間が長くなります）',
                '最大4つのLoRAモジュールを追加して画像スタイルを微調整できます',
                '任意のウェブページで画像を右クリックし、「Copy Style」を選択して分析を開始します',
                'AI分析が完了すると、類似スタイルの新しい画像が自動生成されます',
                '生成された画像は自動的にダウンロードフォルダに保存されます'
            ],
            'ko': [
                '먼저 위에서 Gemini API Key와 RUNPOD API Key를 설정하세요',
                '선택적으로 프롬프트 접두사를 설정하여 생성된 이미지가 요구사항에 더 적합하도록 만드세요',
                '적절한 이미지 해상도를 선택하세요 (해상도가 높을수록 생성 시간이 길어집니다)',
                '최대 4개의 LoRA 모듈을 추가하여 이미지 스타일을 미세 조정할 수 있습니다',
                '임의의 웹페이지에서 이미지를 우클릭하고 "Copy Style"을 선택하여 분석을 시작하세요',
                'AI 분석이 완료되면 유사한 스타일의 새 이미지가 자동으로 생성됩니다',
                '생성된 이미지는 자동으로 다운로드 폴더에 저장됩니다'
            ]
        };
        
        const currentSteps = steps[currentLanguage] || steps['zh-tw'];
        stepsElement.innerHTML = currentSteps.map(step => `<li>${step}</li>`).join('');
    }
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
        showStatus(translations[currentLanguage].api_key_required, 'error');
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
            showStatus(translations[currentLanguage].save_error + ': ' + chrome.runtime.lastError.message, 'error');
        } else {
            showStatus(translations[currentLanguage].save_success, 'success');
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
        showStatus(translations[currentLanguage].lora_limit, 'error');
        return;
    }
    
    loraCount++;
    const container = document.getElementById('loraContainer');
    
    const loraDiv = document.createElement('div');
    loraDiv.className = 'lora-item';
    const t = translations[currentLanguage];
    loraDiv.innerHTML = `
        <button type="button" class="remove-lora" title="${t.remove_lora_title}">🗑️</button>
        <div class="lora-fields">
            <div>
                <label>${t.lora_path_label}</label>
                <input type="text" class="lora-path" placeholder="${t.lora_path_placeholder}" value="${path}">
            </div>
            <div>
                <label>${t.lora_scale_label}</label>
                <input type="number" class="lora-scale" min="0.01" max="2.0" step="0.01" value="${scale}">
            </div>
        </div>
    `;
    
    // 為刪除按鈕添加事件監聽器
    const removeButton = loraDiv.querySelector('.remove-lora');
    removeButton.addEventListener('click', function() {
        removeLoraItem(this);
    });
    
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
    const t = translations[currentLanguage];
    
    if (loraCount >= maxLoras) {
        addButton.disabled = true;
        addButton.textContent = `${t.lora_limit_reached} (${maxLoras}/${maxLoras})`;
        addButton.classList.add('btn-disabled');
    } else {
        addButton.disabled = false;
        addButton.textContent = `${t.add_lora} (${loraCount}/${maxLoras})`;
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

// removeLoraItem 函數現在通過 addEventListener 調用，不需要設為全域