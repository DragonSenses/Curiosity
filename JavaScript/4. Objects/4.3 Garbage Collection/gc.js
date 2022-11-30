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

/* Two References */
user = {        // user has a reference to the object
    name: "Luna"
};

// Copy the reference from user to admin
let admin = user;

user = null;    // overwrite value of user

// But object {name: "Luna"} is still reachable via admin global variable, so
// it must stay in memory. Overwriting admin too, then it can be removed

/* Complex Example: Interlinked Objects */
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman
    }
}

let family = marry({
    name: "Leo"
}, {
    name: "Luna"
});

/* The function marry() "marries" two objects by giving them references to each
other and returns a new object that contains them both. 

family object contains father & mother references to both of them
family {
    father: { name: "Leo",
              wife: "Luna"
            },       
    mother: { name: "Luna",
           husband: "Leo"
            }
}

While "Leo" references "Luna" through wife, and "Luna" references "Leo" through husband
*/

// Remove two references to Leo
delete family.father;
delete family.mother.husband;


/* Deleting two of these references makes it so that there is no incoming
reference to Leo anymore. Outgoing references do not matter. Only incoming
ones can make an object reachable. So Leo is unreachable and will be removed
from the memory with all its data that also became unaccessible. 

family {
    mother: { name: "Luna",
            } 
            
*/

/* Unreachable Island 
It is possible that the whole island of interlinked objects becomes unreachable
and is removed from the memory.

The source object is the same as above.
*/
family = marry({
    name: "Leo"
}, {
    name: "Luna"
});

// Then we overwrite the value of family reference
family = null;

// Now Leo and Luna are still linked, both have incoming references, but that's
// not enough. Since the former "family" object, made through the marry() 
// function, has been unlinked from the root, there's no reference to it anymore
// Result: The whole island is unreachable and will be removed

/* Internal Algorithms 
Basic Garbage Collection Algorithm is called "Mark-and-Sweep".
    The following "garbage collection" steps are regularly performed:

    - The garbage collector takes roots and "marks" (remembers) them.
    - Then it visits and “marks” all references from them.
    - Then it visits marked objects and marks their references. All visited
    objects are remembered, so as not to visit the same object twice in the future.
    …And so on until every reachable (from the roots) references are visited.
    - All objects except marked ones are removed.

*/