/* Generators */
/* Regular functions return only one, single value (or nothing).

Generators can return (“yield”) multiple values, one after another, on-demand. 
They work great with iterables, allowing to create data streams with ease. */

/* Summary
  - Generators are created by generator functions function* f(…) {…}.
  - Inside generators (only) there exists a yield operator.
  - The outer code and the generator may exchange results via next/yield calls.

In modern JavaScript, generators are rarely used. But sometimes they come in 
handy, because the ability of a function to exchange data with the calling code 
during the execution is quite unique. And, surely, they are great for making 
iterable objects.

Also, in the next chapter we’ll learn async generators, which are used to read 
streams of asynchronously generated data (e.g paginated fetches over a network) 
in for await ... of loops.

In web-programming we often work with streamed data, so that’s another very 
important use case.
*/

/* Generator functions */
/* To create a generator, we need a special syntax construct: function*, 
so-called “generator function”.

Generator functions behave differently from regular ones. When such function is
called, it doesn’t run its code. Instead it returns a special object, called 
“generator object”, to manage the execution.

Here, take a look: */

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]


/* The function code execution hasn’t started yet:

function* generateSequence() {  <--
  yield 1;
  yield 2;
  return 3;
}

The main method of a generator is next(). When called, it runs the execution 
until the nearest yield <value> statement (value can be omitted, then it’s 
undefined). Then the function execution pauses, and the yielded value is 
returned to the outer code.

The result of next() is always an object with two properties:
  - value: the yielded value.
  - done: true if the function code has finished, otherwise false.

For instance, here we create the generator and get its first yielded value:
*/
{
  let generator = generateSequence();

  let one = generator.next();

  alert(JSON.stringify(one)); // {value: 1, done: false}
}
/* As of now, we got the first value only, and the function execution is on 
the second line: 

function* generateSequence() {  
  yield 1;                      ---> {value: 1, done: false}
  yield 2;
  return 3;
}

Let’s call generator.next() again. It resumes the code execution and returns 
the next yield:
*/
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

/* function* generateSequence() {  
  yield 1;                     
  yield 2;                       ---> {value: 2, done: false}
  return 3;
}


And, if we call it a third time, the execution reaches the return statement 
that finishes the function: */
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}

/* /* function* generateSequence() {  
  yield 1;                     
  yield 2;                       
  return 3;                      ---> {value: 3, done: false}
}
 
Now the generator is done. We should see it from done:true and process 
value:3 as the final result.

New calls to generator.next() don’t make sense any more. If we do them, 
they return the same object: {done: true}.*/


/* function* f(…) or function *f(…)? */
/* Both syntaxes are correct.

But usually the first syntax is preferred, as the star * denotes that it’s a 
generator function, it describes the kind, not the name, so it should stick 
with the function keyword. */