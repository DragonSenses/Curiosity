/* Scheduling: setTimeout and setInterval */
/* Summary
 - Methods setTimeout(func, delay, ...args) and setInterval(func, delay, ...args) 
 allow us to run the func once/regularly after delay milliseconds.

 - To cancel the execution, we should call clearTimeout/clearInterval with 
 the value returned by setTimeout/setInterval.

 - Nested setTimeout calls are a more flexible alternative to setInterval, 
 allowing us to set the time between executions more precisely.

 - Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) 
 is used to schedule the call “as soon as possible, but after the current script is complete”.

 - The browser limits the minimal delay for five or more nested calls of setTimeout 
 or for setInterval (after 5th call) to 4ms. That’s for historical reasons.

Please note that all scheduling methods do not guarantee the exact delay.

For example, the in-browser timer may slow down for a lot of reasons:

 - The CPU is overloaded.
 - The browser tab is in the background mode.
 - The laptop is on battery saving mode.

All that may increase the minimal timer resolution (the minimal delay) to 
300ms or even 1000ms depending on the browser and OS-level performance settings.
*/

/* Scheduling a Call - to decide to execute a function not right now, but at
a certain time later. 

 -setTimeout() allows us to run a function once after the interval of time.
 -setInterval() allows us to run a function repeatedly, starting after the 
 interval of time, then repeating continuously at that interval. 
 
These methods are not a part of JavaScript specification. But most environments 
have the internal scheduler and provide these methods. In particular, they are 
supported in all browsers and Node.js.
*/


/* setTimeout() */
/* Syntax
        let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...) 
        
Parameters:
    func|code
        Function or a string of code to execute. Usually, that’s a function. 
        For historical reasons, a string of code can be passed, but that’s 
        not recommended.
     
    delay
        The delay before run, in milliseconds (1000 ms = 1 second), by default 0.

    arg1, arg2…
        Arguments for the function
*/

// For instance, this code calls sayHi() after one second:
function sayHi() {
    console.log('Hello');
}

setTimeout(sayHi, 1000);    // 'Hello' after 1 second

// With arguments:
function sayHi2(phrase, who) {
    alert( phrase + ', ' + who );
}
  
setTimeout(sayHi2, 1000, "Hello", "Luna"); // Hello, Luna

/* If the first argument is a string, then JavaScript creates a function from it.
So, this will also work: */

setTimeout("console.log('Hello')", 1000);

/* BUT using strings is not recommended, use arrow functions instead of them, 
like this: */
setTimeout(() => console.log('Hello'), 1000);


/* Pass a function, but don't run it 
Novice developers sometimes make a mistake by adding brackets () after the function:

// wrong!
setTimeout(sayHi(), 1000);

That doesn’t work, because setTimeout expects a reference to a function. And here 
sayHi() runs the function, and the result of its execution is passed to setTimeout.
 
In our case the result of sayHi() is undefined (the function returns nothing), 
so nothing is scheduled.
*/