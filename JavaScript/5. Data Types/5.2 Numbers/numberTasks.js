/* How to round 6.35 the right way? 
According to the documentation Math.round and toFixed 
both round to the nearest number: 0..4 lead down while 5..9 lead up.

For instance:
*/
console.log( 1.35.toFixed(1) ); // 1.4

// In the similar example below, why is 6.35 rounded to 6.3, not 6.4?
console.log( 6.35.toFixed(1) ); // 6.3


/* Answer: toFixed() method rounds the number to n digits after the point
and returns a string representation. The number to pass in must be close to
an integer prior to rounding, so multiply by 10 then divide by 10. 

Taking a closer look internally the decimal fraction 6.35 is an endless binary.
As always in such cases, it is stored with a precision loss.*/
console.log( 6.35.toFixed(20) ); // 6.34999999999999964473

// The precision loss can cause both increase and decrease of a number. 
// In this particular case the number becomes a tiny bit less, that’s why it rounded down.

console.log( 1.35.toFixed(20) ); // 1.35000000000000008882
// Here the precision loss made the number a little bit greater, so it rounded up.

// To fix the problem so 6.35 is rounded the right way:
// bring it closer to an integer prior to rounding:
console.log( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000

/* Note that 63.5 has no precision loss at all. 
That’s because the decimal part 0.5 is actually 1/2. 
Fractions divided by powers of 2 are exactly represented in the binary system, 
now we can round it: */
console.log( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(rounded) -> 6.4


/* Repeat until Input is a Number */
/* Create a function readNumber which prompts for a number until the visitor 
enters a valid numeric value.

The resulting value must be returned as a number.

The visitor can also stop the process by entering an empty line or 
pressing “CANCEL”. In that case, the function should return null. */


/* Answer: To find a valid numeric value we use the isFinite(value) which 
converts its argument to a number and returns true if it's a regular number,
not NaN/Infinity/-Infinity. Then we have to check for the cases where the
user enters an empty line or presses cancel. 

Both null (cancel) and empty line numeric forms are 0, so we must treat them
specially after isFinite() checks for a regular number.  */
function readNumber(){
    let num;

    do{
        num = prompt("Please enter a number:", 0);
    } while( !isFinite(num) );

    if (num === null || num === '') return null;

    return +num; 
}

console.log(`Read: ${readNumber()}`);

/* An Occasional Infinite Loop */
/* The following loop is infinite, why?
let i = 0;
while (i != 10) {
  i += 0.2;
}
*/
/* Answer: That’s because i would never equal 10.

Run it to see the real values of i: 
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}

None of them is exactly 10.

Such things happen because of the precision losses when adding fractions like 0.2.

Conclusion: evade equality checks when working with decimal fractions.
*/


/* A random number from min to max */
/* The built-in function Math.random() creates a random value from 0 to 1 (not including 1).

Write the function random(min, max) to generate a random floating-point number 
from min to max (not including max).

Examples of its work: */
alert( random(1, 5) ); // 1.2345623452
alert( random(1, 5) ); // 3.7894332423
alert( random(1, 5) ); // 4.3435234525

// Answer:
/**
 * Generates a random value from [min,max). To map all values from interval 0..1
 * into values from min to max. In two stages:
 * 1. Multiply a random number from 0...1 by max-min, then the interval of 
 * possible  values increases 0..1 to 0..max-min.
 * 2. Now if we add min, the possible interval becomes from min to max.
 * @param {number} min 
 * @param {number} max 
 * @returns a random floating-point number from min to max exclusive
 */
function random(min, max){
    return min + Math.random() * (max - min);
}