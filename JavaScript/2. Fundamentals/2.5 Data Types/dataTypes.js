/**
 * Data Types
 * 
 * - A value in JavaScript is always of a certain type (e.g., string or number).
 * - JavaScript is dynamically typed
 * - There are 8 basic data types in JavaScript.
 */

/* Seven primitive data types:
    1. number for numbers of any kind: integer or floating-point, integers are limited by ±(253-1).
    2. bigint for integer numbers of arbitrary length.
    3. string for strings. 
        - A string may have zero or more characters, there’s no separate single-character type.
    4. boolean for true/false.
    5. null for unknown values – a standalone type that has a single value null.
    6. undefined for unassigned values – a standalone type that has a single value undefined.
    7. symbol for unique identifiers.
    
And one non-primitive data type:
    8. object for more complex data structures.

The typeof operator allows us to see which type is stored in a variable.
    - Usually used as typeof x, but typeof(x) is also possible.
    - Returns a string with the name of the type, like "string".
    - For null returns "object" – this is an error in the language, it’s not actually an object.
 */

/* JavaScript is Dynamically Typed, meaning that there exist data types, but
variables are not bound to any of them.

In short, we can put any type in a variable. e.g., a variable can at one moment
be a string and then store a number. */

let message = "hello";
message = 142857;   

/* Number type represents both integer and floating point numbers 
Operations: * / + - 
Special Numeric Values belong to this data type: Infinity, -Infinity, and NaN
*/
let n = 123;
n = 12.345; 

// Infinity represents mathematical infinity
alert( 1 / 0 );     // Infinity
alert( Infinity );  // Reference Infinity directly

// NaN represents a computational error. Result of an incorrect or undefined
// mathematical operation
alert( "not a number" / 2); 