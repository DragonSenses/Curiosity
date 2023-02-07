# createTextNode vs innerHTML vs textContent

We have an empty DOM element `elem` and a string `text`.

Which of these 3 commands will do exactly the same?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`


# Clear the element

Create a function `clear(elem)` that removes everything from the element.

```html run height=60
<ol id="elem">
  <li>Hello</li>
  <li>World</li>
</ol>

<script>
  function clear(elem) { /* your code */ }

  clear(elem); // clears the list
</script>
```

# Why does "aaa" remain?

In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // the table, as it should be

  table.remove();
  // why there's still "aaa" in the document?
</script>
```

# Create a list

Write an interface to create a list from user input.

For every list item:

1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).

All elements should be created dynamically.

If a user types HTML-tags, they should be treated like a text.

# Create a tree from the object

Write a function `createTree` that creates a nested `ul/li` list from the nested object.

For instance:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

The syntax:

```js
let container = document.getElementById('container');
createTree(container, data); // creates the tree in the container
```

Choose one of two ways of solving this task:

1. Create the HTML for the tree and then assign to `container.innerHTML`.
2. Create tree nodes and append with DOM methods.

Would be great if you could do both.

P.S. The tree should not have "extra" elements like empty `<ul></ul>` for the leaves.

# Show descendants in a tree

There's a tree organized as nested `ul/li`.

Write the code that adds to each `<li>` the number of its descendants. Skip leaves (nodes without children).

# Create a calendar

Write a function `createCalendar(elem, year, month)`.

The call should create a calendar for the given year/month and put it inside `elem`.

The calendar should be a table, where a week is `<tr>`, and a day is `<td>`. The table top should be `<th>` with weekday names: the first day should be Monday, and so on till Sunday.

For instance, `createCalendar(cal, 2012, 9)` should generate in element `cal` the following calendar:

P.S. For this task it's enough to generate the calendar, should not yet be clickable.

# Colored clock with setInterval

Create a colored clock like here

Use HTML/CSS for the styling, JavaScript only updates time in elements.

# Insert the HTML in the list

Write the code to insert `<li>2</li><li>3</li>` between two `<li>` here:

```html
<ul id="ul">
  <li id="one">1</li>
  <li id="two">4</li>
</ul>
```

# Sort the table

There's a table:

```html run
<table>
<thead>
  <tr>
    <th>Name</th><th>Surname</th><th>Age</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>John</td><td>Smith</td><td>10</td>
  </tr>
  <tr>
    <td>Pete</td><td>Brown</td><td>15</td>
  </tr>
  <tr>
    <td>Ann</td><td>Lee</td><td>5</td>
  </tr>
  <tr>
    <td>...</td><td>...</td><td>...</td>
  </tr>
</tbody>
</table>
```

There may be more rows in it.

Write the code to sort it by the `"name"` column.