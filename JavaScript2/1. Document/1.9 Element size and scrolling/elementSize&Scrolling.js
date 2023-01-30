/* Element size and scrolling
There are many JavaScript properties that allow us to read information about element width, height and other geometry features.

We often need them when moving or positioning elements in JavaScript. */

/* Summary
Elements have the following geometry properties:

offsetParent – is the nearest positioned ancestor or td, th, table, body.
offsetLeft/offsetTop – coordinates relative to the upper-left edge of offsetParent.
offsetWidth/offsetHeight – “outer” width/height of an element including borders.
clientLeft/clientTop – the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too.
clientWidth/clientHeight – the width/height of the content including paddings, but without the scrollbar.
scrollWidth/scrollHeight – the width/height of the content, just like clientWidth/clientHeight, but also include scrolled-out, invisible part of the element.
scrollLeft/scrollTop – width/height of the scrolled out upper part of the element, starting from its upper-left corner.
All properties are read-only except scrollLeft/scrollTop that make the browser scroll the element if changed. */