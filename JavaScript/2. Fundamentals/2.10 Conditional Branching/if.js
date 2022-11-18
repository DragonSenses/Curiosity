/* Conditional Branching: Using if statements or '?' Operator */

/* if statement Syntax: 

if(condition) { block of code }

if condition evaluates to true, then block of code is execute. 
if condition is false, then block of code is skipped. 

Recall - Boolean Conversion Rules:
    Values that are intuitively "empty":
        0               ->  false
        empty string    ->  false
        null            ->  false
        undefined       ->  false
        NaN             ->  false
    Non-Empty Values
        "0"             ->  true
        " "             ->  true
         7              ->  true
        everything else ->  true
*/

let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
    alert( "That's correct!" );
    alert (`ECMAScript-2015 was published in ${year}!`);
}

/* Boolean Conversions 
if(0) { // 0 is false, will never run code
    code...
}

if(1) { // 1 is true, will always run code
    code...
}

let cond = (year == 2015); // Equality evaluates to {true, false}
if (cond) {                // runs if condition is met
    code...
}
*/

/* else clause - executing a block of code when condition is false */
if (year == 2015) {
    alert( 'Correct!' );
} else {
alert( 'Incorrect.' ); // any value except 2015
}

/* else if clause - testing several variants of a condition */
year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}