/* Recursion */
/* Summary 
Terms:

Recursion is a programming term that means calling a function from itself. 
Recursive functions can be used to solve tasks in elegant ways.

When a function calls itself, that’s called a recursion step. 
The basis of recursion is function arguments that make the task so simple that 
the function does not make further calls.

A recursively-defined data structure is a data structure that can be defined using itself.

For instance, the linked list can be defined as a data structure consisting of 
an object referencing a list (or null).

list = { value, next -> list }

Trees like HTML elements tree are also naturally recursive: they have branches 
and every branch can have other branches.

Recursive functions can be used to walk them.

Any recursive function can be rewritten into an iterative one. 
And that’s sometimes required to optimize stuff. 
But for many tasks a recursive solution is fast enough and easier to write and support.
*/