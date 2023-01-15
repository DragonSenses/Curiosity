/* Strange instanceof */
/* In the code below, why does instanceof return true? 
We can easily see that a is not created by B(). */

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

console.log( a instanceof B ); // true


/* Answer:
Recall the syntax:
  obj instanceof Class

instanceof returns true if obj belongs to the Class OR a class inheriting from it.

instanceof does not care about the function, but rather about its prototype, 
that it matches against the prototype chain.

And here a.__proto__ == B.prototype, so instanceof returns true.

So, by the logic of instanceof, the prototype actually defines the type, not 
the constructor function. */