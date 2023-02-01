/* DOM children */
/* Look at this page: 

<html>
<body>
  <div>Users:</div>
  <ul>
    <li>John</li>
    <li>Pete</li>
  </ul>
</body>
</html>

For each of the following, give at least one way of how to access them:

  - The <div> DOM node?
  - The <ul> DOM node?
  - The second <li> (with Pete)?
*/


/* The sibling question */
/* If elem – is an arbitrary DOM element node…

  - Is it true that elem.lastChild.nextSibling is always null?
  - Is it true that elem.children[0].previousSibling is always null ?
 */


/* Select all diagonal cells */
/* Write the code to paint all diagonal table cells in red.

You’ll need to get all diagonal <td> from the <table> and paint them using the code: */

// td should be the reference to the table cell
// td.style.backgroundColor = 'red';