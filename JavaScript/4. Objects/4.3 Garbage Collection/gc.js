/* Garbage Collection in JavaScript

The Garbage Collector in JavaScript engine is a background process that monitors
all objects and removes those that have become unreachable. 

Summary
    -Garbage collection is performed automatically. We cannot force or prevent it.
    - Objects are retained in memory while they are reachable.
    - Being referenced is not the same as being reachable (from a root): a pack 
    of interlinked objects can become unreachable as a whole

In-depth knowledge of engines is good when you need low-level optimizations. 
It would be wise to plan that as the next step after you're familiar with the language.

Modern engines implement advanced algorithms of garbage collection.
    see: A tour of V8 Garbage Collection or V8 blog to learn more about the
    V8 internals in general
*/

/* Reachability - main concept of memory management

Simply put, "reachable" values are those that are accessible or usable somehow.
They are guaranteed to be stored in memory.

1. There's a base set of inherently reachable values, that cannot be deleted 
for obvious reasons. For instance:
    - The currently executing function, its local variables and parameters.
    - Other functions on the current chain of nested calls, their local variables and parameters.
    - Global variables.
    - (there are some other, internal ones as well)
These values are called roots.

2. Any other value is considered reachable if it's reachable from a root by a
reference or by a chain of references.

    For instance, if there's an object in a global variable, and that object
    has a property referencing another object, thhat object is considered 
    reachable. ANd those that it references are also reachable. 
*/

/* Simple Example */
let user = {        // user has a reference to the object
    name: "Leo"
};

user = null;        // value of user is overwritten, the reference is lost
// {name: "Leo"} becomes unreachable, no way to access it, no references to it
// Garbage Collector will junk the data and free the memory

