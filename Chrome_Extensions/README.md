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

4. Calculate and insert the reading time

Content scripts can use the standard [Document Object Model (DOM)](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) to read and change the content of a page. The extension will first check if the page contains the `<article>` element. Then, it will count all the words within this element and create a paragraph that displays the total reading time.

Create a file called `content.js` inside a folder called `scripts` and add the following code:

```javascript
const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
```

**Interesting JavaScript used in this code**

- [Regular expressions](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions#writing_a_regular_expression_pattern) used to count only the words inside the `<article>` element.
- [insertAdjacentElement()](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement) used to insert the reading time node after the element.
- The [classList](https://developer.mozilla.org/docs/Web/API/Element/classList) property used to add CSS class names to the element class attribute.
- [Optional chaining](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Optional_chaining) used to access an object property that may be undefined or null.
- [Nullish coalescing](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) returns the `<heading>` if the `<date>` is null or undefined.

feat: Add script for reading time calculation

This commit introduces a content script that calculates the reading time for articles displayed on specific URLs. The script is designed to be injected into web pages that match the patterns defined in manifest.json.

The content script performs the following actions:

1. Locates the article element on the page.
2. Retrieves the text content from the article.
3. Counts the number of words using a regular expression.
4. Calculates the reading time based on an assumed average reading speed.
5. Creates a badge displaying the estimated reading time (e.g., "⏱️ 5 min read").
6. Inserts the badge after the article's date or heading (if available).

### Test that it works

**Verify that the file structure of your project** looks like the following:

```sh
|- reading-time
  |- manifest.json
  |- scripts
    |- content.js
  |- images
    |- icon-16.png
    |- icon-32.png
    |- icon-48.png
    |- icon-128.png
```

**Load your extension locally**

To load an unpacked extension in developer mode, follow the steps in [Development Basics](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

**Open an extension or Chrome Web Store documentation**

Here are a few pages you can open to see how long each article will take to read.

  - [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)
  - [Understanding Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)

It should look like this:

```sh
Welcome
Learn about developing extensions for Chrome.
Published oon MOnday, November 9, 202
⏱️1 min read
```
### Potential enhancements

Based on what you've learned today, try to implement any of the following:

- Add another **match pattern** in the manifest.json to support other [chrome developer](https://developer.chrome.com/docs/) pages, like for example, the [Chrome DevTools](https://developer.chrome.com/docs/devtools/) or [Workbox](https://developer.chrome.com/docs/workbox).
- Add a new content script that calculates the reading time to any of your favorite blogs or documentation sites.

Hint: You can use DevTools to [inspect DOM elements](https://developer.chrome.com/docs/devtools/dom).

## Inject scripts into the active tab

Simplify the styling of the current page by clicking the extension toolbar icon.

### Overview

This tutorial builds an extension that simplifies the styling of the Chrome extension and Chrome Web Store documentation pages so that they are easier to read.

In this guide, we're going to explain how to do the following:

- Use the extension service worker as the event coordinator.
- Preserve user privacy through the `"activeTab"` permission.
- Run code when the user clicks the extension toolbar icon.
- Insert and remove a style sheet using the [Scripting](https://developer.chrome.com/docs/extensions/reference/api/scripting) API.
- Use a keyboard shortcut to execute code.

### Build the extension

To start, create a new directory called `focus-mode` that will hold the extension's files. If you prefer, you can download the complete source code from [GitHub](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.focus-mode).

1. Add the extension data and icons

Create a file called `manifest.json` and include the following code.

```json
{
  "manifest_version": 3,
  "name": "Focus Mode",
  "description": "Enable focus mode on Chrome's official Extensions and Chrome Web Store documentation.",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

Create an `images` folder then [download the icons](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.focus-mode/images) into it.

feat: Initialize manifest for focus-mode extension

This commit sets up the initial manifest for the "Focus Mode" extension. The manifest will define the extension's behavior, permissions, and other essential details.

feat: Add icons for focus-mode chrome extension

2. Initialize the extension

Extensions can monitor browser events in the background using the [extension's service worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers). Service workers are special JavaScript environments that handle events and terminate when they're not needed.

Start by registering the service worker in the `manifest.json` file:

```json
{
  ...
  "background": {
    "service_worker": "background.js"
  },
  ...
}
```

Create a file called `background.js` and add the following code:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
```

The first event our service worker will listen for is `runtime.onInstalled()`. This method allows the extension to set an initial state or complete some tasks on installation. Extensions can use the [Storage API](https://developer.chrome.com/docs/extensions/reference/api/storage) and [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) to store the application state. In this case, though, since we're only handling two states, we will use the action's badge text itself to track whether the extension is 'ON' or 'OFF'.

Key term: The [action's badge](https://developer.chrome.com/docs/extensions/reference/api/action#badge) is a colored banner on top of the extension action (toolbar icon).

3. Enable the extension action

The ***extension action*** controls the extension's toolbar icon. So whenever the user clicks the extension icon, it will either run some code (like in this example) or display a popup. Add the following code to declare the extension action in the `manifest.json` file:

```json
{
  ...
  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },
  ...
}
```

feat: Add extension action configuration

This commit adds an "action" section to the manifest file, specifying the default icon for the extension. The icon sizes are provided for different contexts (16x16, 32x32, 48x48, and 128x128).

**Use the activeTab permission to protect user privacy**

The `activeTab` permission grants the extension *temporary* ability to execute code on the active tab. It also allows access to [sensitive properties](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab#what-activeTab-allows) of the current tab.

This permission is enabled when the user ***invokes*** the extension. In this case, the user invokes the extension by clicking on the extension action.

**What other user interactions enable the activeTab permission in my own extension?**
   - Pressing a keyboard shortcut combination.
   - Selecting a context menu item.
   - Accepting a suggestion from the omnibox.
   - Opening an extension popup.

The `"activeTab"` permission allows users to *purposefully* choose to run the extension on the focused tab; this way, it protects the user's privacy. Another benefit is that it does not trigger a [permission warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

To use the `"activeTab"` permission, add it to the manifest's permission array:

```json
{
  ...
  "permissions": ["activeTab"],
  ...
}
```

feat: Add activeTab permission for user privacy

- This commit enhances user privacy by granting the extension the 'activeTab' permission. 
- This permission allows the extension to interact with the currently active tab without exposing sensitive data.
- This permission is enabled when the user invokes the extension. In this case, the user invokes the extension by clicking on the extension action.
