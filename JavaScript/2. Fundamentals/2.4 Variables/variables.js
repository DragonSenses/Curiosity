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