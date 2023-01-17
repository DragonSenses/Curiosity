/* eslint-disable no-unused-vars */
/* Promises Chaining */
/* Summary 
If a .then (or catch/finally, doesn’t matter) handler returns a promise, the 
rest of the chain waits until it settles. When it does, its result (or error) 
is passed further.

the call of .then(handler) always returns a promise:
[state: "pending"]
[result: undefined]

if handler ends with...

1. return value
[state: "fulfilled"]
[result: value]

2. throw error
that promise settles with:
[state: "rejected"]
[result: error]

3. return promise
...with the result of the new promise...
*/

/* Let’s return to the problem mentioned in the chapter Introduction: callbacks: 
we have a sequence of asynchronous tasks to be performed one after another — 
for instance, loading scripts. How can we code it well?

Promises provide a couple of recipes to do that.

In this chapter we cover promise chaining.

It looks like this: */
{
  new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)
  
  }).then(function(result) { // (**)
  
    alert(result); // 1
    return result * 2;
  
  }).then(function(result) { // (***)
  
    alert(result); // 2
    return result * 2;
  
  }).then(function(result) {
  
    alert(result); // 4
    return result * 2;
  
  });
}

/* The idea is that the result is passed through the chain of .then handlers.

Here the flow is:
  1. The initial promise resolves in 1 second (*),
  2. Then the .then handler is called (**), which in turn creates a new 
  promise (resolved with 2 value).
  3. The next then (***) gets the result of the previous one, processes 
  it (doubles) and passes it to the next handler.
  4. …and so on.

As the result is passed along the chain of handlers, we can see a sequence 
of alert calls: 1 → 2 → 4. 

  [new Promise]
resolve(1)|
         \/
  [   .then   ]
return 2  |
         \/
  [   .then   ]
return 4  |
         \/
  [   .then   ]


The whole thing works, because every call to a .then returns a new promise, 
so that we can call the next .then on it.

When a handler returns a value, it becomes the result of that promise, so 
the next .then is called with it.

A classic newbie error: technically we can also add many .then to a single 
promise. This is not chaining. 

For example: */
{
  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });
  
  promise.then(function(result) {
    alert(result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    alert(result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    alert(result); // 1
    return result * 2;
  });
}

/* What we did here is just several handlers to one promise. They don’t pass 
the result to each other; instead they process it independently.

Here’s the picture (compare it with the chaining above): 

          [new Promise]
            resolve(1)
            /   |   \
           /    |    \
          /     |     \
    [.then]  [.then]   [.then]

All .then on the same promise get the same result – the result of that 
promise. So in the code above all alert show the same: 1.

In practice we rarely need multiple handlers for one promise. 
Chaining is used much more often.*/