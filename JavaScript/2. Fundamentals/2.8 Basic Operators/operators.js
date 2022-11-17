/* Summary of Basic Operators and Mathematical Operations in JavaScript 

• Operands are what operators are applied to.
    e.g., in 5 * 2 the left operand is 5, the right operand is 2, operator is * (multiply)
• An operator is "Unary" if it has a single operand 
    e.g., in x = -x the "-" is unary negation and reverses the sign of a singled operand number
• An operator is "Binary" if it has two operands
    e.g., y - x the "-" is subtraction in this expression

• Operations are add, subtract, multiply, divide, remainder(%), and exponentiation (**)
	○ a % b returns remainder of integer division of a/b
	○ a**b raise a to the power of b (ab)

• Binary "+" applied to strings concatenates (i.e. merges) them together
• Unary "+" applied to non-numbers converts it into a number (same as Number(val) function)

• Operator Precedence is the execution order is defined by their precedence, 
or the default priority order of operators. The order of how to evaluate an expression.

• Assignment Operator "=" has a low precedence of "2" so that calculations are 
done first and then "=" is evaluated storing the result
	○ Since "=" is an Assignment Operator , where all operators in JavaScript 
      return a value, then any value assigned will also be returned 
	○ e.g., x = value , writes value into x and then returns it
• Modify-In-Place operators both assign and operate (e.g., +=, -=, *=, /=)
• Increment/Decrement 
    ○ ++ increments (i.e. increases a variable by 1) 
    ○ -- decrements (i.e. decreases a variable by 1)
	○ prefix form:      ++counter
	○ postfix form:     counter++ 
    ○ Difference between prefix and postfix forms is when we use the return value
    of ++ or --
	○ ++ or -- only be applied to variables. If used on a value it will give an error.
• Bitwise Operations are supported
• Comma Operator evaluates several expressions dividing them by a comma "," 
    ○ Each of the expressions are evaluated but only the result of the last one is returned
*/

/* Terminology - unary, binary, operand */
let x = 1;
x = -x;     
alert( x );     // -1, unary negation was applied

x = 1, y = 3;
alert( y - x ); // 2, binary minus subtracts values

/* % - Remainder Operator */
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4

// *** - Exponentiation Operator 
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)

/* String Concatenation with binary + */
let s = "my" + "string";
alert(s);   // mystring
// If any operands is a string, then the other one is converted to a string too
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
// Operators work one after another, so it first sums, returns 4, then concatenates
alert(2 + 2 + '1' ); // "41" and not "221"

// Only binary + supports strings in such a way, other operators always converts
// their operands to numbers. e.g., subtraction (-) and division (/)
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers

/* Numeric Conversion, Unary "+" 
When applied to a single value, does nothing to numbers. But if operand is NOT 
a number, the unary plus (+) converts it into a number. 
Does the same thing as Number(value) function! (see Type Conversion)     */

// No effect on numbers
x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0

// Unary plus (+) is useful, e.g., getting values from HTML form fields
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings

// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5

/* Operator Precedence
    - Higher precedence executes first
    - If same precedence, execution order is from left to right
Precendence     Name               Sign
    14	        unary plus	        +
    14	        unary negation	    -
    13	        exponentiation	    **
    12	        multiplication	    *
    12	        division	        /
    11	        addition	        +
    11	        subtraction	        -
    2	        assignment	        =
*/
console.log(3 + 4 * 5); // 3 + 20
// expected output: 23

console.log(4 * 3 ** 2); // 4 * 9
// expected output: 36

let a;
let b;

console.log(a = b = 5);
// expected output: 5

/* Assignment Operator "=" returns a value */
// Assignment has low precedence so that calculations are done first, then "="
// is evaluated, storing the result in x
x = 2 * 2 + 1;
alert( x ); // 5

// Another Example
a = 1;
b = 2;

let c = 3 - (a = b + 1);    // (a = b + 1) result of expression is 3

alert( a ); // 3
alert( c ); // 0

/* Modify-In-Place or += , -=, *=, /= apply an operator to a variable and store
the new result in that same variable */
let n = 2;
n += 5; // now n = 7    (same as n = n + 5)
n *= 2; // now n = 14   (same as n = n * 2)

alert( n ); // 14

// Modify-And-Assign operators has same precedence has assignment "="
n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16