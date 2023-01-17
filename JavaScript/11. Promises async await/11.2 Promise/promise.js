/* eslint-disable no-unused-vars */
/* Promise */
/* Promise Analogy
Imagine that you’re a top singer, and fans ask day and night for your upcoming song.

To get some relief, you promise to send it to them when it’s published. You 
give your fans a list. They can fill in their email addresses, so that when 
the song becomes available, all subscribed parties instantly receive it. And 
even if something goes very wrong, say, a fire in the studio, so that you 
can’t publish the song, they will still be notified.

Everyone is happy: you, because the people don’t crowd you anymore, and fans, 
because they won’t miss the song.

This is a real-life analogy for things we often have in programming:
  1. A “producing code” that does something and takes time. For instance, some 
  code that loads the data over a network. That’s a “singer”.
  2. A “consuming code” that wants the result of the “producing code” once it’s
  ready. Many functions may need that result. These are the “fans”.
  3. A promise is a special JavaScript object that links the “producing code” 
  and the “consuming code” together. In terms of our analogy: this is the 
  “subscription list”. The “producing code” takes whatever time it needs to 
  produce the promised result, and the “promise” makes that result available 
  to all of the subscribed code when it’s ready.

The analogy isn’t terribly accurate, because JavaScript promises are more 
complex than a simple subscription list: they have additional features and 
limitations. But it’s fine to begin with.


Constructor Syntax for a Promise object: 

let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});


The function passed to new Promise is called the executor. 
  When new Promise is created, the executor runs automatically. 
  It contains the producing code which should eventually produce the result. 
  In terms of the analogy above: the executor is the “singer”.

Its arguments resolve and reject are callbacks provided by JavaScript itself. 
Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn’t matter, it 
should call one of these callbacks: 
  - resolve(value) — if the job is finished successfully, with result value.
  - reject(error) — if an error has occurred, error is the error object.
*/

/* So to summarize: the executor runs automatically and attempts to perform a 
job. When it is finished with the attempt, it calls resolve if it was successful 
or reject if there was an error.

The promise object returned by the new Promise constructor has these 
internal properties:
  * state — initially "pending", then changes to either "fulfilled" when 
resolve is called or "rejected" when reject is called.
  * result — initially undefined, then changes to value when resolve(value) 
is called or error when reject(error) is called.

So the executor eventually moves promise to one of these states: 


                          --> [state: "fulfilled"]
new Promise(executor)    /    [result: value]
[state: "pending"]      /
[result: undefined]     \
                         \
                          --> [state: "rejected"]
                              [result: error]
*/

/* Here’s an example of a promise constructor and a simple executor function 
with “producing code” that takes time (via setTimeout): */
{
  let promise = new Promise(function(resolve, reject) {
    // the function is executed automatically when the promise is constructed
  
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);
  });
}
/* We can see two things by running the code above: 
  1. The executor is called automatically and immediately (by new Promise).

  2. The executor receives two arguments: resolve and reject. These functions 
  are pre-defined by the JavaScript engine, so we don’t need to create them. 
  We should only call one of them when ready.

After one second of “processing”, the executor calls resolve("done") to produce
the result. This changes the state of the promise object:

new Promise(executor)   
[state: "pending"]      resolve("done")   [state: "fulfilled"]
[result: undefined]     -------------->   [result: "done"]

That was an example of a successful job completion, a “fulfilled promise”.
*/

/* And now an example of the executor rejecting the promise with an error: */
{
  let promise = new Promise(function(resolve, reject) {
    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
}
/* The call to reject(...) moves the promise object to "rejected" state: 

new Promise(executor)   
[state: "pending"]      resolve(error)    [state: "rejected"]
[result: undefined]     -------------->   [result: error]


To summarize, the executor should perform a job (usually something that 
  takes time) and then call resolve or reject to change the state of the 
  corresponding promise object.

A promise that is either resolved or rejected is called “settled”, as opposed 
to an initially “pending” promise.
*/

/* There can be only a single result or an error */
/* The executor should call only one resolve or one reject. 
Any state change is final.

All further calls of resolve and reject are ignored: */
{
  let promise = new Promise(function(resolve, reject) {
    resolve("done");
  
    reject(new Error("…")); // ignored
    setTimeout(() => resolve("…")); // ignored
  });
}
/* The idea is that a job done by the executor may have only one result or an error.

Also, resolve/reject expect only one argument (or none) and will ignore additional 
arguments. */

/* Reject with Error objects */
/* In case something goes wrong, the executor should call reject. That can be 
done with any type of argument (just like resolve). But it is recommended to 
use Error objects (or objects that inherit from Error). The reasoning for that 
will soon become apparent. */

/* Immediately calling resolve/reject */
/* In practice, an executor usually does something asynchronously and calls 
resolve/reject after some time, but it doesn’t have to. We also can call 
resolve or reject immediately, like this: */
{
  let promise = new Promise(function(resolve, reject) {
    // not taking our time to do the job
    resolve(123); // immediately give the result: 123
  });
}
/* For instance, this might happen when we start to do a job but then see 
that everything has already been completed and cached.

That’s fine. We immediately have a resolved promise. */

/* The state and result are internal */
/* The properties state and result of the Promise object are internal. 
We can’t directly access them. We can use the methods .then/.catch/.finally 
for that. They are described below. */