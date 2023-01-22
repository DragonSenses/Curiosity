/* Error in setTimeout */
/* What do you think? Will the .catch trigger? Explain your answer. */
// eslint-disable-next-line no-unused-vars
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


That implicit try..catch around the executor code looks like this:
try{setTimeout( ()=>throw err, 1000)}
  catch(err){reject(err)}

Hence if an error occurs asynchronously the catch block{} wont be triggered 
and reject(err) won't be called. Try catch block does not wait for the 
setTimeout function to finish but the promise does wait, so when the error 
occurs and the promise is settled, the error is thrown but reject(err) has 
not been called as the execution flow has gone past the try catch block
*/