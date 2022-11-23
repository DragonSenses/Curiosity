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

Parameters & Arguments
    - Can pass arbitrary data to functions using parameters. 
    - When a value is passed  as a function parameter, its also called an argument. 

The difference between parameters and arguments is timing: 
    - Parameters are Declaration-Time
    - Arguments are Call-Time. 
    
We declare functions listing their parameters, then call them passing arguments. 

- A parameter is the  variable listed inside the parentheses in the function declaration 
    - a Declaration Time term
- An argument is the value that is passed to the function when it is called 
    - a Call Time term

Pass-By-Value
    JavaScript is Pass-By-Value i.e., function always gets a copy of the value.
So any changes made to the arguments inside the function do not reflect the
passing variables outside of the function. Changes made to the arguments are 
not reflected outside of the function. The functions work with a local copy.

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


/* Parameters, Arguments, and Pass-By-Value
Can pass arbitrary data to functions using parameters. 

JavaScript is Pass-By-Value i.e., function always gets a copy of the value. 
So any changes made to the arguments inside the function do not reflect the
passing variables outside of the function. Changes made to the arguments are 
not reflected outside of the function. The functions work with a local copy.

When a value is passed  as a function parameter, its also called an argument. 
The difference between parameters and arguments is timing: 
parameters are Declaration-Time and arguments are Call-Time. 

We declare functions listing their parameters, then call them passing arguments. 

- A parameter is the  variable listed inside the parentheses in the function declaration 
    - a Declaration Time term
- An argument is the value that is passed to the function when it is called 
    - a Call Time term
*/

function showMessage(user, text){ // parameters: user, text
    console.log(user + ': ' + text); // Format: "user: text"
}

showMessage('Luna', 'Hiya!');       // Luna: Hiya!
showMessage('Luna', "What's up?");  // Luna: What's up?

// Pass By Value, here the function adds something to the argument passed in
function showMessageFancy(user, text){
    user = '*' + user + '*'; // make user look fancier
    console.log(user + ': ' + text); // Format: "*user*: text"
}

let myUserName = "Luna";

showMessageFancy(myUserName, "Hey!"); // *Luna*: Hey!

// The value of myUsername is the same, the function modified a local copy
console.log(myUserName); // "Luna" 

/* Default Values
    If a function is called, but an argument is not provided, then the corresponding
value becomes undefined.
*/