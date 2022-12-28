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

