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
