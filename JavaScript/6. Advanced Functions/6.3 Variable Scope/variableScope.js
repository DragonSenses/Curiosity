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