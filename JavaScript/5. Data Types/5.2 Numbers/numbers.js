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