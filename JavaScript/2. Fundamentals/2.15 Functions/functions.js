/* Functions in JavaScript
Summary
Function Declaration:
    function name(parameters, delimited, by, comma){
        ... code body
    }

    - Values passed to a function as parameters are copied to its local variables.
    -  A function may access outer variables. But it works only from inside out. 
    The code outside of the function doesn’t see its local variables.
    - A function can return a value. If it doesn’t, then its result is undefined. 

Readability
    - Mainly use localy variables and parameters in the function, not outer variables
    - Easier to understand a function with parameters, works with them and 
    returns a result than a function which gets no parameters, but modifies outer
    variables as a side effect

Function Naming
    - Self-Describing, name should clearly describe what the function does and returns
    - Functions are actions, so function names are usually Verbal
    - Many well-known function prefixes like create, show, get, check... 
*/

/* Purpose: Reusability, avoids code duplication 
    1. function keyword
    2. Name of function
    3. list of paremeters between parentheses (comma-separated)
    4. function body i.e. code of the function 
*/
function say(){
    console.log("Freedom is not attained through the satisfaction of desires, "
     + "but through its suppression. - Epictetus")
}

// Calling the function by its name -> say()
say();
say();

/* Local vs. Global Variables
Local Variables are declared inside the function, and is only visible within it 

Outer Variables (or Global Variables) are variables declared outside the 
function and are visible inside any function (unless they are shadowd by locals). 
    - Good practice to minize use of global variables
*/
// Here we show how a function can mutate or change the variable userName
let userName = 'Darkness';

console.log(`userName Before function call: ${userName}`);  // prints "Darkness"

function changeUserName(){
   userName = 'Lightness';  // changes "userName" to "Lightness"
}

// call function changeUserName();
changeUserName();
console.log(`userName After function call: ${userName}`);  // prints "Lightness"


/* Shadowed by Locals
If a same-named variable is declared inside the functiton, then it "shadows" the
other one. Code below users the local name, and the outer one is ignored. */

let name = 'Moon';
console.log(`Before: ${name}`);  // prints "Moon"

function showName(){
    let name = 'Sun'; // Declare a local variable, with same name
    console.log(`During: ${name}`);  // prints "Sun" inside the function 
}

showName();

console.log(`After: ${name}`);  // prints "Moon" again


/* Parameters */