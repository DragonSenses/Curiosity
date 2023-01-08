/* F.prototype */
/* Summary 
In this chapter we briefly described the way of setting a [[Prototype]] for 
objects created via a constructor function. Later we’ll see more advanced 
programming patterns that rely on it.

Everything is quite simple, just a few notes to make things clear:

  - The F.prototype property (don’t mistake it for [[Prototype]]) sets 
  [[Prototype]] of new objects when new F() is called.

  - The value of F.prototype should be either an object or null: other 
  values won’t work.

  - The "prototype" property only has such a special effect when set on a 
  constructor function, and invoked with new.

On regular objects the prototype is nothing special:
*/
let user = {
  name: "Luna",
  prototype: "Whatever"   // no magic at all
};

console.log(user);

/* By default all functions have F.prototype = { constructor: F }, so we can 
get the constructor of an object by accessing its "constructor" property. */


/* F.prototype

Remember, new objects can be created with a constructor function, like new F().

If F.prototype is an object, then the new operator uses it to set [[Prototype]]
for the new object. 

NOTE: JavaScript had prototypal inheritance from the beginning. It was one of 
the core features of the language.

But in the old times, there was no direct access to it. The only thing that 
worked reliably was a "prototype" property of the constructor function, 
described in this chapter. So there are many scripts that still use it. */

/* Please note that F.prototype here means a regular property named "prototype" 
on F. It sounds something similar to the term “prototype”, but here we really 
mean a regular property with this name. 

Example: */
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true

/* Setting Rabbit.prototype = animal literally states the following: 
  "When a new Rabbit is created, assign its [[Prototype]] to animal".

That’s the resulting picture: 

Rabbit  prototype   animal
[    ]  --------->  [eats: true]
                      /\
                       | [[Prototype]]
                       |
                rabbit |
                [name: "White Rabbit"]


On the picture, "prototype" is a horizontal arrow, meaning a regular property, 
and [[Prototype]] is vertical, meaning the inheritance of rabbit from animal.    
*/

/* F.prototype only used at new F time */
/* F.prototype property is only used when new F is called, it assigns 
[[Prototype]] of the new object.

If, after the creation, F.prototype property changes 
(F.prototype = <another object>), then new objects created by new F will have 
another object as [[Prototype]], but already existing objects keep the old one. 
*/