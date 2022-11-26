/* A recap of JavaScript's subtle features */

/* Code Structure */

// Statements are delimited with a semicolon
alert('Hello'); alert('World');

// Usually, a line-break is also treated as a delmiter
alert('Hello')
alert('World')

// That’s called "automatic semicolon insertion". 
// Sometimes it doesn’t work, for instance:
alert("There will be an error after this message")

[1, 2].forEach(alert)

// Most codestyle guides agree to put a semicolon after each statement

// Semicolons are not required after code blocks {...} and syntax constructs 
// with them like loops. Putting an extra semicolon is not an error, it will be ignored.
function f() {
    // no semicolon needed after function declaration
}

for (; ;) {
    // no semicolon needed after the loop
}

/* Strict Mode 
Start scripts with "use strict" to enable all features of modern JavaScript.
Directive must be at top of script or beginning of a function body. 
*/

/* Variables can be declared using 
    - let
    - const (constant, can't be changed) 
    - var (old-style)
*/

/* Variable Names can include:
- Letters and digits, but the first character may not be a digit.
- Characters $ and _ are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.
*/

/* Variables are Dynamically Typed. Can store any value: */
let x = 5;
x = "John";

/* 8 Data Types:
    1. number for both floating-point and integer numbers,
    2. bigint for integer numbers of arbitrary length,
    3. string for strings,
    4. boolean for logical values: true/false,
    5. null – a type with a single value null, meaning “empty” or “does not exist”,
    6. undefined – a type with a single value undefined, meaning “not assigned”,
    7. symbol for unique identifiers
    8. object for complex data structures 
*/

/* typeof operator returns the type for a value with two exceptions */
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially


/* Interaction, using a browser as a working environment 
Basic UI functions will be:
    - prompt(question, [default])
    Ask a question, and return either what the visitor entered or null if 
    they clicked "cancel".
    
    - confirm(question)
    Ask a question and suggest to choose between Ok and Cancel. 
    The choice is returned as true/false.

    - alert(message)
    Output a message.

All these functions are "Modal", they pause the code execution and prevent the
visitor from interacting with the page until they answer.
*/
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true


/* Operators 
    Arithmetical
Regular: * + - /, also % for the remainder and ** for power of a number.

The binary plus + concatenates strings. And if any of the operands is a string,
the other one is converted to string too:
*/
alert( '1' + 2 ); // '12', string
alert( 1 + '2' ); // '12', string

/* 
Assignments
There is a simple assignment: a = b and combined ones like a *= 2.

Bitwise
Bitwise operators work with 32-bit integers at the lowest, bit-level.

Conditional
The only operator with three parameters: cond ? resultA : resultB. 
If cond is truthy, returns resultA, otherwise resultB.

Logical operators
Logical AND && and OR || perform short-circuit evaluation and then return the 
value where it stopped (not necessary true/false). Logical NOT ! converts the 
operand to boolean type and returns the inverse value.

Nullish coalescing operator
The ?? operator provides a way to choose a defined value from a list of 
variables. The result of a ?? b is a unless it's null/undefined, then b.
*/

/* Comparisons 
Equality check == for values of different types converts them to a number 
(except null and undefined that equal each other and nothing else), 
so these are equal:
*/
alert( 0 == false ); // true
alert( 0 == '' ); // true

/* Other comparisons convert to a number as well.

    Strict Equality Operator === doesn’t do the conversion: 
        different types always mean different values for it.

    Values null and undefined are special: 
        they equal == each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, 
        other types are converted to a number.
*/

/*  Other Operators:
    Comma Operator allows evaluating several expressions dividing them with a 
comma , 
    Each of them is evaluated but only the result of the last one is returned.
Has a very low precdence, even lower than "=" assignment
*/

let a = (1 + 2, 3 + 4); 

alert( a ); // 7 (the result of 3 + 4)

// Without parentheses, a = 1 + 2, 3 + 4 evaluates to a = 3, 7 which assigns 3 to a,
// the rest is ignored. (a = 1 + 2), 3 + 4, 

/* Loops 
3 Types:
// 1. while loop
while (condition) {
  ...
}

// 2. do while loop
do {
  ...
} while (condition);

// 3. for loop
for(let i = 0; i < 10; i++) {
  ...
}
    The variable declared in for(let...) loop is visible only inside the loop. 
But we can also omit let and reuse an existing variable.

Directives break/continue allow to exit the whole loop/current iteration. 
Use labels to break nested loops.
*/

/* switch construct 
Replaces multiple if checks, it uses === (strict equality) for comparisons.
*/
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}

/* Functions - 3 Ways to create a Function in JavaScript */

/* 1. Function Declaration: the function in the main code flow */
function sum(a, b) {
    let result = a + b;
  
    return result;
}

/* 2. Function Expression: the function in the context of an expression */
let sum = function(a, b) {
    let result = a + b;
  
    return result;
};

/* 3. Arrow functions: */
let sum = (a, b) => a + b;      // expression on the right side

// or multi-line syntax with { ... }, need return here:
let sum = (a, b) => {
  // ...
  return a + b;
}

// without arguments
let sayHi = () => alert("Hello");

// with a single argument
let double = n => n * 2;

/* 
    Functions may have local variables: those declared inside its body or its 
parameter list. Such variables are only visible inside the function.

    Parameters can have default values: function sum(a = 1, b = 2) {...}.

    Functions always return something. If there’s no return statement, 
then the result is undefined. 
*/