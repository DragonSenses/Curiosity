/* Global object */
/* Summary 
- The global object holds variables that should be available everywhere.
    That includes JavaScript built-ins, such as Array and environment-specific 
    values, such as window.innerHeight – the window height in the browser.

- The global object has a universal name globalThis.
    …But more often is referred by “old-school” environment-specific names, 
    such as window (browser) and global (Node.js).

- We should store values in the global object only if they’re truly global 
for our project. And keep their number at minimum.

- In-browser, unless we’re using modules, global functions and variables 
declared with var become a property of the global object.

    * Each module has its own scope, so when you declare a variable with var
    inside a module it is scoped there and not globally.
    * Implicit globals still work as normal. You should activate strict mode 
    so you don't create them.

- To make our code future-proof and easier to understand, we should access 
properties of the global object directly, as window.x.
*/

/* Global Object */
/* The global object provides variables and functions that are available anywhere. 
By default, those that are built into the language or the environment.

In a browser it is named window, for Node.js it is global, for other environments 
it may have another name.

Recently, globalThis was added to the language, as a standardized name for a 
global object, that should be supported across all environments. 
    
    It’s supported in all major browsers.

We’ll use window here, assuming that our environment is a browser. If your 
script may run in other environments, it’s better to use globalThis instead.

All properties of the global object can be accessed directly: */

alert("Hello");
// is the same as
window.alert("Hello");

/* In a browser, global functions and variables declared with var 
(not let/const!) become the property of the global object: */
var gVar = 5;

console.log(gVar);        // 5
console.log(window.gVar); // 5 (became a property of the global object)

/* Function declarations have the same effect (statements with function keyword
     in the main code flow, not function expressions).

Please don’t rely on that! This behavior exists for compatibility reasons. 

Modern scripts use JavaScript modules where such a thing doesn’t happen.

If we used let instead, such thing wouldn’t happen: */
let gLet = 5;

console.log(gLet);        // 5
console.log(window.gLet); // undefined (doesn't become a property of the global object)

/* If a value is so important that you’d like to make it available globally, 
write it directly as a property: */

// make current user information global, to let all scripts access it
window.currentUser = {
    name: "Luna"
};

// somewhere else in code
// eslint-disable-next-line no-undef
console.log(currentUser.name);  // Luna

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
console.log(window.currentUser.name); // Luna

/* That said, using global variables is generally discouraged. 
There should be as few global variables as possible. The code design where a 
function gets “input” variables and produces certain “outcome” is clearer, 
less prone to errors and easier to test than if it uses outer or global variables. 
*/


/* Using for polyfills */
/* We use the global object to test for support of modern language features.

For instance, test if a built-in Promise object exists 
(it doesn’t in really old browsers): */
if (!window.Promise) {
    console.log("Your browser is really old!");
}

/* If there’s none (say, we’re in an old browser), we can create 
“polyfills”: add functions that are not supported by the environment, 
but exist in the modern standard. */
if (!window.Promise) {
    // window.Promise = ... // custom implementation of the modern language feature
}