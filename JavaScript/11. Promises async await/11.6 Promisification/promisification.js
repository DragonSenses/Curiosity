/* Promisification */
/* “Promisification” is a long word for a simple transformation. It’s the 
conversion of a function that accepts a callback into a function that 
returns a promise.

Such transformations are often required in real-life, as many functions and 
libraries are callback-based. But promises are more convenient, so it makes 
sense to promisify them. */


/* For instance, we have loadScript(src, callback) from the chapter 
Introduction: callbacks. */
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})


/* The function loads a script with the given src, and then calls callback(err)
in case of an error, or callback(null, script) in case of successful loading. 
That’s a widespread agreement for using callbacks, we saw it before.

Let’s promisify it.

We’ll make a new function loadScriptPromise(src), that does the same (loads 
  the script), but returns a promise instead of using callbacks.

In other words, we pass it only src (no callback) and get a promise in return, 
that resolves with script when the load is successful, and rejects with the 
error otherwise. 

Here it is: */
// eslint-disable-next-line no-unused-vars
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)

/* As we can see, the new function is a wrapper around the original loadScript 
function. It calls it providing its own callback that translates to promise 
resolve/reject.

Now loadScriptPromise fits well in promise-based code. If we like promises more 
than callbacks (and soon we’ll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense 
to use a helper.

We’ll call it promisify(f): it accepts a to-promisify function f and returns a 
wrapper function. */
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

{
  // usage:
  let loadScriptPromise = promisify(loadScript);
  loadScriptPromise(/* ... */).then(/* ... */);
}