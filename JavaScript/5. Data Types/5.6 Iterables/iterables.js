/* Iterables */
/* Summary 
Objects that can be used in for..of are called iterable.
- Technically, iterables must implement the method named Symbol.iterator.
  - The result of obj[Symbol.iterator]() is called an iterator. 
    It handles further iteration process.
  - An iterator must have the method named next() that returns an object 
  {done: Boolean, value: any}, here done:true denotes the end of the iteration 
  process, otherwise the value is the next value.
  - The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
  - Built-in iterables like strings or arrays, also implement Symbol.iterator.
  - String iterator knows about surrogate pairs.

Objects that have indexed properties and length are called array-like. Such objects may also 
have other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification – we’ll see that most built-in methods 
assume that they work with iterables or array-likes instead of “real” arrays, 
because that’s more abstract.

Array.from(obj[, mapFn, thisArg]) makes a real Array from an iterable or array-like obj,
 and we can then use array methods on it. The optional arguments mapFn and thisArg 
 allow us to apply a function to each item.
*/

/* Iterable objects are a generalization of arrays. 
That’s a concept that allows us to make any object useable in a for..of loop. 

Of course, Arrays are iterable. But there are many other built-in objects, 
that are iterable as well. For instance, strings are also iterable.

If an object isn’t technically an array, but represents a collection (list, set) 
of something, then for..of is a great syntax to loop over it, 
so let’s see how to make it work.
*/

/* Symbol.iterator */
/* Grasp the concept of iterables by making one of our own. 
For instance, we have an object that is not an array, but looks suitable for 
"for..of" 

A "range" object that represents an interval of numbers: */
let range = {
    from: 1,
    to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5