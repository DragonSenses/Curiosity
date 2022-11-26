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
I. Syntax
II. When a function is created by the JavaScript engine
III. Block Scope

*/