# Modal form

Create a function `showPrompt(html, callback)` that shows a form with the message `html`, an input field and buttons `OK/CANCEL`.

- A user should type something into a text field and press `key:Enter` or the OK button, then `callback(value)` is called with the value they entered.
- Otherwise if the user presses `key:Esc` or CANCEL, then `callback(null)` is called.

In both cases that ends the input process and removes the form.

Requirements:

- The form should be in the center of the window.
- The form is *modal*. In other words, no interaction with the rest of the page is possible until the user closes it.
- When the form is shown, the focus should be inside the `<input>` for the user.
- Keys `key:Tab`/`key:Shift+Tab` should shift the focus between form fields, don't allow it to leave for other page elements.

Usage example:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

P.S. The source document has HTML/CSS for the form with fixed positioning, but it's up to you to make it modal.

Source Code

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>

<body>


  <div id="prompt-form-container">
    <form id="prompt-form">
      <div id="prompt-message">Enter something...
        <br>Please..</div>
      <input name="text" type="text">
      <input type="submit" value="Ok">
      <input type="button" name="cancel" value="Cancel">
    </form>
  </div>


</body>

</html>
```

```css
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#prompt-form {
  display: inline-block;
  padding: 5px 5px 5px 70px;
  width: 200px;
  border: 1px solid black;
  background: white url(https://en.js.cx/clipart/prompt.png) no-repeat left 5px;
  vertical-align: middle;
}

#prompt-form-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  text-align: center;
}

#prompt-form-container:before {
  display: inline-block;
  height: 100%;
  content: '';
  vertical-align: middle;
}

#prompt-form input[name="text"] {
  display: block;
  margin: 5px;
  width: 180px;
}
```

---

## Answer: see `modalForm.html`

A modal window can be implemented using a half-transparent `<div id="cover-div">` that covers the whole window, like this:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Because the `<div>` covers everything, it gets all clicks, not the page below it.

Also we can prevent page scroll by setting `body.style.overflowY='hidden'`.

The form should be not in the `<div>`, but next to it, because we don't want it to have `opacity`.