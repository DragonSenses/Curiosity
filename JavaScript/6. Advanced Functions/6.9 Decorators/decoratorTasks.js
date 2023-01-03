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

function spy() {

  return function () {

  };

}
