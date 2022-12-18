/* WeakMap and WeakSet */
/* Summary
WeakMap is Map-like collection that allows only objects as keys and removes 
them together with associated value once they become inaccessible by other means.

WeakSet is Set-like collection that stores only objects and removes them once 
they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they 
can easily be removed by garbage collector.

That comes at the cost of not having support for clear, size, keys, values…

WeakMap and WeakSet are used as “secondary” data structures in addition to 
the “primary” object storage. Once the object is removed from the primary 
storage, if it is only found as the key of WeakMap or in a WeakSet, it will 
be cleaned up automatically.
*/

/* As we know from the chapter Garbage collection, JavaScript engine keeps a 
value in memory while it is “reachable” and can potentially be used.

For instance: */

let leo = { name: "Leo" };

// the object can be accessed, leo is the reference to it
console.log(leo);

// overwrite the reference
leo = null;

// the object will be removed from memory

/* Usually, properties of an object or elements of an array or another data 
structure are considered reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, 
the object will be alive as well, even if there are no other references to it.

Like this: */

let luna = { name: "Luna" };

let array = [ luna ];

luna = null;

// the object previously referenced by luna is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]

console.log(array[0]);

/* Similar to that, if we use an object as the key in a regular Map, then while 
the Map exists, that object exists as well. 
It occupies memory and may not be garbage collected. For instance: */
leo = { name: "Leo" };

let map = new Map();
map.set(leo, "...");

leo = null; // overwrite the reference

// leo is stored inside the map,
// we can get it by using map.keys()

/* WeakMap is fundamentally different in this aspect. It doesn’t prevent 
garbage-collection of key objects.*/