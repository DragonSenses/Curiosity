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

But in the modern JavaScript, there’s a more advanced “class” construct, that 
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