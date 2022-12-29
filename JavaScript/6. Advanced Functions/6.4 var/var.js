/* eslint-disable no-redeclare */
/* eslint-disable no-constant-condition */
/* The old "var" */
/* Summary 
There are two main differences of var compared to let/const:
  1. var variables have no block scope, their visibility is scoped to current 
  function, or global, if declared outside function. 
  2. var declarations are processed at function start (script start for globals).
  
These differences make var worse than let most of the time. 
Block-level variables is such a great thing. That’s why let was introduced in 
the standard long ago, and is now a major way (along with const) to declare 
a variable. */

/* In the very first chapter about variables, we mentioned three ways of 
variable declaration: 1) let    2) const    3) var

The var declaration is similar to let. Most of the time we can replace let by 
var or vice-versa and expect things to work: */
var message = "Hi";
console.log(message); // Hi

/* But internally var is a very different beast, that originates from very old times. 
It’s generally not used in modern scripts, but still lurks in the old ones. 

On the other hand, it’s important to understand differences when migrating old 
scripts from var to let, to avoid odd errors.*/


/* "var" has no block scope */
/* Variables, declared with var, are either function-scoped or global-scoped. 
They are visible through blocks. For instance: */
if (true) {
    var test = true; // use "var" instead of "let"
}
  
console.log(test); // true, the variable lives after if

/* As var ignores code blocks, we’ve got a global variable test. 

If we used let test instead of var test, then the variable would only be 
visible inside if:

if (true) {
  let test = true; // use "let"
}

console.log(test); // ReferenceError: test is not defined

*/

/* The same thing for loops: var cannot be block- or loop-local: */
for (var i = 0; i < 10; i++) {
    var one = 1;
    // ...
}

console.log(i);   // 10, "i" is visible after loop, it's a global variable
console.log(one); // 1, "one" is visible after loop, it's a global variable

/* If a code block is inside a function, then var becomes a function-level variable: */
function sayHi() {
    if (true) {
      var phrase = "Hello";
    }
  
    console.log(phrase); // works
}
  
sayHi();
//console.log(phrase); // ReferenceError: phrase is not defined

/* As we can see, var pierces through if, for or other code blocks. That’s 
because a long time ago in JavaScript, blocks had no Lexical Environments, 
and var is a remnant of that. */


/* "var" toleratess redeclarations */
/* If we declare the same variable with let twice in the same scope, that’s an error:

let user;
let user; // SyntaxError: 'user' has already been declared


With var, we can redeclare a variable any number of times. 
If we use var with an already-declared variable, it’s just ignored: */
var user = "Pete";

var user = "John"; // this "var" is already declared, but doesn't trigger an error

console.log(user); // John


/* "var" variables can be declared below their use */
/* var declarations are processed when the function starts (or script starts for globals).

In other words, var variables are defined from the beginning of the function, 
no matter where the definition is (assuming that the definition is not in the 
nested function). 

So this code:
*/
function sayHi() {
    phrase = "Hello";
  
    console.log(phrase);
  
    var phrase;
}
sayHi();

/* …Is technically the same as this (moved var phrase above): */
function sayHi() {
    var phrase;
  
    phrase = "Hello";
  
    console.log(phrase);
}
sayHi();

/* …Or even as this (remember, code blocks are ignored): */
function sayHi() {
    phrase = "Hello"; // (*) var phrase exists as here
  
    if (false) {    // var inside is processed in beginning of function
      var phrase;   // regardless if (false) branch never executes
    }             
  
    console.log(phrase);
}
sayHi();

/* Hoisting */
/* People also call such behavior “hoisting” (raising), because all var are 
“hoisted” (raised) to the top of the function. 

So in the example above, if (false) branch never executes, but that doesn’t matter. 
The var inside it is processed in the beginning of the function, so at the 
moment of (*) the variable exists. */


/* Declarations are hoisted, but assignments are not. 
That’s best demonstrated with an example: */
function sayHi() {
    console.log(phrase);
  
    var phrase = "Hello";
}
  
sayHi();

/* The line var phrase = "Hello" has two actions in it: 
    1. Variable declaration var
    2. Variable assignment =.
    
The declaration is processed at the start of function execution (“hoisted”), 
but the assignment always works at the place where it appears. 

So the code works essentially like this:*/
function sayHi() {
    var phrase; // declaration works at the start...
  
    console.log(phrase); // undefined
  
    phrase = "Hello"; // ...assignment - when the execution reaches it.
}
  
sayHi();

/* Because all var declarations are processed at the function start,
we can reference them at any place. But variables are undefined until the assignments.

In both examples above, console.log runs without an error, because the variable 
phrase exists. But its value is not yet assigned, so it shows undefined. */



/* IIFE */
/* Immediately-Invoked Function Expressions. In the past, as there was only var, 
and it has no block-level visibility, programmers invented a way to emulate it.

That’s not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this: */
(function() {

    var message = "Hello";
  
    console.log(message); // Hello
  
})();