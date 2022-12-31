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
a certain time later. */