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