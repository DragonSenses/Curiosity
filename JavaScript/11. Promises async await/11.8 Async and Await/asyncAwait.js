/* eslint-disable no-inner-declarations */
/* Async/await */
/* The async keyword before a function has two effects:
  1. Makes it always return a promise.
  2. Allows await to be used in it.

The await keyword before a promise makes JavaScript wait until that 
promise settles, and then:
  1. If it’s an error, an exception is generated — same as if throw 
  error were called at that very place.
  2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is 
easy to both read and write.

With async/await we rarely need to write promise.then/catch, but 
we still shouldn’t forget that they are based on promises, because 
sometimes (e.g. in the outermost scope) we have to use these methods. 
Also Promise.all is nice when we are waiting for many tasks simultaneously. 
*/

/* Async functions */
/* Let’s start with the async keyword. It can be placed before a function, 
like this: 

  async function f() {
    return 1;
  }
  
*/

/* The word “async” before a function means one simple thing: a function 
always returns a promise. Other values are wrapped in a resolved promise 
automatically.

For instance, this function returns a resolved promise with the result of 1; 
let’s test it: */
{
  async function f() {
    return 1;
  }
  
  f().then(alert); // 1
}

/* …We could explicitly return a promise, which would be the same: */
{
  async function f() {
    return Promise.resolve(1);
  }
  
  f().then(alert); // 1
}

/* So, async ensures that the function returns a promise, and wraps 
non-promises in it. Simple enough, right? But not only that. There’s another 
keyword, await, that works only inside async functions, and it’s pretty cool. 
*/


/* Await */
/* The syntax: 

// works only inside async functions
let value = await promise;


The keyword await makes JavaScript wait until that promise settles and returns 
its result.

Here’s an example with a promise that resolves in 1 second:
*/
{
  async function f() {

    // eslint-disable-next-line no-unused-vars
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000);
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    alert(result); // "done!"
  }
  
  f();
}
/* The function execution “pauses” at the line (*) and resumes when the 
promise settles, with result becoming its result. So the code above shows 
“done!” in one second.

Let’s emphasize: await literally suspends the function execution until the 
promise settles, and then resumes it with the promise result. That doesn’t 
cost any CPU resources, because the JavaScript engine can do other jobs in 
the meantime: execute other scripts, handle events, etc.

It’s just a more elegant syntax of getting the promise result than 
promise.then. And, it’s easier to read and write. */