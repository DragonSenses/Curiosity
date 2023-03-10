# Popups & Windows

## Summary

Popup windows are used rarely, as there are alternatives: loading and displaying information in-page, or in iframe.

If we're going to open a popup, a good practice is to inform the user about it. An "opening window" icon near a link or button would allow the visitor to survive the focus shift and keep both windows in mind.

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- Browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- Browsers open a new tab by default, but if sizes are provided, then it'll be a popup window.
- The popup may access the opener window using the `window.opener` property.
- The main window and the popup can freely read and modify each other if they have the same origin. Otherwise, they can change location of each other and [exchange messages](info:cross-window-communication).

To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.

- Methods `focus()` and `blur()` allow to focus/unfocus a window. But they don't work all the time.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.

---

# Popups and window methods

A popup window is one of the oldest methods to show additional document to user.

Basically, you just run:
```js
window.open('https://javascript.info/')
```

...And it will open a new window with given URL. Most modern browsers are configured to open url in new tabs instead of separate windows.

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: we can load content dynamically with [fetch](info:fetch) and show it in a dynamically generated `<div>`. So, popups is not something we use everyday.

Also, popups are tricky on mobile devices, that don't show multiple windows simultaneously.

Still, there are tasks where popups are still used, e.g. for OAuth authorization (login with Google/Facebook/...), because:

1. A popup is a separate window which has its own independent JavaScript environment. So opening a popup from a third-party, non-trusted site is safe.
2. It's very easy to open a popup.
3. A popup can navigate (change URL) and send messages to the opener window.

## Popup blocking

In the past, evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.

**Most browsers block popups if they are called outside of user-triggered event handlers like `onclick`.**

For example:
```js
// popup blocked
window.open('https://javascript.info');

// popup allowed
button.onclick = () => {
  window.open('https://javascript.info');
};
```

This way users are somewhat protected from unwanted popups, but the functionality is not disabled totally.

---

## window.open

The syntax to open a popup is: `window.open(url, name, params)`:

url
: An URL to load into the new window.

name
: A name of the new window. Each window has a `window.name`, and here we can specify which window to use for the popup. If there's already a window with such name -- the given URL opens in it, otherwise a new window is opened.

params
: The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: `width=200,height=100`.

Settings for `params`:

- Position:
  - `left/top` (numeric) -- coordinates of the window top-left corner on the screen. There is a limitation: a new window cannot be positioned offscreen.
  - `width/height` (numeric) -- width and height of a new window. There is a limit on minimal width/height, so it's impossible to create an invisible window.
- Window features:
  - `menubar` (yes/no) -- shows or hides the browser menu on the new window.
  - `toolbar` (yes/no) -- shows or hides the browser navigation bar (back, forward, reload etc) on the new window.
  - `location` (yes/no) -- shows or hides the URL field in the new window. FF and IE don't allow to hide it by default.
  - `status` (yes/no) -- shows or hides the status bar. Again, most browsers force it to show.
  - `resizable` (yes/no) -- allows to disable the resize for the new window. Not recommended.
  - `scrollbars` (yes/no) -- allows to disable the scrollbars for the new window. Not recommended.


There is also a number of less supported browser-specific features, which are usually not used. Check <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> for examples.

---

## Example: a minimalistic window

Let's open a window with minimal set of features, just to see which of them browser allows to disable:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Here most "window features" are disabled and window is positioned offscreen. Run it and see what really happens. Most browsers "fix" odd things like zero `width/height` and offscreen `left/top`. For instance, Chrome open such a window with full width/height, so that it occupies the full screen.

Let's add normal positioning options and reasonable `width`, `height`, `left`, `top` coordinates:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Most browsers show the example above as required.

Rules for omitted settings:

- If there is no 3rd argument in the `open` call, or it is empty, then the default window parameters are used.
- If there is a string of params, but some `yes/no` features are omitted, then the omitted features assumed to have `no` value. So if you specify params, make sure you explicitly set all required features to yes.
- If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.
- If there is no `width/height`, then the new window will be the same size as the last opened.

---

## Accessing popup from window

The `open` call returns a reference to the new window. It can be used to manipulate its properties, change location and even more.

In this example, we generate popup content from JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

And here we modify the contents after loading:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Please note: immediately after `window.open`, the new window isn't loaded yet. That's demonstrated by `alert` in line `(*)`. So we wait for `onload` to modify it. We could also use `DOMContentLoaded` handler for `newWin.document`.

---

### Same origin policy

Windows may freely access content of each other only if they come from the same origin (the same protocol://domain:port).

Otherwise, e.g. if the main window is from `site.com`, and the popup from `gmail.com`, that's impossible for user safety reasons. For the details, see chapter **cross-window-communication**.

---

