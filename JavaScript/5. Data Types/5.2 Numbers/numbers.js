/* Numbers in modern JavaScript */
/* Summary
To write numbers with many zeros:
  -Append "e" with the zeroes count to the number. 
  Like: 123e6 is the same as 123 with 6 zeroes 123000000.
  -A negative number after "e" causes the number to be 
  divided by 1 with given zeroes. E.g. 123e-6 means 0.000123 (123 millionths).

For different numeral systems:
  -Can write numbers directly in hex (0x), octal (0o) and binary (0b) systems.
  -parseInt(str, base) parses the string str into an integer in numeral 
  system with given base, 2 ≤ base ≤ 36.
  -num.toString(base) converts a number to a string in the numeral system 
  with the given base.

For regular number tests:
  -isNaN(value) converts its argument to a number and then tests it for being NaN
  -Number.isNaN(value) checks whether its argument belongs to the number type, 
  and if so, tests it for being NaN
  -isFinite(value) converts its argument to a number and then tests it for not 
  being NaN/Infinity/-Infinity
  -Number.isFinite(value) checks whether its argument belongs to the number type, 
  and if so, tests it for not being NaN/Infinity/-Infinity

For converting values like 12pt and 100px to a number:
  -Use parseInt/parseFloat for the “soft” conversion, which reads a number from 
  a string and then returns the value they could read before the error.

For fractions:
  -Round using Math.floor, Math.ceil, Math.trunc, Math.round or num.toFixed(precision).
  -Make sure to remember there’s a loss of precision when working with fractions.

More mathematical functions:
  -See the Math object when you need them. The library is very small, 
  but can cover basic needs.
*/

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

/* Imprecise Calculations */
/* Internally, a number is represented in 64-bit format IEEE-754, so there are 
exactly 64 bits to store a number: 52 of them are used to store the digits, 
11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a 
special numeric value Infinity: */
// eslint-disable-next-line no-loss-of-precision
alert( 1e500 ); // Infinity 

/* What may be a little less obvious, but happens quite often, is the loss of precision. */
/* Consider this (falsy!) equality test: */
alert( 0.1 + 0.2 == 0.3 ); // false
alert( 0.1 + 0.2 ); // 0.30000000000000004

/* Why? A number is stored in memory in its binary form, a sequence of bits – ones and zeroes.
 But fractions like 0.1, 0.2 that look simple in the decimal numeric system are 
 actually unending fractions in their binary form.

What is 0.1? It is one divided by ten 1/10, one-tenth. In decimal numeral system 
such numbers are easily representable. Compare it to one-third: 1/3. 
It becomes an endless fraction 0.33333(3).

So, division by powers 10 is guaranteed to work well in the decimal system, 
but division by 3 is not. For the same reason, in the binary numeral system, 
the division by powers of 2 is guaranteed to work, but 1/10 becomes an endless 
binary fraction. 

There’s just no way to store exactly 0.1 or exactly 0.2 using the binary system, 
just like there is no way to store one-third as a decimal fraction.

The numeric format IEEE-754 solves this by rounding to the nearest possible number. 
These rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.
We can see this in action:
*/
alert( 0.1.toFixed(20) ); // 0.10000000000000000555

/* And when we sum two numbers, their “precision losses” add up.
That’s why 0.1 + 0.2 is not exactly 0.3. */

/* Workarounds to the problem */
/* The most reliable method is to round the result with the help of a method toFixed(n): */
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"

/* Note: that toFixed() always returns a string. It ensures that it has 2 digits 
after the decimal point. That’s actually convenient if we have an e-shopping 
and need to show $0.30. For other cases, we can use the unary plus to coerce 
it into a number: */

sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3

/* Multiply/divide approach reduces the error, but doesn’t remove it totally. */
/* Can also temporarily multiply the numbers by 100 (or a bigger number) to 
turn them into integers, do the maths, and then divide back. Then, as we’re 
doing maths with integers, the error somewhat decreases, but we still get it on division: */
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001

/* Sometimes we could try to evade fractions at all. Like if we’re dealing with
a shop, then we can store prices in cents instead of dollars. But what if we 
apply a discount of 30%? In practice, totally evading fractions is rarely possible.
Just round them to cut “tails” when needed. */

// Hello! I'm a self-increasing number!
// eslint-disable-next-line no-loss-of-precision
alert( 9999999999999999 ); // shows 10000000000000000

/* More Consequences */
/* This suffers from the same issue: a loss of precision. There are 64 bits for 
the number, 52 of them can be used to store digits, but that’s not enough. 
So the least significant digits disappear.

JavaScript doesn’t trigger an error in such events. It does its best to fit the 
number into the desired format, but unfortunately, this format is not big enough. 

Another funny consequence of the internal representation of numbers is the existence 
of two zeroes: 0 and -0.

That’s because a sign is represented by a single bit, so it can be set or not set 
for any number including a zero.

In most cases the distinction is unnoticeable, because operators are suited to 
treat them as the same.
*/


/* Tests: isFinite and isNaN */
/* - Infinity (and -Infinity) is a special numeric value that is greater (less) than anything.
   - NaN represents an error. 
   
They belong to the type number, but are not “normal” numbers, so there are 
special functions to check for them:
  - isNaN(value) converts its argument to a number and then tests it for being NaN:
*/
alert( isNaN(NaN) ); // true
alert( isNaN("str") ); // true

/* But do we need this function? Can’t we just use the comparison === NaN? 
Unfortunately not. The value NaN is unique in that it does not equal anything, 
including itself: */
// eslint-disable-next-line use-isnan
alert( NaN === NaN ); // false

/* isFinite(value) converts its argument to a number and returns true 
if it’s a regular number, not NaN/Infinity/-Infinity: */
alert( isFinite("15") ); // true
alert( isFinite("str") ); // false, because a special value: NaN
alert( isFinite(Infinity) ); // false, because a special value: Infinity

/* Sometimes isFinite is used to validate whether a string value is a regular number: */
num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );

/* Please note that an empty or a space-only string is treated as 0 in 
all numeric functions including isFinite. */

/* Number.isNaN and Number.isFinite */
/* Number.isNaN and Number.isFinite methods are the more “strict” versions of 
isNaN and isFinite functions. They do not autoconvert their argument into a number, 
but check if it belongs to the number type instead. 

Number.isNaN(value) returns true if the argument belongs to the number type 
and it is NaN. In any other case it returns false.
*/
alert( Number.isNaN(NaN) ); // true
alert( Number.isNaN("str" / 2) ); // true

// Note the difference:
alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
// Because isNaN converts string "str" into a number and gets NaN as a result of this conversion
alert( isNaN("str") ); // true

/* Number.isFinite(value) returns true if the argument belongs to the number 
type and it is not NaN/Infinity/-Infinity. In any other case it returns false. */
alert( Number.isFinite(123) ); // true
alert( Number.isFinite(Infinity) ); // false
alert( Number.isFinite(2 / 0) ); // false

// Note the difference:
alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123

/* In a way, Number.isNaN and Number.isFinite are simpler and more straightforward 
than isNaN and isFinite functions. In practice though, isNaN and isFinite 
are mostly used, as they’re shorter to write. */

/* Comparison with Object.is */
/* There is a special built-in method Object.is that compares values like ===,
but is more reliable for two edge cases: 

1. It works with NaN: Object.is(NaN, NaN) === true, that’s a good thing.
2. Values 0 and -0 are different: Object.is(0, -0) === false, technically 
that’s correct, because internally the number has a sign bit that may be 
different even if all other bits are zeroes.

In all other cases, Object.is(a, b) is the same as a === b.

We mention Object.is here, because it’s often used in JavaScript specification.
 When an internal algorithm needs to compare two values for being exactly the 
 same, it uses Object.is (internally called SameValue).
*/

/* parseInt and parseFloat */
/* Numeric conversion using a plus + or Number() is strict. If a value is not 
exactly a number, it fails: */
alert( +"100px" ); // NaN

/* The sole exception is spaces at the beginning or at the end of the string, 
as they are ignored. 

But in real life we often have values in units, like "100px" or "12pt" in CSS. 
Also in many countries the currency symbol goes after the amount, 
so we have "19€" and would like to extract a numeric value out of that.

That’s what parseInt and parseFloat are for.

They “read” a number from a string until they can’t. In case of an error, 
the gathered number is returned. The function parseInt returns an integer, 
whilst parseFloat will return a floating-point number:
*/
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading

// There are situations when parseInt/parseFloat will return NaN. 
// It happens when no digits could be read:
alert( parseInt('a123') ); // NaN, the first symbol stops the process

/* The second argument of parseInt(str, radix) 
The parseInt() function has an optional second parameter. It specifies the 
base of the numeral system, so parseInt can also parse strings of hex numbers, 
binary numbers and so on:*/
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works
alert( parseInt('2n9c', 36) ); // 123456


/* Other Math Functions */
/* JavaScript has a built-in Math object which contains a small library of 
mathematical functions and constants. 

  Math.random() - Returns a random number from 0 to 1 (not including 1).
*/
alert( Math.random() ); // 0.1234567894322
alert( Math.random() ); // 0.5435252343232
alert( Math.random() ); // ... (any random numbers)

/* Math.max(a, b, c...) and Math.min(a, b, c...)  
  Returns the greatest and smallest from the arbitrary number of arguments.
*/
alert( Math.max(3, 5, -10, 0, 1) ); // 5
alert( Math.min(1, 2) ); // 1

/* Math.pow(n, power) - Returns n raised to the given power. */
/* alert( Math.pow(2, 10) ); // 2 in power 10 = 1024 */