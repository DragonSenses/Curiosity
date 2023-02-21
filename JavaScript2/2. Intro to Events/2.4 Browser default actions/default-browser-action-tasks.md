# Why "return false" doesn't work?

Why in the code below `return false` doesn't work at all?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>
```

The browser follows the URL on click, but we don't want it.

How to fix?

### Answer

When the browser reads the `on*` attribute like `onclick`, it creates the handler from its content.

For `onclick="handler()"` the function will be:

```js
function(event) {
  handler() // the content of onclick
}
```

Now we can see that the value returned by `handler()` is not used and does not affect the result.

The fix is simple:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="return handler()">w3.org</a>
```

Also we can use `event.preventDefault()`, like this:

```html run
<script>
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
</script>

<a href="https://w3.org" onclick="handler(event)">w3.org</a>
```

---

# Catch links in the element

Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don't then don't follow.

Details:

- HTML inside the element may be loaded or regenerated dynamically at any time, so we can't find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <style>
    #contents {
      padding: 5px;
      border: 1px green solid;
    }
  </style>
</head>

<body>

  <fieldset id="contents">
    <legend>#contents</legend>
    <p>
      How about to read <a href="https://wikipedia.org">Wikipedia</a> or visit <a href="https://w3.org"><i>W3.org</i></a> and learn about modern standards?
    </p>
  </fieldset>

</body>
</html>
```

### Answer: see `catchLinks.html`

That's a great use of the event delegation pattern.

In real life instead of asking we can send a "logging" request to the server that saves the information about where the visitor left. Or we can load the content and show it right in the page (if allowable).

All we need is to catch the `contents.onclick` and use `confirm` to ask the user. A good idea would be to use `link.getAttribute('href')` instead of `link.href` for the URL. See the solution for details.

