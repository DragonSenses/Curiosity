# What's the scroll from the bottom?

The `elem.scrollTop` property is the size of the scrolled out part from the top. How to get the size of the bottom scroll (let's call it `scrollBottom`)?

Write the code that works for an arbitrary `elem`.

P.S. Please check your code: if there's no scroll or the element is fully scrolled down, then it should return `0`.

---

# What is the scrollbar width?

Write the code that returns the width of a standard scrollbar.

For Windows it usually varies between `12px` and `20px`. If the browser doesn't reserve any space for it (the scrollbar is half-translucent over the text, also happens), then it may be `0px`.

P.S. The code should work for any HTML document, do not depend on its content.

---

# Place the ball in the field center

Here's how the source document looks:

What are coordinates of the field center?

Calculate them and use to place the ball into the center of the green field:

- The element should be moved by JavaScript, not CSS.
- The code should work with any ball size (`10`, `20`, `30` pixels) and any field size, not be bound to the given values.

P.S. Sure, centering could be done with CSS, but here we want exactly JavaScript. Further we'll meet other topics and more complex situations when JavaScript must be used. Here we do a "warm-up".

---

# The difference: CSS width versus clientWidth

What's the difference between `getComputedStyle(elem).width` and `elem.clientWidth`?

Give at least 3 differences. The more the better.