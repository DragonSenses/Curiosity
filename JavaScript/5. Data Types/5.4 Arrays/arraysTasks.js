/* Is array copied? */
/* What is this code going to show? */
let fruits = ["Apples", "Pear", "Orange"];

// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push("Banana");

// what's in fruits?
alert( fruits.length ); // ?

// Answer: 4. Arrays are objects and copied by reference. 
// Both shoppingCart and fruits are references to the same array


/* Array Operations */
/* Let’s try 5 array operations.
  1. Create an array styles with items “Jazz” and “Blues”.
  2. Append “Rock-n-Roll” to the end.
  3. Replace the value in the middle with “Classics”. 
  Your code for finding the middle value should work for any arrays with odd length.
  4. Strip off the first value of the array and show it.
  5. Prepend Rap and Reggae to the array.

The array in the process: 
Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll
*/

// Answer:
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
// midPoint = arr.length >>> 1 . Used "">>> 1" over "/ 2" since dividing integers
// yields a floating point result. 5/2 === 2.5 , 5 >>> 1 === 2. 
styles[styles.length >>> 1 ] = "Classics"; 
console.log(styles.shift());
styles.unshift("Rap", "Reggae");

/* Alternative Answer:
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics";
alert( styles.shift() );
styles.unshift("Rap", "Reggae");
*/

/* Calling an an array context */
/* What is the result? Why? */
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?

/* Answer: a,b,function(){
  alert( this );
}
  An array named arr is created with ["a","b"] as values. Then we push
(or add at the end of the array) a function, which alerts("this"). This has no
value until runtime. So at line arr[2](); It calls the function in spot arr[2]
which alerts(this), and this at runtime is array. So the arrays contents will 
be printed.   

The call arr[2]() is syntactically the good old obj[method](), in the role of 
obj we have arr, and in the role of method we have 2.

So we have a call of the function arr[2] as an object method. Naturally, 
it receives this referencing the object arr and outputs the array:
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}

The array has 3 values: initially it had two, plus the function.
*/


/* Sum input numbers */
/* Write the function sumInput() that:
  * Asks the user for values using prompt and stores the values in the array.
  * Finishes asking when the user enters a non-numeric value, an empty string, 
    or presses “Cancel”.
  * Calculates and returns the sum of array items.
  
P.S. A zero 0 is a valid number, please don't stop the input on zero. */

// Keep prompting user for values to be stored in array
// Stop when non-numeric value, empty string, or Cancel is entered
// Calculates and returns sum of array of items

// Keep pushing values to array, if condition fails, pops and sums all and returns
function sumInput(){
  let arr = new Array();
  let num;

  // while num is a valid 
  do{
    num = prompt("Number?",0);

    // Both null (cancel) and empty line numeric forms are 0, so we must treat 
    // them specially after isFinite() checks for a regular number. 
    if(num === null || num === '') break; 

    arr.push(+num); 

  } while(!isFinite(num));
  

  let sum = 0;

  // Check for non-empty array
  if(arr.length != 0){
    for(let n of arr){
      sum += n;
    }
  }

  return sum;
}

/* A maximal subarray */
/* The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.

Write the function getMaxSubSum(arr) that will return that sum. 

Please try to think of a fast solution: O(n2) or even O(n) if you can.

For instance:
*/
getMaxSubSum([-1, 2, 3, -9]) == 5;          // (sum of 2 and 3)
getMaxSubSum([2, -1, 2, 3, -9]) == 6;       // (sum of 2, -1, 2, 3)
getMaxSubSum([-1, 2, 3, -9, 11]) == 11;     // (sum of 11)
getMaxSubSum([-2, -1, 1, 2]) == 3;          // (sum of 1, 2)
getMaxSubSum([100, -9, 2, -3, 5]) == 100;   // (sum of 100)
getMaxSubSum([1, 2, 3]) == 6; // (take all)    (sum of 1, 2, 3)

/* If all items are negative, it means that we take none (the subarray is empty), 
so the sum is zero: */
getMaxSubSum([-1, -2, -3]) == 0;

// Answer:
function getMaxSubSum(){

}