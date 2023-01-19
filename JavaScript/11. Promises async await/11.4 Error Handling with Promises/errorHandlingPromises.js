/* eslint-disable no-unused-vars */
/* Error handling with promises */
/* Summary
  - .catch handles errors in promises of all kinds: be it a reject() call, or 
  an error thrown in a handler.

  -.then also catches errors in the same manner, if given the second argument 
  (which is the error handler).

  - We should place .catch exactly in places where we want to handle errors 
  and know how to handle them. The handler should analyze errors (custom error 
    classes help) and rethrow unknown ones (maybe they are programming mistakes).

  - It’s ok not to use .catch at all, if there’s no way to recover from an error.

  - In any case we should have the unhandledrejection event handler (for 
    browsers, and analogs for other environments) to track unhandled errors 
    and inform the user (and probably our server) about them, so that our 
    app never “just dies”. 
    
*/

/* Promise chains are great at error handling. When a promise rejects, the 
control jumps to the closest rejection handler. That’s very convenient in practice.

For instance, in the code below the URL to fetch is wrong (no such site) and 
.catch handles the error: */
{
  fetch('https://no-such-server.blabla') // rejects
    .then(response => response.json())
    .catch(err => alert(err)); // TypeError: failed to fetch (the text may vary)
}

/* As you can see, the .catch doesn’t have to be immediate. It may appear 
after one or maybe several .then.

Or, maybe, everything is all right with the site, but the response is not 
valid JSON. The easiest way to catch all errors is to append .catch to the 
end of chain: */
{
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
}
/* Normally, such .catch doesn’t trigger at all. But if any of the promises 
above rejects (a network problem or invalid json or whatever), then it would 
catch it. */

/* Implicit try…catch */
/* The code of a promise executor and promise handlers has an 
"invisible try..catch" around it. If an exception happens, it gets caught and 
treated as a rejection.

For instance, this code: */
{
  new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  }).catch(alert); // Error: Whoops!
}
/* …Works exactly the same as this: */
{
  new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
  }).catch(alert); // Error: Whoops!
}
/* The "invisible try..catch" around the executor automatically catches the 
error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. 
If we throw inside a .then handler, that means a rejected promise, so the 
control jumps to the nearest error handler. */

/* Here’s an example: */
{
  new Promise((resolve, reject) => {
    resolve("ok");
  }).then((result) => {
    throw new Error("Whoops!"); // rejects the promise
  }).catch(alert); // Error: Whoops!
}

/* This happens for all errors, not just those caused by the throw 
statement. For example, a programming error: */
{
  new Promise((resolve, reject) => {
    resolve("ok");
  }).then((result) => {
    // eslint-disable-next-line no-undef
    blabla(); // no such function
  }).catch(alert); // ReferenceError: blabla is not defined
}
/* The final .catch not only catches explicit rejections, but also 
accidental errors in the handlers above. */

/* Rethrowing */
/* As we already noticed, .catch at the end of the chain is similar to 
try..catch. We may have as many .then handlers as we want, and then use 
a single .catch at the end to handle errors in all of them.

In a regular try..catch we can analyze the error and maybe rethrow it if 
it can’t be handled. The same thing is possible for promises.

If we throw inside .catch, then the control goes to the next closest error 
handler. And if we handle the error and finish normally, then it continues 
to the next closest successful .then handler.

In the example below the .catch successfully handles the error: */
{
  // the execution: catch -> then
  new Promise((resolve, reject) => {

    throw new Error("Whoops!");

  }).catch(function(error) {

    alert("The error is handled, continue normally");

  }).then(() => alert("Next successful handler runs"));
}

/* Here the .catch block finishes normally. So the next successful .then 
handler is called.

In the example below we see the other situation with .catch. The 
handler (*) catches the error and just can’t handle it (e.g. it only knows 
how to handle URIError), so it throws it again: */
{
  // the execution: catch -> catch
  new Promise((resolve, reject) => {

    throw new Error("Whoops!");

  }).catch(function(error) { // (*)

    if (error instanceof URIError) {
      // handle it
    } else {
      alert("Can't handle such error");

      throw error; // throwing this or another error jumps to the next catch
    }

  }).then(function() {
    /* doesn't run here */
  }).catch(error => { // (**)

    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way

  });
}  

/* The execution jumps from the first .catch (*) to the next one (**) down the chain. */