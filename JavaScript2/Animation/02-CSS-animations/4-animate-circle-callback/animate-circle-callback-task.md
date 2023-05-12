# Animated circle with callback

In the task `animate-circle` an animated growing circle is shown.

Now let's say we need not just a circle, but to show a message inside it. The message should appear *after* the animation is complete (the circle is fully grown), otherwise it would look ugly.

In the solution of the task, the function `showCircle(cx, cy, radius)` draws the circle, but gives no way to track when it's ready.

Add a callback argument: `showCircle(cx, cy, radius, callback)` to be called when the animation is complete. The `callback` should receive the circle `<div>` as an argument.

Here's the example:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Take the solution of the task `animate-circle-solution.html` as the base. Here's the code:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <style>
    .circle {
      transition-property: width, height;
      transition-duration: 2s;
      position: fixed;
      transform: translateX(-50%) translateY(-50%);
      background-color: red;
      border-radius: 50%;
    }
  </style>
</head>

<body>

  <button onclick="showCircle(150, 150, 100)">showCircle(150, 150, 100)</button>

  <script>
  function showCircle(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';
    }, 0);
  }
  </script>


</body>
</html>
```

## **Answer:** see `animate-circle-callback.html`

Here is the code snippet we add:

```js
  function go() {
    showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });
  }

  function showCircle(cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        callback(div);
      });
    }, 0);
  }
```

The styles:
```css
.message-ball {
  font-size: 20px;
  line-height: 200px;
  text-align: center;
}

.circle {
  transition-property: width, height;
  transition-duration: 2s;
  position: fixed;
  transform: translateX(-50%) translateY(-50%);
  background-color: red;
  border-radius: 50%;
}
```