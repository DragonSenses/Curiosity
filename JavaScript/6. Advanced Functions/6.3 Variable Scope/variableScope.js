/* Variable scope, closure */

/* JavaScript is a very function-oriented language. It gives us a lot of freedom. 
A function can be created at any moment, passed as an argument to another function, 
and then called from a totally different place of code later.

We already know that a function can access variables outside of it (“outer” variables).

But what happens if outer variables change since a function is created? 
Will the function get newer values or the old ones?

And what if a function is passed along as an argument and called from another 
place of code, will it get access to outer variables at the new place?

Let’s expand our knowledge to understand these scenarios and more complex ones. 

In JavaScript, there are 3 ways to declare a variable: 
    let, const (the modern ones), and 
    var (the remnant of the past).
Here we'll use let variables in examples, and const too which behave the same
The old var has some notable differences and will be covered later.
*/

/* Code Blocks */
/* If a variable is declared inside a code block {...}, 
it’s only visible inside that block.

For example: */
{
    // do some job with local variables that should not be seen outside
  
    let message = "Hello"; // only visible in this block
  
    console.log(message); // Hello
}

// console.log(message); // Error: message is not defined

/* We can use this to isolate a piece of code that does its own task, 
with variables that only belong to it: */
{
    // show message
    let message = "Hello";
    console.log(message);
}
  
{
    // show another message
    let message = "Goodbye";
    console.log(message);
}

/* Note: There’d be an error without blocks
If we use let with the existing variable name and without blocks:
Error: variable already declared. */

/* For if, for, while and so on, variables declared in {...} are also 
only visible inside: */
// eslint-disable-next-line no-constant-condition
if (true) {
    let phrase = "Hello!";
  
    console.log(phrase); // Hello!
}
  
// console.log(phrase); // Error, no such variable!

/* Here, after if finishes, the console.log below won’t see the phrase, hence the error.

That’s great, as it allows us to create block-local variables, specific to an if branch. 

The similar thing holds true for for and while loops.
*/
for (let i = 0; i < 3; i++) {
    // the variable i is only visible inside this for
    console.log(i); // 0, then 1, then 2
}
  
// console.log(i); // Error, no such variable

/* Visually, let i is outside of {...}. But the for construct is special here: 
    the variable, declared inside it, is considered a part of the block.
*/


/* Nested Functions */
/* A function is called “nested” when it is created inside another function.

It is easily possible to do this with JavaScript.

We can use it to organize our code, like this: */
function sayHiBye(firstName, lastName) {

    // helper nested function to use below
    function getFullName() {
      return firstName + " " + lastName;
    }
  
    console.log( "Hello, " + getFullName() );
    console.log( "Bye, " + getFullName() );
  
}

sayHiBye("Luna", "Berry");

/* Here the nested function getFullName() is made for convenience. 
It can access the outer variables and so can return the full name. 

Nested functions are quite common in JavaScript.

What’s much more interesting, a nested function can be returned: either as 
    a property of a new object or as a result by itself. 
    
It can then be used somewhere else. No matter where, it still has access 
to the same outer variables. */


/* Below, makeCounter creates the “counter” function that returns the next 
number on each invocation: */
function makeCounter() {
    let count = 0;
  
    return function() {
      return count++;
    };
}
  
let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2

/* Despite being simple, slightly modified variants of that code have practical uses, 
for instance, as a random number generator to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? 
What’s going on with the variables here?

Understanding such things is great for the overall knowledge of JavaScript and 
beneficial for more complex scenarios. So let’s go a bit in-depth. */


/* Lexical Environment */
/* Any understanding without low-level language details would be lacking 
and incomplete, so get ready.

For clarity, the explanation is split into multiple steps. */

/* Step 1. Variables */
/* In JavaScript, every running function, code block {...}, and the script as 
a whole have an internal (hidden) associated object known as the Lexical Environment.

The Lexical Environment object consists of two parts:
 1. Environment Record – an object that stores all local variables as its 
 properties (and some other information like the value of this).
 2. A reference to the outer lexical environment, the one associated with the outer code.

A 'variable' is just a property of the special internal object, Environment Record. 
 - "To get or change a variable" means "to get or change a property of that object".

In this simple code without functions, there is only one Lexical Environment: 
                             Lexical Environment    outer
let phrase = "Hello";   ----- [phrase: "Hello"]     ->  null
alert(phrase);

This is the so-called global Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) 
and the arrow means the outer reference. 

The global Lexical Environment has no outer reference, that’s why the arrow points to null.

As the code starts executing and goes on, the Lexical Environment changes.*/

/* Here’s a little bit longer code: 
                                                       outer
execution start     -------- [phrase: <uninitialized>] ---> null
let phrase;         -------- [phrase: undefined      ]
phrase = "Hello";   -------- [phrase: "Hello"        ]
phrase = "Bye";     -------- [phrase: "Bye"          ]


Rectangles on the right-hand side demonstrate how the 
global Lexical Environment changes during the execution:

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
  * Initially, they are in the "Uninitialized" state. 
  * That’s a special internal state, it means that the engine knows about the variable, 
   but it cannot be referenced until it has been declared with let. 
  * It’s almost the same as if the variable didn’t exist.

2. Then let phrase definition appears. There’s no assignment yet, so its value is undefined. 
We can use the variable from this point forward.

3. phrase is assigned a value.

4. phrase changes the value.

Everything looks simple for now, right?
 - A variable is a property of a special internal object, associated with the 
 currently executing block/function/script.
 - Working with variables is actually working with the properties of that object.


Lexical Environment is a specification object
“Lexical Environment” is a specification object: it only exists “theoretically” 
in the language specification to describe how things work. 

We can’t get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to 
save memory and perform other internal tricks, as long as the visible behavior 
remains as described.
*/

/* Step 2. Function Delcarations
A function is also a value, like a variable.

The difference is that a Function Declaration is instantly fully initialized.

When a Lexical Environment is created, a Function Declaration immediately 
becomes a ready-to-use function (unlike let, that is unusable till the declaration).

That’s why we can use a function, declared as Function Declaration, 
even before the declaration itself.

For example, here’s the initial state of the global Lexical Environment 
when we add a function:

                                                       outer
execution start     -------- [phrase: <uninitialized>] ---> null
                             [say: function          ]
let phrase = "Hello" ; ---   [           ...         ]

function say(name){
    console.log( ${phrase}, ${name} );
}

Naturally, this behavior only applies to Function Declarations, not 
Function Expressions where we assign a function to a variable, 
such as let say = function(name)....
 */

/* Step 3. Inner and Outer Lexical Environment */
/* When a function runs, at the beginning of the call, a new Lexical Environment 
is created automatically to store local variables and parameters of the call.

For instance, for say("John"), it looks like this (the execution is at the line, 
labelled with an arrow):

let phrase = "Hello";

function say(name){                    Lexical Environment of the call        outer
>   console.log( ${phrase}, ${name} );   [name: "Luna"]  ->  [say: function]   -> null
}                                                       outer[phrase: "Hello"]

say("Luna"));   // Hello, Luna 


*/