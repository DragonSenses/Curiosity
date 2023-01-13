/* Class checking: "instanceof" */
/* Summary
Let's summarize the type-checking methods that we know:

              works for                         returns
------------------------------------------------------------
typeof       | primitives                       | string
------------------------------------------------------------
{}.toString  | primitives, built-in objects,    | string
             | objects with Symbol.toStringTag  |
------------------------------------------------------------
instanceof   | objects                          | true/false

As we can see, {}.toString is technically a “more advanced” typeof.

And instanceof operator really shines when we are working with a class 
hierarchy and want to check for the class taking into account inheritance.
*/

/* The instanceof operator allows to check whether an object belongs to a 
certain class. It also takes inheritance into account.

Such a check may be necessary in many cases. For example, it can be used for 
building a polymorphic function, the one that treats arguments differently 
depending on their type. */

/* The instanceof operator */
/* Syntax:
    obj instanceof Class
    
It returns true if obj belongs to the Class or a class inheriting from it. 

For instance: */
{
  class Rabbit {}
  let rabbit = new Rabbit();

  // is it an object of Rabbit class?
  console.log( rabbit instanceof Rabbit ); // true
}

/* It also works with constructor functions: */
{
  // eslint-disable-next-line no-inner-declarations
  function Rabbit() {} // instead of class

  alert( new Rabbit() instanceof Rabbit ); // true
}

/* …And with built-in classes like Array: */
{
  let arr = [1, 2, 3];
  alert( arr instanceof Array ); // true
  alert( arr instanceof Object ); // true
}

/* Please note that arr also belongs to the Object class. That’s because 
Array prototypically inherits from Object.

Normally, instanceof examines the prototype chain for the check. We can also 
set a custom logic in the static method Symbol.hasInstance.

The algorithm of obj instanceof Class works roughly as follows: 

1. If there’s a static method Symbol.hasInstance, then just call 
it: Class[Symbol.hasInstance](obj). It should return either true or false, 
and we’re done. That’s how we can customize the behavior of instanceof.

For example: */
// setup instanceOf check that assumes that
// anything with canEat property is an animal
{
  class Animal {
    static [Symbol.hasInstance](obj) {
      if (obj.canEat) return true;
    }
  }

  let obj = { canEat: true };

  alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
}

/* 2. Most classes do not have Symbol.hasInstance. In that case, the standard 
logic is used: obj instanceOf Class checks whether Class.prototype is equal to 
one of the prototypes in the obj prototype chain.

In other words, compare one after another: 

obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?

// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false

In the example above rabbit.__proto__ === Rabbit.prototype, so that gives the 
answer immediately.

In the case of an inheritance, the match will be at the second step: */
{
  class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
alert(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)
}