# Firefox Extensions

This folder is a collection of Firefox extensions that I've worked on.

## First extension

This article walks through creating an extension for Firefox, from start to finish. The extension adds a red border to any pages loaded from "`mozilla.org`" or any of its subdomains.

### Write the extension

In a suitable location, create a new directory called `borderify` and navigate to it.

```sh
mkdir borderify
cd borderify
```

#### manifest.json

Using a suitable [text editor](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/Available_text_editors), create a new file called "manifest.json" directly under the "borderify" directory. Give it the following contents:

```json
{
  "manifest_version": 2,
  "name": "Borderify",
  "version": "1.0",

  "description": "Adds a red border to all webpages matching mozilla.org.",

  "icons": {
    "48": "icons/border-48.png"
  },

  "content_scripts": [
    {
      "matches": ["*://*.mozilla.org/*"],
      "js": ["borderify.js"]
    }
  ]
}
```

  - The first three keys: [`manifest_version`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version), [`name`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/name), and [`version`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version), are mandatory and contain basic metadata for the extension.
  - [`description`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/description) is optional, but recommended: it's displayed in the Add-ons Manager.
  - [`icons`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons) is optional, but recommended: it allows you to specify an icon for the extension, that will be shown in the Add-ons Manager.

The most interesting key here is [`content_scripts`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts), which tells Firefox to load a script into Web pages whose URL matches a specific pattern. In this case, we're asking Firefox to load a script called "borderify.js" into all HTTP or HTTPS pages served from "mozilla.org" or any of its subdomains.

- [Learn more about content scripts.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)
- [Learn more about match patterns.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)


**Warning:** [In some situations you need to specify an ID for your extension](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/#when_do_you_need_an_add-on_id). If you do need to specify an add-on ID, include the [`browser_specific_settings`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings) key in `manifest.json` and set its `gecko.id` property:

```json
"browser_specific_settings": {
  "gecko": {
    "id": "borderify@example.com"
  }
}
```

#### icons/border-48.png

The extension should have an icon. This will be shown next to the extension's listing in the Add-ons Manager. Our manifest.json promised that we would have an icon at "icons/border-48.png".

Create the "icons" directory directly under the "borderify" directory. Save an icon there named "border-48.png".

If you choose to supply your own icon, It should be 48x48 pixels. You could also supply a 96x96 pixel icon, for high-resolution displays, and if you do this it will be specified as the `96` property of the `icons` object in manifest.json:


```json
"icons": {
  "48": "icons/border-48.png",
  "96": "icons/border-96.png"
}
```

Alternatively, you could supply an SVG file here, and it will be scaled correctly. (Though: if you're using SVG and your icon includes text, you may want to use your SVG editor's "convert to path" tool to flatten the text, so that it scales with a consistent size/position.)

- [Learn more about specifying icons.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons)

#### borderify.js

Finally, create a file called "borderify.js" directly under the "borderify" directory. Give it this content:

This script will be loaded into the pages that match the pattern given in the `content_scripts` manifest.json key. The script has direct access to the document, just like scripts loaded by the page itself.

- [Learn more about content scripts.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)

### Trying it out

First, double check that you have the right files in the right places:

```sh
borderify/
    icons/
        border-48.png
    borderify.js
    manifest.json
```

#### Installing

In Firefox: Open the [about:debugging](https://firefox-source-docs.mozilla.org/devtools-user/about_colon_debugging/index.html) page, click the This Firefox option, click the Load Temporary Add-on button, then select any file in your extension's directory.

- Add this to the Address bar in the browser: about:debugging#/runtime/this-firefox
- Click `Load Temporary Add-on...`
- Select the extension directory

The extension now installs, and remains installed until you restart Firefox.

Alternatively, you can run the extension from the command line using the [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) tool.

#### Testing

**Note**: By default [extensions don't work in private browsing](https://support.mozilla.org/en-US/kb/extensions-private-browsing). If you want to test this extension in private browsing open "`about:addons`", click on the extension, and select the Allow radio button for Run in Private Windows.

Now visit a page under "`https://www.mozilla.org/en-US/`", and you should see the red border round the page.

Note: Don't try it on "`addons.mozilla.org`", though! Content scripts are currently blocked on that domain.

Try experimenting a bit. Edit the content script to change the color of the border, or do something else to the page content. Save the content script, then reload the extension's files by clicking the Reload button in "`about:debugging`". You can see the changes right away.

- [Learn more about loading extensions](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

### Packaging and publishing

For other people to use your extension, you need to package it and submit it to Mozilla for signing. To learn more about that, see ["Publishing your extension"](https://extensionworkshop.com/documentation/publish/package-your-extension/).

### What's next?

Now you've had an introduction to the process of developing a WebExtension for Firefox:
    - [write a more complex extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)
    - [read more about the anatomy of an extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
    - [explore the extension examples](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Examples)
    - [find out what you need to develop, test, and publish your extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next)
    - [take your learning further](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next#continue_your_learning_experience).

## Second extension

- [Second firefox extension walkthrough](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)

The extension adds a new button to the Firefox toolbar. When the user clicks the button, we display a popup enabling them to choose an animal. Once they choose an animal, we'll replace the current page's content with a picture of the chosen animal.

To implement this, we will:

  - **define a [browser action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Toolbar_button), which is a button attached to the Firefox toolbar**. For the button we'll supply:
    - an icon, called "beasts-32.png"
    - a popup to open when the button is pressed. The popup will include HTML, CSS, and JavaScript.
  - **define an icon for the extension**, called "beasts-48.png". This will be shown in the Add-ons Manager.
  - **write a content script, "beastify.js" that will be injected into web pages.** This is the code that will actually modify the pages.
  - **package some images of the animals, to replace images in the web page**. We'll make the images "web accessible resources" so the web page can refer to them.

You could visualize the overall structure of the extension like this:

![Structure of beastify extension](/Firefox_Extensions\beastify\beastify.jpg)

It's a simple extension, but shows many of the basic concepts of the WebExtensions API:

  - adding a button to the toolbar
  - defining a popup panel using HTML, CSS, and JavaScript
  - injecting content scripts into web pages
  - communicating between content scripts and the rest of the extension
  - packaging resources with your extension that can be used by web pages

### Writing the extension

Create a new directory and navigate to it:

```sh
mkdir beastify
cd beastify
```

#### manifest.json

Now create a new file called "manifest.json", and give it the following contents:

```json
{
  "manifest_version": 2,
  "name": "Beastify",
  "version": "1.0",

  "description": "Adds a browser action icon to the toolbar. Click the button to choose a beast. The active tab's body content is then replaced with a picture of the chosen beast. See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Examples#beastify",
  "homepage_url": "https://github.com/mdn/webextensions-examples/tree/main/beastify",
  "icons": {
    "48": "icons/beasts-48.png"
  },

  "permissions": ["activeTab"],

  "browser_action": {
    "default_icon": "icons/beasts-32.png",
    "default_title": "Beastify",
    "default_popup": "popup/choose_beast.html"
  },

  "web_accessible_resources": [
    "beasts/frog.jpg",
    "beasts/turtle.jpg",
    "beasts/snake.jpg"
  ]
}
```

- The first three keys: [`manifest_version`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version), [`name`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/name), and [`version`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/version), are mandatory and contain basic metadata for the extension.
- [`description`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/description) and [`homepage_url`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/homepage_url) are optional, but recommended: they provide useful information about the extension.
- [`icons`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons) is optional, but recommended: it allows you to specify an icon for the extension, that will be shown in the Add-ons Manager.
- [`permissions`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) lists permissions the extension needs. We're just asking for the [`activeTab` permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#activetab_permission) here.
- [`browser_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) specifies the toolbar button. We're supplying three pieces of information here:
  - `default_icon` is mandatory, and points to the icon for the button
  - `default_title` is optional, and will be shown in a tooltip
  - `default_popup` is used if you want a popup to be shown when the user clicks the button. We do, so we've included this key and made it point to an HTML file included with the extension.
- [`web_accessible_resources`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/web_accessible_resources) lists files that we want to make accessible to web pages. Since the extension replaces the content in the page with images we've packaged with the extension, we need to make these images accessible to the page.

Note that all paths given are relative to manifest.json itself.

#### The icon

The extension should have an icon. This will be shown next to the extension's listing in the Add-ons Manager (you can open this by visiting the URL "about:addons"). Our manifest.json promised that we would have an icon for the toolbar at "icons/beasts-48.png".

Create the "icons" directory and save an icon there named "beasts-48.png". You could use [the one from our example](https://raw.githubusercontent.com/mdn/webextensions-examples/main/beastify/icons/beasts-48.png), which is taken from the [Aha-Soft's Free Retina iconset](http://www.aha-soft.com/free-icons/free-retina-icon-set/), and used under the terms of its license.

If you choose to supply your own icon, It should be 48x48 pixels. You could also supply a 96x96 pixel icon, for high-resolution displays, and if you do this it will be specified as the 96 property of the icons object in manifest.json:

```json
"icons": {
  "48": "icons/beasts-48.png",
  "96": "icons/beasts-96.png"
}
```

If you don't supply a popup, then a click event is dispatched to your extension when the user clicks the button. If you do supply a popup, the click event is not dispatched, but instead, the popup is opened. We want a popup, so let's create that next.

#### The popup

The function of the popup is to enable the user to choose one of three beasts.

Create a new directory called "popup" under the extension root. This is where we'll keep the code for the popup. The popup will consist of three files:

  - `choose_beast.html` defines the content of the panel
  - `choose_beast.css` styles the content
  - `choose_beast.js` handles the user's choice by running a content script in the active tab

#### choose_beast.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="choose_beast.css" />
  </head>

  <body>
    <div id="popup-content">
      <button>Frog</button>
      <button>Turtle</button>
      <button>Snake</button>
      <button type="reset">Reset</button>
    </div>
    <div id="error-content" class="hidden">
      <p>Can't beastify this web page.</p>
      <p>Try a different page.</p>
    </div>
    <script src="choose_beast.js"></script>
  </body>
</html>
```

We have a `<div>` element with an ID of `"popup-content" `that contains a button for each animal choice and a reset button. We have another `<div>` with an ID of `"error-content"` and a class `"hidden"`. We'll use that in case there's a problem initializing the popup.

Note that we include the CSS and JS files from this file, just like a web page.

#### choose_beast.css

The CSS fixes the size of the popup, ensures that the three choices fill the space, and gives them some basic styling. It also hides elements with `class="hidden"`: this means that our `<div id="error-content"...` element will be hidden by default.

```css
html,
body {
  width: 100px;
}

.hidden {
  display: none;
}

button {
  border: none;
  width: 100%;
  margin: 3% auto;
  padding: 4px;
  text-align: center;
  font-size: 1.5em;
  cursor: pointer;
  background-color: #e5f2f2;
}

button:hover {
  background-color: #cff2f2;
}

button[type="reset"] {
  background-color: #fbfbc9;
}

button[type="reset"]:hover {
  background-color: #eaea9d;
}
```

#### choose_beast.js

```javascript
/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Frog":
          return browser.runtime.getURL("beasts/frog.jpg");
        case "Snake":
          return browser.runtime.getURL("beasts/snake.jpg");
        case "Turtle":
          return browser.runtime.getURL("beasts/turtle.jpg");
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      browser.tabs.insertCSS({ code: hidePage }).then(() => {
        const url = beastNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url,
        });
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.removeCSS({ code: hidePage }).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }
    if (e.target.type === "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    } else {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
```

The place to start here is line 99. The popup script executes a content script in the active tab as soon as the popup is loaded, using the [`browser.tabs.executeScript()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript) API. If executing the content script is successful, then the content script will stay loaded in the page until the tab is closed or the user navigates to a different page.

A common reason the `browser.tabs.executeScript()` call might fail is that you can't execute content scripts in all pages. For example, you can't execute them in privileged browser pages like about:debugging, and you can't execute them on pages in the [addons.mozilla.org](https://addons.mozilla.org/) domain. If it does fail, `reportExecuteScriptError()` will hide the `<div id="popup-content">` element, show the `<div id="error-content"...` element, and log an error to the [console](https://extensionworkshop.com/documentation/develop/debugging/).

If executing the content script is successful, we call `listenForClicks()`. This listens for clicks on the popup.

  - If the click was not on a button in the popup, we ignore it and do nothing.
  - If the click was on a button with `type="reset"`, then we call `reset()`.
  - If the click was on any other button (i.e. the beast buttons), then we call `beastify()`.

The `beastify()` function does three things:

  - map the button clicked to a URL pointing to an image of a particular beast
  - hide the page's whole content by injecting some CSS, using the [`browser.tabs.insertCSS()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/insertCSS) API
  - send a "beastify" message to the content script using the [`browser.tabs.sendMessage()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage) API, asking it to beastify the page, and passing it the URL to the beast image.

The `reset()` function essentially undoes a beastify:
  
  - remove the CSS we added, using the [`browser.tabs.removeCSS()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/removeCSS) API
  - send a "reset" message to the content script asking it to reset the page.

#### The content script

Create a new directory, under the extension root, called "content_scripts" and create a new file in it called "beastify.js", with the following contents:

```js
(() => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    const beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    const existingBeasts = document.querySelectorAll(".beastify-image");
    for (const beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "insertBeast()" or "removeExistingBeasts()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();
```

The first thing the content script does is to check for a global variable `window.hasRun`: if it's set the script returns early, otherwise it sets `window.hasRun` and continues. The reason we do this is that every time the user opens the popup, the popup executes a content script in the active tab, so we could have multiple instances of the script running in a single tab. If this happens, we need to make sure that only the first instance is actually going to do anything.

After that, the place to start is line 40, where the content script listens for messages from the popup, using the [`browser.runtime.onMessage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage) API. We saw above that the popup script can send two different sorts of messages: "beastify" and "reset".

  - if the message is "beastify", we expect it to contain a URL pointing to a beast image. We remove any beasts that might have been added by previous "beastify" calls, then construct and append an [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) element whose `src` attribute is set to the beast URL.
  - if the message is "reset", we just remove any beasts that might have been added.

#### The beasts

Finally, we need to include the images of the beasts.

Create a new directory called "beasts", and add the three images in that directory, with the appropriate names. You can get the images from [the GitHub repository](https://github.com/mdn/webextensions-examples/tree/main/beastify/beasts), or from here.

### Testing it out

First, double check that you have the right files in the right places:

```sh
beastify/

    beasts/
        frog.jpg
        snake.jpg
        turtle.jpg

    content_scripts/
        beastify.js

    icons/
        beasts-32.png
        beasts-48.png

    popup/
        choose_beast.css
        choose_beast.html
        choose_beast.js

    manifest.json
```

Now load the extension as a temporary add-on. Open "about:debugging" in Firefox, click "Load Temporary Add-on", and select your **manifest.json** file. You should then see the extension's icon appear in the Firefox toolbar.

Open a web page, click the icon, select a beast, and see the web page change.

#### Developing from the command line

You can automate the temporary installation step by using the [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) tool. Try this:

```sh
cd beastify
web-ext run
```

# Anatomy of an extension

An extension consists of a collection of files, packaged for distribution and installation. In this article, we will quickly go through the files that might be present in an extension.

## manifest.json

This is the only file that must be present in every extension. It contains basic metadata such as its name, version, and the permissions it requires. It also provides pointers to other files in the extension.

The manifest can also contain pointers to several other types of files:


Background scripts

    Scripts that respond to browser events.

Icons

    For the extension and any buttons it might define.

Sidebars, popups, and options pages

    HTML documents that provide content for various user interface components.

Content scripts

    JavaScript included with your extension, that you will inject into web pages.

Web-accessible resources

    Make packaged content accessible to web pages and content scripts.

![Web extension anatomy](webextension-anatomy.png)

See the [`manifest.json`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) reference page for all the details.

Along with those already listed in the manifest, an extension may also include additional [Extension pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages) and supporting files.

## Background scripts

Extensions often need to respond to events that occur in the browser independently of the lifetime of any particular web page or browser window. That is what background scripts are for.

Background scripts can be persistent or non-persistent. Persistent background scripts load as soon as the extension loads and stay loaded until the extension is disabled or uninstalled. This background script behavior is only available in Manifest V2. Non-persistent background scripts load when needed to respond to an event and unload when they become idle. This background script behavior is an option in Manifest V2 and the only background script behavior available in Manifest V3.

You can use any of the [WebExtension APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API) in the script, if you have requested the necessary [permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions).

See the [background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) article to learn more.

## Sidebars, popups, and options pages

Your extension can include various user interface components whose content is defined using an HTML document:

[Sidebar](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Sidebars)

    A pane that is displayed at the left-hand side of the browser window, next to the web page.

[Popup](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups)

    A dialog that you can display when the user clicks on a [toolbar button](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Toolbar_button) or [address bar button](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Page_actions)

[Options](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages)

    A page that's shown when the user accesses your add-on's preferences in the browser's native add-ons manager.

For each of these components, you create an HTML file and point to it using a specific property in `manifest.json`. The HTML file can include CSS and JavaScript files, just like a normal web page.

All of these are a type of [Extension pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages). Unlike a normal web page, your JavaScript can use all the same privileged WebExtension APIs as your background script.

## Extension pages

You can also include HTML documents in your extension which are not attached to some predefined user interface component. Unlike the documents you might provide for sidebars, popups, or options pages, these don't have an entry in `manifest.json`. However, they do also get access to all the same privileged WebExtension APIs as your background script.

You'd typically load a page like this using [windows.create()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/create) or [tabs.create()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create).

See [Extension pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages) to learn more.

## Content scripts

Use content scripts to access and manipulate web pages. Content scripts are loaded into web pages and run in the context of that particular page.

Content scripts are extension-provided scripts which run in the context of a web page; this differs from scripts which are loaded by the page itself, including those which are provided in [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) elements within the page.

Content scripts can see and manipulate the page's DOM, just like normal scripts loaded by the page.

Unlike normal page scripts, content scripts can:

  - Make cross-domain XHR requests.
  - Use a small subset of the [WebExtension APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API).
  - [Exchange messages with their background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts) and can in this way indirectly access all the WebExtension APIs.

Content scripts cannot directly access normal page scripts but can exchange messages with them using the standard [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API.

Usually, when we talk about content scripts, we are referring to JavaScript, but you can inject CSS into web pages using the same mechanism.

See the [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) article to learn more.

## Web accessible resources

Web accessible resources are resources—such as images, HTML, CSS, and JavaScript—that you include in the extension and want to make accessible to content scripts and page scripts. Resources which are made web-accessible can be referenced by page scripts and content scripts using a special URI scheme.

For example, if a content script wants to insert some images into web pages, you could include them in the extension and make them web accessible. Then the content script could create and append [`img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tags which reference the images via the `src` attribute.

To learn more, see the documentation for the [`"web_accessible_resources"`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/web_accessible_resources) `manifest.json` key.
