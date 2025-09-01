const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

// Function to create the context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyStyle",
    title: "Copy Style",
    contexts: ["image"]
  });
});

// Listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "copyStyle" && info.srcUrl) {
    // 取得 API Keys 和設定
    const settings = await chrome.storage.local.get([
      'geminiApiKey', 'runpodApiKey', 'promptPrefix', 'imageSize', 
      'seed', 'loras'
    ]);
    
    if (!settings.geminiApiKey || !settings.runpodApiKey) {
      chrome.runtime.openOptionsPage();
      return;
    }

    const processingNotificationId = `processing-${Date.now()}`;
    
    try {
      // 步驟1: 提示正在請求生成Prompt
      chrome.notifications.create(processingNotificationId, {
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: '正在請求生成Prompt',
        message: '請稍候，正在將圖片傳送給 Gemini 進行分析...'
      });

      const base64ImageData = await imageUrlToBase64(info.srcUrl);
      const promptText = await getPromptFromGemini(base64ImageData, settings.geminiApiKey);
      
      if (promptText) {
        // 步驟2: 提示已獲得Prompt
        chrome.notifications.clear(processingNotificationId);
        const promptNotificationId = `prompt-${Date.now()}`;
        chrome.notifications.create(promptNotificationId, {
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: '已獲得Prompt',
          message: `生成的提示詞: ${promptText.substring(0, 50)}...`
        });

        // 等待1秒讓用戶看到Prompt通知
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 步驟3: 提示已經將Prompt發送給繪圖模組
        chrome.notifications.clear(promptNotificationId);
        const sendingNotificationId = `sending-${Date.now()}`;
        chrome.notifications.create(sendingNotificationId, {
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: '已經將Prompt發送給繪圖模組',
          message: '正在生成圖片，請稍候...'
        });

        // 準備完整的prompt（加上前綴）
        const fullPrompt = settings.promptPrefix ? 
          `${settings.promptPrefix}, ${promptText}` : promptText;

        // 調用RUNPOD API
        const imageUrl = await generateImageWithRunpod(fullPrompt, settings);
        
        if (imageUrl) {
          // 步驟4: 提示圖片生成成功
          chrome.notifications.clear(sendingNotificationId);
          const successNotificationId = `success-${Date.now()}`;
          chrome.notifications.create(successNotificationId, {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: '圖片生成成功！',
            message: '正在下載圖片到您的電腦...'
          });

          await downloadImage(imageUrl);
          
          // 等待0.5秒確保下載開始
          await new Promise(resolve => setTimeout(resolve, 500));
          
          chrome.notifications.clear(successNotificationId);
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: '完成！',
            message: '圖片已成功下載到您的電腦。'
          });
        }
      }
    } catch (error) {
      console.error("Error processing image:", error);
      chrome.notifications.clear(processingNotificationId);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: '發生錯誤',
        message: `${error.message}`
      });
    }
  }
});

async function imageUrlToBase64(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`無法讀取圖片，狀態碼: ${response.status}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function getPromptFromGemini(base64ImageData, apiKey) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;
  const requestBody = { "contents": [{ "parts": [
    { "text": "Stable Diffusion prompt for :(Just reply to Stable Diffusion prompt in english, no other comments or statements are needed. Describe the scene and what happened in as much detail as possible.)." },
    { "inline_data": { "mime_type": "image/jpeg", "data": base64ImageData } }
  ]}]};

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Gemini API 錯誤: ${errorData.error.message}`);
  }

  const data = await response.json();
  if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      throw new Error('API 回應格式不符，找不到提示詞。');
  }
  return data.candidates[0].content.parts[0].text;
}

async function generateImageWithRunpod(prompt, settings) {
  const API_URL = 'https://api.runpod.ai/v2/qwen-image-t2i-lora/runsync';
  
  // 準備LoRA參數
  const loras = [];
  if (settings.loras && Array.isArray(settings.loras)) {
    settings.loras.forEach(lora => {
      if (lora.path && lora.path.trim()) {
        loras.push({
          path: lora.path.trim(),
          scale: parseFloat(lora.scale) || 1.0
        });
      }
    });
  }

  const requestBody = {
    input: {
      prompt: prompt,
      loras: loras,
      size: settings.imageSize || "600*800",
      seed: parseInt(settings.seed) || -1,
      enable_safety_checker: true
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.runpodApiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`RUNPOD API 錯誤: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  console.log('RUNPOD API Response:', data); // 調試用
  
  // 處理不同的回應格式
  if (data.status === 'COMPLETED') {
    // 檢查 data.output.result 格式（RUNPOD API的實際回應格式）
    if (data.output && data.output.result) {
      // 移除可能的反引號和空格
      const imageUrl = data.output.result.trim().replace(/^`|`$/g, '');
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      } else {
        throw new Error('API回應中的圖片URL格式不正確');
      }
    }
    // 備用格式檢查
    else if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      return data.output[0]; // 返回第一張圖片的URL
    } else if (data.output && typeof data.output === 'string') {
      return data.output; // 直接返回圖片URL字串
    } else {
      throw new Error('API回應中沒有找到圖片URL');
    }
  } else if (data.status === 'FAILED') {
    throw new Error(`圖片生成失敗: ${data.error || '未知錯誤'}`);
  } else if (data.status === 'IN_PROGRESS' || data.status === 'IN_QUEUE') {
    throw new Error('API回應顯示任務仍在處理中，請稍後再試');
  } else {
    throw new Error(`未知的API狀態: ${data.status || '無狀態'}`);
  }
}

async function downloadImage(imageUrl) {
  // 生成檔案名稱: 年月日_時分秒_8位數隨機數字.jpg
  const now = new Date();
  const dateStr = now.getFullYear().toString() + 
                  (now.getMonth() + 1).toString().padStart(2, '0') + 
                  now.getDate().toString().padStart(2, '0');
  const timeStr = now.getHours().toString().padStart(2, '0') + 
                  now.getMinutes().toString().padStart(2, '0') + 
                  now.getSeconds().toString().padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  const filename = `${dateStr}_${timeStr}_${randomNum}.jpg`;

  // 下載圖片
  chrome.downloads.download({
    url: imageUrl,
    filename: filename,
    saveAs: false
  });
}