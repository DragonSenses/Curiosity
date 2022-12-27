/* Rest parameters and spread syntax */
/* Many JavaScript built-in functions support an arbitrary number of arguments.

For instance:

- Math.max(arg1, arg2, ..., argN) – returns the greatest of the arguments.
- Object.assign(dest, src1, ..., srcN) – copies properties from src1..N into dest.
- …and so on.

In this chapter we'll learn how to do the same. 
And also, how to pass arrays to such functions as parameters.
*/
/* Summary 
When we see "..." in the code, it is either rest parameters or the spread syntax.

There’s an easy way to distinguish between them:

 - When ... is at the end of function parameters, it’s “rest parameters” and 
 gathers the rest of the list of arguments into an array.

 - When ... occurs in a function call or alike, it’s called a “spread syntax” 
 and expands an array into a list.


Use patterns:
 - Rest parameters are used to create functions that accept any number of arguments.
 - The spread syntax is used to pass an array to functions that normally 
 require a list of many arguments.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in 
"old-style" arguments: array-like iterable object.
*/