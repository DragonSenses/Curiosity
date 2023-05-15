# Animate the ball bouncing to the right

Make the ball bounce to the right. Like this: see `index.html` file.

Write the animation code. The distance to the left is `100px`.

Source Code:

```html
<!DOCTYPE HTML>
<html>
<head>
  <script src="https://js.cx/libs/animate.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="field">
    <img src="https://js.cx/clipart/ball.svg" width="40" height="40" id="ball">
  </div>

  <script>
    function makeEaseOut(timing) {
      return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }

    function bounce(timeFraction) {
      for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }

    ball.onclick = function() {

      let to = field.clientHeight - ball.clientHeight;

      animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw(progress) {
          ball.style.top = to * progress + 'px'
        }
      });

    };
  </script>
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

In the previous task: `tasks/animate-ball` we had only one property to animate. Now we need one more: `elem.style.left`.

The horizontal coordinate changes by another law: it does not "bounce", but gradually increases shifting the ball to the right.

We can write one more `animate` for it.

As the time function we could use `linear`, but something like `makeEaseOut(quad)` looks much better.

The code:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// animate top (bouncing)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// animate left (moving to the right)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```