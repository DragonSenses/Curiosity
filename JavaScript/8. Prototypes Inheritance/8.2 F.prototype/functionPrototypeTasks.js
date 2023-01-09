/* Changing "prototype" */
/* In the code below we create new Rabbit, and then try to modify its prototype.

In the start, we have this code: */
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

{
  let rabbit = new Rabbit();

  console.log( rabbit.eats ); // true
}

/* 1. We added one more string (emphasized). 
What will console.log show now? */
{
  let rabbit = new Rabbit();

  Rabbit.prototype = {};

  console.log( rabbit.eats ); // ?
}

/* Answer: true
The assignment to Rabbit.prototype sets up [[Prototype]] for new objects, 
but it does not affect the existing ones. */


/* 2. …And if the code is like this (replaced one line)? */
{
  let rabbit = new Rabbit();

  Rabbit.prototype.eats = false;

  console.log( rabbit.eats ); // ?
}

/* Answer: false
Objects are assigned by reference. The object from Rabbit.prototype is not 
duplicated, it’s still a single object referenced both by Rabbit.prototype and 
by the [[Prototype]] of rabbit.

So when we change its content through one reference, it is visible through the 
other one. */


/* 3. And like this (replaced one line)? */
{
  let rabbit = new Rabbit();

  delete rabbit.eats;
  
  console.log( rabbit.eats ); // ?
}

/* Answer: true
All delete operations are applied directly to the object. Here delete rabbit.eats 
tries to remove eats property from rabbit, but it doesn’t have it. So the 
operation won’t have any effect. */


/* 4. The last variant: */
{
  let rabbit = new Rabbit();

  delete Rabbit.prototype.eats;

  console.log( rabbit.eats ); // ?
}

/* Answer: undefined
The property eats is deleted from the prototype, it doesn’t exist any more. */


/* Create an object with the same constructor */
/* Imagine, we have an arbitrary object obj, created by a constructor function
– we don’t know which one, but we’d like to create a new object using it.

Can we do it like that? 

let obj2 = new obj.constructor();

Give an example of a constructor function for obj which lets such code work 
right. And an example that makes it work wrong. */

/* We can use such approach if we are sure that "constructor" property has 
the correct value.

For instance, if we don’t touch the default "prototype", then this code works 
for sure: */
function User(name) {
  this.name = name;
}

let user = new User('Luna');
let user2 = new user.constructor('Leo');

console.log( user2.name ); // Leo (worked!)

/* It worked, because User.prototype.constructor == User.

…But if someone, so to speak, overwrites User.prototype and forgets to recreate 
constructor to reference User, then it would fail. 

For instance:
*/
// function User(name) {
//   this.name = name;
// }
User.prototype = {}; // (*)

{
let user = new User('Luna');
let user2 = new user.constructor('Leo');

console.log( user2.name ); // Leo (worked!)
}

/* Why user2.name is undefined?

Here’s how new user.constructor('Leo') works: 
  1. First, it looks for constructor in user. Nothing.
  2. Then it follows the prototype chain. The prototype of user is User.prototype, 
  and it also has no constructor (because we “forgot” to set it right!).
  3. Going further up the chain, User.prototype is a plain object, its 
  prototype is the built-in Object.prototype.
  4. Finally, for the built-in Object.prototype, there’s a built-in 
  Object.prototype.constructor == Object. So it is used.
  
Finally, at the end, we have let user2 = new user.constructor('Leo'); 

Probably, that’s not what we want. We’d like to create new User, not new Object. 
That’s the outcome of the missing constructor.

(Just in case you’re curious, the new Object(...) call converts its argument 
to an object. That’s a theoretical thing, in practice no one calls new Object 
with a value, and generally we don’t use new Object to make objects at all).
*/