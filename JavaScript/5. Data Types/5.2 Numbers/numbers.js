/* Numbers in modern JavaScript */
/* Two types of numbers:
  1. Regular numbers in JavaScript are stored in 64-bit format IEEE-754, also 
  known as “double precision floating point numbers”.

  2. BigInt numbers represent integers of arbitrary length. They are sometimes 
  needed because a regular integer number can’t safely exceed (253-1) or be 
  less than -(253-1), as we mentioned earlier in the chapter Data types.

We will cover Regular Numbers here. 
*/

/* More ways to write a number! */
let oneBillion = 1000000000; // traditional way to write 1 billion

//  We can use underscore _ as the separator!
let billion = 1_000_000_000;

/* Here the underscore _ plays the role of "Syntactic Sugar", it makes the 
number more readable. The JavaScript engine simply ignores _ between digits. 
*/

console.log( oneBillion === billion ); // true, exactly the same one billion!

/* In real life, we try to avoid writing long sequences of zeroes. We try to
write something like "1bn" or "7.3bn" for 7 billion 300 million. We may even
use scientific notation (i.e. 1 x 10^9) */

/* In JavaScript, we can shorten a number by appending the letter "e" to it
specifying the zeroes count (i.e. "e" multiplies the number by 1 with the 
given zeroes count): */
billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes
alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)

1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000

let microsecond = 0.000001; // 1 microsecond (on millionth of a second)
console.log(microsecond == 1e-6); // five zeroes to the left from 1

/* A negative number after "e" means a division by 1 with the given number of zeroes: */
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times


/* Hex, Binary, & Octal numbers */
/* Hexadecimal numbers are widely used to represent colors, encode characters,
and for many other things. A shorter way to write them: 0x and then the number: 
*/
alert( 0xff ); // 255
alert( 0xFF ); // 255 (the same, case doesn't matter)

/* Binary & Octal are rarely used, but also suported using 0b and 0o prefixes: */
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides

/* num.toString(base) returns a string representation of num in the numeral system
with the given base. */
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111

/* The base can vary from 2 to 36. By default it’s 10.

  Common use cases for this are:

base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.

base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.

base=36 is the maximum, digits can be 0..9 or A..Z. The whole latin alphabet is
used to represent a number. 
  - A useful case for 36 is when we need to turn a long numeric identifier into 
something shorter, for example to make a short url. Can simply represent it in 
the numeral system with base 36: 
*/
alert( 123456..toString(36) ); // 2n9c

/* Two Dots ".." to call a method 

Please note that two dots in 123456..toString(36) is not a typo. 
If we want to call a method directly on a number, like toString in the example above,
then we need to place two dots .. after it.

If we placed a single dot: 123456.toString(36), then there would be an error, 
because JavaScript syntax implies the decimal part after the first dot. 
And if we place one more dot, then JavaScript knows that the decimal part 
is empty and now goes the method.

Also could write (123456).toString(36).
*/

/* Rounding */
/*  
 - Math.floor: Rounds down: 3.1 becomes 3, and -1.1 becomes -2.
 - Math.ceil:  Rounds up: 3.1 becomes 4, and -1.1 becomes -1.
 - Math.round: Rounds to the nearest integer: 3.1 becomes 3, 3.6 becomes 4, 
               the middle case: 3.5 rounds up to 4 too.
 - Math.trunc (not supported by Internet Explorer): Removes anything after the 
decimal point without rounding: 3.1 becomes 3, -1.1 becomes -1.

What if we'd like to round the number to n-th digit after the decimal?
For instance, we have 1.2345 and want to round it to 2 digits, getting only 1.23.
  There are 2 ways to do so:
*/

/* 1. Multiply-and-Divide - to round the number to the 2nd digit after decimal,
we can multiply the number by 100, call the rounding function then divide it back
*/
num = 1.23456;

alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23

/* 2. method toFixed(n) rounds the number n digits after the point and returns
a string representation of the result */
num = 12.34;
alert( num.toFixed(1) ); // "12.3"

// Similar to Math.round, rounds up or down to nearest value:
num = 12.36;
alert( num.toFixed(1) ); // "12.4"

// Note: result of toFixed() is a string. If decimal part is shorter than required,
// zeroes are appended to the end:
num = 12.34;
alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
// Can convert it to a number using unary plus or a Number() call 
// e.g., write +num.toFixed(5);

/*  */