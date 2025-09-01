# Copy Style 圖片風格拷貝神器 - Chrome Extension
[English](README.md)  |  [Traditional Chinese](README.zh-tw.md)

一個強大的Chrome擴展，結合Gemini AI圖片分析和Qwen Image圖片生成功能，讓您輕鬆複製任何圖片的風格並生成新圖片。

## 🌟 功能特色

- **AI圖片分析**：使用Google Gemini 分析圖片內容和風格
- **自動生成提示詞**：將圖片轉換為詳細的文字描述
- **AI圖片生成**：透過RUNPOD Qwen Image API生成相似風格的新圖片
- **LoRA模型支持**：支援最多4個LoRA模型進行風格微調
- **自動下載**：生成的圖片自動下載到本地
- **實時通知**：詳細的進度提示和狀態更新
- **自定義設置**：可配置提示詞前綴、圖片解析度等參數

## 📋 系統需求

- Chrome瀏覽器 88+ 版本
- Gemini API Key（用於圖片分析）
- RUNPOD API Key（用於圖片生成）

## 🚀 安裝指南

### 方法一：開發者模式安裝（推薦）

1. **下載專案**
   ```bash
   git clone https://github.com/marcochen2023/copy-style-extension.git
   cd copy-style-extension
   ```

2. **開啟Chrome擴展管理頁面**
   - 在Chrome地址欄輸入：`chrome://extensions/`
   - 或者：選單 → 更多工具 → 擴展程式

3. **啟用開發者模式**
   - 點擊右上角的「開發者模式」開關

4. **載入擴展**
   - 點擊「載入未封裝項目」
   - 選擇下載的專案資料夾
   - 確認載入成功

### 方法二：打包安裝

1. 在擴展管理頁面點擊「打包擴展程式」
2. 選擇專案資料夾並生成.crx文件
3. 將.crx文件拖拽到Chrome擴展頁面進行安裝

## ⚙️ API配置教程

### 獲取Gemini API Key

1. **訪問Google AI Studio**
   - 前往：https://aistudio.google.com/
   - 使用Google帳號登入

2. **創建API Key**
   - 點擊「Get API Key」
   - 選擇「Create API Key in new project」
   - 複製生成的API Key

3. **API使用限制**
   - 免費版本：每分鐘15次請求
   - 每日1500次請求限制
   - 建議升級到付費版本以獲得更好體驗

### 獲取RUNPOD API Key

1. **註冊RUNPOD帳號-含開發者的推薦碼**
   - 前往：https://runpod.io?ref=le1d7tb4
   - 創建新帳號並完成驗證

2. **獲取API Key**
   - 登入後前往：https://www.runpod.io/console/user/settings
   - 在「API Keys」部分點擊「+ API Key」
   - 輸入Key名稱並創建
   - 複製生成的API Key

3. **充值帳戶**
   - RUNPOD採用按使用量計費
   - 建議先充值$10美元進行測試
   - 每次圖片生成約消耗$0.02-0.08
   - 1024X1024約消耗$0.02

## 📖 使用指南

### 初次設置

1. **開啟設置頁面**
   - 右鍵點擊擴展圖標
   - 選擇「選項」或「Options」

2. **配置API Keys**
   - 輸入Gemini API Key
   - 輸入RUNPOD API Key
   - 點擊「保存設置」

3. **自定義設置（可選）**
   - **提示詞前綴**：添加到每個生成提示詞前的文字
   - **圖片解析度**：選擇普通(600x800)或高質量(1024x1024)
   - **LoRA模型**：添加最多4個Qwen Image LoRA模型路徑和權重

### 基本使用

1. **選擇圖片**
   - 在任何網頁上找到想要複製風格的圖片
   - 右鍵點擊圖片

2. **執行Copy Style**
   - 在右鍵選單中選擇「Copy Style」
   - 系統會顯示進度通知：
     - 正在請求生成Prompt
     - 已獲得Prompt
     - 已經將Prompt發送給繪圖模組
     - 圖片生成成功

3. **獲取結果**
   - 生成的圖片會自動下載到預設下載資料夾
   - 文件名格式：`YYYYMMDD_HHMMSS_隨機數字.jpg`

### 進階設置

#### Qwen Image LoRA模型配置

LoRA（Low-Rank Adaptation）模型可以幫助生成特定風格的圖片：

1. **添加Qwen Image LoRA模型**
   - 在設置頁面點擊「+ 添加LoRA」
   - 輸入模型路徑（例如：`style/anime_v1.safetensors`）
   - 設置權重（建議0.5-1.5之間）

2. **測試用LoRA模型**
   - Hanmy：`https://huggingface.co/CuteBlueEyed/Gemini_ILMix/resolve/main/Hanmy_QwenImage_V1.safetensors`
   - Mei：`https://huggingface.co/CuteBlueEyed/Gemini_ILMix/resolve/main/Mei_QwenImage_V1.safetensors`

#### 提示詞前綴範例

- **高質量輸出**：`masterpiece, best quality, ultra detailed, 8k resolution,`
- **特定風格**：`anime style, vibrant colors, detailed background,`
- **攝影風格**：`professional photography, studio lighting, high contrast,`

## 🔧 故障排除

### 常見問題

**Q: 提示「API Key無效」**
- 檢查API Key是否正確複製
- 確認API Key沒有過期
- 檢查網路連接是否正常

**Q: 圖片生成失敗**
- 確認RUNPOD帳戶有足夠餘額
- 檢查圖片URL是否可訪問
- 嘗試使用較小的圖片解析度

**Q: 下載的圖片無法開啟**
- 檢查下載資料夾權限
- 確認網路連接穩定
- 重新嘗試生成

### 調試模式

1. 開啟Chrome開發者工具（F12）
2. 切換到「Console」標籤
3. 查看詳細的錯誤訊息和API回應

## 📁 專案結構

```
Copy_Style/
├── manifest.json          # 擴展配置文件
├── background.js           # 背景腳本（主要邏輯）
├── options.html           # 設置頁面HTML
├── options.js             # 設置頁面邏輯
├── offscreen.html         # 離屏文檔
├── offscreen.js           # 剪貼板操作
├── style.css              # 樣式文件
└── icons/                 # 圖標文件
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🤝 貢獻指南

歡迎提交Issue和Pull Request！

1. Fork本專案
2. 創建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交Pull Request

## 📄 授權條款

本專案採用MIT授權條款 - 詳見[LICENSE](LICENSE)文件

## 🙏 致謝

- [Google Gemini API](https://ai.google.dev/) - 提供強大的圖片分析能力
- [RUNPOD](https://www.runpod.io/) - 提供高效的AI圖片生成服務
- Chrome Extensions API - 提供豐富的瀏覽器整合功能

## 📞 聯絡方式

如有問題或建議，請通過以下方式聯絡：

- GitHub Issues: [提交問題](https://github.com/marcochen2023/copy-style-extension/issues)
- Email: marcochen2023@gmail.com

⭐ 如果這個專案對您有幫助，請給我們一個星星！

🧑‍💻 開發者 (Developers)
Marco Chen (marcochen2023@gmail.com)
Ethan Chen
Sinsin Wang (https://x.com/0xCutecat2003)