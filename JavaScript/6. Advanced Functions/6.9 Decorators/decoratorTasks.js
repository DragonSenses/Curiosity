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