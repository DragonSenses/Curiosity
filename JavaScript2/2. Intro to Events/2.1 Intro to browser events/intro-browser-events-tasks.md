# Hide on click

Add JavaScript to the `button` to make `<div id="text">` disappear when we click it.


---

### Answer: 

```js
// Here it doesn't matter how we hide the text,
// could also use style.display:
document.getElementById('hider').onclick = function() {
  document.getElementById('text').hidden = true;
}
```

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <input type="button" id="hider" value="Click to hide the text" />

  <div id="text">Text</div>

  <script>
    // Here it doesn't matter how we hide the text,
    // could also use style.display:
    document.getElementById('hider').onclick = function() {
      document.getElementById('text').hidden = true;
    }
  </script>
</body>
</html>
```

---

# Hide self

Create a button that hides itself on click.

Like this:

```html
<input type="button" onclick="this.hidden=true" value="Click to hide">
```

---

### Answer

Can use `this` in the handler to reference “the element itself” here:

```html
<input type="button" onclick="this.hidden=true" value="Click to hide">
```

<input type="button" onclick="this.hidden=true" value="Click to hide">

---

# Which handlers run?

There's a button in the variable. There are no handlers on it.

Which handlers run on click after the following code? Which alerts show up?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```

---

### Answer

The answer: `1` and `2`.

The first handler triggers, because it's not removed by `removeEventListener`. To remove the handler we need to pass exactly the function that was assigned. And in the code a new function is passed, that looks the same, but is still another function.

To remove a function object, we need to store a reference to it, like this:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

The handler `button.onclick` works independently and in addition to `addEventListener`.

---

# Move the ball across the field

Move the ball across the field to a click. 

Requirements:

- The ball center should come exactly under the pointer on click (if possible without crossing the field edge).
- CSS-animation is welcome.
- The ball must not cross field boundaries.
- When the page is scrolled, nothing should break.

Notes:

- The code should also work with different ball and field sizes, not be bound to any fixed values.
- Use properties `event.clientX/event.clientY` for click coordinates.

### Answer

First we need to choose a method of positioning the ball.

We can't use `position:fixed` for it, because scrolling the page would move the ball from the field.

So we should use `position:absolute` and, to make the positioning really solid, make `field` itself positioned.

Then the ball will be positioned relatively to the field:

```css
#field {
  width: 200px;
  height: 150px;
  position: relative;
}

#ball {
  position: absolute;
  left: 0; /* relative to the closest positioned ancestor (field) */
  top: 0;
  transition: 1s all; /* CSS animation for left/top makes the ball fly */
}
```

Next we need to assign the correct `ball.style.left/top`. They contain field-relative coordinates now.

Here's the picture:

![](move-ball-coords.svg)

We have `event.clientX/clientY` -- window-relative coordinates of the click.

To get field-relative `left` coordinate of the click, we can substract the field left edge and the border width:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft;
```

Normally, `ball.style.left` means the "left edge of the element" (the ball). So if we assign that `left`, then the ball edge, not center, would be under the mouse cursor.

We need to move the ball half-width left and half-height up to make it center.

So the final `left` would be:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;
```

The vertical coordinate is calculated using the same logic.

Please note that the ball width/height must be known at the time we access `ball.offsetWidth`. Should be specified in HTML or CSS.

---

# Create a sliding menu

Create a menu that opens/collapses on click:

P.S. HTML/CSS of the source document is to be modified.

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

  ▶ ▼ Sweeties (click me)!
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>

</body>
</html>
```

### Anwser:  HTML/CSS


## HTML/CSS
First let's create HTML/CSS.

A menu is a standalone graphical component on the page, so it's better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.

Here's the example structure:

```html
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
```

We use `<span>` for the title, because `<div>` has an implicit `display:block` on it, and it will occupy 100% of the horizontal width.

Like this:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

So if we set `onclick` on it, then it will catch clicks to the right of the text.

As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```

# Toggling the menu

Toggling the menu should change the arrow and show/hide the menu list.

All these changes are perfectly handled by CSS. In JavaScript we should label the current state of the menu by adding/removing the class `.open`.

Without it, the menu will be closed:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...And with `.open` the arrow changes and the list shows up:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```

---

# Add a closing button

There's a list of messages.

Use JavaScript to add a closing button to the right-upper corner of each message.

### Answer


To add the button we can use either `position:absolute` (and make the pane `position:relative`) or `float:right`. The `float:right` has the benefit that the button never overlaps the text, but `position:absolute` gives more freedom. So the choice is yours.

Then for each pane the code can be like:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Then the `<button>` becomes `pane.firstChild`, so we can add a handler to it like this:

```js
pane.firstChild.onclick = () => pane.remove();
```

---

# Carousel

Create a "carousel" -- a ribbon of images that can be scrolled by clicking on arrows.

Later we can add more features to it: infinite scrolling, dynamic loading etc.

P.S. For this task HTML/CSS structure is actually 90% of the solution.

```html
<!DOCTYPE html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <!-- create your markup and styles -->

  <button class="arrow">⇦</button>
  <button class="arrow">⇨</button>


  <ul>
    <li><img src="https://en.js.cx/carousel/1.png"></li>
    <li><img src="https://en.js.cx/carousel/2.png"></li>
    <li><img src="https://en.js.cx/carousel/3.png"></li>
    <li><img src="https://en.js.cx/carousel/4.png"></li>
    <li><img src="https://en.js.cx/carousel/5.png"></li>
    <li><img src="https://en.js.cx/carousel/6.png"></li>
    <li><img src="https://en.js.cx/carousel/7.png"></li>
    <li><img src="https://en.js.cx/carousel/8.png"></li>
    <li><img src="https://en.js.cx/carousel/9.png"></li>
    <li><img src="https://en.js.cx/carousel/10.png"></li>
  </ul>


  <script>
    // label the images to visually track them, just for convenience,
    // this code can be removed
    let i = 1;
    for(let li of carousel.querySelectorAll('li')) {
      li.style.position = 'relative';
      li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
      i++;
    }

    // ...your code to make carousel alive!
  </script>

</body>
</html>
```

### Answer

The images ribbon can be represented as `ul/li` list of images `<img>`.

Normally, such a ribbon is wide, but we put a fixed-size `<div>` around to "cut" it, so that only a part of the ribbon is visible:

![](carousel1.svg)

To make the list show horizontally we need to apply correct CSS properties for `<li>`, like `display: inline-block`.

For `<img>` we should also adjust `display`, because by default it's `inline`. There's extra space reserved under `inline` elements for "letter tails", so we can use `display:block` to remove it.

To do the scrolling, we can shift `<ul>`. There are many ways to do it, for instance by changing `margin-left` or (better performance) use `transform: translateX()`:

![](carousel2.svg)

The outer `<div>` has a fixed width, so "extra" images are cut.

The whole carousel is a self-contained "graphical component" on the page, so we'd better wrap it into a single `<div class="carousel">` and style things inside it.

See `carousel.html` for solution.