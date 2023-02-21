# Hide messages with delegation

There's a list of messages with removal buttons `[x]`. Make the buttons work.

P.S. Should be only one event listener on the container, use event delegation.

```html
<!DOCTYPE HTML>
<html>

<head>
  <link rel="stylesheet" href="messages.css">
  <meta charset="utf-8">
</head>

<body>

  <div id="container">
    <div class="pane">
      <h3>Horse</h3>
      <p>The horse is one of two extant subspecies of Equus ferus. It is an odd-toed ungulate mammal belonging to the taxonomic family Equidae. The horse has evolved over the past 45 to 55 million years from a small multi-toed creature, Eohippus, into the large, single-toed animal of today.</p>
      <button class="remove-button">[x]</button>
    </div>
    <div class="pane">
      <h3>Donkey</h3>
      <p>The donkey or ass (Equus africanus asinus) is a domesticated member of the horse family, Equidae. The wild ancestor of the donkey is the African wild ass, E. africanus. The donkey has been used as a working animal for at least 5000 years.</p>
      <button class="remove-button">[x]</button>
    </div>
    <div class="pane">
      <h3>Cat</h3>
      <p>The domestic cat (Latin: Felis catus) is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines. Cats are often valued by humans for companionship and for their ability to hunt vermin.
      </p>
      <button class="remove-button">[x]</button>
    </div>
  </div>

  <script>
    // ...your code...
  </script>

</body>
</html>
```

### Answer

See `messages.html` for solution.


---

# Tree menu

Create a tree that shows/hides node children on click.

Requirements:

- Only one event handler (use delegation)
- A click outside the node title (on an empty space) should not do anything.

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

  <ul class="tree" id="tree">
    <li>Animals
      <ul>
        <li>Mammals
          <ul>
            <li>Cows</li>
            <li>Donkeys</li>
            <li>Dogs</li>
            <li>Tigers</li>
          </ul>
        </li>
        <li>Other
          <ul>
            <li>Snakes</li>
            <li>Birds</li>
            <li>Lizards</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Fishes
      <ul>
        <li>Aquarium
          <ul>
            <li>Guppy</li>
            <li>Angelfish</li>
          </ul>
        </li>
        <li>Sea
          <ul>
            <li>Sea trout</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

</body>
</html>
```

### Answer

The solution has two parts.

1. Wrap every tree node title into `<span>`. Then we can CSS-style them on `:hover` and handle clicks exactly on text, because `<span>` width is exactly the text width (unlike without it).
2. Set a handler to the `tree` root node and handle clicks on that `<span>` titles.

See `tree.html`

---

# Sortable table

Make the table sortable: clicks on `<th>` elements should sort it by corresponding column.

Each `<th>` has the type in the attribute, like this:

```html
<table id="grid">
  <thead>
    <tr>
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

In the example above the first column has numbers, and the second one -- strings. The sorting function should handle sort according to the type.

Only `"string"` and `"number"` types should be supported.


P.S. The table can be big, with any number of rows and columns.

### Answer: see `sortableTable.html`

---

