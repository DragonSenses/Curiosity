/* Promise API */
/* Summary 
There are 6 static methods of Promise class:
  1. Promise.all(promises) – waits for all promises to resolve and returns 
  an array of their results. If any of the given promises rejects, it becomes 
  the error of Promise.all, and all other results are ignored.

  2. Promise.allSettled(promises) (recently added method) – waits for all 
  promises to settle and returns their results as an array of objects with:
    * status: "fulfilled" or "rejected"
    * value (if fulfilled) or reason (if rejected).
    * 
  3. Promise.race(promises) – waits for the first promise to settle, and its 
  result/error becomes the outcome.

  4. Promise.any(promises) (recently added method) – waits for the first 
  promise to fulfill, and its result becomes the outcome. If all of the given 
  promises are rejected, AggregateError becomes the error of Promise.any.

  5. Promise.resolve(value) – makes a resolved promise with the given value.
  
  6. Promise.reject(error) – makes a rejected promise with the given error.

Of all these, Promise.all is probably the most common in practice.
*/