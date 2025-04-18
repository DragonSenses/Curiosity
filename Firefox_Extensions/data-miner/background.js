chrome.commands.onCommand.addListener((command) => {
  if (command === "click-buttons") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        });
      }
    });
  }
});