/**
 * A variable is a named storage for data. To create a variable use "let" 
 * keyword. 
 * - let is a modern variable declaration
 * - var is an older variable declaration
 * - const is a variable declaration where the value of the variable 
 * can't be changed.
 */

let variable;       // Declares a variable
variable = 'Hi';    // Assign data into variable
alert(variable);    // Access variable

// Declaring and assigning into one line
let message = 'Hello';
alert(message);

// Declaring multiple variables, multiline style
let user = 'user', 
    age = 20, 
    msg = 'Hey';

/* Variable Naming
1. Name must contain only letters, digits, or symbols $ and _
2. First character must not be a digit
When the name contains multiple words, camelCase is used (i.e., words go one 
after another, each word except first starting with a capital letter: myVeryLongName)
*/

/**
 * Constants (unchanging) variable
 * Use keyword "const" instead of "let" to declare the variable. 
 * 
 * Uppercase constants are a practice to use contants for 
 * difficult-to-remember values that are known prior to execution. They
 * are named with capital letters and underscores. 
 * 
 * Constants that are known prior to execution (like hexadecimal value of red) 
 * and constants calculated in run-time, during execution, but do not change 
 * after their initial assignment. 
 * 
 * Those calculated in run-time should be named normally (camelCase).
 * Capital-named constants are only used as aliases for hard-coded values,
 * such as a hexadecimal constant for colors.  
 * 
 */

const goldenRatio = 1.6180; 
const pi = 3.14; 

// Uppercase Constant, easier to remember COLOR_PURPLE than #A020F0
const COLOR_PURPLE = "#A020F0";

// Constant calculated in run-time (not an uppercase constant)
const pageLoadTime = "time taken by a webpage to load";  
