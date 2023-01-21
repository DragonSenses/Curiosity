/* eslint-disable no-unused-vars */
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

/* Can’t use await in regular functions */
/* If we try to use await in a non-async function, there would be a syntax 
error: */
function f() {
  let promise = Promise.resolve(1);
  // let result = await promise; // Syntax error
}
/* We may get this error if we forget to put async before a function. 
As stated earlier, await only works inside an async function. */


/* Let’s take the showAvatar() example from the chapter Promises chaining and 
rewrite it using async/await: 
  1. We’ll need to replace .then calls with await.
  2. Also we should make the function async for them to work.
*/
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();

/* Modern browsers allow top-level await in modules */
/* In modern browsers, await on top level works just fine, when we’re inside a 
module. We’ll cover modules in article Modules, introduction.

For instance: */

/* we assume this code runs at top level, inside a module

let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user); 
*/

/* If we’re not using modules, or older browsers must be supported, there’s a 
universal recipe: wrapping into an anonymous async function.

Like this: */
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  // ...
})();