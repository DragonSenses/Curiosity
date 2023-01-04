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


/* Debounce Decorator */
/* The result of debounce(f, ms) decorator is a wrapper that suspends calls to 
f until there’s ms milliseconds of inactivity (no calls, “cooldown period”), 
then invokes f once with the latest arguments.

In other words, debounce is like a secretary that accepts “phone calls”, and 
waits until there’s ms milliseconds of being quiet. And only then it transfers 
the latest call information to “the boss” (calls the actual f).

For instance, we had a function f and replaced it with f = debounce(f, 1000).

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there 
are no calls, then the actual f will be only called once, at 1500ms. That is: 
after the cooldown period of 1000ms from the last call. 

Diagram:                            After 1000ms
                                         c
                        <-----1000ms----->
  ------|------|--------|----------------|-------->
        0     200ms   500ms            1500ms    time
calls: f(a)   f(b)    f(c)

…And it will get the arguments of the very last call, other calls are ignored.

Here’s the code for it (uses the debounce decorator from the Lodash library):
let f = _.debounce(console.log, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: console.log("c")
*/

/* Practical Example: 
Let’s say, the user types something, and we’d like to send a request to the 
server when the input is finished.

There’s no point in sending the request for every character typed. Instead 
we’d like to wait, and then process the whole result.

In a web-browser, we can setup an event handler – a function that’s called on 
every change of an input field.
Normally, an event handler is called very often, for every typed key. But if 
we debounce it by 1000ms, then it will be only called once, after 1000ms 
after the last input.

debounce is a great way to process a sequence of events: be it a sequence of 
key presses, mouse movements or something else.

It waits the given time after the last call, and then runs its function, 
that can process the result.

The task is to implement debounce decorator.
*/

/* 
function f(x) {
  console.log(x);
} 
*/

/**
 * A decorator that returns a wrapper that suspends calls to f until there’s 
 * ms milliseconds of inactivity (no calls, “cooldown period”), then invokes 
 * f once with the latest arguments.
 * @param {function} func function to decorate
 * @param {number} ms cooldown period, how many milliseconds of inactivity
 */
function debounce(func, ms){
  let timeout;
  return function(){
    clearTimeout(timeout);
    timeout = setTimeout( () => func.apply(this, arguments), ms);
  };
}

/* A call to debounce returns a wrapper. When called, it schedules the original 
function call after given ms and cancels the previous such timeout. */

let wrapped = debounce(f, 1000);
wrapped("1"); // 1 after 1 second


/* Throttle Decorator */
/* Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.

When it’s called multiple times, it passes the call to f at maximum once per ms milliseconds.

Compared to the debounce decorator, the behavior is completely different:
  - debounce runs the function once after the “cooldown” period. 
    * Good for processing the final result.
  - throttle runs it not more often than given ms time. 
    * Good for regular updates that shouldn’t be very often. 
   
In other words, throttle is like a secretary that accepts phone calls, but 
bothers the boss (calls the actual f) not more often than once per ms milliseconds.

Let’s check the real-life application to better understand that requirement 
and to see where it comes from.

For instance, we want to track mouse movements.

In a browser we can setup a function to run at every mouse movement and get the 
pointer location as it moves. During an active mouse usage, this function 
usually runs very frequently, can be something like 100 times per second (every
10 ms). We’d like to update some information on the web-page when the pointer moves.

…But updating function update() is too heavy to do it on every micro-movement. 
There is also no sense in updating more often than once per 100ms.

So we’ll wrap it into the decorator: use throttle(update, 100) as the function
to run on each mouse move instead of the original update(). The decorator will 
be called often, but forward the call to update() at maximum once per 100ms.

Visually, it will look like this:
  1. For the first mouse movement the decorated variant immediately passes the 
  call to update. That’s important, the user sees our reaction to their move 
  immediately.
  2. Then as the mouse moves on, until 100ms nothing happens. 
  The decorated variant ignores calls.
  3. At the end of 100ms – one more update happens with the last coordinates.
  4. Then, finally, the mouse stops somewhere. The decorated variant waits 
  until 100ms expire and then runs update with last coordinates. 
  So, quite important, the final mouse coordinates are processed.

A code example: */
/*  
function f(a) {
  console.log(a);
}
*/
// f1000 passes calls to f at maximum once per 1000 ms
f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored

/* P.S. Arguments and the context this passed to f1000 should be passed to 
the original f. */

