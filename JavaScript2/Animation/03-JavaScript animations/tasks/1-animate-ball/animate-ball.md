# Animate the bouncing ball

Make a bouncing ball.

Source Code:

```html
<!DOCTYPE HTML>
<html>

<head>
  <script src="https://en.js.cx/libs/animate.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body>


  <div id="field">
    <img src="https://en.js.cx/clipart/ball.svg" width="40" height="40" id="ball">
  </div>


</body>

</html>
```

```css
#field {
  height: 200px;
  border-bottom: 3px black groove;
  position: relative;
}

#ball {
  position: absolute;
  cursor: pointer;
}
```

---

## **Answer:** see `index.html`

To bounce we can use CSS property `top` and `position:absolute` for the ball inside the field with `position:relative`.

The bottom coordinate of the field is `field.clientHeight`. The CSS `top` property refers to the upper edge of the ball. So it should go from `0` till `field.clientHeight - ball.clientHeight`, that's the final lowest position of the upper edge of the ball.

To get the "bouncing" effect we can use the timing function `bounce` in `easeOut` mode.

Here's the final code for the animation:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```