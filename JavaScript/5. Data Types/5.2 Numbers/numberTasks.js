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