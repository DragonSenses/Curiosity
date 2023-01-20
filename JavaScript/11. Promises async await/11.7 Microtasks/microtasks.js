/* Microtasks */
/* Summary
Promise handling is always asynchronous, as all promise actions pass through 
the internal “promise jobs” queue, also called “microtask queue” (V8 term).

So .then/catch/finally handlers are always called after the current code is 
finished.

If we need to guarantee that a piece of code is executed after 
.then/catch/finally, we can add it into a chained .then call.

In most Javascript engines, including browsers and Node.js, the concept of 
microtasks is closely tied with the “event loop” and “macrotasks”. As these 
have no direct relation to promises, they are covered in another part of the 
tutorial, in the article Event loop: microtasks and macrotasks. */