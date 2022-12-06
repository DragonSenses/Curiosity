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
