# Endless page

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Please note two important features of the scroll:

1. **The scroll is "elastic".** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically "bounces back" to normal).
2. **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, "scrolling to the end" should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show "more messages" or "more goods". 

---

## Answer: see `endlessPage.html`

The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we're at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: "How do we detect that the page is scrolled to bottom?"

Let's use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
document.documentElement.getBoundingClientRect().top = 0

// window-relative bottom = 2000
// the document is long, so that is probably far beyond the window bottom
document.documentElement.getBoundingClientRect().bottom = 2000
```

If we scroll `500px` below, then:

```js
// document top is above the window 500px
document.documentElement.getBoundingClientRect().top = -500
// document bottom is 500px closer
document.documentElement.getBoundingClientRect().bottom = 1500
```

When we scroll till the end, assuming that the window height is `600px`:


```js
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here's the function:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```

---

# Up/down button

Create a "to the top" button to help with page scrolling.

It should work like this:
- While the page is not scrolled down at least for the window height -- it's invisible.
- When the page is scrolled down more than the window height -- there appears an "upwards" arrow in the left-top corner. If the page is scrolled back, it disappears.
- When the arrow is clicked, the page scrolls to the top.

Like this (top-left corner, scroll to see):

---

## Answer: see `toTheTop.html`

The script: 

```js
    arrowTop.onclick = function() {
      window.scrollTo(pageXOffset, 0);
      // after scrollTo, there will be a "scroll" event, so the arrow will hide automatically
    };

    window.addEventListener('scroll', function() {
      arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
    });
```

---

# Load visible images

Let's say we have a slow-speed client and want to save their mobile traffic.

For that purpose we decide not to show images immediately, but rather replace them with placeholders, like this:

```html
<img src="placeholder.svg" width="128" height="128" data-src="real.jpg">
```

So, initially all images are `placeholder.svg`. When the page scrolls to the position where the user can see the image -- we change `src` to the one in `data-src`, and so the image loads.

Scroll it to see images load "on-demand".

Requirements:
- When the page loads, those images that are on-screen should load immediately, prior to any scrolling.
- Some images may be regular, without `data-src`. The code should not touch them.
- Once an image is loaded, it should not reload any more when scrolled in/out.

P.S. If you can, make a more advanced solution that would "preload" images that are one page below/after the current position.

P.P.S. Only vertical scroll is to be handled, no horizontal scrolling.

---

## Answer: see `loadVisibleImages.html`

The `onscroll` handler should check which images are visible and show them.

We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:

```js
// ...the page content is above...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // top elem edge is visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

showVisible();
window.onscroll = showVisible;
```

P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.