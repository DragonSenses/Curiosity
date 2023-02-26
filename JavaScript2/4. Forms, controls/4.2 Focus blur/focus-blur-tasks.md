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

See `edit-td-on-click` directory and make `my.css` and `script.js` files.
---

## Answer: See `edit-td-on-click` directory for `my.css` and `script.js` files.

1. On click -- replace `innerHTML` of the cell by `<textarea>` with same sizes and no border. Can use JavaScript or CSS to set the right size.
2. Set `textarea.value` to `td.innerHTML`.
3. Focus on the textarea.
4. Show buttons OK/CANCEL under the cell, handle clicks on them.

---

# Keyboard-driven mouse

Focus on the mouse. Then use arrow keys to move it.

Demo: `keyboardMouse.html`

P.S. Don't put event handlers anywhere except the `#mouse` element.

P.P.S. Don't modify HTML/CSS, the approach should be generic and work with any element.

---

## Answer: see `keyboardMouse.html`

We can use `mouse.onclick` to handle the click and make the mouse "moveable" with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.

The only pitfall is that `keydown` only triggers on elements with focus. So we need to add `tabindex` to the element.  As we're forbidden to change HTML, we can use `mouse.tabIndex` property for that.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.

```js
  <script>
    mouse.tabIndex = 0;

    mouse.onclick = function() {
      this.style.left = this.getBoundingClientRect().left + 'px';
      this.style.top = this.getBoundingClientRect().top + 'px';

      this.style.position = 'fixed';
    };


    mouse.onkeydown = function(e) {
      switch (e.key) {
        case 'ArrowLeft':
          this.style.left = parseInt(this.style.left) - this.offsetWidth + 'px';
          return false;
        case 'ArrowUp':
          this.style.top = parseInt(this.style.top) - this.offsetHeight + 'px';
          return false;
        case 'ArrowRight':
          this.style.left = parseInt(this.style.left) + this.offsetWidth + 'px';
          return false;
        case 'ArrowDown':
          this.style.top = parseInt(this.style.top) + this.offsetHeight + 'px';
          return false;
      }
    };
  </script>
```