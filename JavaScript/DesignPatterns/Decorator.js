'use strict';
/** In object-oriented programming, the decorator pattern is a design pattern 
that allows behavior to be added to an individual object, dynamically, 
without affecting the behavior of other objects from the same class. 

The decorator pattern is often useful for adhering to the Single Responsibility 
Principle, as it allows functionality to be divided between classes with unique 
areas of concern as well as to the Open-Closed Principle, by allowing the 
functionality of a class to be extended without being modified. 

Decorator use can be more efficient than subclassing, because an object's 
behavior can be augmented without defining an entirely new object. 

Source: https://en.wikipedia.org/wiki/Decorator_pattern

---

Simply, a decorator is simply a way of wrapping one piece of code with another
(i.e., literally "decorating" it). Other concept names are functional 
composition or higher-order functions. 

Here is an example in JavaScript: */

/* We have some function sayHi that outputs a greeting to passed in name */
function sayHi(name){
    console.log(`Hello, ${name}.`);
}

/* Introducing the loggingDecorator! A function that produces a new function 
(in the parameter "wrapped") that behaves exactly the same as function sayHi, 
but with a major difference that it will do some logging before and after the
wrapped function is called. It essentially decorates the variable wrapped
with some behavior. */
function loggingDecorator(wrapped){
    return function() {
        console.log('Starting');
        const result = wrapped.apply(this, arguments);
        console.log('Finished');
        return result;
    };
}

// Wrap the function sayHi, adding new behavior f
const wrapped = loggingDecorator(sayHi);

/* Now try using the function sayHi and wrapped: */
sayHi('Leo');   // Hello, Leo

wrapped('Leo'); 
// Starting
// Hello, Leo
// Finished