/* Type Conversions 
Most of the time, operators and functions automatically convert the values 
given to them to the right type.
    
String Conversion 
    When we need String form of a value, we use String(value) function to 
    convert. 
    - false becomes "false", null becomes "null"

Numeric Conversion
    Use Number(value) function to explicitly convert a value to a number. 
    Also happens in mathematical functions and expressions automatically. 
    - If string is not a valid number, the result of conversion is NaN
    
Numeric Conversion Rules:
    undefined       -> NaN
    null            -> 0
    true            -> 1 
    false           -> 0
Strings | All whitespaces ("spaces, tabs \t, newlines \n, etc.) are trimmed (removed from start and end)
    empty string    -> 0
    number string   -> number is "read" from string
    error string    -> NaN

Boolean Conversion
    Happens in logical operations but also be performed explicitly with a call
    to Boolean(value) 

Boolean Conversion Rules:
    Values that are intuitively "empty":
        0               ->  false
        empty string    ->  false
        null            ->  false
        undefined       ->  false
        NaN             ->  false
    Non-Empty Values
        "0"             ->  true
        " "             ->  true
         7              ->  true
        everything else ->  true
*/

/* String Conversion */
let value = true;
alert(typeof value);    // boolean

value = String(value);  // now value is a string "true"
alert(typeof value);    // string

/* Numeric Conversion */
alert( "6" / "2" );     // 3, strings are converted to numbers

let str = "123";        // Number(value) explicitly converts a value to a Number
alert(typeof str);      // string

let num = Number(str);  // becomes a number 123 
alert(typeof num);       // number

let age = Number("an arbitrary string instead of a number");
alert(age); // NaN, conversion failed

/* Numeric Conversion Rules  */
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
alert( Number(null));         // 0
alert( Number(undefined));    // NaN

/* Boolean Conversion Rules */
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false

alert( Boolean("0") ); // true
alert( Boolean(" ") ); // true for spaces (any non-empty string is true)