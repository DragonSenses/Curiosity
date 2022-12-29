/* The old "var" */
/* Summary 
There are two main differences of var compared to let/const:
  1. var variables have no block scope, their visibility is scoped to current 
  function, or global, if declared outside function. 
  2. var declarations are processed at function start (script start for globals).
  
These differences make var worse than let most of the time. 
Block-level variables is such a great thing. That’s why let was introduced in 
the standard long ago, and is now a major way (along with const) to declare 
a variable. */

