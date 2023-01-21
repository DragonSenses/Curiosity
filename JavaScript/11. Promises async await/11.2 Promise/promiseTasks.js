/* Re-resolve a promise? */
/* What’s the output of the code below? */
// eslint-disable-next-line no-unused-vars
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);

/* Answer: The output is 1.

The second call to resolve is ignored, because only the first call of 
reject/resolve is taken into account. Further calls are ignored.
*/


/* Delay with a promise */
/* The built-in function setTimeout uses callbacks. Create a promise-based alternative.

The function delay(ms) should return a promise. That promise should resolve 
after ms milliseconds, so that we can add .then to it*/

/* Answer: */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
/* Please note that in this task resolve is called without arguments. We don’t 
return any value from delay, just ensure the delay. */


//TODO:

/* Animated circle with promise */
/* Rewrite the showCircle function in the solution of the task Animated circle with callback so that it returns a promise instead of accepting a callback.

The new usage: 

showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});

Take the solution of the task Animated circle with callback as the base.
*/
