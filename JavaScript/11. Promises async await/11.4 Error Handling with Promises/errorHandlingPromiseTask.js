/* Error in setTimeout */
/* What do you think? Will the .catch trigger? Explain your answer. */
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);


/* Answer: No, it won't.

As said in the chapter, there’s an "implicit try..catch" around the function 
code. So all synchronous errors are handled.

But here the error is generated not while the executor is running, but later. 
So the promise can’t handle it.
*/