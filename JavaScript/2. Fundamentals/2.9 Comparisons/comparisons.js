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