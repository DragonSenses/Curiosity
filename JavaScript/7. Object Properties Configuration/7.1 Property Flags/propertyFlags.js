/* Property flags and descriptors */
/* As we know, objects can store properties.

Until now, a property was a simple “key-value” pair to us. But an object 
property is actually a more flexible and powerful thing.

Introducing additional configuration options. */

/* Property Flags */
/* Object properties, besides a value, have three special attributes 
(so-called “flags”):

  - writable – if true, the value can be changed, otherwise it’s read-only.
  - enumerable – if true, then listed in loops, otherwise not listed.
  - configurable – if true, the property can be deleted and these attributes 
  can be modified, otherwise not.

We didn’t see them yet, because generally they do not show up. When we create a 
property “the usual way”, all of them are true. But we also can change them anytime.

First, let’s see how to get those flags.

The method Object.getOwnPropertyDescriptor allows to query the full information 
about a property.

The syntax is: 
  let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
  
  - obj: The object to get information from.
  - propertyName: The name of the property.

The returned value is a so-called “property descriptor” object: it contains the
value and all the flags.

For instance:
*/
let user = {
  name: "Luna"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "Luna",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

/* To change the flags, we can use Object.defineProperty.

The syntax is: 
  Object.defineProperty(obj, propertyName, descriptor)
  
  - obj, propertyName: The object and its property to apply the descriptor.
  - descriptor: Property descriptor object to apply.

If the property exists, defineProperty updates its flags. Otherwise, it creates 
the property with the given value and flags; in that case, if a flag is not 
supplied, it is assumed false.

For instance, here a property name is created with all falsy flags:

let user = {};
*/
user = {};

Object.defineProperty(user, "name", {
  value: "Luna"
});

descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "Luna",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

/* Compare it with “normally created” user.name above: now all flags are falsy. 
If that’s not what we want then we’d better set them to true in descriptor.

Now let’s see effects of the flags by example. */


/* Non-writable */
/* Let’s make user.name non-writable (can’t be reassigned) by changing writable 
flag: */
user = {
  name: "Luna"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Berry"; // Error: Cannot assign to read only property 'name'

/* Now no one can change the name of our user, unless they apply their own 
defineProperty to override ours. */

/* Errors appear only in strict mode */
/* In non-strict mode, no errors occur when writing to non-writable properties 
and such. But the operation still won’t succeed. Flag-violating actions are 
just silently ignored in non-strict. */

/* Here’s the same example, but the property is created from scratch: */

user = { };

Object.defineProperty(user, "name", {
  value: "Luna",
  // for new properties we need to explicitly list what's true
  enumerable: true,
  configurable: true
});

console.log(user.name); // Luna
user.name = "Berry"; // Error


/* Non-enumerable */
/* Now let’s add a custom toString to user.

Normally, a built-in toString for objects is non-enumerable, it does not show 
up in for..in. But if we add a toString of our own, then by default it shows 
up in for..in, like this: */
user = {
  name: "Luna",
  toString() {
    return this.name;
  }
};

// By default, both our properties are listed:
for (let key in user) console.log(key); // name, toString

/* If we don’t like it, then we can set enumerable:false. Then it won’t appear 
in a for..in loop, just like the built-in one: */
Object.defineProperty(user, "toString", {
  enumerable: false
});

// Now our toString disappears:
for (let key in user) console.log(key); // name

/* Non-enumerable properties are also excluded from Object.keys: */
console.log(Object.keys(user)); // name


/* Non-configurable */
/* The non-configurable flag (configurable:false) is sometimes preset for 
built-in objects and properties.

A non-configurable property can’t be deleted, its attributes can’t be modified.

For instance, Math.PI is non-writable, non-enumerable and non-configurable: */
let mathPiDescriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

console.log( JSON.stringify(mathPiDescriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

/* So, a programmer is unable to change the value of Math.PI or overwrite it. */
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either

/* We also can’t change Math.PI to be writable again: */
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });

/* There’s absolutely nothing we can do with Math.PI.

Making a property non-configurable is a one-way road. 
We cannot change it back with defineProperty. */

/* Please note: configurable: false prevents changes of property flags and its
deletion, while allowing to change its value. */

/* Here user.name is non-configurable, but we can still change it (as it’s writable): */
user = { 
  name: "Luna"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Leo"; // works fine
delete user.name; // Error

/* And here we make user.name a “forever sealed” constant, just like the 
built-in Math.PI: */
user = { 
  name: "Luna"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// won't be able to change user.name or its flags
// all this won't work:
user.name = "Leo";
delete user.name;
Object.defineProperty(user, "name", { value: "Leo" });


/* The only attribute change possible: writable true -> false */
/* There’s a minor exception about changing flags.
We can change writable: true to false for a non-configurable property, thus 
preventing its value modification (to add another layer of protection). 
Not the other way around though. */

/* Object.defineProperties */
/* There’s a method Object.defineProperties(obj, descriptors) that allows to 
define many properties at once.

The syntax is: 

Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});

For instance:

Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});

So, we can set many properties at once.
*/


/* Object.getOwnPropertyDescriptors() */
/* To get all property descriptors at once, we can use the method 
  Object.getOwnPropertyDescriptors(obj).

Together with Object.defineProperties it can be used as a “flags-aware” way 
of cloning an object: 

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

Normally when we clone an object, we use an assignment to copy properties, like this:

for (let key in user) {
  clone[key] = user[key]
}

…But that does not copy flags. So if we want a “better” clone then 
Object.defineProperties is preferred.

Another difference is that for..in ignores symbolic and non-enumerable 
properties, but Object.getOwnPropertyDescriptors returns all property 
descriptors including symbolic and non-enumerable ones.
*/

/* Sealing an object globally */
/* Property descriptors work at the level of individual properties.

There are also methods that limit access to the whole object: 

  * Object.preventExtensions(obj) - Forbids the addition of new properties to the object.
  * Object.seal(obj) - Forbids adding/removing of properties. 
                       Sets configurable: false for all existing properties.
  * Object.freeze(obj) - Forbids adding/removing/changing of properties. 
                       Sets configurable: false, writable: false for all existing properties.

And also there are tests for them:
  * Object.isExtensible(obj) - Returns false if adding properties is forbidden, 
                               otherwise true.
  * Object.isSealed(obj) - Returns true if adding/removing properties is 
                           forbidden, and all existing properties have configurable: false.
  * Object.isFrozen(obj) - Returns true if adding/removing/changing properties 
                           is forbidden, and all current properties are 
                           configurable: false, writable: false.

Note: These methods are rarely used in practice.
*/