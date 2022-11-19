/* Logical Operators - { OR, AND, NOT } 

There are 4 Logical Operators
1. OR   ||
2. AND  &&
3. NOT  !
4. Nullish Coalescing ??

Despite the logical (which implies boolean), these operators can be applied to
values of any type (not just boolean). Their result can also be of any type. 
Already JavaScript's deviation from logical operators of classical programming.

• "truthy value" defines an operand (variable or expression) that, when 
   converted to Boolean, becomes true
• "falsy values" are values that evaluate to false in a boolean context
• In JavaScript, a value is returned in its original form without conversion

                [Summary of JavaScript's Logical Operators]
OR ||     
Syntax: 
        result = value1 || value 2 || value3;
i. Gets the first truthy value from a list of variables or expressions
	• If result is true, stops and returns the original value of that operand
	• If all operands are have been evaluated (i.e. all were false), returns 
      the last operand
	• Values are returned in its original form, without the conversion
ii. Short-Circuit Evaluation - processes arguments until the first truthy value
    is reached, value is returned immediately, and skips the remaining arguments
    • Useful when executing commands only if the condition on the left is falsy

AND &&
Syntax: 
        result = value1 && value2 && value 3;
i. Gets the first falsy value from a list of variables or expressions
	• If result is false, stops and returns the original value of that operand
	• If all operands are have been evaluated (i.e. all were true), returns the 
      last operand
	• Values are returned in its original form, without the conversion
ii. && has higher precedence than ||
    • (a && b || c && d) is the same as (a && b) || (c && d)

NOT ! 
Syntax:
        result = !value;
i. Converts the operand to boolean type: {true, false}
	• Returns the inverse value of the converted boolean
ii. A double NOT !! is sometimes used for converted a value to a boolean type,
    more verbose way of doing the same thing as Boolean(value) function
    • Precedence of NOT ! is the highest of all logical operators, so it always
     executes first before && or ||
*/

/*      Boolean Conversion Rules
    Values that are intuitively "empty":
        0               ->  false
        empty string    ->  false
        null            ->  false
        undefined       ->  false
        NaN             ->  false
    Non-Empty Values
        "0"             ->  true
        " "             ->  true
         1              ->  true
        everything else ->  true 
*/

/* Recap of Classical Programming Logic

OR Truth Table   |   AND Truth Table  |   NOT Truth Table
x   y   x || y   |   x   y   x && y   |   x    !x
T   T     T      |   T   T      T     |   T     F
F   T     T      |   F   T      F     |
T   F     T      |   T   F      F     |
F   F     F      |   F   F      F     |

- OR || is only false when both operands (x,y) are false
- AND && is only true when both operands (x,y) are true
- NOT ! returns the inverse value
*/

/* OR || - finds the first truthy value 
- OR in classical programming is usually used in an if statement to test if any
of the conditions is true

- In JS, the OR follows this algorithm:
1. Evaluates Operands from Left to Right
2. For each operand, converts it to boolean. If the result is true, stops and 
returns the original value of that operand.
3. If all operands have been evaluated (i.e. all were false), returns the last operand.

In a chain of OR ||, it returns the first truthy value or the last one if no
truthy value is found. Values are returned in its original form.
*/

alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

console.log(null || NaN || undefined || false || 0 || 10); // outputs 10

let firstName = "";
let lastName = "";
let nickName = "MangoStick";

// If all variables were falsy, "No Name" would show up
alert( firstName || lastName || nickName || "No Name"); // Outputs "MangoStick"

/* Short-Circuit evaluation means it processes its arguments until the first 
truthy value is reached, then the value is returned immediately, without even
touching the other argument 

Used to execute commands only if the condition on the left part is falsy.
*/

true || alert("not printed");   // Stops at true, and skips the printing
false || alert("printed");      // Only this one is printed


/* AND && - finds the first falsy value 

- In JS, follows the algorithm:
1. Evaluates operands from left to right.
2. For each operand, converts it to a boolean. If the result is false, stops and
returns the original value of that operand.
3. If all operands have been evaluated (i.e. all were truthy), returns the last operand.

- AND returns:
    - the first falsy value or 
    - the last value if none were found. 

- AND && also has higher precedence than OR ||
*/

// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0

// Passing several values in a row, the first falsy is returned
alert( 1 && 2 && null && 3 ); // null

// When all values are truthy, the last value is returned
alert( 1 && 2 && 3 ); // 3, the last one

// The precedence of AND && operator is higher than OR ||
// The following expressions are essentially the same as if the && expressions
// were in parentheses:
// a && b || c && d; 
//(a && b) || (c && d) 

/* NOT !
    1. Converts the operand to boolean type: true/false.
    2. Returns the inverse value.

Not ! holds the highest precedence of all logical operators, so it executes first
before && or ||
*/

alert( !true ); // false
alert( !0 );    // true

// A double NOT !! is another way to do what Boolean(value) function does
// 1. The first NOT converts the value to boolean and returns the inverse
// 2. The second NOT inverses it again
// A plain value-to-boolean conversion

alert( !!"non-empty string" ); // true
alert( !!null ); // false

alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false