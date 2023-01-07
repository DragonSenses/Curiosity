/* Prototypal inheritance */
/* Summary

  - In JavaScript, all objects have a hidden [[Prototype]] property that’s 
  either another object or null.

  - We can use obj.__proto__ to access it (a historical getter/setter, there 
  are other ways, to be covered soon).

  - The object referenced by [[Prototype]] is called a “prototype”.

  - If we want to read a property of obj or call a method, and it doesn’t 
  exist, then JavaScript tries to find it in the prototype.

  - Write/delete operations act directly on the object, they don’t use the 
  prototype (assuming it’s a data property, not a setter).

  - If we call obj.method(), and the method is taken from the prototype, this 
  still references obj. So methods always work with the current object even 
  if they are inherited.

  - The for..in loop iterates over both its own and its inherited properties. 
  All other key/value-getting methods only operate on the object itself.
*/

/* Prototypical Inheritance */
/* Protytypical Inheritance is a language feature that helps take something and
extend it. 

For instance, we have a user object with its properties and methods, and want 
to make admin and guest as slightly modified variants of it. We’d like to reuse
what we have in user, not copy/reimplement its methods, just build a new object
on top of it. */


/* [[Prototype]] */
/* In JavaScript, objects have a special hidden property [[Prototype]] (as named 
in the specification), that is either null or references another object. 
That object is called “a prototype”: 

prototype object
  [prototype object] 
       /\
        | [[Prototype]]
object  |        
    [object]

When we read a property from object, and it’s missing, JavaScript automatically 
takes it from the prototype. In programming, this is called “prototypal inheritance”. 

The property [[Prototype]] is internal and hidden, but there are many ways to set it.

One of them is to use the special name __proto__, like this:
*/
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

/* Now if we read a property from rabbit, and it’s missing, JavaScript will 
automatically take it from animal. For instance: */
rabbit.__proto__ = animal; // (*)

// we can find both properties in rabbit now:
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true

/* Here the line (*) sets animal to be the prototype of rabbit.

Then, when alert tries to read property rabbit.eats (**), it’s not in rabbit, 
so JavaScript follows the [[Prototype]] reference and finds it in animal 
(look from the bottom up): 

animal
  [eats: true] 
       /\
        | [[Prototype]]
rabbit  |        
  [jumps: true]
      
Here we can say that "animal is the prototype of rabbit" or 
  "rabbit prototypically inherits from animal".

So if animal has a lot of useful properties and methods, then they become 
automatically available in rabbit. Such properties are called “inherited”. */