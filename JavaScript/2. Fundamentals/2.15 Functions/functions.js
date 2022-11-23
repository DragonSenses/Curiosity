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

Default Values
    If a function is called, but an argument is not provided, then the corresponding
value becomes undefined.
    We can specify a default value for a parameter in the function declaration.
Using "=" after the parameter. It can be a String or even a function.

Alternatives to Default Parameters
    1. Check parameter by comparing it with "undefined"
    2. Use || opearator to set a default value to parameter
    3. Use ?? operator to set a default value (best when most falsy values 
        should be considered normal e.g., 0, empty string, or false) 

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
function say() {
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

function changeUserName() {
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

function showName() {
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

function showMessage(user, text) { // parameters: user, text
    console.log(user + ': ' + text); // Format: "user: text"
}

showMessage('Luna', 'Hiya!');       // Luna: Hiya!
showMessage('Luna', "What's up?");  // Luna: What's up?

// Pass By Value, here the function adds something to the argument passed in
function showMessageFancy(user, text) {
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
    We can specify a default value for a parameter in the function declaration.
Using "=" after the parameter. It can be a String or even a function.
*/

function showMsg(from, text = "no text given") { // text has a default value
    console.log(from + ": " + text);
}

showMsg("Flora"); // Flora: no text given

// When a Default Value is a function
function anotherFunction() {
    return "-__-";
}

function showMsgWithDefault(from, text = anotherFunction()) {
    // anotherFunction only executed if no text is given
    // its result becomes the value of the text
    console.log(from + ": " + text);
}

showMsgWithDefault("Flora"); // Flora: -__-


/* Alternatives to Default Parameters
    1. Check parameter by comparing it with "undefined"
    2. Use || opearator to set a default value to parameter
    3. Use ?? operator to set a default value (best when most falsy values 
        should be considered normal e.g., 0, empty string, or false) 
*/

// 1. Compare parameter with undefined
function show1(text) {
    if (text === undefined) { // if the parameter is missing
        text = 'empty message';
    }
    console.log(text);
}

// 2. Use || operator to set default value
function show2(text){
    // if text is undefined or otherwise falsy, set it to 'empty'
    text = text || 'empty';
}

// 3. Use ?? operator to set default value (if 0, "", false are valid values)
function show3(text){
    console.log(text ?? "unknown");
}

show3(0);       // 0
show3("");      // ""
show3(false);   // false
show3(null);    // unknown
show3();        // unknown


/* Returning a Value

*/