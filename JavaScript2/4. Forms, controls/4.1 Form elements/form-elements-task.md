# Add an option to select

There's a `<select>`:

```html
<select id="genres">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>
```

Use JavaScript to:

1. Show the value and the text of the selected option.
2. Add an option: `<option value="classic">Classic</option>`.
3. Make it selected.

Note, if you've done everything right, your alert should show `blues`.

---

## Answer:

The solution, step by step:

```html run
<select id="genres">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>

<script>
  // 1)
  let selectedOption = genres.options[genres.selectedIndex];
  alert( selectedOption.value );

  // 2)
  let newOption = new Option("Classic", "classic");
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```