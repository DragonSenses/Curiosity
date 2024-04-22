# Architectural Decision Record

**"This document records the decisions and progress related to creating a locally used Chrome extension."**

I initially aimed to simplify the process of downloading images from the browser for my own convenience. I wrote some JavaScript to achieve this task. However, as the requirements grew, the small script evolved into my very own personal Chrome extension.

The extension is found in a folder named `right-click-and-save-image`.

## Download and save an image from a single click in the Google Chrome browser

Problem: The process of downloading an image in the browser requires multiple steps.
Solution: Streamline the process with a simple right click by running a script that:

1. Immediately clicks the "Save image as…" option (from context menu) when right-clicking on an image
2. Names the file accordingly from the href source link

Script that simplifies the process of downloading an image when you right-click in the browser.
  Works: Google Chrome
  Usage: F12 > Paste script in console > Right click an image on the page

```js
// Add an event listener to the image element
const imageElement = document.querySelector('img'); // Replace with your actual image selector
imageElement.addEventListener('contextmenu', (event) => {
  // Prevent the default context menu
  event.preventDefault();

  // Extract the filename from the image source URL
  const urlParts = imageElement.src.split('/');
  const filename = urlParts[urlParts.length - 1];

  // Create a dummy anchor element
  const anchor = document.createElement('a');
  anchor.href = imageElement.src;
  anchor.download = filename; // Set the desired filename

  // Trigger a click on the anchor element
  anchor.click();
});
```

In this code snippet:
1. We listen for the `contextmenu` event (right-click) on the image.
2. We prevent the default context menu from showing up.
3. We create an anchor (`<a>`) element and set its `href` attribute to the image source.
4. We set the `download` attribute to specify the desired filename (you can customize this).
5. Finally, we programmatically trigger a click on the anchor element, which prompts the browser to download the image.

Remember to replace `document.querySelector('img')` with the actual selector for your image element. Additionally, ensure that the image source (`imageElement.src`) points to a valid image URL.

### How to run

There are a few ways to automatically run JavaScript when you open a new tab or load a webpage. Let's explore some options:

**Browser Console (Temporary)**:
   - While not automatic, you can manually run JavaScript in the browser console:
     - Open the developer console (usually by pressing **F12** or right-clicking and selecting **Inspect**).
     - Navigate to the **Console** tab.
     - Type or paste your JavaScript code and press **Enter**.
     - This approach is temporary and requires manual execution each time you open a tab.

**Programmatic Tab Opening (For Specific URLs)**:
   - If you want to open a specific URL in a new tab and run a script, you can use the following JavaScript function:
     ```javascript
     const openInNewTab = (url) => {
         window.open(url, '_blank').focus();
     };
     // Usage: openInNewTab('https://example.com');
     ```
     - Replace `'https://example.com'` with the desired URL.
     - When you call `openInNewTab`, it will open the URL in a new tab.

Remember to choose the method that best suits your needs based on the level of customization required and whether you want to apply the script globally or only on specific domains. 

### Run as an extension

**Custom Extension (Advanced)**:
 - If you prefer not to use the Chrome Store or existing extensions, you can create your own custom extension:
   - Write your JavaScript code in a separate file (e.g., `my-script.js`).
   - Create a simple Chrome extension manifest file (`manifest.json`) with the necessary permissions.
   - Load your script file in the extension.
   - Install your custom extension locally (not through the Chrome Store).
   - Whenever you open a new tab, your extension will execute the specified script.

Here is the current manifest file:

```json
{
   "manifest_version": 3,
   "name": "Right-Click-and-Save-Image",
   "version": "1.0.0",
   "description": "A basic extension that simplifies the process of downloading an image with a right-click in the browser.",
   "action": {
    "default_popup": "index.html",
    "default_icon": "icon-128.png"
    },
   "icons": {
       "128": "icon-128.png"
   }
}
```

#### Create local chrome extension

- [Get started on making a Chrome Extension](https://developer.chrome.com/docs/extensions/get-started)

Creating a Chrome extension involves defining a **manifest file** that provides essential information about your extension's structure and behavior. Let's walk through the steps to create a basic Chrome extension manifest:

1. **Set Up Your Development Environment**:
   - Before you start, ensure you have the necessary tools installed for Chrome extension development.

2. **Create a Folder for Your Extension**:
   - Create a dedicated folder for your Chrome extension project. Give it a descriptive name related to your extension.
   - Inside this folder, create a new file named `manifest.json`. This file is the heart of your extension, defining its properties and behavior.

3. **Define Your Manifest**:
   - Open the `manifest.json` file in a text editor.
   - Define the required keys and values for your extension. Here's a minimal example:

   ```json
   {
       "manifest_version": 3,
       "name": "Minimal Manifest",
       "version": "1.0.0",
       "description": "A basic example extension with only required keys",
       "icons": {
           "48": "images/icon-48.png",
           "128": "images/icon-128.png"
       }
   }
   ```

   - Replace the values with relevant information for your extension:
     - `"name"`: A string identifying your extension.
     - `"version"`: The extension's version number.
     - `"description"`: A brief description.
     - `"icons"`: Icons representing your extension (48x48 and 128x128 pixels).

4. **Create the Extension's UI (Popup)**:
   - If your extension has a popup UI (e.g., a browser action), create the necessary HTML, CSS, and JavaScript files.
   - Specify the popup page in your manifest.

5. **Add JavaScript Functionality**:
   - Write JavaScript code to handle extension functionality (e.g., interacting with web pages, modifying browser behavior).
   - Include your JavaScript files in the manifest (e.g., using `"background"` or `"content_scripts"`).

6. **Test Your Extension**:
   - Load your extension in Chrome:
     - Open Chrome.
     - Go to `chrome://extensions/`.
     - Enable "Developer mode."
     - Click "Load unpacked" and select your extension folder.
   - Test your extension by interacting with it and checking the console for any errors.

Remember that this is a basic example. Depending on your extension's requirements, you can add more keys to the manifest (e.g., `"permissions"`, `"content_scripts"`, `"options_page"`). Explore the [official documentation](https://developer.chrome.com/docs/extensions/reference/manifest) for a comprehensive list of manifest keys and their purposes.

##### manifest version

The `manifest_version` is an essential key in a Chrome extension's **manifest file**. It specifies the version of the manifest file format that your extension uses. Let's explore this further:

- **Manifest Version 2 (Deprecated)**:
  - Prior to Chrome 18, developers used **manifest version 1** (denoted as `"manifest_version": 1`).
  - However, starting from Chrome 18, developers should specify **manifest version 2** (denoted as `"manifest_version": 2`).
  - Manifest version 1 is now deprecated, and it's recommended to use version 2 or higher.
  - The changes between version 1 and version 2 are described in detail in the [manifest_version documentation](https://developer.chrome.com/docs/apps/manifest/manifest_version/).

- **Manifest Version 3 (Current)**:
  - The current supported value for `manifest_version` is **3** (denoted as `"manifest_version": 3`).
  - Manifest V3 introduces a new format and associated features.
  - It provides enhanced security, performance, and better isolation of extension components.
  - Developers should transition to Manifest V3 for new extensions.

Remember that the `manifest_version` specifies the format of your extension's manifest file, affecting how your extension interacts with the browser. Choose the appropriate version based on your extension's requirements and compatibility with different Chrome versions.


### Work in progress

```json
{
   "manifest_version": 3,
   "name": "Right-Click-and-Save-Image",
   "version": "1.0.0",
   "description": "A basic extension that simplifies the process of downloading an image with a right-click in the browser.",
   "action": {
    "default_popup": "index.html",
    "default_icon": "icon-128.png"
    },
   "icons": {
       "128": "icon-128.png"
   }
}
```

```json
{
  "manifest_version": 3,
  "name": "Right-Click-and-Save-Image",
  "version": "1.0.0",
  "description": "A basic extension that simplifies the process of downloading an image with a right-click in the browser.",
  "permissions": ["activeTab"],
  "icons": {
      "128": "icon-128.png"
  },
  "background": {
      "service_worker": "background.js"
  }
}
```

`background.js`
```js
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // Your script to execute in the console
      console.log('Hello from the extension!');
      // Add more code here as needed

    },
  });
});
```