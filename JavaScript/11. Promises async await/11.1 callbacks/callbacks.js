/* Introduction: callbacks */
/* We use browser methods in examples here 
To demonstrate the use of callbacks, promises and other abstract concepts, 
we’ll be using some browser methods: specifically, loading scripts and 
performing simple document manipulations.

If you’re not familiar with these methods, and their usage in the examples 
is confusing, you may want to read a few chapters from the next part of the 
tutorial.

Although, we’ll try to make things clear anyway. There won’t be anything 
really complex browser-wise. */

/* Many functions are provided by JavaScript host environments that allow you 
to schedule asynchronous actions. In other words, actions that we initiate now, 
but they finish later.

For instance, one such function is the setTimeout function.

There are other real-world examples of asynchronous actions, e.g. loading 
scripts and modules (we’ll cover them in later chapters).

Take a look at the function loadScript(src), that loads a script with the 
given src: */
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

/* It inserts into the document a new, dynamically created, 
tag <script src="…"> with the given src. The browser automatically starts 
loading it and executes when complete. 

We can use this function like this: */
// load and execute the script at the given path
loadScript('/my/script.js');