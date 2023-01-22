/* Rewrite using async/await */
/* Rewrite this example code from the chapter Promises chaining using 
async/await instead of .then/catch: */
{
// eslint-disable-next-line no-inner-declarations
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
}

/* Answer: */
{
  // eslint-disable-next-line no-inner-declarations
  async function loadJson(url) { // (1)
    let response = await fetch(url); // (2)
  
    if (response.status == 200) {
      let json = await response.json(); // (3)
      return json;
    }
  
    throw new Error(response.status);
  }
  
  loadJson('https://javascript.info/no-such-user.json')
    .catch(alert); // Error: 404 (4)
}
/* Notes:
  1. The function loadJson becomes async
  2. All .then inside are replaced with awai
  3. We can return response.json() instead of awaiting for it, like this:

  if (response.status == 200) {
    return response.json();     // (3)
  }

  Then the outer code would have to await for that promise to resolve. In our
  case it doesn't matter.

  4. The error thrown from loadJson is handled by .catch
  We can't use await loadJson(...) there, because we're not in an async function

*/


/* Rewrite "rethrow" with async/await */
/* Below you can find the “rethrow” example. Rewrite it using async/await 
instead of .then/catch.

And get rid of the recursion in favour of a loop in demoGithubUser: with 
async/await that becomes easy to do. */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();

/* Answer:  */



/* Call async from non-async */
/* We have a “regular” function called f. How can you call the async function 
wait() and use its result inside of f? 
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
} 

P.S. The task is technically very simple, but the question is quite common 
for developers new to async/await. */


/* Answer: Treat async call as promise and attach .then to it.

That’s the case when knowing how it works inside is helpful.

Just treat async call as promise and attach .then to it: */

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f(){
  // shows 10 after 1 second
  wait().then(result => console.log(result));
}

f();