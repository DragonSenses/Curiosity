/* Type Conversions 
Most of the time, operators and functions automatically convert the values 
given to them to the right type.
    
String Conversion 
    When we need String form of a value, we use String(value) function to 
    convert. 
    - false becomes "false", null becomes "null"

Numeric Conversion
    Use Number(value) functiton to explicitly convert a value to a number. 
    Also happens in mathematical functions and expressions automatically. 
    - If string is not a valid number, the result of conversion is NaN
    
Numeric Conversion Rules:
    undefined       -> NaN
    null            -> 0
    true and false  -> 1 and 0
Strings | All whitespaces ("spaces, tabs \t, newlines \n, etc.) are trimmed (removed from start and end)
    empty string    -> 0
    number string   -> number is "read" from string
    error string    -> NaN

Boolean Conversion
    
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