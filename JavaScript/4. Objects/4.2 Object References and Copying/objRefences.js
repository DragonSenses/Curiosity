/* Object References and Copying */
/* Fundamental differences of Objects vs. Primitives: 
    - Objects are stored and copied "by reference"
    - Primitive values: string, numbers, booleans are copied "as a whole value"

Summary
    Objects are assigned and copied by reference. A variable stores not the 
"object value", but a "reference" (address in memory) for the value. So 
copying such a variable or passing it as a function argument copies that
reference, not the object itself.

    All operations via copied references (like add/removing properties) are 
performed on the same single object.

    To make a "real copy" (i.e. a clone) we can use Object.assign for the 
so-called "shallow copy" (nested objects are copied by reference) or a 
"deep cloning" function structuredClone or use a custom cloning implementation,
such as _.cloneDeep(obj)
*/

// Copying a primitive (string) 
let message = "Hello!";
let phrase = message;

// Two independent variables, each one storing the string "Hello!"


/* Copying an Object */
/* Variable assigned to an object stores NOT the object itself, but its 
"address in memory" or "reference" to it 

The object is stored somewhere in memory, while the user variable has a  
reference to it. When we perform actions with the object, the JavaScript 
engine looks at what address and performs the operations on the actual object. 

When a variable is copied, the reference is copied, but the object itself is
not duplicated.
*/

let user = {
    name: "Leo"
};

let admin = user; // copy the reference

// Now we have two variables, each storing a reference to the same object

// Changing the "name" property using the "admin" reference
admin.name = 'Luna';     

// Calling the "name" property through the "user" reference
console.log(user.name); // Luna


/* Comparison by Reference */
/* Two objects are equal only if they are the same object.  */
let a = {};
let b = a; // copy the reference

console.log( a == b );  // true, both variables reference the same object
console.log( a === b ); // true

/* Two Independent objects are not equal, even though tey look alike 
(both are empty): */
let c = {};
let d = {}; // Two Independent Objects

console.log(c == d); // false

/* Warning! const objects can be modified! A side effect of storing objects as 
references is that an object declared as const can be modified. */
const biome = {
    name: "Rainforest"
};

biome.name = "Chaparral";

console.log(biome.name); // Chaparral
/* Value of biome is constant, meaning that it MUST ALWAYS reference the SAME object,
but properties of that object are free to change. 

"const biome" only gives an error when we try to set "biome=..." as a whole */

/* Cloning and Merging */
/* We can create a new object and replicating the structure of the existing 
one, by iterating over its properties and copying them on the primitive level.
*/
let person = {      // Create person obj, with properties {name,age}
    name: "Luna",
    age: 20
};

let clone = {}; // the new empty object

// Copy all user properties into it
for (let prop in person){
    clone[prop] = person[prop];
}

// Now clone is a fully independent object with the same content
clone.name = "Lily"; // changed data, rename clone

console.log( person.name ); // still Luna in the original object
console.log( clone.name );  // Lily
console.log( clone.age );   // 20

/* Cloning using "Object.assign" */
/* Syntax:
            Object.assign(dest, ...sources)

            - first argument dest is a target object
            - Further arguments is a list of source objects
Copies the properties of all source objects into the target dest, and then 
    returns it as the result.
*/

let pilot = { name: 'Zoe' };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into pilot
Object.assign(pilot, permissions1, permissions2);

// pilot = { name: 'Zoe', canView: true, canEdit: true }
console.log(pilot.name);    // Zoe
console.log(pilot.canView); // true
console.log(pilot.canEdit); // true

// If copied property name already exists, it gets overwritten
Object.assign(pilot, {name: 'Olivia' });
console.log(pilot.name);    // now pilot = { name: "Olivia" }

/* Object.assign can perform a simple object cloning.
Here it copies all properties of student into the empty object and returns it:
*/
let student = {
    name: "Sophia",
    age: 20
};

let copy = Object.assign({}, student);

console.log(copy.name); // Sophia
console.log(copy.age);  // 20

/* Nested Cloning */
/* So far all properties of the objects we had were primitive, but properties
can be references to other objects. 
e.g: */
let box = {
    name: "Rose",
    sizes: {
        height: 182,
        width: 50
    }
};

console.log( box.sizes.height ); // 182

// It is not sufficient to copy clone.sizes = box.sizes, because box.sizes is an obj
// and will be copied by reference, so clone and user will share the same sizes:

clone = Object({}, box);
console.log( box.sizes === clone.sizes ); // true, same object

// box and clone share sizes 
box.sizes.width = 60;             // change a property from one place
console.log( clone.sizes.width ); // 60, get the result from the other one

// Fix to make box and clone truly separate objects, use a cloning loop that
// examines each value of box[key] and, if it's an object, then replicate its
// structure as well

/* Deep Cloning or Structured Cloning (using structuredClone(obj) method) */
/* structuredClone(object) method clones the object with all nested properties 
        - can clone most data types, such as objects, arrays, primitive values
        - supports circular references, when an object property references the
        object itself (directly or via a chain or referencers)
*/

let flower = {
    name: "Orchid",
    sizes: {
        height: 182,
        width: 50
    }
};

let flowerClone = structuredClone(flower);

console.log( flower.sizes === flowerClone.sizes );  // false, different objects

// flower and flowerClone are truly separate objects
flower.sizes.width = 70;                // change a property from one place
console.log( flowerClone.sizes.width ); // 50, change is unrelated


/* structuredClone supports circular references (references to itself) */
let test = {};
// Create a circular reference: test.me references the test object itself
test.me = test;

clone = structuredClone( test );
console.log( clone.me === clone ); // true
// clone.me references the clone and not the test! So the circular reference
// was clone correctly as well

/* Cases where structuredClone fails: 
    - When an object has a function property
*/

// error
structuredClone({
    f: function() {}
});

/*
To handle such complex cases, may need to use a combination of cloning methods,
write custom code, or take existing implementations such as _.cloneDeep(obj) 
from JavaScript library lodash.
*/