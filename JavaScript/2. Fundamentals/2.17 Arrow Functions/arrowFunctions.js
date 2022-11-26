/* Arrow Functions, the Basics
Summary
Arrow functions are handy for simple actions, especially for one-liners. 

They come in two flavors:
1. Without curly braces: (...args) => expression 
    – the right side is an expression: the function evaluates it and returns the result. 
    - Parentheses can be omitted, if there’s only a single argument
    - e.g. n => n*2.

2. With curly braces: (...args) => { body } 
    – brackets allow us to write multiple statements inside the function, 
    but we need an explicit return to return something.

- 
*/

/* Arrow Function - simple, concise syntax for creating functions 
Syntax:
        let func = (arg1, arg2, ..., argN) => expression;

Creates a function func that accepts arguments arg1..argN, then evaluates the
expression on the right side with their use and returns its result.

A shorter version of 
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
*/

/* Example (a, b) => a + b means a function that accepts two arguments 
named a and b. Upon the execution, it evaluates the expression a + b 
and returns the result. */

let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3

// If we have only one argument, then parentheses around parameters can be omitted
let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

alert(double(3)); // 6

// If there are no arguments, parentheses are empty, but they must be present:
let sayHi = () => alert("Hello!");

sayHi();

/* Arrrow Functions can be used in the same way as Function Expression 
For instance, to dynamically create a function:
*/
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
    () => alert('Hello!') :
    () => alert("Greetings!");

welcome();


/* Mutliline Arrow Functions 
    When a  more complex function, with multiple expressions and statements. 
In that case, we can enclose them in curly braces. The major difference is that
curly braces require a return within them to return a value (just like a regular function does).
*/

sum = (a, b) => {  // the curly brace opens a multiline function
    let result = a + b;
    return result; // if we use curly braces, then we need an explicit "return"
};

alert(sum(1, 2)); // 3