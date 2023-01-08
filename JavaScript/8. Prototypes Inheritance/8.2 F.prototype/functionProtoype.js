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


/* Default F.prototype, constructor property */
/* Every function has the "prototype" property even if we don’t supply it.

The default "prototype" is an object with the only property constructor that 
points back to the function itself.

Like this: */
function Bunny() {}

/* default prototype
Bunny.prototype = { constructor: Bunny };
*/

/* 
Bunny           default "prototype"
[prototype]<----->[constructor] 

We can check it: */
// Bunny.prototype = { constructor: Bunny }

alert( Bunny.prototype.constructor == Bunny ); // true

/* Naturally, if we do nothing, the constructor property is available to 
all bunnies through [[Prototype]]: */

// function Bunny() {}
// by default:
// Bunny.prototype = { constructor: Bunny }

let bunny = new Bunny(); // inherits from {constructor: Bunny}

console.log(bunny.constructor == Bunny);  // true (from prototype)

/* Bunny    prototype   default "prototype"
[        ]  <-------->  [eats: true]
          constructor /\
                       | [[Prototype]]
                       |
                bunny  |
                [         ]
*/

/* We can use constructor property to create a new object using the 
same constructor as the existing one. Like here: */

function Hare(name){
  this.name = name;
  console.log(name);
}

let hare = new Hare("White Hare");  // White Hare

let hare2 = new hare.constructor("Black Hare"); // Black Hare

console.log(hare);  // Hare {name: 'White Hare'}
console.log(hare2); // Hare {name: 'Black Hare'}

/* That’s handy when we have an object, don’t know which constructor was 
used for it (e.g. it comes from a 3rd party library), and we need to 
create another one of the same kind.

But probably the most important thing about "constructor" is that…

…JavaScript itself does not ensure the right "constructor" value.

Yes, it exists in the default "prototype" for functions, but that’s all. 
What happens with it later – is totally on us.

In particular, if we replace the default prototype as a whole, then there
will be no "constructor" in it. */

/* For instance: */
function Kangaroo() {}
Kangaroo.prototype = {
  jumps: true
};

let kangaroo = new Kangaroo();
console.log(kangaroo.constructor === Kangaroo); // false;

/* So, to keep the right "constructor" we can choose to add/remove properties 
to the default "prototype" instead of overwriting it as a whole: */

function Frog() {}

// Not overwrite Frog.prototype totally
// just add to it
Frog.prototype.jumps = true;
// the default Frog.prototype.constructor is preserved

/* Or, alternatively, recreate the constructor property manually: */
function Bullfrog() {}

Bullfrog.prototype = {
  jumps: true,
  constructor: Bullfrog
};

// now constructor is also correct, because we added it