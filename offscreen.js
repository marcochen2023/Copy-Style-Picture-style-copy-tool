chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target === 'offscreen-doc' && message.type === 'copy-to-clipboard') {
    handleCopyToClipboard(message.data, sendResponse);
  }
  return true;
});

function handleCopyToClipboard(text, sendResponse) {
  const textarea = document.getElementById('clipboard-textarea');
  textarea.value = text;
  textarea.select();
  
  try {
    // Use the older, more reliable command for background pages
    document.execCommand('copy');
    sendResponse({ success: true });
  } catch (err) {
    console.error('Failed to copy text in offscreen document:', err);
    sendResponse({ success: false, error: err.message });
  }
}