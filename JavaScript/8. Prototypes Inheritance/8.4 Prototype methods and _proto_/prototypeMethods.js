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