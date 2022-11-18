/* Post and Prefix Forms  
What are the final values of all variables in code below?
*/
let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?

/* Answer: a = 2, b = 2, c = 2, d = 1 */
alert( ++a ); // 2, prefix form returns the new value
alert( b++ ); // 1, postfix form returns the old value

alert( a ); // 2, incremented once
alert( b ); // 2, incremented once


/* Assignment Result - What are the values of a and x in code below? */
a = 2;

let x = 1 + (a *= 2);

/* Answer: a = 4 and x = 5 */

/* Type Conversions - What are the results of expressions below? */

"" + 1 + 0      
"" - 1 + 0
true + false
6 / "3"
"2" * "3"
4 + 5 + "px"
"$" + 4 + 5
"4" - 2
"4px" - 2
"  -9  " + 5
"  -9  " - 5
null + 1
undefined + 1
" \t \n" - 2

/* Solutions to Type Conversions */

"" + 1 + 0      // "10" String
"" - 1 + 0      // -1, Number
true + false    // 1 , Number
6 / "3"         // 2, Number
"2" * "3"       // 6, Number
4 + 5 + "px"    // 9px, String
"$" + 4 + 5     // $45, String
"4" - 2         // 2, Number
"4px" - 2       // NaN
"  -9  " + 5    //  -9  5, String because concatenation
"  -9  " - 5    // -14, Number, subtraction always converts to numbers      
null + 1        // 1, Number, null becomes 0 after numeric conversion
undefined + 1   // NaN, undefined turns to NaN after numeric conversion
" \t \n" - 2    // -2, Number, all whitespaces are trimmed