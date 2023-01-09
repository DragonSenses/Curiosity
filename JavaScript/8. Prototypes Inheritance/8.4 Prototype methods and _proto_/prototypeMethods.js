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
  console.log(clone);
}

/* This call makes a truly exact copy of obj, including all properties: enumerable 
and non-enumerable, data properties and setters/getters – everything, and with 
the right [[Prototype]]. */