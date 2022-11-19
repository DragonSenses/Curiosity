/* What's the ouput for the code below? */
alert( null || 2 || undefined );
alert( alert(1) || 2 || alert(3) );
alert( 1 && null && 2 );
alert( alert(1) && alert(2) );
alert( null || 2 && 3 || 4 );

// Answer:
// Calls to alert() does not return a value, in other words, it returns undefined

alert( null || 2 || undefined ); // 2, first truthy value
alert( alert(1) || 2 || alert(3) ); // Shows alerts(1) then alerts(2)
alert( 1 && null && 2 );    // null, the 1st falsy value, is returned so alert("null")

alert( alert(1) && alert(2) ); 
// alert(1) shows 1, then stops because alert() call returns undefined, 
// then alert("undefined")

alert( null || 2 && 3 || 4 );

// Answer: 3
// && has higher preedence than or
// 2 && 3 result is 3
// null || 3 || 4
// 3 is the first truthy value


/* Check the Range between 
Write an if condition to check that age is between 14 and 90 inclusively.

Inclusively means that age can reach the edges 14 or 90.
*/

let age = 20;
if (age >= 14 && age <= 90){
  
}


/* Check the Range outside 
Write an if condition to check that age is NOT between 14 and 90 inclusively.

Create two variants: the first one using NOT !, the second one – without it.
*/

if( !(age >= 14 && age <= 90)){ // 1st variant

}

if( age < 14 || age > 90){ // 2nd variant

}

/* A question about if 
Which of these alerts are going to execute?

What will the results of the expressions be inside if(...)?
*/
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );

// Answer: The 'first' and 'third' will execute.

if (-1 || 0) alert( 'first' ); // Runs, becausle result of -1 || 0 = -1, truthy

if (-1 && 0) alert( 'second' ); // Doesn't run, -1 && 0 = 0, falsy

// Executes
// Operator && has a higher precedence than ||
// so -1 && 1 executes first, giving us the chain:
// (null || -1 && 1)  ->  (null || 1)  ->  (1)
if (null || -1 && 1) alert( 'third' );


/* Extra Notes on Boolean Algebra
De Morgan's Theorem states that complementing the result of OR'in variables
is equivalent to AND'ing the complements of the individual variables 

!(A||B) equals !A && !B

*/