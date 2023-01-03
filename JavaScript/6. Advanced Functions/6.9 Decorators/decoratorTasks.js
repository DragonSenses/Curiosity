"use strict";
/* Spy decorator */
/* Create a decorator spy(func) that should return a wrapper that saves all 
calls to function in its calls property.

Every call is saved as an array of arguments.

For instance: */
function work(a, b) {
  console.log(a + b); // work is an arbitrary function or method
}

// eslint-disable-next-line no-func-assign
work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

/* P.S. That decorator is sometimes useful for unit-testing. 
Its advanced form is sinon.spy in Sinon.JS library. */

/**
 * Decorator with a wrapper, returned by spy(f), that stores all arguments and
 * then use f.apply to forward the call.
 * @param {function} func the function to decorate
 * @returns a wrapper that saves all calls to function in its calls property
 */
function spy(func) {

  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args); 
  }

  wrapper.calls = [];

  return wrapper;
}


/* Delaying Decorator */
/* Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.

In other words, delay(f, ms) returns a "delayed by ms" variant of f.

In the code above, f is a function of a single argument, but your solution should 
pass all arguments and the context this.

For instance: */
function f(x) {
  console.log(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms


/**
 * Decorator that returns the function delayed by ms
 * @param {function} func function to decorate with a delay
 * @param {number} ms the amount of milliseconds to delay func by
 * @returns returns a function that is "delayed by ms" variant of func
 */
function delay(func, ms){

  return function(){
    setTimeout( () => f.apply(this, arguments), ms);
  };

}

/* Note: How the arrow function is used here. As we know, arrow functions do 
not have own this and arguments, so f.apply(this, arguments) takes this and 
arguments from the wrapper.

If we pass a regular function, setTimeout would call it without arguments and 
this=window (assuming we’re in the browser).

We still can pass the right this by using an intermediate variable, but that’s 
a little bit more cumbersome: */

/**
 * Decorator that returns the function delayed by ms
 * @param {function} func function to decorate with a delay
 * @param {number} ms the amount of milliseconds to delay func by
 * @returns returns a function that is "delayed by ms" variant of func
 */
function delay2(f, ms) {

  return function(...args) {
    let savedThis = this; // store this into an intermediate variable
    setTimeout(function() {
      f.apply(savedThis, args); // use it here
    }, ms);
  };

}

// create wrappers
let f500 = delay2(f, 500);
let f2500 = delay2(f, 2500);

f500("test"); // shows "test" after 500ms
f2500("test"); // shows "test" after 2500ms