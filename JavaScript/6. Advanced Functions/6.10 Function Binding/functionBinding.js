/* Function Binding */
/* Summary
Method func.bind(context, ...args) returns a “bound variant” of function func 
that fixes the context this and first arguments if given.

Usually we apply bind to fix this for an object method, so that we can pass it 
somewhere. For example, to setTimeout.

When we fix some arguments of an existing function, the resulting (less 
universal) function is called partially applied or partial.

Partials are convenient when we don’t want to repeat the same argument over 
and over again. Like if we have a send(from, to) function, and from should 
always be the same for our task, we can get a partial and go on with it.
*/

/* When passing object methods as callbacks, for instance to setTimeout, 
there’s a known problem: "losing this". */

/* Losing “this” */
/* We’ve already seen examples of losing this. Once a method is passed 
somewhere separately from the object – this is lost.

Here’s how it may happen with setTimeout: */
let user = {
  firstName: "Luna",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

/* As we can see, the output shows not "Luna" as this.firstName, 
but undefined! 

That’s because setTimeout got the function user.sayHi, separately 
from the object. The last line can be rewritten as: */
let f = user.sayHi;
setTimeout(f, 1000); // lost user context

/* The method setTimeout in-browser is a little special: it sets this=window 
for the function call (for Node.js, this becomes the timer object, but 
  doesn’t really matter here). So for this.firstName it tries to get 
  window.firstName, which does not exist. In other similar cases, usually 
  this just becomes undefined.

The task is quite typical – we want to pass an object method somewhere else 
(here – to the scheduler) where it will be called. How to make sure that it 
will be called in the right context? */