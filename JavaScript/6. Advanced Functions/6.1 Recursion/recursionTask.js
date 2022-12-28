/* Sum all numbers till the given one */
/* Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

For instance: 

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

Make 3 solution variants:
 1. Using a for loop.
 2. Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
 3. Using the arithmetic progression formula.
        S = 1/2 * n(n+1)

P.S. Which solution variant is the fastest? The slowest? Why?

P.P.S. Can we use recursion to count sumTo(100000)?
*/

/**
 * Calculates the sum of numbers 1 + 2 + ... + n
 * @param {number} n how many numbers to sum to
 * @returns {number} sum of numbers from 1 to n
 */
function sumToIterative(n) {
    let sum = 0; 
    for(let i = 1; i <= n; i++){
        sum += i;
    }
    return sum;
}

console.log( sumToIterative(100) ); // 5050


/**
 * Calculates the sum of numbers 1 + 2 + ... + n
 * @param {number} n how many numbers to sum to
 * @returns {number} sum of numbers from 1 to n
 */
function sumToRecursive(n) { 
    if (n == 1) return 1;
    return n + sumToRecursive(n - 1);
}

console.log( sumToRecursive(100) ); // 5050


/**
 * Calculates the sum of numbers 1 + 2 + ... + n
 * @param {number} n how many numbers to sum to
 * @returns {number} sum of numbers from 1 to n
 */
function sumTo(n) { 
    return n * (n + 1) / 2;
}

console.log( sumTo(100) ); // 5050

/* Big O: Runtimes of 
 1. Using a for loop    is O(N)
 2. Using a recursion   is O(N)
 3. Using the arithmetic progression formula, is O(1) constant time. 

 Naturally, the formula is the fastest solution. 
 It uses only 3 operations for any number n.

 The loop variant is the second in terms of speed. In both the recursive and 
 the loop variant we sum the same numbers. But the recursion involves nested 
 calls and execution stack management. That also takes resources, so it’s slower.

 P.P.S. Some engines support the “tail call” optimization: if a recursive call 
 is the very last one in the function, with no other calculations performed, 
 then the outer function will not need to resume the execution, so the engine 
 doesn’t need to remember its execution context. That removes the burden on 
 memory. But if the JavaScript engine does not support tail call optimization 
 (most of them don’t), there will be an error: maximum stack size exceeded, 
 because there’s usually a limitation on the total stack size.
 */



 /* Calculate Factorial */
 /* The factorial of a natural number is a number multiplied by "number minus one", 
 then by "number minus two", and so on till 1. 
 
 The factorial of n is denoted as n!

We can write a definition of factorial like this: 
    n! = n * (n - 1) * (n - 2) * ...*1

Values of factorials for different n:
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120

The task is to write a function factorial(n) that calculates n! using recursive calls.

P.S. Hint: n! can be written as n * (n-1)! For instance: 3! = 3*2! = 3*2*1! = 6

In other words, the result of factorial(n) can be calculated as n multiplied 
by the result of factorial(n-1). And the call for n-1 can recursively descend 
lower, and lower, till 1. 
*/

function factorial(n) {
    // Basis of recursion is the value 1
    return (n != 1) ? n * factorial(n-1) : 1;
}

console.log( factorial(5) ); // 120

/* We can also make 0 the basis here, doesn’t matter much, but gives one more 
recursive step: 

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

*/