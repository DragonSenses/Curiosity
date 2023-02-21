# Selectable list

Create a list where elements are selectable, like in file-managers.

- A click on a list element selects only that element (adds the class `.selected`), deselects all others.
- If a click is made with `key:Ctrl` (`key:Cmd` for Mac), then the selection is toggled on the element, but other elements are not modified.

P.S. For this task we can assume that list items are text-only. No nested tags.

P.P.S. Prevent the native browser selection of the text on clicks.


```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <style>
    .selected {
      background: #0f0;
    }

    li {
      cursor: pointer;
    }
  </style>
</head>

<body>

  Click on a list item to select it.
  <br>

  <ul id="ul">
    <li>Christopher Robin</li>
    <li>Winnie-the-Pooh</li>
    <li>Tigger</li>
    <li>Kanga</li>
    <li>Rabbit. Just rabbit.</li>
  </ul>

  <script>
    // ...your code...
  </script>

</body>
</html>
```

---

### Answer see `selectableList.html`