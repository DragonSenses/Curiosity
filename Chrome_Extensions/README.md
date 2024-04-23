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

## Run scripts on every page

- [Run scripts on every tab](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab)

Let's create an extension that runs a script on every page.

**Concepts:**
  - The extension manifest.
  - What icon sizes an extension uses.
  - How to inject code into pages using [content scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
  - How to use match patterns.
  - Extension permissions.

Create a folder named `reading-time` to hold the extension's files.

1. Add information about the extension

The manifest JSON file is the only required file. It holds important information about the extension. Create a `manifest.json` file in the *root* of the project and add the following code:

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles"
}
```

These keys contain basic metadata for the extension. They control how the extension appears on the extensions page and, when published, on the Chrome Web Store. To dive deeper, check out the `"name"`, `"version"` and `"description"` keys on the [Manifest](https://developer.chrome.com/docs/extensions/reference/manifest) overview page.

**Other facts about the extension manifest**

- It must be located at the **root** of the project.
- The only required keys are "`manifest_version`", "`name`", and "`version`".
- It supports comments (`//`) during development, but these must be removed before uploading your code to the Chrome Web Store.

2. Provide the icons

So, why do you need icons? Although [icons](https://developer.chrome.com/docs/extensions/reference/manifest/icons) are optional during development, they are required if you plan to distribute your extension on the Chrome Web Store. They also appear in other places like the Extensions Management page.

Create an `images` folder and place the icons inside. You can download the icons on [GitHub](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.reading-time/images). Next, add the highlighted code to your manifest to declare icons:

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles",

  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

We recommend using PNG files, but other file formats are allowed, **except for SVG files**.

**Where are these differently-sized icons displayed?**

|Icon size|Icon use|
|---------|--------|
|16x16|	Favicon on the extension's pages and context menu.|
|32x32| Windows computers often require this size. |
|48x48| Displays on the Extensions page. |
|128x128|	Displays on installation and in the Chrome Web Store. |

3. Declare the content script

Extensions can run scripts that read and modify the content of a page. These are called ***content scripts***. They live in an [isolated world](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#isolated_world), meaning they can make changes to their JavaScript environment without conflicting with their host page or other extensions' content scripts.

Add the following code to the `manifest.json` to register a content script called `content.js`.

```json
{
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```

The `"matches"` field can have one or more [match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns). These allow the browser to identify which sites to inject the content scripts into. Match patterns consist of three parts: `<scheme>://<host><path>`. They can contain `'*'` characters.

**Does this extension display a permission warning?**

When a user installs an extension, the browser informs them what the extension can do. Content scripts request permission to run on sites that meet the match pattern criteria.

In this example, the user would see the following permission warning:

```sh
Add "Reading Time"?

It can:
Read and change yoru data on developer.chrome.com
```

To dive deeper on extension permissions, see [Declaring permissions and warn users](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings).