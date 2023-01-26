/* eval - run a code string */
/* Summary 

A call to eval(code) runs the string of code and returns the result of the last statement.

  - Rarely used in modern JavaScript, as there’s usually no need.
  - Can access outer local variables. That’s considered bad practice.
  - Instead, to eval the code in the global scope, use window.eval(code).
  - Or, if your code needs some data from the outer scope, use new Function and
  pass it as arguments.

*/