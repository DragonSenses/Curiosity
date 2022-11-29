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