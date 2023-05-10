# Animate the flying plane (CSS)

Modify the solution of the previous task to make the plane grow more than its original size 400x240px (jump out), and then return to that size.

Take the solution of the previous task as the source.

---

Source:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <style>
    img {
      cursor: pointer;
    }
  </style>
  <style>
    #flyjet {
      width: 40px;
      height: 24px;
      transition: all 3s;
    }

    #flyjet.growing {
      width: 400px;
      height: 240px;
    }
  </style>
</head>

<body>

  <img id="flyjet" src="https://en.js.cx/clipart/flyjet.jpg">

  <script>
    let ended = false; // will change to true after the animation finishes

    flyjet.onclick = function() {

      flyjet.addEventListener('transitionend', function() {
        if (!ended) { // check to show the message only once
          ended = true;
          alert('Done!');
        }
      });

      flyjet.classList.add('growing');
    }
  </script>

</body>

</html>
```

---

## **Answer**: see `animate-logo-bezier-solution.html`

We need to choose the right Bezier curve for that animation. It should have `y>1` somewhere for the plane to "jump out".

For instance, we can take both control points with `y>1`, like: `cubic-bezier(0.25, 1.5, 0.75, 1.5)`.

The graph:

![](bezier-up.svg)