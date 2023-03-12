# **Summary: *Boxes***

- CSS treats each HTML element as if it has its own box.

- You can use CSS to control the dimensions of a box.

- You can also control the borders, margin and padding for each box with CSS

- It is possible to hide elements using the display and visibility properties

- Block-level boxes can be made into inline boxes, and inline boxes made into block-level boxes

- Legibility can me improved by controlling the width of boxes containing text and the leading

- CSS3 has introduced the ability to create image borders and rounded borders

---

## Border, Margin, & Padding

Every box has 3 available properties that can be adjusted to control its appearance:

1. Border

  - Every box has a border (even if it is not visible or is specified to be 0 pixels wide). The border separates the edge of one box from another

2. Margin
  - Margins sit outside the edge of the border. You can set the width of a margin to create a gap between the borders of two adjacent boxes.

3. Padding 
  - Padding is the space between the border of a box and any content contained within it. Adding padding can increase the readability of its contents.

Note: If you specify a width for a box, then the borders, margin, and padding are added to its width and height.

---

## White Space & Vertical Margin

- The `padding` and `margin` properties are very helpful in adding space between various items on the page.
- Designers refer to the space between items on a page as **white space**. Imagine you had a border around a box. You would not want the text to touch this border or it would become harder to read.
- Or, imagine you had two boxes sitting side by side (each with a black border). You would not necessarily want the boxes to touch edges as this would make the line look twice as thick on the facing sides.
- If the bottom margin of any box touches the top margin of another, the browser will render it differently than you might expect. **It will only show the larger of the two margins.** If both margins are the same size, it will only show one.