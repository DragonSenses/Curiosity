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

// NaN is sticky, i.e. any further mathematical operation on NaN returns NaN
alert( NaN + 1 ); // NaN
alert( 3 * NaN ); // NaN
alert( "not a number" / 2 - 1 ); // NaN

// If there's a NaN in expression, it propagates to the whole result
// One exception to that is NaN ** 0 is 1
alert( NaN ** 0 );

/* BigInt value are created by appending n to the end of an integer 
    Number data type cannot safely represent integer values larger than 2^53-1
    or 9007199254740991 or less than -(2^53-1) for negatives.

    To be precise, number data type can store large integers (up to 
    1.7976931348623157 * 10308) but outside of safe integer range +or- 2^53-1
    there'll be a precision error, because not all digits fit into fixed 64-bit
    storage. 
*/

// These two numbers (right above safe range) are the same
// In other words, all odd integers greater than (2^53-1) can't be stored in number type
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992

// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;

/* String data type must be surrounded by quotes in JavaScript*/
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;

// In JavaScript, there are 3 types of quotes:
str = "hello";
str = 'hello';
str = `hello`;

/* Double and single quotes are "simple" quotes. There’s practically no difference
between them in JavaScript.

Backticks are "extended functionality" quotes. They allow us to embed variables
and expressions into a string by wrapping them in ${…}, for example: */
let name = "John";

// embed a variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
alert( `the result is ${1 + 2}` ); // the result is 3

/* expression inside ${...} is evaluated and the result becomes a part of the
string. we can put anything in there: a variable or an arithmetical expression 

Only backticks have embedding functionality! 

There is no character type for a single char. 
*/

alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)

/* Boolean (logical type) 
Only has two values true and false.  */
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked

// Boolean values also come as a result of comparisons:
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")

/* The"null" value 
The special null value does not belong to any of the types described above. 
It forms a separate type of its own which contains only the null value

In JavaScript, null is not a "reference to a non-existing object" or a 
"null pointer" like some languages. It's just a special value which represents
"nothing", "empty" or "value unknown". 
*/
let age = null;     // code states that age is unknown

/* The "undefined" value 
The special value undefined also stands apart. 
It makes a type of its own, just like null.

The meaning of undefined is "value is not assigned".

If a variable is declared, but not assigned, then its value is undefined.    
Technically possible to explicitly assign undefined to a variable, but it is 
not recommended. Normally, one uses null to assign an "empty" or "unknown"
value to a variable, while undefined is reserved as a default initial value
for unassigned things.
*/
let empty;

alert(empty); // shows "undefined"

/* Objects
Object type is special.  
All other types are called "primitive" because their values can contain only a 
single thing (be it a string or a number or whatever). In contrast, objects 
are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment and will be explored later 
*/

/* Symbols
The symbol type is used to create unique identifiers for objects. 
*/

/* The typeof operator
Returns the type of the operand. Useful when we want to process values of different
types differently or just want to do a quick check. 

typeof(x) is the alternative syntax, which is the same. typeof is an operator 
not a function. The parenthese here aren't part of typeof. It's the kind of 
parantheses used for mathematical grouping. 

Usually, such parentheses contain a mathematical expression, such as (2 + 2), 
but here they contain only one argument (x). Syntactically, they allow to avoid 
a space between the typeof operator and its argument, and some people like it.

Some people prefer typeof(x), although the typeof x syntax is much more common.

A call to typeof x returns a string with the type name:
*/
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)

/* Explanation for last three lines 

1. Math is a built-in object that provides mathematical operations. Here, it 
serves just as an example of an object.  

2. The result of typeof null is "object". That’s an officially recognized error
in typeof, coming from very early days of JavaScript and kept for compatibility.
Definitely, null is not an object. It is a special value with a separate type 
of its own. The behavior of typeof is wrong here.

3. The result of typeof alert is "function", because alert is a function. 
Later we’ll also see that there’s no special "function" type in JavaScript. 
Functions belong to the object type. But typeof treats them differently, 
returning "function". That also comes from the early days of JavaScript. 
Technically, such behavior isn’t correct, but can be convenient in practice.
*/