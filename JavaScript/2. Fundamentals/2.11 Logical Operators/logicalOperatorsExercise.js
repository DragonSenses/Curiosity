/* What's the ouput for the code below? */
alert( null || 2 || undefined );
alert( alert(1) || 2 || alert(3) );
alert( 1 && null && 2 );
alert( alert(1) && alert(2) );
alert( null || 2 && 3 || 4 );

// Answer:
alert( null || 2 || undefined ); // 2, first truthy value

alert( alert(1) || 2 || alert(3) );
alert( 1 && null && 2 );
alert( alert(1) && alert(2) );
alert( null || 2 && 3 || 4 );


/* Check the Range between 
Write an if condition to check that age is between 14 and 90 inclusively.

Inclusively means that age can reach the edges 14 or 90.
*/


/* Check the Range outside 
Write an if condition to check that age is NOT between 14 and 90 inclusively.

Create two variants: the first one using NOT !, the second one – without it.
*/


/* A question about if 

Which of these alerts are going to execute?

What will the results of the expressions be inside if(...)?
*/
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );