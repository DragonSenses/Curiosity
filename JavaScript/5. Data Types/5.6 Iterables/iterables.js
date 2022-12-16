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

/* To make the range object iterable (and thus let for..of work) we need to add
a method to the object named Symbol.iterator (a special built-in symbol just for that).

1. When for..of starts, it calls that method once (or errors if not found). 
   The method must return an iterator – an object with the method next.
2. Onward, for..of works only with that returned object.
3. When for..of wants the next value, it calls next() on that object.
4. The result of next() must have the form {done: Boolean, value: any}, 
   where done=true means that the loop is finished, otherwise value is the next value.
*/

/* Here’s the full implementation for range with remarks: */

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

    // ...it returns the iterator object:
    // 2. Onward, for..of works only with the iterator object below, asking it for next values
    return {
      current: this.from,
      last: this.to,
  
      // 3. next() is called on each iteration by the for..of loop
      next() {
        // 4. it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  };
  
// now it works!
for (let num of range) {
    alert(num); // 1, then 2, 3, 4, 5
}

/* Please note the core feature of iterables: separation of concerns.
 - The range itself does not have the next() method.
 - Instead, another object, a so-called “iterator” is created by the call to 
 range[Symbol.iterator](), and its next() generates values for the iteration.

So, the iterator object is separate from the object it iterates over.
*/

/* Technically, we may merge them and use range itself as the iterator to make the code simpler.
The downside is that now it’s impossible to have two for..of loops running over 
the object simultaneously: they’ll share the iteration state, because there’s only 
one iterator – the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

range2[Symbol.iterator]() returns the range2 object itself: it has the 
necessary next() method and remembers the current iteration progress 
in this.current. Shorter? Yes. And sometimes that’s fine too.
 */
let range2 = {
    from: 1,
    to: 5,
  
    [Symbol.iterator]() {
      this.current = this.from;
      return this;
    },
  
    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
};
  
for (let num of range2) {
    alert(num); // 1, then 2, 3, 4, 5
}

/* Infinite Iterators are also possible. 
For instance, the range becomes infinite for range.to = Infinity. 
Or we can make an iterable object that generates an infinite sequence 
of pseudorandom numbers. Also can be useful.

There are no limitations on next, it can return more and more values, that’s normal.

Of course, the for..of loop over such an iterable would be endless. 
But we can always stop it using break.*/


/* String is Iterable */
/* Arrays and strings are most widely used built-in iterables.

For a string, for..of loops over its characters: */
for (let char of "test") {
    // triggers 4 times: once for each character
    alert( char ); // t, then e, then s, then t
}

/* And it works correctly with surrogate pairs! */
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}

/* Surrogate Pair refers to a means of encoding Unicode characters with 
high code-points in the UTF-16 encoding scheme. 

JavaScript is using UTF-16 to encode its strings. This means two bytes (16-bit) 
are used to represent one Unicode Code Point.

Now there are characters (like the Emojis) in Unicode that have a that 
high code point so that they cannot be stored in 2 bytes (16bit) so they 
need to get encoded into two UTF-16 characters (4 bytes). 
    These are called surrogate pairs.
*/

// There is an emoji in the string (if you don’t see it)
let len = "😀".length;  // 2, because the Emoji consists of two 2 UTF-16 characters.
console.log(len); // 2

// Another Example
str = "😀";
let surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
len = str.length - surrogatePairs.length;

console.log(2); // 1

/* In the Unicode character encoding, characters are mapped to values between 0x0 and 0x10FFFF.

Internally, JavaScript uses the UTF-16 encoding scheme to store strings of Unicode text. 
In UTF-16, 16-bit (two-byte) code units are used. Since 16 bits can only contain the 
range of characters from 0x0 to 0xFFFF, some additional complexity is used to store 
values above this range (0x10000 to 0x10FFFF). This is done using pairs of code units 
known as surrogates.

The surrogate code units are in two ranges known as "low surrogates" and 
"high surrogates", depending on whether they are allowed at the start or end 
of the two code unit sequence. */