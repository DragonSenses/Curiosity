"use strict";

/* Create a script that prompts the visitor to enter two numbers and then shows their sum. 
P.S. There is a gotcha with types.

    Since prompt returns a string, the sum of both x and y would be their 
    concatenation, e.g., "1" + "2" = "12"

    Therefore, the unary plus is added before prompt. It immediately converts
    the value to a number. And so the sum between x and y will return the 
    sum of both numbers.
*/

let x = +prompt("The first number?", "");
let y = +prompt("The second number?", "");

alert( x + y );