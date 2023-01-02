/* Does a function pickup latest changes? */
/* Such situations are common both in browser and server-side development. 
A function may be scheduled to execute later than it is created, for 
instance after a user action or a network request.

So, the question is: does it pick up the latest changes?

The function sayHi uses an external variable name. 
When the function runs, which value is it going to use? */
let name = "John";

function sayHi() {
  console.log("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?

/* Answer:  Pete 
A function gets outer variables as they are now, it uses the most recent values.

Old variable values are not saved anywhere. When a function wants a variable, 
it takes the current value from its own Lexical Environment or the outer one.*/



/* Which variables are available? */
/* The function makeWorker below makes another function and returns it. 
That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the 
invocation place, or both? 

Which value it will show? “Pete” or “John”? */
function makeWorker() {
    let workerName = "Pete";
  
    return function() {
      console.log(workerName);
    };
}
  
// eslint-disable-next-line no-unused-vars
let workerName = "John";
  
// create a function
let work = makeWorker();
  
// call it
work(); // what will it show?

/* Answer: Pete 
The work() functiton in the code below gets workerName from the place of its
origin through the outer lexical environment reference:

function makeWorker() {                                                      |
    let workerName = "Pete";                     |                           |
                                           outer |                     outer |                       outer
    return function() {         \ [<empty>] ---->| [workerName: "Pete"] -->  |[makerWorker: function] --> null
      console.log(workerName);  /                |                           |[workerName: "John"   ]
    };                                           |                           |
}                                                |                           |
let workerName = "John";                                                     |
let work = makeWorker();                                                     |
work(); // Pete                                                              |

The result is Pete since it first searches its own Lexical Environment <empty>,
then the Lexical Environment of the outer function and sees workerName: "Pete",
then search ends. 

If there were no let workName in makeWorker(), then the search would go 
outside and take the global variable as we can see from the chain above. 
In that case the result would be "John".
*/



/* Are counters independent? */
/* Here we make two counters: counter and counter2 using the same makeCounter 
function.

Are they independent? What is the second counter going to show? 0,1 or 2,3 or 
something else? */
function makeCounter() {
    let count = 0;
  
    return function() {
      return count++;
    };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1

console.log( counter2() ); // ?
console.log( counter2() ); // ?


/* Answer: Yes counters are independent. 
The second counter will output 0,1 in these lines:

console.log( counter2() ); // 0
console.log( counter2() ); // 1

This is because they have independent outer Lexical Environments, each one has
its own count. 
*/



/* Counter object */
/* Here a counter object is made with the help of the constructor function.

Will it work? What will it show? 

console.log( counter.up() ); // ?
console.log( counter.up() ); // ?
console.log( counter.down() ); // ?

*/
function Counter() {
    let count = 0;
  
    this.up = function() {
      return ++count;
    };
    this.down = function() {
      return --count;
    };
  }

counter = new Counter();

/* Answer:  1, 2, 1. 
It will work since both nested functions are created within the same outer
Lexical Environment, so they share access to the same count variable. */
console.log( counter.up() ); // 1
console.log( counter.up() ); // 2
console.log( counter.down() ); // 1

/* Function in if */
/* Look at the code. What will be the result of the call at the last line? */
let phrase = "Hello";

// eslint-disable-next-line no-constant-condition
if (true) {
  let user = "John";

  // eslint-disable-next-line no-inner-declarations, no-unused-vars
  function sayHi() {
    console.log(`${phrase}, ${user}`);
  }
}

sayHi();

/* Answer: Result is an error.
The function sayHi is declared inside the if, so it only lives inside it. 
There is no sayHi outside. */

/* Sum with closures */
/* Write function sum that works like this: sum(a)(b) = a+b.

Yes, exactly this way, using double parentheses (not a mistype).

For instance: 
sum(1)(2) = 3
sum(5)(-1) = 4
*/

/* Answer: For the second parentheses to work, the first ones must return 
a function. */
function sum(a){

    return function(b){
        return a + b; // takes "a" from the outer lexical environment
    };
}

console.log( sum(1)(2) ); // 3
console.log( sum(5)(-1) ); // 4


/* Is variable visible? */
/* What will be the result of this code? */
// eslint-disable-next-line no-unused-vars
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();

/* Answer: Result is an error.
"Uncaught ReferenceError: Cannot access 'x' before initialization"

In this example we can observe the peculiar difference between a 
    “non-existing” and “uninitialized” variable.

A variable starts in the “uninitialized” state from the moment when 
the execution enters a code block (or a function). And it stays uninitalized 
until the corresponding let statement.

In other words, a variable technically exists, but can’t be used before let.

This zone of temporary unusability of a variable (from the beginning of the 
    code block till let) is sometimes called the “dead zone”.

function func() {
    // the local variable x is known to the engine from the beginning of the function,
    // but "uninitialized" (unusable) until let ("dead zone")
    // hence the error
    
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
    
    let x = 2;
}

*/


/* Filter through function */
/* We have a built-in method arr.filter(f) for arrays. It filters all elements 
through the function f. If it returns true, then that element is returned in 
the resulting array.

Make a set of “ready to use” filters: 
 - inBetween(a, b) – between a and b or equal to them (inclusively).
 - inArray([...]) – in the given array.
 
The usage must be like this:
 - arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
 - arr.filter(inArray([1,2,3])) – selects only elements matching with one of 
   the members of [1,2,3].

For instance:
*/
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2


/* .. your code for inBetween and inArray */
function inBetween(){

}

function inArray(){

}