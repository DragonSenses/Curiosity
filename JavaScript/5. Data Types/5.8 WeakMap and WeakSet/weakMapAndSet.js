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

/* WeakMap */
/* The first difference between Map and WeakMap is that keys must be objects, 
not primitive values: */
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object

/* Now, if we use an object as the key in it, and there are no other references 
to that object – it will be removed from memory (and from the map) automatically. */

luna = { name: "Luna" };

weakMap = new WeakMap();
weakMap.set(luna, "...");

luna = null; // overwrite the reference

// luna is removed from memory!

/* Compare it with the regular Map example above. Now if luna only exists as the key of WeakMap – 
it will be automatically deleted from the map (and memory). */

/* WeakMap does not support iteration and methods keys(), values(), entries(), 
so there’s no way to get all keys or values from it.

WeakMap has only the following methods: 
 -weakMap.set(key, value)
 -weakMap.get(key)
 -weakMap.delete(key)
 -weakMap.has(key)

Why such a limitation? That’s for technical reasons. 
If an object has lost all other references (like luna in the code above), then 
it is to be garbage-collected automatically. But technically it’s not exactly 
specified when the cleanup happens.

The JavaScript engine decides that. It may choose to perform the memory cleanup 
immediately or to wait and do the cleaning later when more deletions happen. 
So, technically, the current element count of a WeakMap is not known. The engine 
may have cleaned it up or not, or did it partially. For that reason, methods 
that access all keys/values are not supported.
*/

// Where do we need such a data structure?
/* Use Case: Additional Data */
/* The main area of application for WeakMap is an additional data storage.

If we’re working with an object that “belongs” to another code, maybe even a third-party library, 
and would like to store some data associated with it, that should only exist 
while the object is alive – then WeakMap is exactly what’s needed.

We put the data to a WeakMap, using the object as the key, and when the object 
is garbage collected, that data will automatically disappear as well. */

weakMap.set(leo, "secret documents");
// if leo dies, secret documents will be destroyed automatically

/* Example: For instance, we have code that keeps a visit count for users. 
The information is stored in a map: a user object is the key and the visit count
 is the value. When a user leaves (its object gets garbage collected), we don’t 
 want to store their visit count anymore.

Here’s an example of a counting function with Map: */
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// And here’s another part of the code, maybe another file using it:
// 📁 main.js
luna = { name: "Luna" };

countUser(luna); // count her visits

// later luna leaves us
luna = null;

/* Now, luna object should be garbage collected, but remains in memory, as it's
a key in visitsCountMap. 

We need to clean visitsCountMap when we remove users, otherwise it will grow 
in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to WeakMap instead: */
// 📁 visitsCount.js
visitsCountMap = new WeakMap(); // weakmap: user => visits count

// increase the visits count
// function countUser(user) {
//   let count = visitsCountMap.get(user) || 0;
//   visitsCountMap.set(user, count + 1);
// }

/* Now we don’t have to clean visitsCountMap. After luna object becomes unreachable, 
by all means except as a key of WeakMap, it gets removed from memory, along with 
the information by that key from WeakMap. */

/* Use Case: Caching */
/* Another common example is caching. We can store (“cache”) results from a 
function, so that future calls on the same object can reuse it.

To achieve that, we can use Map (not optimal scenario): */
// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// Now we use process() in another file:

// 📁 main.js
obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

console.log(result1 + " " + result2);

console.log(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)


/* For multiple calls of process(obj) with the same object, it only calculates 
the result the first time, and then just takes it from cache. The downside is 
that we need to clean cache when the object is not needed any more.

If we replace Map with WeakMap, then this problem disappears. The cached result 
will be removed from memory automatically after the object gets garbage collected. */