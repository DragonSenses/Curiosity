/* Prototype methods, objects without __proto__ */
/* Summary
- To create an object with the given prototype, use:
  * literal syntax: { __proto__: ... }, allows to specify multiple properties
  * or Object.create(proto, [descriptors]), allows to specify property descriptors.
  
- The Object.create provides an easy way to shallow-copy an object with all descriptors:
  let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

- Modern methods to get/set the prototype are:
  * Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj (same as __proto__ getter).
  * Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto (same as __proto__ setter).
  
- Getting/setting the prototype using the built-in __proto__ getter/setter isn’t 
recommended, it’s now in the Annex B of the specification.

- We also covered prototype-less objects, created with Object.create(null) or {__proto__: null}.

These objects are used as dictionaries, to store any (possibly user-generated) keys.

Normally, objects inherit built-in methods and __proto__ getter/setter from 
Object.prototype, making corresponding keys “occupied” and potentially causing 
side effects. With null prototype, objects are truly empty. 
*/

/* In the first chapter of this section, we mentioned that there are modern 
methods to setup a prototype.

Setting or reading the prototype with obj.__proto__ is considered outdated and 
somewhat deprecated (moved to the so-called “Annex B” of the JavaScript standard, 
meant for browsers only). 

The modern methods to get/set a prototype are:

- Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
- Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

The only usage of __proto__, that’s not frowned upon, is as a property when 
creating a new object: { __proto__: ... }.

Although, there’s a special method for this too:
- Object.create(proto, [descriptors]) – creates an empty object with given proto 
as [[Prototype]] and optional property descriptors.

For instance: */
{
  let animal = {
    eats: true
  };

  // create a new object with animal as a prototype
  let rabbit = Object.create(animal); // same as {__proto__: animal}

  console.log(rabbit.eats); // true

  console.log(Object.getPrototypeOf(rabbit) === animal); // true

  Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}
}
/* The Object.create method is a bit more powerful, as it has an optional 
second argument: property descriptors.

We can provide additional properties to the new object there, like this: */
{
  let animal = {
    eats: true
  };
  
  let rabbit = Object.create(animal, {
    jumps: {
      value: true
    }
  });
  
  console.log(rabbit.jumps); // true
}

/* The descriptors are in the same format as described in the chapter 
Property flags and descriptors.

We can use Object.create to perform an object cloning more powerful than 
copying properties in for..in: */
{
  let obj = { name: "Luna" };
  let clone = Object.create(
    Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
  );
  console.log(clone); // {name: 'Luna'}
}

/* This call makes a truly exact copy of obj, including all properties: enumerable 
and non-enumerable, data properties and setters/getters – everything, and with 
the right [[Prototype]]. */


/* Brief History */
/* There’re so many ways to manage [[Prototype]]. How did that happen? Why?

That’s for historical reasons.

The prototypal inheritance was in the language since its dawn, but the ways to 
manage it evolved over time. 

  - The prototype property of a constructor function has worked since very 
  ancient times. It’s the oldest way to create objects with a given prototype.

  - Later, in the year 2012, Object.create appeared in the standard. It gave 
  the ability to create objects with a given prototype, but did not provide 
  the ability to get/set it. Some browsers implemented the non-standard 
  __proto__ accessor that allowed the user to get/set a prototype at any time, 
  to give more flexibility to developers.

  - Later, in the year 2015, Object.setPrototypeOf and Object.getPrototypeOf 
  were added to the standard, to perform the same functionality as __proto__. 
  As __proto__ was de-facto implemented everywhere, it was kind-of deprecated 
  and made its way to the Annex B of the standard, that is: optional for 
  non-browser environments.

  - Later, in the year 2022, it was officially allowed to use __proto__ in 
  object literals {...} (moved out of Annex B), but not as a getter/setter 
  obj.__proto__ (still in Annex B).


Why was __proto__ replaced by the functions getPrototypeOf/setPrototypeOf?

Why was __proto__ partially rehabilitated and its usage allowed in {...}, 
but not as a getter/setter?

That’s an interesting question, requiring us to 
understand why __proto__ is bad.

And soon we’ll get the answer.
*/

/* Don’t change [[Prototype]] on existing objects if speed matters */
/* Technically, we can get/set [[Prototype]] at any time. But usually we only 
set it once at the object creation time and don’t modify it anymore: rabbit 
inherits from animal, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype 
“on-the-fly” with Object.setPrototypeOf or obj.__proto__= is a very slow 
operation as it breaks internal optimizations for object property access 
operations. So avoid it unless you know what you’re doing, or JavaScript speed 
totally doesn’t matter for you. */