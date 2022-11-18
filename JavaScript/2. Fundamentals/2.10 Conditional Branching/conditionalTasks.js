/*  if(string zero) or if("0")
Will alert be shown?
*/
if ("0") {
    alert( 'Hello' );
}
// Answer: Yes, Boolean Conversion on "0" results in true, since it is a non-empty String

/* Show the Sign 
Using if..else construct, write code which gets a number via prompt and then
shows in alert:
    1   if value is greater than 0
    -1  if value is less than 0
    0   if equals 0
Assume input is always a number.
*/
let value = prompt("Please input a number:",'');

if(value > 0) {
    alert(1);
} else if(value < 0){
    alert(-1);
} else{
    alert(0);
}


/* Rewrite 'if' into '?' */

let result;

if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}

result = (a + b < 4) ? 'Below' : 'Over';


// Exercise below is for one's understanding only, avoid abusing ? operator 
// and eschew Nested Ternary Operators for readability and maintainability

/* Nested Ternary Operators - Rewrite 'if..else' into '?' */
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}

// Solution:
message = (login == 'Employee') ? 'Hello' :
  (login == 'Director') ? 'Greetings' :
  (login == '') ? 'No login' :
  '';