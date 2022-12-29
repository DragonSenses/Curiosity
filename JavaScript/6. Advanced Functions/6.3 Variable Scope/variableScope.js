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