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