/*  */
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

