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