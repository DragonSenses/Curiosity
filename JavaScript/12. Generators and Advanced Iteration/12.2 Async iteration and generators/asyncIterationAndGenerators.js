/* Async iteration and generators */
/* Summary 
Regular iterators and generators work fine with the data that doesn’t take 
time to generate.

When we expect the data to come asynchronously, with delays, their async 
counterparts can be used, and for await..of instead of for..of.

Syntax differences between async and regular iterators:

                            Iterable                      Async Iterable
Method to provide iterator  Symbol.iterator               Symbol.asyncIterator
next() return value is      {value:..., done: true/false} Promise that resolves to {value:…, done: true/false}


Syntax differences between async and regular generators:

                        Generators                   Async generators
Declaration             function*                    async function*
next() return value is  {value:…, done: true/false}  Promise that resolves to {value:…, done: true/false}


In web-development we often meet streams of data, when it flows chunk-by-chunk.
For instance, downloading or uploading a big file.

We can use async generators to process such data. It’s also noteworthy that in
some environments, like in browsers, there’s also another API called Streams, 
that provides special interfaces to work with such streams, to transform the 
data and to pass it from one stream to another (e.g. download from one place 
and immediately send elsewhere). 
*/


/* Asynchronous iteration allow us to iterate over data that comes 
asynchronously, on-demand. Like, for instance, when we download something 
chunk-by-chunk over a network. And asynchronous generators make it even more 
convenient.

Let’s see a simple example first, to grasp the syntax, and then review a 
real-life use case. */

/* Recall iterables */
/* Let’s recall the topic about iterables.

The idea is that we have an object, such as range here: 

let range = {
  from: 1,
  to: 5
};

…And we’d like to use for..of loop on it, such as for(value of range), to 
get values from 1 to 5.

In other words, we want to add an iteration ability to the object.

That can be implemented using a special method with the name Symbol.iterator:
  - This method is called in by the for..of construct when the loop is started,
  and it should return an object with the next method.

  - For each iteration, the next() method is invoked for the next value.

  - The next() should return a value in the form {done: true/false, 
  value:<loop value>}, where done:true means the end of the loop.

Here’s an implementation for the iterable range:
*/
{
  let range = {
    from: 1,
    to: 5,
  
    [Symbol.iterator]() { // called once, in the beginning of for..of
      return {
        current: this.from,
        last: this.to,
  
        next() { // called every iteration, to get the next value
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  for(let value of range) {
    alert(value); // 1 then 2, then 3, then 4, then 5
  }
}

/* Async iterables */
/* Asynchronous iteration is needed when values come asynchronously: after 
setTimeout or another kind of delay.

The most common case is that the object needs to make a network request to 
deliver the next value, we’ll see a real-life example of it a bit later.

To make an object iterable asynchronously: 

  1. Use Symbol.asyncIterator instead of Symbol.iterator.
  2. The next() method should return a promise (to be fulfilled with the next value).
    * The async keyword handles it, we can simply make async next().
  3. To iterate over such an object, we should use a for await (let item of iterable) loop.
    * Note the await word.

As a starting example, let’s make an iterable range object, similar like 
the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above: */
{
  let range = {
    from: 1,
    to: 5,
  
    [Symbol.asyncIterator]() { // (1)
      return {
        current: this.from,
        last: this.to,
  
        async next() { // (2)
  
          // note: we can use "await" inside the async next:
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
  
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  (async () => {
  
    for await (let value of range) { // (4)
      alert(value); // 1,2,3,4,5
    }
  
  })();
}

/* As we can see, the structure is similar to regular iterators: 

  1. To make an object asynchronously iterable, it must have a method 
  Symbol.asyncIterator (1).

  2. This method must return the object with next() method returning a promise (2).

  3. The next() method doesn’t have to be async, it may be a regular method 
  returning a promise, but async allows us to use await, so that’s convenient. 
  Here we just delay for a second (3).

  4. To iterate, we use for await(let value of range) (4), namely add “await” 
  after “for”. It calls range[Symbol.asyncIterator]() once, and then its next() 
  for values.

Here’s a small table with the differences:

                                    Iterators         Async iterators
Object method to provide iterator   Symbol.iterator   Symbol.asyncIterator
next() return value is              any value         Promise
to loop, use                        for..of           for await..of
*/

/* The spread syntax ... doesn’t work asynchronously */
/* Features that require regular, synchronous iterators, don’t work with 
asynchronous ones.

For instance, a spread syntax won’t work: 

alert( [...range] ); // Error, no Symbol.iterator

That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.

It’s also the case for for..of: the syntax without await needs Symbol.iterator.
*/


/* Recall generators */
/* Now let’s recall generators, as they allow to make iteration code much 
shorter. Most of the time, when we’d like to make an iterable, we’ll use 
generators.

For sheer simplicity, omitting some important stuff, they are “functions that 
generate (yield) values”. They are explained in detail in the chapter Generators.

Generators are labelled with function* (note the star) and use yield to 
generate a value, then we can use for..of to loop over them.

This example generates a sequence of values from start to end: */
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}

/* As we already know, to make an object iterable, we should add Symbol.iterator 
to it. 

let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
}

A common practice for Symbol.iterator is to return a generator, it makes the 
code shorter, as you can see: */
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}

/* In regular generators we can’t use await. All values must come synchronously, 
as required by the for..of construct.

What if we’d like to generate values asynchronously? 
  From network requests, for instance.

Let’s switch to asynchronous generators to make it possible. */


/* Async generators */
/* For most practical applications, when we’d like to make an object that 
asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend function* with async. That makes the generator 
asynchronous.

And then use for await (...) to iterate over it, like this: */
{
  // eslint-disable-next-line no-inner-declarations
  async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {
  
      // Wow, can use await!
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      yield i;
    }
  
  }
  
  (async () => {
  
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
    }
  
  })();
}
/* As the generator is asynchronous, we can use await inside it, rely on 
promises, perform network requests and so on. */

/* Under-the-hood difference */
/* Technically, if you’re an advanced reader who remembers the details about 
generators, there’s an internal difference.

For async generators, the generator.next() method is asynchronous, it returns 
promises.

In a regular generator we’d use result = generator.next() to get values. In 
an async generator, we should add await, like this: 

result = await generator.next(); // result = {value: ..., done: true/false}

That’s why async generators work with for await...of.*/


