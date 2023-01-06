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
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
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
  value: "John"
});

descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

/* Compare it with “normally created” user.name above: now all flags are falsy. 
If that’s not what we want then we’d better set them to true in descriptor.

Now let’s see effects of the flags by example. */