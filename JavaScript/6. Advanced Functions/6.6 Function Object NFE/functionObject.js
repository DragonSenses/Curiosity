/* eslint-disable no-unused-vars */
/* Function object, NFE (Named Function Expression) */
/* Summary
Functions are objects, and their properties:
 1. name – the function name. Usually taken from the function definition, 
 but if there’s none, JavaScript tries to guess it from the context (e.g. an assignment).
 2. length – the number of arguments in the function definition. 
 Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), 
and it carries the name, then it is called a Named Function Expression. 
The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript 
libraries make great use of this feature.

They create a “main” function and attach many other “helper” functions to it. 
For instance, the jQuery library creates a function named $. The lodash library 
creates a function _, and then adds _.clone, _.keyBy and other properties to it 
(see the docs when you want to learn more about them). Actually, they do it to 
lessen their pollution of the global space, so that a single library gives only 
one global variable. That reduces the possibility of naming conflicts.

So, a function can do a useful job by itself and also carry a bunch of other 
functionality in properties.
*/

/* As we already know, a function in JavaScript is a value.

Every value in JavaScript has a type. What type is a function?

In JavaScript, functions are objects.

A good way to imagine functions is as callable “action objects”. 
    We can not only call them, but also treat them as objects: 
        add/remove properties, pass by reference etc. 
*/

/* The “name” property */
/* Function objects contain some useable properties.

For instance, a function’s name is accessible as the “name” property: */
function sayHi1() {
    console.log("Hi1");
}

console.log(sayHi1.name); // sayHi

/* The name-assigning logic is smart. It also assigns the correct name to a 
function even if it’s created without one, and then immediately assigned: */
let sayHello = function() {
    console.log("Hello");
};
  
console.log(sayHello.name); // sayHello (there's a name!)


/* It also works if the assignment is done via a default value: */
function f(sayHi = function() {}) {
    console.log(sayHi.name); // sayHi (works!)
}
  
f();
/* In the specification, this feature is called a “contextual name”. 
If the function does not provide one, then in an assignment it is figured out 
from the context. */

/* Object methods have names too: */
let user = {

    sayHi() {
      // ...
    },
  
    sayBye: function() {
      // ...
    }
  
};

console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye


/* There’s no magic though. There are cases when there’s no way to figure out 
the right name. In that case, the name property is empty, like here: */
// function created inside array
let arr = [function() {}];

console.log( arr[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none

/* In practice, however, most functions do have a name. */


/* The “length” property */
/* There is another built-in property “length” that returns the number of 
function parameters, for instance: */
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2
/* Here we can see that rest parameters are not counted. */

/* The length property is sometimes used for introspection in functions that 
operate on other functions. 

For instance, in the code below the ask function accepts a question to ask and 
an arbitrary number of handler functions to call.

Once a user provides their answer, the function calls the handlers. We can pass 
two kinds of handlers:
 - A zero-argument function, which is only called when the user gives a positive answer.
 - A function with arguments, which is called in either case and returns an answer.

To call handler the right way, we examine the handler.length property.

The idea is that we have a simple, no-arguments handler syntax for 
positive cases (most frequent variant), but are able to support 
universal handlers as well:
*/
function ask(question, ...handlers) {
    let isYes = confirm(question);
  
    for(let handler of handlers) {
      if (handler.length == 0) {
        if (isYes) handler();
      } else {
        handler(isYes);
      }
    }
  
}

// for positive answer, both handlers are called
// for negative answer, only the second one
ask("Question?", () => console.log('You said yes'), result => console.log(result));

/* POLYMORPHISM
This is a particular case of so-called 
    polymorphism – treating arguments differently depending on their type or, 
    in our case depending on the length. 
    
The idea does have a use in JavaScript libraries. */

/* Custom Properties */