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

console.log(sayHi1.name); // sayHi1

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
/* We can also add properties of our own.

Here we add the counter property to track the total calls count: */
function sayHi() {
    console.log("Hi");
  
    // let's count how many times we run
    sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

console.log( `Called ${sayHi.counter} times` ); // Called 2 times

/* A Property is not a variable */
/* A property assigned to a function like sayHi.counter = 0 does NOT define a 
local variable counter inside it.  
 In other words, a property counter and a variable let counter are two 
unrelated things.
 
We can treat a function as an object, store properties in it, but that has no 
effect on its execution. Variables are not function properties and vice versa. 
These are just parallel worlds. */

/* Function properties can replace closures sometimes. For instance, we can 
rewrite the counter function example from the chapter Variable scope, closure 
to use a function property: */
function makeCounter() {
    // instead of:
    // let count = 0
  
    function counter() {
      return counter.count++;
    }
  
    counter.count = 0;
  
    return counter;
}

let counter = makeCounter();
console.log( counter() ); // 0
console.log( counter() ); // 1

/* The count is now stored in the function directly, not in its outer Lexical Environment. */

/* Is it better or worse than using a closure? The choice of implementation depends on our aims.

The main difference is that if the value of count lives in an outer variable, 
then external code is unable to access it. Only nested functions may modify it. 

And if it’s bound to a function, then such a thing is possible: 

// Same code above
function makeCounter() {

    function counter() {
      return counter.count++;
    };
  
    counter.count = 0;
  
    return counter;
}
  
*/
{
let counter = makeCounter();
  
counter.count = 10;
console.log( counter() ); // 10
} // can modify the function property explicitly


/* Named Function Expression */
/* Named Function Expression, or NFE, is a term for Function Expressions that 
have a name.

For instance, let’s take an ordinary Function Expression: 

let sayHelloTo = function(who) {
    console.log(`Hello, ${who}`);
};

*/

/* And add a name to it: */
let sayHelloTo = function func(who) {
    console.log(`Hello, ${who}`);
};

/* Did we achieve anything here? What’s the purpose of that additional "func" name?

First let’s note, that we still have a Function Expression. 
Adding the name "func" after function did not make it a Function Declaration, 
because it is still created as a part of an assignment expression.

Adding such a name also did not break anything. 

The function is still available as sayHelloTo():*/
sayHelloTo("Luna");

/* There are two special things about the name "func", that are the reasons for it: 
 1. It allows the function to reference itself internally.
 2. It is not visible outside of the function.
 
 For instance, the function sayHiTo below calls itself again with "Guest" if no who is 
 provided:
 */
 let sayHiTo = function func(who) {
    if (who) {
      console.log(`Hello, ${who}`);
    } else {
      func("Guest"); // use func to re-call itself
    }
};
  
sayHi(); // Hello, Guest
  
// But this won't work:
// func(); // Error, func is not defined (not visible outside of the function)


/* Why do we use func? Maybe just use sayHi for the nested call?

Actually, in most cases we can: */
let sayHi2 = function(who) {
    if (who) {
      console.log(`Hello, ${who}`);
    } else {
      sayHi2("Guest");
    }
};
/* The problem with that code is that sayHi2 may change in the outer code. */

/* If the function gets assigned to another variable instead, the code will 
start to give errors: 

let sayHi2 = function(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi2("Guest"); // Error: sayHi2 is not a function
  }
};

let welcome = sayHi2;
sayHi2 = null;

welcome(); // Error, the nested sayHi2 call doesn't work any more!


That happens because the function takes sayHi2 from its outer lexical environment.
There’s no local sayHi2, so the outer variable is used. And at the moment of the 
call that outer sayHi2 is null.

The optional name which we can put into the Function Expression is meant to solve 
exactly these kinds of problems.
*/

/* Let’s use it to fix our code: */
let sayHi3 = function func(who) {
    if (who) {
      console.log(`Hello, ${who}`);
    } else {
      func("Guest"); // Now all fine
    }
  };
  
let welcome = sayHi3;
sayHi3 = null;
  
welcome(); // Hello, Guest (nested call works)

/* Now it works, because the name "func" is function-local. 

It is not taken from outside (and not visible there). 

The specification guarantees that it will always reference the current function. 

The outer code still has its variable sayHi or welcome. 

And func is an “internal function name”, the way for the function to can call 
    itself reliably.
*/

/* Note: There's no such thing for Function Declaration */
/* The “internal name” feature described here is only available for 
Function Expressions, not for Function Declarations. 

For Function Declarations, there is no syntax for adding an “internal” name.

Sometimes, when we need a reliable internal name, it’s the reason to rewrite a 
Function Declaration to Named Function Expression form. */