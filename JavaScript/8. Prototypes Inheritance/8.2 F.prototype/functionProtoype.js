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