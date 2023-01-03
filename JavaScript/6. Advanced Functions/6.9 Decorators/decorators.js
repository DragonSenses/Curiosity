/* Decorators and forwarding, call/apply */
/* Summary
Decorator is a wrapper around a function that alters its behavior. 
    The main job is still carried out by the function.

Decorators can be seen as “features” or “aspects” that can be added to a function. 
We can add one or add many. And all this without changing its code!

- func.call(context, args...) runs the function providing the first argument as
  "this", and the next as arguments. It allows to call a function explicitly
  setting this
    * call expects a list of arguments
    * allows to pass iterable args as the list to call through spread syntax ...
  
- func.apply(context, args) runs the func setting this=context and using an 
array-like object args as the list of arguments.
  * apply takes an array-like object with them.
  * only accepts array-like args
  
They perform the same call of func with given context and arguments.
So these two calls are almost equivalent:
  * func.call(context, ...args);
  * func.apply(context, args);

…And for objects that are both iterable and array-like, such as a real array, 
we can use any of them, but apply will probably be faster, because most 
JavaScript engines internally optimize it better.

To implement cachingDecorator, we studied methods:
 - func.call(context, arg1, arg2…) – calls func with given context and arguments.
 - func.apply(context, args) – calls func passing context as this and array-like 
                               args into a list of arguments.

The generic call forwarding is usually done with apply:

let wrapper = function() {
  return original.apply(this, arguments);
};

Method Borrowing takes a method from an object and call it in the context of 
another object. It is quite common to take array methods and apply them to
arguments. The alternative is to use rest parameters object that is a real array.
*/

/* JavaScript gives exceptional flexibility when dealing with functions. 
They can be passed around, used as objects, and now we’ll see how to forward 
calls between them and decorate them. */


/* Transparent Caching */
/* Let’s say we have a function slow(x) which is CPU-heavy, but its results are
stable. In other words, for the same x it always returns the same result.

If the function is called often, we may want to cache (remember) the results 
to avoid spending extra-time on recalculations.

But instead of adding that functionality into slow() we’ll create a wrapper 
function, that adds caching. As we’ll see, there are many benefits of doing so. */

function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}

// eslint-disable-next-line no-func-assign
slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) is cached and the result returned
console.log( "Again: " + slow(1) ); // slow(1) result returned from cache

console.log( slow(2) ); // slow(2) is cached and the result returned
console.log( "Again: " + slow(2) ); // slow(2) result returned from cache


/* In the code above cachingDecorator is a decorator: a special function 
that takes another function and alters its behavior. 

The idea is that we can call cachingDecorator for any function, and it will 
return the caching wrapper. That’s great, because we can have many functions 
that could use such a feature, and all we need to do is to apply 
cachingDecorator to them.

By separating caching from the main function code we also keep the main 
code simpler.

The result of cachingDecorator(func) is a “wrapper”: function(x) that “wraps” 
the call of func(x) into caching logic: 


function cachingDecorator(func) {
  let cache = new Map();
                              wrapper
  return function(x) {      -----
    if (cache.has(x)) {         |
      return cache.get(x);      |
    }                           |
                                |
    let result = func(x);   <---| around the function "func"
                                |
    cache.set(x, result);       |
    return result;              |
  };                        -----
}


From an outside code, the wrapped slow function still does the same. 
It just got a caching aspect added to its behavior.
*/

/* Summary - there are several benefits of using a separate cachingDecorator 
instead of altering the code of slow itself: 
  - The cachingDecorator is reusable. We can apply it to another function.
  - The caching logic is separate, it did not increase the complexity of slow 
  itself (if there was any).
  - We can combine multiple decorators if needed (other decorators will follow).
*/

/* Using "func.call" for the context */
/* The caching decorator mentioned above is not suited to work with object methods.

For instance, in the code below worker.slow() stops working after the decoration: */
// we'll make worker.slow caching
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // scary CPU-heavy task here
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

/* same code as before 
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}
*/


console.log( worker.slow(1) ); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

console.log( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined

/* The error occurs in the line (*) that tries to access this.someMethod and fails. 

The reason is that the wrapper calls the original function as func(x) in the 
  line (**). And, when called like that, the function gets this = undefined.

We would observe a similar symptom if we tried to run: */
let func = worker.slow;
func(2);

/* So, the wrapper passes the call to the original method, but without the 
context this. Hence the error. 

Let’s fix it. */

/* func.call(context, ...args) */
/* There’s a special built-in function method func.call(context, …args) that 
allows to call a function explicitly setting this.

The syntax is:
      func.call(context, arg1, arg2, ...)
     
It runs func providing the first argument as this, and the next as the arguments.

To put it simply, these two calls do almost the same:

func(1, 2, 3);
func.call(obj, 1, 2, 3);

They both call func with arguments 1, 2 and 3. The only difference is that 
  func.call also sets this to obj.
*/

/* As an example, in the code below we call sayHi in the context of different 
objects: sayHi.call(user) runs sayHi providing this=user, 
and the next line sets this=admin: */
function sayHi() {
  console.log(this.name);
}

let user = { name: "Luna" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call( user );   // Luna
sayHi.call( admin );  // Admin


/* And here we use call to call say with the given context and phrase: */
function say(phrase) {
  console.log(this.name + ': ' + phrase);
}

/* let user = { name: "Luna" }; */

// user becomes this, and "Hello" becomes the first argument
say.call( user, "Hello" ); // Luna: Hello


/* In our case, we can use call in the wrapper to pass the context to the 
original function: */
worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecoratorFixed(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    // let result = func(x); // wrong way
    let result = func.call(this, x); // "this" is passed correctly now
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecoratorFixed(worker.slow); // now make it caching

console.log( worker.slow(2) ); // works
console.log( worker.slow(2) ); // works, doesn't call the original (cached)


/* Now everything is fine.

To make it all clear, let’s see more deeply how this is passed along: 

1. After the decoration worker.slow is now the wrapper function (x) { ... }.

2. So when worker.slow(2) is executed, the wrapper gets 2 as an argument and 
  this=worker (it’s the object before dot).
  
3. Inside the wrapper, assuming the result is not yet cached, func.call(this, x) 
passes the current this (=worker) and the current argument (=2) 
to the original method. */



/* Going multi-argument */
/* Now let’s make cachingDecorator even more universal. Till now it was working 
only with single-argument functions.

Now how to cache the multi-argument worker.slow method? */
worker = {
  slow(min, max) {
    return min + max; // scary CPU-hogger is assumed
  }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);

/* Previously, for a single argument x we could just cache.set(x, result) to 
save the result and cache.get(x) to retrieve it. But now we need to remember 
the result for a combination of arguments (min,max). The native Map takes 
single value only as the key. 

There are many solutions possible:
  1. Implement a new (or use a third-party) map-like data structure that is 
  more versatile and allows multi-keys.

  2. Use nested maps: cache.set(min) will be a Map that stores the pair (max, result). 
  So we can get result as cache.get(min).get(max).

  3. Join two values into one. In our particular case we can just use a 
  string "min,max" as the Map key. For flexibility, we can allow to provide a 
  hashing function for the decorator, that knows how to make one value from many.

For many practical applications, the 3rd variant is good enough, so we’ll stick to it.

Also we need to pass not just x, but all arguments in func.call. 

Let’s recall that in a function() we can get a pseudo-array of its arguments as 
arguments, 
  so func.call(this, x) should be replaced with func.call(this, ...arguments).
*/

/* Here's a more powerful cachingDecorator */
// multiargument, hashing, cachingDecorator that uses func.call(this, ...args)
worker = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecoratorPowerful(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecoratorPowerful(worker.slow, hash);

console.log( worker.slow(3, 5) ); // works
console.log( "Again " + worker.slow(3, 5) ); // same (cached)

/* Now it works with any number of arguments (though the hash function would 
also need to be adjusted to allow any number of arguments. An interesting way 
to handle this will be covered below). 

There are two changes:
 1) In the line (*) it calls hash to create a single key from arguments. Here 
 we use a simple “joining” function that turns arguments (3, 5) into the key 
 "3,5". More complex cases may require other hashing functions.

 2) Then (**) uses func.call(this, ...arguments) to pass both the context and 
 all arguments the wrapper got (not just the first one) to the original function. 
*/


/* func.apply() */
/* Syntax:
      func.apply(context, args)

It runs the func setting this=context and using an array-like object args as 
the list of arguments.

The only syntax difference between call and apply is that call expects a list 
of arguments, while apply takes an array-like object with them.

So these two calls are almost equivalent:
  * func.call(context, ...args);
  * func.apply(context, args);

They perform the same call of func with given context and arguments.

There’s only a subtle difference regarding args:
  -The spread syntax ... allows to pass iterable args as the list to call.
  -The apply accepts only array-like args.

…And for objects that are both iterable and array-like, such as a real array, 
we can use any of them, but apply will probably be faster, because most 
JavaScript engines internally optimize it better.
*/

/* Call Forwarding */
/* Passing all arguments along with the context to another function is called 
call forwarding. 

That’s the simplest form of it:

let wrapper = function() {
  return func.apply(this, arguments);
};

When an external code calls such wrapper, it is indistinguishable from the 
call of the original function func. */