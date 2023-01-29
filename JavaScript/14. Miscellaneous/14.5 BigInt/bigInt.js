/* eslint-disable no-undef */
/* BigInt */
/* Recent Addition to the language. You can find the current state of support
at: https://caniuse.com/#feat=bigint */

/* BigInt is a special numeric type that provides support for integers of 
arbitrary length. 

A bigint is created by appending n to the end of an integer literal or by 
calling the function BigInt that creates bigints from strings, numbers etc. 

*/
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // same as 10n

console.log(bigint);
console.log(sameBigint);
console.log(bigintFromNumber);

/* Math operators */
/* BigInt can mostly be used like a regular number, for example: */
alert(1n + 2n); // 3

alert(5n / 2n); // 2

/* Please note: the division 5/2 returns the result rounded towards zero, 
without the decimal part. All operations on bigints return bigints.

We can’t mix bigints and regular numbers: */

alert(1n + 2); // Error: Cannot mix BigInt and other types

/* We should explicitly convert them if needed: using either BigInt() or Number(), 
like this: */
{
  let bigint = 1n;
  let number = 2;

  // number to bigint
  alert(bigint + BigInt(number)); // 3

  // bigint to number
  alert(Number(bigint) + number); // 3
}

/* The conversion operations are always silent, never give errors, but if the 
bigint is too huge and won’t fit the number type, then extra bits will be cut 
off, so we should be careful doing such conversion. */

/* The unary plus is not supported on bigints */
/* The unary plus operator +value is a well-known way to convert value to a number.
In order to avoid confusion, it’s not supported on bigints.
So we should use Number() to convert a bigint to a number: */
{
  let bigint = 1n;

  alert( +bigint ); // error
}

/* Comparisons */
/* Comparisons, such as <, > work with bigints and numbers just fine: */
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true

/* Please note though, as numbers and bigints belong to different types, they 
can be equal ==, but not strictly equal ===: */
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false

/* Boolean operations */
/* When inside if or other boolean operations, bigints behave like numbers.

For instance, in if, bigint 0n is falsy, other values are truthy: */
// eslint-disable-next-line no-constant-condition
if (0n) {
  // never executes
}

/* Boolean operators, such as ||, && and others also work with bigints 
similar to numbers: */
alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)