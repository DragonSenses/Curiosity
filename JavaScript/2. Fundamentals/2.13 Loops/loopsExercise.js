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
1. Begin - Execute once i = 0
2. Check the condition i < 5
3. If true - execute loop body, print(i), and then increment

Since increment is separated from the condition check (step 3 is separated from
    step 2) the value returned by the increment is not used. There is no 
    difference between i++ and ++i (postfix, prefix forms in for loops)

Both for loops print: 0 to 4. 
*/

/* Output even numbers (2 to 10) using a for loop.  */
// Definition of even number E = 2k. Odd number is O = 2k + 1; 
for(let k = 2; k <= 10; k+=2){  
    console.log(k);
}

/* Replace for with while 
for (let i = 0; i < 3; i++) {
    console.log( `number ${i}!` );
}
Outputs:
number 0!
number 1!
number 2!
*/
i = 0;
while(i < 3) {  
    console.log( `number ${i++}!` );
}

/* Repeat until input is correct 
Write a loop which prompts for a number greater than 100. If the visitor 
enters another number – ask them to input again.

The loop must ask for a number until either the visitor enters a number 
greater than 100 or cancels the input/enters an empty line.

Here we can assume that the visitor only inputs numbers. There’s no need to 
implement a special handling for a non-numeric input in this task.
*/