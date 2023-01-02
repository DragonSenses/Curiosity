/* Output every second */
/* Write a function printNumbers(from, to) that outputs a number every second, 
starting from from and ending with to.

Make two variants of the solution. 
    1. Using setInterval.
    2. Using nested setTimeout.
*/






/* What will setTimeout show? */
/* In the code below there’s a setTimeout call scheduled, then a heavy 
calculation is run, that takes more than 100ms to finish.

When will the scheduled function run? 

    A) After the loop.
    B) Before the loop.
    C) In the beginning of the loop.

What is console.log going to show? */
let i = 0;

setTimeout(() => console.log(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}