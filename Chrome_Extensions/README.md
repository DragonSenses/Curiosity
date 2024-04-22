# Chrome Extensions

This folder is a collection of Google Chrome extensions that I've worked on.

Resources:

[Chrome for Developers](https://developer.chrome.com/docs/extensions)

## What is a Google Chrome Extension?

A **Google Chrome extension** is a small program that can be installed into the Chrome web browser. These extensions serve to **modify the browser's functionality** by either adding new features or altering existing behaviors.

**Functionality Enhancement**: Chrome extensions enhance the browsing experience by adding extra features or streamlining tasks. Examples of functionalities they can add include:
    - **Blocking ads**: Preventing advertisements from being displayed.
    - **Memory optimization**: Improving Chrome's efficiency.
    - **To-do lists or notes**: Adding productivity tools.
    - **Password management**: Enhancing security.
    - **Text copying**: Making it easier to copy text from websites.
    - **Privacy protection**: Safeguarding your browsing experience.

**Chrome extensions extend your browser's functionality, making your browsing experience more convenient and efficient.**

## Hello World extension

[Build your first extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)

Let's begin by **developing a straightforward extension** that triggers a popup when clicked in the top-right corner of the Google Chrome toolbar.

1. Project structure

Here is the project structure: 

```sh
- hello
  |- manifest.json
  |- icon.png
  |- hello.html
```

To store the files for the extension, create a folder named `hello`.

2. Create `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "Hello World",
  "description": "Base Level Extension",
  "version": "1.0",
  "action": {
    "default_popup": "hello.html",
    "default_icon": "icon.png"
  }
}
```

3. Create `hello.html`

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

4. Add `icon.png`

You can create your own icon or download one from [here](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/gmKIT88Ha1z8VBMJFOOH.png).

5. Load the extension
   
The extension now displays a popup when the extension's action icon (toolbar icon) is clicked. You can test it in Chrome by loading it locally. Ensure all files are saved.

### What is manifest.json?

- `manfest.json`

This JSON file describes the extension's capabilities and configuration. For example, most manifest files contain an `"action"` key which declares the image Chrome should use as the extension's action icon and the HTML page to show in a popup when the extension's action icon is clicked.

## Test an extension locally on your Google Chrome browser

[Load an unpacked extension docs](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

To load an unpacked extension in developer mode:

  1. Go to the Extensions page by entering `chrome://extensions` in a new tab. (By design `chrome://` URLs are not linkable.)
    - Alternatively, click the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
    - Or, click the Chrome menu, hover over **More Tools**, then select **Extensions**.
  2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
  3. Click the **Load unpacked** button and select the extension directory.

The extension has been successfully installed. If no extension icons were included in the manifest, a generic icon will be created for the extension.