# Animated circle

Create a function `showCircle(cx, cy, radius)` that shows an animated growing circle.

- `cx,cy` are window-relative coordinates of the center of the circle,
- `radius` is the radius of the circle.

The source document has an example of a circle with right styles, so the task is precisely to do the animation right.

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

      width: 200px;
      height: 200px;
      top: 150px;
      left: 150px;
    }
  </style>
</head>

<body>

  <div class="circle"></div>

</body>
</html>
```

---

