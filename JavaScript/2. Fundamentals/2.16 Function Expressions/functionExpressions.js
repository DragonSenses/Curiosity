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
function sayHi(){
    console.log("hi");
}

/* Function Expression Syntax */
let sayHello = function() {
    console.log("hello");
};

/* Function Expressions allows creation of functions in the middle of any 
expression, in this case the context is right side of assigngment expression.
    - Omitting a name is allowed for Function Expressions
    - "Create a function and put it into the variable sayHello"
*/

alert( sayHi );   // shows the function declaration code
alert( sayHello); // shows the function expression code

// Note: function names without parentheses are not executed
// the source code is shown (i.e. it's String representation)

/* Functions are Values, we can work with it like other kinds of values 
(1) Function Declaration creates the function and puts it into variable named sayHi
(2) Copies into the variable func, with no parentheses (so it would store the 
    function itself and not just the result of the function sayHi())
(3) Function can be called with both sayHi() and func() 
*/
function sayHi() {  // (1) create
    alert( "Hi" );
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
    
*/