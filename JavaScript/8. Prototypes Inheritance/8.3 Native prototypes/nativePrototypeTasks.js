/* Add method "f.defer(ms)" to functions */
/* Add to the prototype of all functions the method defer(ms), that runs 
the function after ms milliseconds.

After you do it, such code should work: 

function f() {
  console.log("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 second

*/

/* Answer */
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  console.log("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 sec




/* Add the decorating "defer()" to functions */
/* Add to the prototype of all functions the method defer(ms), that returns a 
wrapper, delaying the call by ms milliseconds.

Here’s an example of how it should work: 

function sum(a, b) {
  console.log( a + b );
}

sum.defer(1000)(1, 2); // shows 3 after 1 second

*/

/* Please note that the arguments should be passed to the original function. */
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

// check it
function sum(a, b) {
  console.log( a + b );
}

sum.defer(1000)(1, 2); // shows 3 after 1 second



/* Polyfill */
if (!String.prototype.repeat) { // if there's no such method
  // add it to the prototype

  String.prototype.repeat = function(n) {
    // repeat the string n times
    return new Array(n + 1).join(this);
  };
}
/* new Array(n + 1).join(this) 
Uses the string "this" as the delimiter between n+1 empty elements,
repeating "this" string n times. 

If "La" is the string that calls repeat, there will be n+1 empty elements in the
new Array, while this="La" will be used as the delimiter between them. */

console.log( "La".repeat(3) ); // LaLaLa