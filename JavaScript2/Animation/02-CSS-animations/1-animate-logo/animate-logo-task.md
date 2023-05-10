# Animate a logo (CSS)

Show the animation like on the picture

- The picture grows on click from `40x24px` to `400x240px` (10 times larger).
- The animation takes 3 seconds.
- At the end output: "Done!".
- During the animation process, there may be more clicks on the plane. They shouldn't "break" anything.

---

Sample code:

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
      /* -> 400px */

      height: 24px;
      /* -> 240px */
    }
  </style>
</head>

<body>

  <img id="flyjet" src="https://en.js.cx/clipart/flyjet.jpg">


</body>

</html>
```

---

## **Answer:** see `animate-logo-solution.html`

CSS to animate both `width` and `height`:
```css
/* original class */

#flyjet {
  transition: all 3s;
}

/* JS adds .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Please note that `transitionend` triggers two times -- once for every property. So if we don't perform an additional check then the message would show up 2 times.
