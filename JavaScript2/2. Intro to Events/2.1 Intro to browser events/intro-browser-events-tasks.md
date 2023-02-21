# Hide on click

Add JavaScript to the `button` to make `<div id="text">` disappear when we click it.


---

### Answer: 

```js
// Here it doesn't matter how we hide the text,
// could also use style.display:
document.getElementById('hider').onclick = function() {
  document.getElementById('text').hidden = true;
}
```

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <input type="button" id="hider" value="Click to hide the text" />

  <div id="text">Text</div>

  <script>
    // Here it doesn't matter how we hide the text,
    // could also use style.display:
    document.getElementById('hider').onclick = function() {
      document.getElementById('text').hidden = true;
    }
  </script>
</body>
</html>
```

---

# Hide self

Create a button that hides itself on click.

Like this:

```html
<input type="button" onclick="this.hidden=true" value="Click to hide">
```

---

### Answer

Can use `this` in the handler to reference “the element itself” here:

```html
<input type="button" onclick="this.hidden=true" value="Click to hide">
```

<input type="button" onclick="this.hidden=true" value="Click to hide">

---

