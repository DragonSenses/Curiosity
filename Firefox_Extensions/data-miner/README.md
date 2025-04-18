# Data-Miner extension

## background.js

```js
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
```

## content.js

```js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clickButtons") {
    const buttonsDiv = document.querySelector('#content #bigcontainer #info-block #info .buttons');
    if (buttonsDiv) {
      const favoriteButton = buttonsDiv.querySelector('#favorite');
      const downloadLink = buttonsDiv.querySelector('#download');
      
      if (favoriteButton) favoriteButton.click();
      
      if (downloadLink) {
        setTimeout(() => {
          downloadLink.click();
        }, 1265); // 1000 milliseconds = 1 second || Avg Human Reaction Time is 265ms
      }
    }
  }
});
```

## manifest.json

```json
{
  "manifest_version": 3,
  "name": "Data Miner",
  "version": "1.0",
  "description": "Extracts data from the webpage and converts to CSV",
  "permissions": ["tabs"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "commands": {
    "click-buttons": {
      "suggested_key": {
        "default": "Alt+X"
      },
      "description": "Extracts relevant data and converts to CSV"
    }
  },
  "action": {
    "default_popup": "popup.html"
  },
  "web_accessible_resources": [
    {
      "resources": ["popup.html"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

## popup.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Data Miner</title>
  </head>
  <body>
    <h1>Data Miner</h1>
    <p>Press Alt + X to click extract the data.</p>
  </body>
</html>
```