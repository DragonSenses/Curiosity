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