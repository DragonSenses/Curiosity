/* Function Binding */
/* Summary
Method func.bind(context, ...args) returns a “bound variant” of function func 
that fixes the context this and first arguments if given.

Usually we apply bind to fix this for an object method, so that we can pass it 
somewhere. For example, to setTimeout.

Basic Syntax:   let boundFunc = func.bind(context);
Full Syntax:    let bound = func.bind(context, [arg1], [arg2], ...);

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
    console.log(`Hello, ${this.firstName}!`);
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

/* Solution 1: A Wrapper */
/* The simplest solution is to use a wrapping function: */
user = {
  firstName: "Luna",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, Luna!
}, 1000);

/* Now it works, because it receives user from the outer lexical environment, 
and then calls the method normally.

The same, but shorter: */
setTimeout(() => user.sayHi(), 1000); // Hello, Luna!

/* Looks fine, but a slight vulnerability appears in our code structure.

What if before setTimeout triggers (there’s one second delay!) user changes value? 
Then, suddenly, it will call the wrong object! */
setTimeout(() => user.sayHi(), 1000);

// ...the value of user changes within 1 second
user = {
  sayHi() { console.log("Another user in setTimeout!"); }
};

// Another user in setTimeout!
/* The next solution guarantees that such thing won’t happen. */


/* Solution 2: Bind */
/* Functions provide a built-in method bind that allows to fix this.

The basic syntax is: 
    let boundFunc = func.bind(context);

The result of func.bind(context) is a special function-like “exotic object”, 
that is callable as function and transparently passes the call to func setting 
this=context.

In other words, calling boundFunc is like func with fixed this.

For instance, here funcUser passes a call to func with this=user:
*/
user = { firstName: "Luna" };

function func() {
  console.log(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // Luna

/* Here func.bind(user) as a “bound variant” of func, with fixed this=user. 

All arguments are passed to the original func “as is”, for instance: */
function funcWithPhrase(phrase) {
  console.log(phrase + ', ' + this.firstName);
}

// bind this to user
funcUser = funcWithPhrase.bind(user);

funcUser("Hello"); // Hello, Luna (argument "Hello" is passed, and this=user)


/* Now let’s try with an object method: */
user = {
  firstName: "Luna",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

// can run it without an object
sayHi(); // Hello, Luna!

setTimeout(sayHi, 1000); // Hello, Luna!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { console.log("Another user in setTimeout!"); }
};

/* In the line (*) we take the method user.sayHi and bind it to user. 
The sayHi is a “bound” function, that can be called alone or passed to 
setTimeout – doesn’t matter, the context will be right. 
*/

/* Here we can see that arguments are passed “as is”, only this is fixed by 
bind: */
user = {
  firstName: "Luna",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, Luna! ("Hello" argument is passed to say)
say("Bye"); // Bye, Luna! ("Bye" is passed to say)


/* Convenience method: bindAll */
/* If an object has many methods and we plan to actively pass it around, 
then we could bind them all in a loop: 

for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}

JavaScript libraries also provide functions for convenient mass binding,
 e.g. _.bindAll(object, methodNames) in lodash. */


/* Partial functions */
/* Until now we have only been talking about binding this. 
Let’s take it a step further.

We can bind not only this, but also arguments. That’s rarely done, but 
sometimes can be handy. 

The full syntax of bind:

  let bound = func.bind(context, [arg1], [arg2], ...);

It allows to bind context as this and starting arguments of the function. */

/* Example: For instance, we have a multiplication function mul(a, b): */
function mul(a, b) {
  return a * b;
}

/* Let’s use bind to create a function double on its base: */
let double = mul.bind(null, 2);

console.log( double(3) ); // = mul(2, 3) = 6
console.log( double(4) ); // = mul(2, 4) = 8
console.log( double(5) ); // = mul(2, 5) = 10

/* The call to mul.bind(null, 2) creates a new function double that passes 
calls to mul, fixing null as the context and 2 as the first argument. 
Further arguments are passed “as is”.

That’s called partial function application – we create a new function by fixing 
some parameters of the existing one.

Please note that we actually don’t use this here. But bind requires it, so we 
must put in something like null. */

/* The function triple in the code below triples the value: */
let triple = mul.bind(null, 3);

console.log( triple(3) ); // = mul(3, 3) = 9
console.log( triple(4) ); // = mul(3, 4) = 12
console.log( triple(5) ); // = mul(3, 5) = 15