# Copy Style - Chrome Extension

A powerful Chrome extension that combines Gemini AI image analysis with RUNPOD API image generation, allowing you to easily copy the style of any image and generate new images.

## 🌟 Features

- **AI Image Analysis**: Uses Google Gemini 2.0 Flash Lite to analyze image content and style
- **Automatic Prompt Generation**: Converts images into detailed text descriptions
- **AI Image Generation**: Generates new images with similar styles through RUNPOD API
- **LoRA Model Support**: Supports up to 4 LoRA models for style fine-tuning
- **Auto Download**: Generated images are automatically downloaded locally
- **Real-time Notifications**: Detailed progress updates and status notifications
- **Custom Settings**: Configurable prompt prefixes, image resolution, and other parameters

## 📋 System Requirements

- Chrome Browser 88+ version
- Gemini API Key (for image analysis)
- RUNPOD API Key (for image generation)

## 🚀 Installation Guide

### Method 1: Developer Mode Installation (Recommended)

1. **Download Project**
   ```bash
   # Method 1: Download ZIP file
   # Go to GitHub repository page and click "Code" → "Download ZIP"
   # Extract the ZIP file to your desired location
   
   # Method 2: If you have access to the repository
   git clone https://github.com/marcochen2023/Copy-Style-Picture-style-copy-tool
   cd Copy-Style-Picture-style-copy-tool
   ```

2. **Open Chrome Extensions Management Page**
   - Enter in Chrome address bar: `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Click the "Developer mode" toggle in the top right corner

4. **Load Extension**
   - Click "Load unpacked"
   - Select the downloaded project folder
   - Confirm successful loading

### Method 2: Package Installation

1. Click "Pack extension" on the extensions management page
2. Select the project folder and generate a .crx file
3. Drag the .crx file to the Chrome extensions page to install

## ⚙️ API Configuration Tutorial

### Getting Gemini API Key

1. **Visit Google AI Studio**
   - Go to: https://aistudio.google.com/
   - Sign in with your Google account

2. **Create API Key**
   - Click "Get API Key"
   - Select "Create API Key in new project"
   - Copy the generated API Key

3. **API Usage Limits**
   - Free version: 15 requests per minute
   - 1500 requests per day limit
   - Recommend upgrading to paid version for better experience

### Getting RUNPOD API Key

1. **Register RUNPOD Account - with Developer Referral Code**
   - Go to: https://runpod.io?ref=le1d7tb4
   - Create new account and complete verification

2. **Get API Key**
   - After login, go to: https://www.runpod.io/console/user/settings
   - In "API Keys" section, click "+ API Key"
   - Enter key name and create
   - Copy the generated API Key

3. **Top Up Account**
   - RUNPOD uses pay-per-use billing
   - Recommend topping up $10 USD for testing
   - Each image generation costs approximately $0.02-0.08
   - 1024X1024 costs approximately $0.02

## 📖 Usage Guide

### Initial Setup

1. **Open Settings Page**
   - Right-click the extension icon
   - Select "Options"

2. **Configure API Keys**
   - Enter Gemini API Key
   - Enter RUNPOD API Key
   - Click "Save Settings"

3. **Custom Settings (Optional)**
   - **Prompt Prefix**: Text added before each generated prompt
   - **Image Resolution**: Choose Normal (600x800) or High Quality (1024x1024)
   - **LoRA Models**: Add up to 4 Qwen Image LoRA model paths and weights

### Basic Usage

1. **Select Image**
   - Find an image whose style you want to copy on any webpage
   - Right-click the image

2. **Execute Copy Style**
   - Select "Copy Style" from the right-click menu
   - System will show progress notifications:
     - Requesting Prompt Generation
     - Prompt Obtained
     - Prompt Sent to Drawing Module
     - Image Generation Successful

3. **Get Results**
   - Generated image will automatically download to default download folder
   - Filename format: `YYYYMMDD_HHMMSS_RandomNumber.jpg`

### Advanced Settings

#### Qwen Image LoRA Model Configuration

LoRA (Low-Rank Adaptation) models can help generate images with specific styles:

1. **Add Qwen Image LoRA Model**
   - Click "+ Add LoRA" on settings page
   - Enter model path (e.g., `style/anime_v1.safetensors`)
   - Set weight (recommended between 0.5-1.5)

2. **Test LoRA Models**
   - Hanmy: `https://huggingface.co/CuteBlueEyed/Gemini_ILMix/resolve/main/Hanmy_QwenImage_V1.safetensors`
   - Mei: `https://huggingface.co/CuteBlueEyed/Gemini_ILMix/resolve/main/Mei_QwenImage_V1.safetensors`

#### Prompt Prefix Examples

- **High Quality Output**: `masterpiece, best quality, ultra detailed, 8k resolution,`
- **Specific Style**: `anime style, vibrant colors, detailed background,`
- **Photography Style**: `professional photography, studio lighting, high contrast,`

## 🔧 Troubleshooting

### Common Issues

**Q: "Invalid API Key" error**
- Check if API Key is correctly copied
- Confirm API Key hasn't expired
- Check if network connection is normal

**Q: Image generation failed**
- Confirm RUNPOD account has sufficient balance
- Check if image URL is accessible
- Try using smaller image resolution

**Q: Downloaded image cannot be opened**
- Check download folder permissions
- Ensure stable network connection
- Try regenerating

### Debug Mode

1. Open Chrome Developer Tools (F12)
2. Switch to "Console" tab
3. View detailed error messages and API responses

## 📁 Project Structure

```
Copy_Style/
├── manifest.json          # Extension configuration file
├── background.js           # Background script (main logic)
├── options.html           # Settings page HTML
├── options.js             # Settings page logic
├── offscreen.html         # Offscreen document
├── offscreen.js           # Clipboard operations
├── style.css              # Style file
└── icons/                 # Icon files
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

1. Fork this project
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Submit Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - Provides powerful image analysis capabilities
- [RUNPOD](https://www.runpod.io/) - Provides efficient AI image generation services
- Chrome Extensions API - Provides rich browser integration features

## 📞 Contact

If you have questions or suggestions, please contact us through:

- GitHub Issues: [Submit Issue](https://github.com/marcochen2023/copy-style-extension/issues)
- Email: marcochen2023@gmail.com

⭐ If this project helps you, please give us a star!

## 🙏 Donate
- Patreon: [Donate](https://www.patreon.com/c/NovelPD)

🧑‍💻 Developers
Marco Chen (marcochen2023@gmail.com)
Ethan Chen
Sinsin Wang (https://x.com/0xCutecat2003)
