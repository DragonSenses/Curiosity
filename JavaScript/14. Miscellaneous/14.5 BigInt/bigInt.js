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