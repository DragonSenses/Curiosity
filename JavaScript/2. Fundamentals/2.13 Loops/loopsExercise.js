/* What is the last value outputted? */
let i = 3;

while (i) {
  console.log( i-- );
}

// Answer: 1
/* Loop iteration decreases i by 1. 
Condition while(i) stops loop when i = 0
let i = 3;

console.log(i--); // shows 3, decreases i to 2

console.log(i--) // shows 2, decreases i to 1

console.log(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop
*/

/* Which values does the while loops show? 
Do both loops print the same values? */

i = 0;
while (++i < 5) console.log( i ); // prefix form ++i

i = 0;
while (i++ < 5) console.log( i ); // postfix form i++

/* Answer
while (++i < 5) console.log( i ); // prefix form ++i
    Condition   Prints      i
    1 < 5       1           1
    2 < 5       2           2
    3 < 5       3           3
    4 < 5       4           4
    5 < 5       

First increments i, then returns new value, so first comparison is 1 < 5.
At i = 4, ++i increments i to 5, so while(5 < 5) fails, loop stops. 
5 is not shown.

while (i++ < 5) console.log( i ); // postfix form i++
    Condition   Prints      i
    0 < 5       1           1
    1 < 5       2           2
    2 < 5       3           3
    3 < 5       4           4
    4 < 5       5           5
    5 < 5                   6

First value is i = 1, but posfix form increments i and returns the OLD value so
condition is (0 < 5). The console.log() print statement is separate, executes
after increment and the comparison. So current i is printed.
At i = 4, it increments i to 5 but returns 4. So condition is while(4 < 5), so
control goes to console.log(i) to print the value of i = 5. 
At i = 5, the last condition is while(5 < 5), false, so does not print but i is
increment to i = 6.
*/


/* What values are shown by the for loop? */

for (let i = 0; i < 5; ++i) console.log( i ); // prefix form
for (let i = 0; i < 5; i++) console.log( i ); // postfix form

/* Answer
for (let i = 0; i < 5; ++i) console.log( i ); // prefix form
    Condition   i   Prints
    
for (let i = 0; i < 5; i++) console.log( i ); // postfix form
*/
