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


/* Shorter Syntax for methods in an Object Literal */
// these objects do the same

user = {
    sayHi: function () {
        alert("Hello");
    }
};

// method shorthand looks better, right?
user = {
    sayHi() { // same as "sayHi: function(){...}"
        alert("Hello");
    }
};

// Notations are not fully identical, there are subtle differences related to
// object inheritance. But for most cases, shorter syntax is preferred

/* "this" in methods */
/* It is common that an object method needs to access the information stored in
the object to do its job. To access the object, a method can use "this" keyword

The value of "this" is the object "before dot", the one used to call the method
*/

user = {
    name: "Luna",
    age: 20,

    sayName() {
        // "this" is the "current object"
        console.log(this.name);
    }
}; 

// During execution of user.sayName() value of "this" will be "user"
user.sayName(); // Luna

// Note it is possible to reference obj without this, via outer variable
// such as console.log(user.name) instead of console.log(this.name) but code is unreliable
// example is when you null out the user then call its method

/* "this" is not bound 
In JavaScreipt, keyword this behaves unlike most other programming langauges.
It can be used in any function, even if it's not a method of an object.


*/

