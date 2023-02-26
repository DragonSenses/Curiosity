# Editable div

Create a `<div>` that turns into `<textarea>` when clicked.

The textarea allows to edit the HTML in the `<div>`.

When the user presses `key:Enter` or it loses focus, the `<textarea>` turns back into `<div>`, and its content becomes HTML in `<div>`.

---

## Answer: see `editableDiv.html`

```js
  <script>
    let area = null;
    let view = document.getElementById('view');

    view.onclick = function() {
      editStart();
    };

    function editStart() {
      area = document.createElement('textarea');
      area.className = 'edit';
      area.value = view.innerHTML;

      area.onkeydown = function(event) {
        if (event.key == 'Enter') {
          this.blur();
        }
      };

      area.onblur = function() {
        editEnd();
      };

      view.replaceWith(area);
      area.focus();
    }

    function editEnd() {
      view.innerHTML = area.value;
      area.replaceWith(view);
    }
  </script>
```

---

# Edit TD on click

Make table cells editable on click.

- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

---

## Answer:

---

# Keyboard-driven mouse

Focus on the mouse. Then use arrow keys to move it.

P.S. Don't put event handlers anywhere except the `#mouse` element.

P.P.S. Don't modify HTML/CSS, the approach should be generic and work with any element.

---

## Answer:

