/* Comparisons in JavaScript */
/* Summary 
    - Comparison operators return a boolean value
    - Strings are compared letter-by-letter in "dictionary" order
    - When values of different types are compared, they get converted to 
    numbers 
    - Strict equality (i.e., "===") checks without Type Conversion
    - The values of null and undefined are equal "==" to each other and do not
    equal any other value.
        - With exception (null >= 0) is true, because of comparison & type conversion 
    - Be careful when using comparisons (i.e. < or >) with variables that can 
    occassionally be null or undefined. Check for null/undefined separately. 
*/

// Comparison Operators {>, <, >=, <=, ==} return a boolean value {true, false}
alert( 2 > 1 );  // true (correct) [the truth]
alert( 2 == 1 ); // false (wrong)  [not the truth]
alert( 2 != 1 ); // true (correct) [the truth]

//  Comparison Result can be assigned to a variable just like any value:
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true

/* Comparison of Different Types */
/* All Comparison Operators performs Number Conversion (i.e., converts the 
values to numbers) when comparing different types. 

Recall- Numeric Conversion Rules:
    undefined       -> NaN
    null            -> 0
    false           -> 0
    true            -> 1 
    '2'             -> 2
    "3"             -> 3

EXCEPTION where Type Conversion does not apply: using "==" on undefined/null.
Equality "==" between null or undefined is defined as they are equal only to 
{null or undefined}. They cannot be equal to any other value. 
*/

alert( '2' > 1 );    // true, string '2' becomes a number 2
alert( '01' == 1 );  // true, string '01' becomes a number 1
alert( true == 1 );  // true, boolean true becomes a number 1
alert( false == 0 ); // true, boolean false becomes a number 0

/* Consequence of Comparing & Conversion rules between Boolean and Number.
It is possible that at the same time:
    - Two values are equivalent
    - One of them is true as a boolean
    - The other is false as a boolean
e.g.,   String "0" and Number 0
After Numeric Conversion (where "0" becomes 0), but explicit Boolean Conversion 
follows another set of rules. "0" is a non-empty value which becomes true.
*/
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!    where 0 == "0"

/* Strict Equality (===) vs. Regular Equality (==) */
// Recall that regular equality "==" performs Number Conversion when comparing
// different types. Such that it cannot differentiate between 0 from false:
alert( 0 == false ); // true

// Or an empty string:
alert( '' == false ); // true

// Strict Equality (===), or 3 equals signs, checks equality WITHOUT Type Conversion
// If a and b are of different types, then a === b immediately returns false
alert( 0 === false ); // false, because the types are different
alert( '' === false); // false
alert( 0 === "0");    // false
alert( 1 === 2 );     // false, both are numbers but they are not equal
alert(true === true); // true

/* null & undefined are a 
"sweet couple" where they equal each other, itself but not any other value. */
alert( null === undefined);     // false, because they are different types
alert( null == undefined );     // true
alert( null == null );          // true
alert( undefined == undefined); // true

/* null & undefined with Comparison Operators {< , > , <=, >= } 
Number Conversion applies such that
    undefined       -> NaN
    null            -> 0
Consequences: Comparing null and undefined with 0 has different results
*/
// Comparing null with 0 yields: 
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true

/* Explanations: {==} is work differently from comparison operators {> < >= <=}
when comparing null. The latter operators perform number conversion, but the 
former is false because null is only equal to null or undefined, nothing else.

   (1) false, number conversion converts null to 0, and (0 > 0) is false
   (2) false, equality is defined is defined as they are equal only to 
              {null or undefined}. They cannot be equal to any other value.
   (3) true, number conversion converts null to 0, and (0 >= 0) is true
 */

/* undefined is Incomparable 
undefined cannot be compared to other values other than {null, undefined} 
because undefined is converted to NaN. 
Recall: NaN is a special numeric value that returns false for all comparisons. 
*/
alert( undefined > 0 );     // false (1)
alert( undefined < 0 );     // false (2)
alert( undefined == 0 );    // false (3)


/* What will be the result of these expressions? */
5 > 4                   
"apple" > "pineapple"
"2" > "12"
undefined == null
undefined === null
null == "\n0\n"
null === +"\n0\n"

/* Solution */
5 > 4                   // true
"apple" > "pineapple"   // false, a is smaller than p
"2" > "12"              // true, first character comparison: "2" is greater "1" 
undefined == null       // true
undefined === null      // false, different types
null == "\n0\n"         // false, null ONLY EQUALS undefined or null
null === +"\n0\n"       // false, different types