/* Output every second */
/* Write a function printNumbers(from, to) that outputs a number every second, 
starting from from and ending with to.

Make two variants of the solution. 
    1. Using setInterval.
    2. Using nested setTimeout.
*/

/** 
 * Outputs a number every second, starting from from and ending with to.
 * @param {number} from start time
 * @param {number} to end time
 */
function printNumbers(from, to){
    let current = from; // Store the current time

    let timerId = setInterval(function() {
      console.log(current); // print current time
      if (current == to) {  // stop further calls when end time is reached
        clearInterval(timerId);
      }
      current++;
    }, 1000);

}

printNumbers(5, 10);

/**
 * Outputs a number every second, starting from from and ending with to.
 * @param {number} from start time
 * @param {number} to end time
 */
function printNumbers2(from, to){
    let current = from;
    
    setTimeout(function go() {
      console.log(current);
      if (current < to) {
        setTimeout(go, 1000);
      }
      current++;
    }, 1000);
}

printNumbers2(5, 10);

/* Note that in both solutions, there is an initial delay before the first output.
The function is called after 1000ms the first time. 

If we also want the function to run immediately, then we can add an 
additional call on a separate line, like this: 
*/
function printNumbersImmediately(from, to) {
    let current = from;
  
    function go() {
      console.log(current);
      if (current == to) {
        clearInterval(timerId);
      }
      current++;
    }
            // Note: works if current != to, so need to bounds check arguments
    go();   // Added additional call that only outputs current and increments
    let timerId = setInterval(go, 1000);
}
  
printNumbersImmediately(5, 10);


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


/* Answer: setTimeout will output 100000000

Any setTimeout will run only after the current code has finished.

The i will be the last one: 100_000_000.
    Or 100_000_000 (100,000,000) for readability
*/