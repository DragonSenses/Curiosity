/* Proxy */
/* Summary

Proxy is a wrapper around an object, that forwards operations on it to the 
object, optionally trapping some of them.

It can wrap any kind of object, including classes and functions.

The syntax is:

let proxy = new Proxy(target, {
  // traps
});

…Then we should use proxy everywhere instead of target. A proxy doesn’t have 
its own properties or methods. It traps an operation if the trap is provided,
otherwise forwards it to target object.

We can trap:
  - Reading (get), writing (set), deleting (deleteProperty) a property (even a non-existing one).
  - Calling a function (apply trap).
  - The new operator (construct trap).
  - Many other operations (the full list is in the docs).

That allows us to create “virtual” properties and methods, implement default values, 
observable objects, function decorators and so much more.

We can also wrap an object multiple times in different proxies, decorating it 
with various aspects of functionality.

The Reflect API is designed to complement Proxy. For any Proxy trap, there’s a 
Reflect call with same arguments. We should use those to forward calls to target objects.

Proxies have some limitations:
  - Built-in objects have “internal slots”, access to those can’t be proxied. See the workaround above.
  - The same holds true for private class fields, as they are internally 
  implemented using slots. So proxied method calls must have the target 
  object as this to access them.
  - Object equality tests === can’t be intercepted.
  - Performance: benchmarks depend on an engine, but generally accessing a 
  property using a simplest proxy takes a few times longer. In practice that 
  only matters for some “bottleneck” objects though.
*/

/* A Proxy object wraps another object and intercepts operations, like 
reading/writing properties and others, optionally handling them on its own, 
or transparently allowing the object to handle them.

Proxies are used in many libraries and some browser frameworks. We’ll see 
many practical applications in this article. */

/* Proxy
The syntax: 

let proxy = new Proxy(target, handler)

  - target – is an object to wrap, can be anything, including functions.
  - handler – proxy configuration: an object with “traps”, methods that intercept 
  operations. – e.g. get trap for reading a property of target, set trap for 
  writing a property into target, and so on.


For operations on proxy, if there’s a corresponding trap in handler, then it 
runs, and the proxy has a chance to handle it, otherwise the operation is 
performed on target.

As a starting example, let’s create a proxy without any traps:

let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5; // writing to proxy (1)
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too (2)

for(let key in proxy) alert(key); // test, iteration works (3)

As there are no traps, all operations on proxy are forwarded to target.

  1. A writing operation proxy.test= sets the value on target.
  2. A reading operation proxy.test returns the value from target.
  3. Iteration over proxy returns values from target.

As we can see, without any traps, proxy is a transparent wrapper around target.

                proxy
                 ---------------
get proxy.test  |     target    |
--------------> | --> [test:5]  |
<-------------- | <--           |
                 ---------------
*/

/* Proxy is a special “exotic object”. It doesn’t have own properties. With an 
empty handler it transparently forwards operations to target.

To activate more capabilities, let’s add traps.

What can we intercept with them?

For most operations on objects, there’s a so-called “internal method” in the 
JavaScript specification that describes how it works at the lowest level. For 
instance [[Get]], the internal method to read a property, [[Set]], the internal
method to write a property, and so on. These methods are only used in the 
specification, we can’t call them directly by name.

Proxy traps intercept invocations of these methods. They are listed in the 
Proxy specification and in the table below.

For every internal method, there’s a trap in this table: the name of the 
method that we can add to the handler parameter of new Proxy to intercept 
the operation: 


Internal Method	        Handler Method	          Triggers when…
[[Get]]	                get	                      reading a property
[[Set]]	                set	                      writing to a property
[[HasProperty]]	        has	                      in operator
[[Delete]]	            deleteProperty	          delete operator
[[Call]]	              apply	                    function call
[[Construct]]	          construct	                new operator
[[GetPrototypeOf]]	    getPrototypeOf	          Object.getPrototypeOf
[[SetPrototypeOf]]	    setPrototypeOf	          Object.setPrototypeOf
[[IsExtensible]]	      isExtensible	            Object.isExtensible
[[PreventExtensions]]	  preventExtensions	        Object.preventExtensions
[[DefineOwnProperty]]	  defineProperty	          Object.defineProperty, Object.defineProperties
[[GetOwnProperty]]	    getOwnPropertyDescriptor	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
[[OwnPropertyKeys]]	    ownKeys	                  Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries
*/

/* Invariants */
/* JavaScript enforces some invariants – conditions that must be fulfilled 
by internal methods and traps.

Most of them are for return values: 
  - [Set]] must return true if the value was written successfully, otherwise false.
  - [[Delete]] must return true if the value was deleted successfully, otherwise false.
  - …and so on, we’ll see more in examples below.

There are some other invariants, like:

  -[[GetPrototypeOf]], applied to the proxy object must return the same value 
  as [[GetPrototypeOf]] applied to the proxy object’s target object. In other 
  words, reading prototype of a proxy must always return the prototype of the
  target object.
Traps can intercept these operations, but they must follow these rules.

Invariants ensure correct and consistent behavior of language features. The 
full invariants list is in the specification. You probably won’t violate them 
if you’re not doing something weird. */


/* Default value with “get” trap */
/* The most common traps are for reading/writing properties.

To intercept reading, the handler should have a method get(target, property, receiver).

It triggers when a property is read, with following arguments: 
  - target – is the target object, the one passed as the first argument to new Proxy,
  - property – property name,
  - receiver – if the target property is a getter, then receiver is the object that’s 
  going to be used as this in its call. Usually that’s the proxy object itself (or an 
  object that inherits from it, if we inherit from proxy). 
  Right now we don’t need this argument, so it will be explained in more detail later.

Let’s use get to implement default values for an object.

We’ll make a numeric array that returns 0 for nonexistent values.

Usually when one tries to get a non-existing array item, they get undefined, 
but we’ll wrap a regular array into the proxy that traps reading and returns 0 
if there’s no such property: */
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (no such item)

/* As we can see, it’s quite easy to do with a get trap.

We can use Proxy to implement any logic for “default” values.

Imagine we have a dictionary, with phrases and their translations: */

let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined

/* Right now, if there’s no phrase, reading from dictionary returns 
undefined. But in practice, leaving a phrase untranslated is usually 
better than undefined. So let’s make it return an untranslated phrase 
in that case instead of undefined.

To achieve that, we’ll wrap dictionary in a proxy that intercepts reading 
operations: */
{
  let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adiós'
  };
  
  dictionary = new Proxy(dictionary, {
    get(target, phrase) { // intercept reading a property from dictionary
      if (phrase in target) { // if we have it in the dictionary
        return target[phrase]; // return the translation
      } else {
        // otherwise, return the non-translated phrase
        return phrase;
      }
    }
  });
  
  // Look up arbitrary phrases in the dictionary!
  // At worst, they're not translated.
  alert( dictionary['Hello'] ); // Hola
  alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)
}

/* Please note how the proxy overwrites the variable: 

dictionary = new Proxy(dictionary, ...);

The proxy should totally replace the target object everywhere. No one should 
ever reference the target object after it got proxied. Otherwise it’s easy to mess up.
*/

/* Validation with “set” trap */
/* Let’s say we want an array exclusively for numbers. If a value of another 
type is added, there should be an error.

The set trap triggers when a property is written. 

set(target, property, value, receiver):
  - target – is the target object, the one passed as the first argument to new Proxy,
  - property – property name,
  - value – property value,
  - receiver – similar to get trap, matters only for setter properties.

The set trap should return true if setting is successful, and false otherwise (triggers TypeError).

Let’s use it to validate new values: */
{
  let numbers = [];

  numbers = new Proxy(numbers, { // (*)
    set(target, prop, val) { // to intercept property writing
      if (typeof val == 'number') {
        target[prop] = val;
        return true;
      } else {
        return false;
      }
    }
  });

  numbers.push(1); // added successfully
  numbers.push(2); // added successfully
  alert("Length is: " + numbers.length); // 2

  numbers.push("test"); // TypeError ('set' on proxy returned false)

  alert("This line is never reached (error in the line above)");
}
/* Please note: the built-in functionality of arrays is still working! 
Values are added by push. The length property auto-increases when values 
are added. Our proxy doesn’t break anything.

We don’t have to override value-adding array methods like push and unshift, 
and so on, to add checks in there, because internally they use the [[Set]] 
operation that’s intercepted by the proxy.

So the code is clean and concise. */

/* Don’t forget to return true

As said above, there are invariants to be held.

For set, it must return true for a successful write.

If we forget to do it or return any falsy value, the operation 
triggers TypeError. */


/* Iteration with “ownKeys” and “getOwnPropertyDescriptor” */
/* Object.keys, for..in loop and most other methods that iterate over 
object properties use [[OwnPropertyKeys]] internal method (intercepted 
  by ownKeys trap) to get a list of properties.

Such methods differ in details: 

  - Object.getOwnPropertyNames(obj) returns non-symbol keys.
  - Object.getOwnPropertySymbols(obj) returns symbol keys.
  - Object.keys/values() returns non-symbol keys/values with enumerable 
  flag (property flags were explained in the article Property flags and descriptors).
  - for..in loops over non-symbol keys with enumerable flag, and also prototype keys.

…But all of them start with that list.

In the example below we use ownKeys trap to make for..in loop over user, and 
also Object.keys and Object.values, to skip properties starting with an underscore _
*/
let user = {
  name: "Luna",
  age: 20,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" filters out _password
for(let key in user) alert(key); // name, then: age

// same effect on these methods:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // Luna,20

/* So far, it works.

Although, if we return a key that doesn’t exist in the object, 
Object.keys won’t list it: */
{
  let user = { };

  user = new Proxy(user, {
    // eslint-disable-next-line no-unused-vars
    ownKeys(target) {
      return ['a', 'b', 'c'];
    }
  });

  alert( Object.keys(user) ); // <empty>
}

/* Why? The reason is simple: Object.keys returns only properties with the 
enumerable flag. To check for it, it calls the internal 
method [[GetOwnProperty]] for every property to get its descriptor. And here, 
as there’s no property, its descriptor is empty, no enumerable flag, so it’s skipped.

For Object.keys to return a property, we need it to either exist in the object, 
with the enumerable flag, or we can intercept calls to [[GetOwnProperty]] (the 
trap getOwnPropertyDescriptor does it), and return a descriptor with enumerable: true.

Here’s an example of that: */
{
  let user = { };

  user = new Proxy(user, {
    // eslint-disable-next-line no-unused-vars
    ownKeys(target) { // called once to get a list of properties
      return ['a', 'b', 'c'];
    },

    // eslint-disable-next-line no-unused-vars
    getOwnPropertyDescriptor(target, prop) { // called for every property
      return {
        enumerable: true,
        configurable: true
        /* ...other flags, probable "value:..." */
      };
    }

  });

  alert( Object.keys(user) ); // a, b, c
}
/* Let’s note once again: we only need to intercept [[GetOwnProperty]] if 
the property is absent in the object. */



/* Protected properties with “deleteProperty” and other traps */
/* There’s a widespread convention that properties and methods prefixed 
by an underscore _ are internal. They shouldn’t be accessed from outside the object.

Technically that’s possible though: */
{
  let user = {
    name: "Luna",
    _password: "secret"
  };
  
  alert(user._password); // secret
}

/* Let’s use proxies to prevent any access to properties starting with _.

We’ll need the traps: 
  - get to throw an error when reading such property,
  - set to throw an error when writing,
  - deleteProperty to throw an error when deleting,
  - ownKeys to exclude properties starting with _ from for..in and methods like Object.keys.
  
Here’s the code: */
{
  let user = {
    name: "Luna",
    _password: "***"
  };
  
  user = new Proxy(user, {
    get(target, prop) {
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      }
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value; // (*)
    },
    set(target, prop, val) { // to intercept property writing
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      } else {
        target[prop] = val;
        return true;
      }
    },
    deleteProperty(target, prop) { // to intercept property deletion
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      } else {
        delete target[prop];
        return true;
      }
    },
    ownKeys(target) { // to intercept property list
      return Object.keys(target).filter(key => !key.startsWith('_'));
    }
  });
  
  // "get" doesn't allow to read _password
  try {
    alert(user._password); // Error: Access denied
  } catch(e) { alert(e.message); }
  
  // "set" doesn't allow to write _password
  try {
    user._password = "test"; // Error: Access denied
  } catch(e) { alert(e.message); }
  
  // "deleteProperty" doesn't allow to delete _password
  try {
    delete user._password; // Error: Access denied
  } catch(e) { alert(e.message); }
  
  // "ownKeys" filters out _password
  for(let key in user) alert(key); // name
}

/* Please note the important detail in the get trap, in the line (*): 

get(target, prop) {
  // ...
  let value = target[prop];
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
}

Why do we need a function to call value.bind(target)?

The reason is that object methods, such as user.checkPassword(), must be 
able to access _password:
*/
{
  user = {
    // ...
    checkPassword(value) {
      // object method must be able to read _password
      return value === this._password;
    }
  };
}


/* A call to user.checkPassword() gets proxied user as this (the object before 
  dot becomes this), so when it tries to access this._password, the get trap 
  activates (it triggers on any property read) and throws an error.

So we bind the context of object methods to the original object, target, in the
line (*). Then their future calls will use target as this, without any traps.

That solution usually works, but isn’t ideal, as a method may pass the 
unproxied object somewhere else, and then we’ll get messed up: where’s the 
original object, and where’s the proxied one?

Besides, an object may be proxied multiple times (multiple proxies may add 
different “tweaks” to the object), and if we pass an unwrapped object to a 
method, there may be unexpected consequences.

So, such a proxy shouldn’t be used everywhere. */

/* Private properties of a class */
/* Modern JavaScript engines natively support private properties in classes, 
prefixed with #. They are described in the article Private and protected 
properties and methods. No proxies required.

Such properties have their own issues though. In particular, they are not inherited. */


/* “In range” with “has” trap */