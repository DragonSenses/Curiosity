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

/*  */