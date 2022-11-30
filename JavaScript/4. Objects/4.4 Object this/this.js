/* Object Methods: this 
Summary
    - Functions that are stored in object properties are called "methods".
    - Methods allow objects to "act" like object.doSomething().
    - Methods can reference the object as this.

The value of this is defined at run-time.
    - When a function is declared, it may use this, but that this has no value 
    until the function is called.
    - A function can be copied between objects.
    - When a function is called in the "method" syntax: object.method(), 
    the value of this during the call is object.

Please note that arrow functions are special: they have no this. 
When this is accessed inside an arrow function, it is taken from outside.
*/

/* Objects are usually created to represent entities of the real world, like
users, orders and so on. And just like in the real world, a user can "act"
i.e. select something from the shopping cart, login, logout, etc. 

    Actions are represented in JavaScript by functions in properties.

Aside: Object-Oriented Programming (OOP) is writing code using objects to 
represent entities. 
*/
// Let's teach the user to say Hi
let user = {
    name: "Luna",
    age: 20,
};

// Assign a Function Expression to user.sayHi property of object user
user.sayHi = function () {
    console.log("Hi!");
};

user.sayHi(); // calling the method

// A function that is a property of an object is called its method

// Of course we can use a pre-declared function as a method:
let test = {
    name: "Luna",
    age: 20,
};

// first, declare
function sayHi() {
    alert("Hello!");
}

// then add as a method
test.sayHi = sayHi;

test.sayHi(); // Hello!


/* Method Shorthand */

