# Find window coordinates of the field

Below you can see a document with the green "field".

Use JavaScript to find window coordinates of corners pointed by with arrows.

There's a small feature implemented in the document for convenience. A click at any place shows coordinates there.

Your code should use DOM to get window coordinates of:

1. Upper-left, outer corner (that's simple).
2. Bottom-right, outer corner (simple too).
3. Upper-left, inner corner (a bit harder).
4. Bottom-right, inner corner (there are several ways, choose one).

The coordinates that you calculate should be the same as those returned by the mouse click.

P.S. The code should also work if the element has another size or border, not bound to any fixed values.

`index.html`

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="index.css">
  <script>
    document.onclick = function(e) { // shows click coordinates
      coords.innerHTML = e.clientX + ':' + e.clientY;
    };
  </script>
</head>

<body>

  Click anywhere to get window coordinates.
  <br> That's for testing, to check the result you get by JavaScript.
  <br>
  <div id="coords">(click coordinates show up here)</div>


  <div id="field">
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  </div>


  <div class="triangle-right" style="left:-20px;top:-176px">1</div>
  <div class="triangle-right" style="left:-10px;top:-178px">3</div>
  <div class="triangle-right" style="left:190px;top:-40px">4</div>
  <div class="triangle-right" style="left:200px;top:-42px">2</div>


  <script>
    // ...your code...
  </script>

</body>
</html>
```
```css
body {
  padding: 20px 0 0 20px;
  cursor: pointer;
}

#field {
  overflow: hidden;
  width: 200px;
  height: 150px;
  border-top: 10px solid black;
  border-right: 10px solid gray;
  border-bottom: 10px solid gray;
  border-left: 10px solid black;
  background-color: #00FF00;
  font: 10px/1.2 monospace;
}

.triangle-right {
  position: relative;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 20px solid red;
  text-indent: -20px;
  font: 12px/1 monospace;
}
```
---

Answer:


---

# Show a note near the element

Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:
- `"top"` - position `elem` right above `anchor`
- `"right"` - position `elem` immediately at the right of `anchor`
- `"bottom"` - position `elem` right below `anchor`

It's used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a "note" element with given `html` and shows it at the given `position` near the `anchor`.

---

Answer:

---

# Show a note near the element (absolute)

Modify the solution of the [previous task](#show-a-note-near-the-element) so that the note uses `position:absolute` instead of `position:fixed`.

That will prevent its "runaway" from the element when the page scrolls.

Take the solution of that task as a starting point. To test the scroll, add the style `<body style="height: 2000px">`.

---

Answer:

---

# Position the note inside (absolute)

Extend the previous task <info:task/position-at-absolute>: teach the function  `positionAt(anchor, position, elem)` to insert `elem` inside the `anchor`.

New values for `position`:

- `top-out`, `right-out`, `bottom-out` -- work the same as before, they insert the `elem` over/right/under `anchor`.
- `top-in`, `right-in`, `bottom-in` -- insert `elem` inside the `anchor`: stick it to the upper/right/bottom edge.

For instance:

```js
// shows the note above blockquote
positionAt(blockquote, "top-out", note);

// shows the note inside blockquote, at the top
positionAt(blockquote, "top-in", note);
```

---

Answer: