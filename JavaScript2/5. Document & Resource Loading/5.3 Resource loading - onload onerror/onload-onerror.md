# Resource loading: onload and onerror

The browser allows us to track the loading of external resources -- scripts, iframes, pictures and so on.

There are two events for it:

- `onload` -- successful load,
- `onerror` -- an error occurred.

---

## Summary

Images `<img>`, external styles, scripts and other resources provide `load` and `error` events to track their loading:

- `load` triggers on a successful load,
- `error` triggers on a failed load.

The only exception is `<iframe>`: for historical reasons it always triggers `load`, for any load completion, even if the page is not found.

The `readystatechange` event also works for resources, but is rarely used, because `load/error` events are simpler.

---

## Loading a script

Let's say we need to load a third-party script and call a function that resides there.

We can load it dynamically, like this:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...But how to run the function that is declared inside that script? We need to wait until the script loads, and only then we can call it.

---

### Please Note:

For our own scripts we could use JavaScript modules (see JavaScript modules) here, but they are not widely adopted by third-party libraries.

---



