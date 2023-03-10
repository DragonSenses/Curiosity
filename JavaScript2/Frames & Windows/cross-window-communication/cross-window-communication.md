# Cross Window Communication

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.

---

# Cross-window communication

The "Same Origin" (same site) policy limits access of windows and frames to each other.

The idea is that if a user has two pages open: one from `john-smith.com`, and another one is `gmail.com`, then they wouldn't want a script from `john-smith.com` to read our mail from `gmail.com`. So, the purpose of the "Same Origin" policy is to protect users from information theft.

## Same Origin [#same-origin]

Two URLs are said to have the "same origin" if they have the same protocol, domain and port.

These URLs all share the same origin:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

These ones do not:

- <code>http://<b>www.</b>site.com</code> (another domain: `www.` matters)
- <code>http://<b>site.org</b></code> (another domain: `.org` matters)
- <code><b>https://</b>site.com</code> (another protocol: `https`)
- <code>http://site.com:<b>8080</b></code> (another port: `8080`)

The "Same Origin" policy states that:

- if we have a reference to another window, e.g. a popup created by `window.open` or a window inside `<iframe>`, and that window comes from the same origin, then we have full access to that window.
- otherwise, if it comes from another origin, then we can't access the content of that window: variables, document, anything. The only exception is `location`: we can change it (thus redirecting the user). But we cannot *read* location (so we can't see where the user is now, no information leak).

---

### In action: iframe

An `<iframe>` tag hosts a separate embedded window, with its own separate `document` and `window` objects.

We can access them using properties:

- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that's not so then the access is denied (writing to `location` is an exception, it's still permitted).

For instance, let's try reading and writing to `<iframe>` from another origin:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // we can get the reference to the inner window

    let iframeWindow = iframe.contentWindow; // OK

    try {
      // ...but not to the document inside it

      let doc = iframe.contentDocument; // ERROR

    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object

      let href = iframe.contentWindow.location.href; // ERROR

    } catch(e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!

    iframe.contentWindow.location = '/'; // OK


    iframe.onload = null; // clear the handler, not to run it after the location change
  };
</script>
```

The code above shows errors for any operations except:

- Getting the reference to the inner window `iframe.contentWindow` - that's allowed.
- Writing to `location`.

Contrary to that, if the `<iframe>` has the same origin, we can do anything with it:

```html run
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // just do anything
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

---

### `iframe.onload` vs `iframe.contentWindow.onload`

The `iframe.onload` event (on the `<iframe>` tag) is essentially the same as `iframe.contentWindow.onload` (on the embedded window object). It triggers when the embedded window fully loads with all resources.

...But we can't access `iframe.contentWindow.onload` for an iframe from another origin, so using `iframe.onload`.

---

## Windows on subdomains: document.domain