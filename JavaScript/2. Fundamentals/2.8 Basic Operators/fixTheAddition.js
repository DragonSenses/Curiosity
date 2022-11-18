/* Fix the Addition 
Code below asks user for two numbers and shows their sum. 
Has a bug. Fix it so instead of the output being 12, the result should be 3. 

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(a + b); // 12

*/

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3

/* Answer: The issue is that the variables a and b are strings, since that 
is return type value of prompt is user input text. This can be confirmed
by the code
typeof a;    // 'string'
typeof b;    // 'string'

To fix this we use the unary plus operator and convert variables a and b as
Numbers so that the expression can output the summantion instead of the 
String concatenation. 


Can also use Number(value) function to explicitly convert the strings like so:
alert(Number(a) + Number(b)); // 3

*/