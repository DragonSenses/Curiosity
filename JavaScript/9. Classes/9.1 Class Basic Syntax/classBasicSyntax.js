/* Class Basic Syntax */
/* Summary 
  MyClass is technically a function (the one that we provide as constructor), 
  while methods, getters and setters are written to MyClass.prototype.

The basic class syntax looks like this:

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
*/

/* In object-oriented programming, a class is an extensible program-code-template 
for creating objects, providing initial values for state (member variables) and 
implementations of behavior (member functions or methods). 

In practice, we often need to create many objects of the same kind, like users, 
or goods or whatever.

As we already know from the chapter Constructor, operator "new", new function can 
help with that.

But in the modern JavaScript, there’s a more advanced "class" construct, that 
introduces great new features which are useful for object-oriented programming.
*/

/* The class syntax */
/* The basic syntax is:

class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
} 

Then use new MyClass() to create a new object with all the listed methods.

The constructor() method is called automatically by new, so we can initialize 
the object there. e.g.,
*/
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }

}

// Usage:
let user = new User("Luna");
user.sayHi();

/* When new User("Luna") is called: 
1. A new object is created.
2. The constructor runs with the given argument and assigns it to this.name.

…Then we can call object methods, such as user.sayHi(). */

/* NOTE: No comma between class methods */
/* A common pitfall for novice developers is to put a comma between class 
methods, which would result in a syntax error.

The notation here is not to be confused with object literals. Within the 
class, no commas are required. */


/* What is a class? */
/* So, what exactly is a class? That’s not an entirely new language-level 
entity, as one might think.

Let’s unveil any magic and see what a class really is. That’ll help in 
understanding many complex aspects.

In JavaScript, a class is a kind of function.

Here, take a look: */
{
  class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
  }

  // proof: User is a function
  console.log(typeof User); // function
}

/* What class User {...} construct really does is: 
  1. Creates a function named User, that becomes the result of the class declaration. 
  The function code is taken from the constructor method (assumed empty if we don’t 
  write such method).

  2. Stores class methods, such as sayHi, in User.prototype.

After new User object is created, when we call its method, it’s taken from the 
prototype, just as described in the chapter F.prototype. So the object has 
access to class methods.

We can illustrate the result of class User declaration as:

User                  prototype   User.prototype
constructor(name) {   -------->   [sayHi: function  ]
  this.name = name;               [constructor: User]
}


Here’s the code to introspect it: */
{
  class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
  }
  
  // class is a function
  console.log(typeof User); // function
  
  // ...or, more precisely, the constructor method
  console.log(User === User.prototype.constructor); // true
  
  // The methods are in User.prototype, e.g:
  console.log(User.prototype.sayHi); // the code of the sayHi method
  
  // there are exactly two methods in the prototype
  console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
}


/* Not just a syntactic sugar */
/* Sometimes people say that class is a "syntactic sugar" (syntax that is 
designed to make things easier to read, but doesn’t introduce anything new), 
because we could actually declare the same thing without using the class keyword 
at all: */

{
  // rewriting class User in pure functions

  // 1. Create constructor function
  // eslint-disable-next-line no-inner-declarations
  function User(name) {
    this.name = name;
  }
  // a function prototype has "constructor" property by default,
  // so we don't need to create it

  // 2. Add the method to prototype
  User.prototype.sayHi = function() {
    console.log(this.name);
  };

  // Usage:
  let user = new User("John");
  user.sayHi();
}

/* The result of this definition is about the same. So, there are indeed 
reasons why class can be considered a syntactic sugar to define a constructor 
together with its prototype methods.

Still, there are important differences. 

1. First, a function created by class is labelled by a special internal 
property [[IsClassConstructor]]: true. So it’s not entirely the same as 
creating it manually.

The language checks for that property in a variety of places. 
For example, unlike a regular function, it must be called with new:
*/
{
  class User {
    constructor() {}
  }
  
  console.log(typeof User); // function
  User(); // Error: Class constructor User cannot be invoked without 'new'
}

/* Also, a string representation of a class constructor in most JavaScript 
engines starts with the "class…" */
{
  class User {
    constructor() {}
  }
  
  console.log(User); // class User { ... }
}

/* There are other differences.
2. Class methods are non-enumerable. A class definition sets enumerable flag 
to false for all methods in the "prototype".

That’s good, because if we for..in over an object, we usually don’t want 
its class methods.

3. Classes always use strict. All code inside the class construct is 
automatically in strict mode.

Besides, class syntax brings many other features that we’ll explore later. */


/* Class Expression */
/* Just like functions, classes can be defined inside another expression, 
passed around, returned, assigned, etc.

Here’s an example of a class expression: */
{
  let User = class {
    sayHi() {
      alert("Hello");
    }
  };

  console.log(User);
}

/* Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it’s visible inside the class only: */
{
  // "Named Class Expression"
  // (no such term in the spec, but that's similar to Named Function Expression)
  let User = class MyClass {
    sayHi() {
      alert(MyClass); // MyClass name is visible only inside the class
    }
  };

  new User().sayHi(); // works, shows MyClass definition

  //console.log(MyClass); // error, MyClass name isn't visible outside of the class
}

/* We can even make classes dynamically “on-demand”, like this: */
{
  // eslint-disable-next-line no-inner-declarations
  function makeClass(phrase) {
    // declare a class and return it
    return class {
      sayHi() {
        alert(phrase);
      }
    };
  }
  
  // Create a new class
  let User = makeClass("Hello");
  
  new User().sayHi(); // Hello
}


/* Getters/Setters */
/* Just like literal objects, classes may include getters/setters, computed 
properties etc.

Here’s an example for user.name implemented using get/set: */