/* Set and decrease for counter */
/* Modify the code of makeCounter() so that the counter can also decrease and 
set the number: 
 - counter() should return the next number (as before).
 - counter.set(value) should set the counter to value.
 - counter.decrease() should decrease the counter by 1.
 
P.S. You can use either a closure or the function property to keep the current 
count. Or write both variants. */

/* Answer: Use count as the local variable, but additional methods are written
right into the counter. They share the same outer lexical environment and also
can access the current count. */
function makeCounter() {
    let count = 0;

    function counter() {
      return count++;
    }
  
    counter.set = (value) => count = value;

    counter.decrease = () => count--;

    return counter;
}


let c = makeCounter();       // output
console.log( c() );          // 0       count = 1
console.log( c() );          // 1       count = 2
console.log( c.set(64) );    // 64      count = 64
console.log( c() );          // 64      count = 65
console.log( c() );          // 65      count = 66
console.log( c.decrease() ); // 66      count = 65
console.log( c.decrease() ); // 65      count = 64

// Note: count is different from the output because of post-increment (i.e., count++)



/* Sum with an arbitrary amount of brackets */
/* Write function sum that would work like this: */
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6;
sum(6)(-1)(-2)(-3) == 0;
sum(0)(1)(2)(3)(4)(5) == 15;

/* P.S. Hint: you may need to setup custom object to primitive conversion 
for your function. */

/* Answer:  
1. For the whole thing to work anyhow, the result of sum must be function.
2. That function must keep in memory the current value between calls.
3. According to the task, the function must become the number when used in ==. 
    * Functions are objects, so the conversion happens as described in the 
chapter Object to primitive conversion, and we can provide our own method 
that returns the number. */

function sum(a){

    let currentSum = a;

    function f(b){
        currentSum += b;
        return f;
    }

    f.toString = function() {
        return currentSum;
    };

    return f; 
}

console.log( sum(1)(2) ); // 3
console.log( sum(5)(-1)(2) ); // 6
console.log( sum(6)(-1)(-2)(-3) ); // 0
console.log( sum(0)(1)(2)(3)(4)(5) ); // 15


/* Note: The sum function actually works only once. It returns function f. 

Then, on each subsequent call, f adds its parameter to the sum currentSum, 
and returns itself.

There is no recursion in the last line of f.

Here is what recursion looks like: 

function f(b) {
  currentSum += b;
  return f(); // <-- recursive call
}

And in our case, we just return the function, without calling it:

function f(b) {
  currentSum += b;
  return f; // <-- does not call itself, returns itself
}

This f will be used in the next call, again return itself, as many times as 
needed. Then, when used as a number or a string – the toString returns the 
currentSum. 

We could also use Symbol.toPrimitive or valueOf here for the conversion.
*/