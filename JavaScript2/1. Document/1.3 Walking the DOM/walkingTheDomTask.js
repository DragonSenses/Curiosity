/* DOM children */
/* Look at this page: 

<html>
<body>
  <div>Users:</div>
  <ul>
    <li>Luna</li>
    <li>Sora</li>
  </ul>
</body>
</html>

For each of the following, give at least one way of how to access them:

  - The <div> DOM node?
  - The <ul> DOM node?
  - The second <li> (with Sora)?
*/

/* Answer:
- The <div> DOM node:

  document.body.firstElementChild
  // or
  document.body.children[0]
  // or (the first node is space, so we take 2nd)
  document.body.childNodes[1]


- The <ul> DOM node:

  document.body.lastElementChild
  // or
  document.body.children[1]


- The second <li>

  // get <ul>, and then get its last element child

  document.body.children[1].lastElementChild;
  // or
  document.body.lastElementChild.lastElementChild
  
*/

/* The sibling question */
/* If elem – is an arbitrary DOM element node…

  1. Is it true that elem.lastChild.nextSibling is always null?
  2. Is it true that elem.children[0].previousSibling is always null ?
*/

/* Answer:
1. Yes, true. The element elem.lastChild is always the last one, it has no nextSibling.
2. No, wrong, because elem.children[0] is the first child among elements. But 
there may exist non-element nodes before it. So previousSibling may be a text node. 

Please note: for both cases if there are no children, then there will be an error.

If there are no children, elem.lastChild is null, so we can’t access 
elem.lastChild.nextSibling. And the collection elem.children is empty (like an 
empty array []).
*/