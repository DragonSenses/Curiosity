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
*/