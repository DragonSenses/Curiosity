/* Function Expressions
Summary
    - Functions are values. They can be assigned, copied or declared in any place of the code.
    - If the function is declared as a separate statement in the main code flow, that’s called 
    a "Function Declaration".
    - If the function is created as a part of an expression, it’s called a "Function Expression".
    - Function Declarations are processed before the code block is executed. 
    They are visible everywhere in the block.
    - Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable,
because it is visible prior to the declaration itself. That gives us more flexibility
in code organization, and is usually more readable.
*/

/* Function Declaration Syntax */
function sayHi() {
    console.log("hi");
}

/* Function Expression Syntax */
let sayHello = function () {
    console.log("hello");
};

/* Function Expressions allows creation of functions in the middle of any 
expression, in this case the context is right side of assigngment expression.
    - Omitting a name is allowed for Function Expressions
    - "Create a function and put it into the variable sayHello"
*/

alert(sayHi);   // shows the function declaration code
alert(sayHello); // shows the function expression code

// Note: function names without parentheses are not executed
// the source code is shown (i.e. it's String representation)

/* Functions are Values, we can work with it like other kinds of values 
(1) Function Declaration creates the function and puts it into variable named sayHi
(2) Copies into the variable func, with no parentheses (so it would store the 
    function itself and not just the result of the function sayHi())
(3) Function can be called with both sayHi() and func() 
*/
function sayHi() {  // (1) create
    alert("Hi");
}

let func = sayHi;  // (2) copy

func();  // Hi     // (3) run the copy (it works)!
sayHi(); // Hi     //     this still works too (why wouldn't it)

/* Could also use function expression instead to declare sayHi 
let sayHi = function() { // (1) create
  alert( "Hello" );
};

A semicolon is at the end because it is created inside the assignment statement
    - Not part of the function syntax, but recommended at the end of statements
*/

/* Callback Functions
    A callback function is a function passed into another function as an 
argument, which is then invoked inside the outer function to complete some 
kind of routine or action.

Example: a function ask(question, yes, no) with 3 parameters:
    - question - text of the question
    - yes - Function to run if the answer is "Yes"
    - no - Function to run if the answer is "No"
Function should ask the question and, depending on the user’s answer, 
call yes() or no():
*/
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

function showOk() {
    alert("You agreed.");
}

function showCancel() {
    alert("You canceled the execution.");
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

/* The arguments showOk and showCancel of ask are called callback functions or 
just callbacks.

The idea is that we pass a function and expect it to be "called back" later if 
necessary. In our case, showOk becomes the callback for "yes" answer, 
and showCancel for "no" answer.

In practice, such functions are quite useful. The major difference between a 
real-life ask and the example above is that real-life functions use more 
complex ways to interact with the user than a simple confirm. In the browser, 
such functions usually draw a nice-looking question window.
*/

/* A Function Expression Equivalent */
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

ask(
    "Do you agree?",
    function () { alert("You agreed."); },
    function () { alert("You canceled the execution."); }
);

// Anonymous Functions are declared inside the ask call, they have no name
// Such functions are not accessible outside of ask, because they are not 
// assigned variables, but this is what we want here

/* A Function is a value representing an Action
- Regular values like Strings or numbers represent the data
- A function ca be perceived as an action
- We can pass it between variables and run when we want
*/

/* Function Expression vs. Function Declaration
Key Differences: 
    I.   Syntax
    II.  When a function is created by the JavaScript engine
    III. Block Scope
*/

/* I.   Syntax 
Function Declaration: a function, declared as a separate statement */
function sum(a, b) {
    return a + b;
}

/* Function Expression: a function, created inside an expression or inside 
another syntax construct. Here, the function is created on the right side 
of the "assignment expression" =: */
let sum = function(a, b) {
    return a + b;
};

/* II.  When a function is created by the JavaScript engine 
- Function Expression is created when the execution reaches it and is usable only from that moment.     
- Function Declaration can be called earlier than it is defined.

    Once the execution flow passes to the right side of the assignment 
let sum = function… – here we go, the function is created and can be used 
(assigned, called, etc. ) from now on.
    Function Declarations are different. They can be called earlier than is defined.
e.g., a global Function Declaration is visible in the whole script, no matter where it is.

That’s due to internal algorithms. When JavaScript prepares to run the script,
it first looks for global Function Declarations in it and creates the functions. 
We can think of it as an initialization stage.

And after all Function Declarations are processed, the code is executed. 
So it has access to these functions.
*/

// This works because sayHi is created when JavaScript is preparing to start the
// script and is visible everywhere in it:
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}

/* But a FunctionExpression would not work since they are created when the
execution reaches them 

sayHi("John"); // error!

let sayHi = function(name) {  // Execution reaches function expression
  alert( `Hello, ${name}` );
};

*/

/* III. Block Scope 
Another special feature of Function Declarations is their block scope. 

    In strict mode, when a Function Declaration is within a code block, 
it’s visible everywhere inside that block. But not outside of it.

For instance, lets declare a function welcome() depending on age variable
that we get during runtime. And then we place to use it some time later. 
*/
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
welcome(); // Error: welcome is not defined

// A Function Declaration is only visible inside the code block in which it resides
// Another Example:

age = 16; // take 16 as an example

if (age < 18) {
  welcome();               // \   (runs)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
  welcome();               // /   (runs)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined


/* How to make welcome visible outside of if? 
    Correct approach is to use a Function Expression and assign welcome to the
variable that is declared outside of if and has the property visibility. 
*/

age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // ok now

/* Simplify above example further using ternary operator ? */
age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // ok now

/* When to choose between Function Declaration vs. Function Expression? 

1. Consider Function Declaration syntax, gives more freedom in how to organize
code, because it can be called before they are declared.
2. Function Declarations can be better for readability, easier to look up
function f(…) {…} in the code than let f = function(…) {…};. 
Function Declarations are more "eye-catching". 

Use Function Expression when we need a conditional declaration like the above
example. 
*/