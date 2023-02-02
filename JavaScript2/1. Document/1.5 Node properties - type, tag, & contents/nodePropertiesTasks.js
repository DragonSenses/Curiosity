/* What's in the nodeType? */
/* What does the script show?

<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>


*/


/* Tag in comment */
/* What does this code show? 

<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // what's here?
</script>

*/


/* Where's the "document" in the hierarchy? */
/* Which class does the document belong to?

What’s its place in the DOM hierarchy?

Does it inherit from Node or Element, or maybe HTMLElement? */




/* Count descendants */
/* Write the code that for each <li> shows:

  1. What’s the text inside it (without the subtree)
  2. The number of nested <li> – all descendants, including the deeply nested ones. 
*/