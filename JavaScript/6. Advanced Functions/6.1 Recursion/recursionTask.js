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


/* Fibonacci Numbers */
/* The sequence of Fibonacci numbers has the formula Fn = Fn-1 + Fn-2. 
In other words, the next number is a sum of the two preceding ones.

First two numbers are 1, then 2(1+1), then 3(1+2), 5(2+3) and so on: 1, 1, 2, 3, 5, 8, 13, 21....

Fibonacci numbers are related to the Golden ratio and many natural phenomena around us.

Write a function fib(n) that returns the n-th Fibonacci number.

P.S. The function should be fast. The call to fib(77) should take no more than 
a fraction of a second.

An example of work: */

/**
 * Recursive fibonacci 
 * @param {number} n the nth fibonnaci number to attain from the sequence
 */
function fibr(n) { 
    // Basis of Recursion is when n is 0 or 1
    return (n <= 1) ? n : fibr(n-1) + fibr(n-2);
}

console.log(fibr(3)); // 2
console.log(fibr(7)); // 13
// console.log(fibr(77)); // 5527939700884757  --> Slow
/* Big Values of n it is very slow, may hang up the engine for time eating all CPU 
resources because the function fibr() makes too many subcalls. 

For the call: fibr(5) where fibr(5) = fibr(4) + fibr(3) and fibr(4) = fibr(3) + fibr(2) ... 

fibr(3) is evaluated twice, while fibr(2) is evaluated 3 times. The total computations
continues to grow faster than n. 

We can optimize by remembering already-evaluated values: if a value of say fib(3) is
calculated once, then just reuse it in future computations
*/                                        

/* Dynamic Programming Bottom-Up Approach 

Use a loop, instead of going from n down to lower values, make a loop that 
starts from 1 and 2, then gets fib(3) as their sum, then fib(4) as the sum of
the previous two values.

On each step, only need to remember two previous values. 

Note: The loop starts with i=3, because the first and the second sequence 
values are hard-coded into variables a=1, b=1.
*/
function fib(n) {
    // Initialize the first two numbers in fibonnaci sequence 
    let a = 1;
    let b = 1; 
    let c;  // c will store the sum

    for(let i = 3; i <= n; i++){
        c = a + b;
        a = b;
        b = c;
    }

    return b;
}

console.log(fib(3)); // 2
console.log(fib(7)); // 13
console.log(fib(77)); // 5527939700884757

/* Breakdown of the fib(n) algorithm */

// Starting off we call fib(5)
// a = fib(1), b = fib(2), these values are by definition 1
let a = 1, b = 1;

// get c = fib(3) as their sum
let c = a + b;

/* we now have fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/

/* Now we want to get fib(4) = fib(2) + fib(3).

Let’s shift the variables: a,b will get fib(2),fib(3), and c will get their sum: 
*/
a = b; // now a = fib(2)
b = c; // now b = fib(3)
c = a + b; // c = fib(4)

/* now we have the sequence:
   a  b  c
1, 1, 2, 3
*/

/* The next step gives another sequence number: */
a = b; // now a = fib(3)
b = c; // now b = fib(4)
c = a + b; // c = fib(5)

/* now the sequence is (one more number):
      a  b  c
1, 1, 2, 3, 5
*/

/* …And so on until we get the needed value. 
    That’s much faster than recursion and involves no duplicate computations! 
*/



/* Output a single-linked list */
/* Let’s say we have a single-linked list */
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

/* Write a function printList(list) that outputs list items one-by-one.

Make two variants of the solution: using a loop and using recursion.

What’s better: with recursion or without it? */

/**
 * Loop-based variant that prints out the contents of the list one-by-one.
 * 
 * ote that we use a temporary variable tmp to walk over the list. 
 * Technically, we could use a function parameter list instead:
 * 
 *  while(list) { ... }
 * 
 * …But that would be unwise. In the future we may need to extend a function, 
 * do something else with the list. If we change list, then we lose such ability.
 * 
 * Talking about good variable names, list here is the list itself. 
 * The first element of it. And it should remain like that. That’s clear and reliable.
 * 
 * From the other side, the role of tmp is exclusively a list traversal, 
 * like i in the for loop.
 * 
 * @param {object LinkedList} list 
 */
function printList(list){
    let tmp = list;

    while(tmp){
        console.log(tmp.value);
        tmp = tmp.next;
    }
}

printList(list);


/**
 * Recursive variant of printing the contents of the linked list.
 * @param {object LinkedList} list 
 */
function printListRecursive(list){
  console.log(list.value); // output the current item

  if (list.next) {
    printListRecursive(list.next); // do the same for the rest of the list
  }
}

printListRecursive(list);

/* Iterative vs Recursive. Which is better? 
Technically, the loop is more effective. These two variants do the same, but the 
loop does not spend resources for nested function calls.

From the other side, the recursive variant is shorter and sometimes easier to 
understand. 

I prefer iterative because of resource efficiency. */