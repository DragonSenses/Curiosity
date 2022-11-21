/* The Switch Statement 
Summary
	• switch statement compares a value with multiple variants
    • switch has one or more case blocks, and an optional default
	• If there is no break, then the execution continues with the next case 
      without any checks
	• switch & case allow arbitrary expressions to be its argument
    • Type Matters. The equality check is always strict. The values must be of
      the same type to match. 
*/

/* Syntax: 

switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}

1. Value of x is checked for a strict equality to the value from the first 
case (that is, value1) then to the second (value2) and so on.

2. If the equality is found, switch starts to execute the code starting from 
the corresponding case, until the nearest break (or until the end of switch).

3. If no case is matched then the default code is executed (if it exists).
*/

let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
  case 4:
    alert( 'Exactly!' );
    break;
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}

/* If there is no "break" then the execution continues with the next case
without any checks */

a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
}

/* Output of the example above with no breaks, we will see sequential execution 
of the three alerts
    alert( 'Exactly!' );
    alert( 'Too big' );
    alert( "I don't know such values" );
*/

/* Grouping "cases" as a side effect of no break */
a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;

  default:
    alert('The result is strange. Really.');
}
// Here we group cases 3 and 5, showing the same message, as execution starts
// from case 3 line and goes through case 5 because there's no break

/* Any expression can be a switch/case argument */
a = "1";
let b = 0;

switch (+a) {
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;

  default:
    alert("this doesn't run");
}
// Here +a gives 1, compared with b + 1 in case, and the corresponding code is executed

/* Type Matters - equality check is always strict so values must be of the same
type to match */

let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}

// case 0, 1 the first alert runs
// case 2 the second alert runs
// case 3, the result of the prompt is a string "3", which is not strictly
// equal to the number 3. So it is dead code. default variant will execute.