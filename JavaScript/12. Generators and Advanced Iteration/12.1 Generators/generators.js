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