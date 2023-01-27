/* Currying */
/* Summary 

Currying is a transform that makes f(a,b,c) callable as f(a)(b)(c). 

JavaScript implementations usually both keep the function callable normally 
and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we’ve seen in the logging 
example, after currying the three argument universal function 
log(date, importance, message) gives us partials when called with one 
argument (like log(date)) or two arguments (like log(date, importance)).
*/

/* Currying is an advanced technique of working with functions. 
It’s used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function 
from callable as f(a, b, c) into callable as f(a)(b)(c).

Currying doesn’t call a function. It just transforms it. */

/* Let’s see an example first, to better understand what we’re talking about, 
and then practical applications.

We’ll create a helper function curry(f) that performs currying for a 
two-argument f. In other words, curry(f) for two-argument f(a, b) translates 
it into a function that runs as f(a)(b): */
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3

/* As you can see, the implementation is straightforward: it’s just two wrappers. 

  - The result of curry(func) is a wrapper function(a).
  - When it is called like curriedSum(1), the argument is saved in the Lexical 
  Environment, and a new wrapper is returned function(b).
  - Then this wrapper is called with 2 as an argument, and it passes the call 
  to the original sum.
  
More advanced implementations of currying, such as _.curry from lodash library, 
return a wrapper that allows a function to be called both normally and partially:

function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially

*/


/* Currying? What for? */
/* To understand the benefits we need a worthy real-life example.

For instance, we have the logging function log(date, importance, message) that 
formats and outputs the information. In real projects such functions have many 
useful features like sending logs over the network, here we’ll just use alert: */
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

/* Let’s curry it! */
// eslint-disable-next-line no-func-assign, no-undef
log = _.curry(log);

/* After that log works normally: */
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)

/* …But also works in the curried form: */
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)


/* Now we can easily make a convenience function for current logs: */
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message

/* Now logNow is log with fixed first argument, in other words “partially 
applied function” or “partial” for short.

We can go further and make a convenience function for current debug logs: */
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

/* So: 
  1. We didn’t lose anything after currying: log is still callable normally.
  2. We can easily generate partial functions such as for today’s logs. */