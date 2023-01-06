/* Arrow Functions revisited */
/* Summary
 - Do not have this
 - Do not have arguments
 - Can't be called with new
 - They also don't have super (see: Class inheritance)

That’s because they are meant for short pieces of code that do not have their 
own “context”, but rather work in the current one. And they really shine in 
that use case.
*/

/* Let’s revisit arrow functions.

Arrow functions are not just a “shorthand” for writing small stuff. 
They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function 
that’s executed somewhere else.

For instance:

arr.forEach(func) – func is executed by forEach for every array item.
setTimeout(func) – func is executed by the built-in scheduler.
…there are more.
It’s in the very spirit of JavaScript to create a function and pass it 
somewhere.

And in such functions we usually don’t want to leave the current context. 
That’s where arrow functions come in handy. */


/* Arrow Functions have no "this" */
/* Let’s revisit arrow functions.

Arrow functions are not just a “shorthand” for writing small stuff. 
They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that’s
 executed somewhere else.

For instance:
  - arr.forEach(func) – func is executed by forEach for every array item.
  - setTimeout(func) – func is executed by the built-in scheduler.

It’s in the very spirit of JavaScript to create a function and pass it somewhere.

And in such functions we usually don’t want to leave the current context. 
That’s where arrow functions come in handy. */