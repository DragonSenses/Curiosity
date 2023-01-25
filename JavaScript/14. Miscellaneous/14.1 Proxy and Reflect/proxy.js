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