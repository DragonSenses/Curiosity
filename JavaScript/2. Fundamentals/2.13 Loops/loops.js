/* For Loops & While Loops 
Used when we need to repeat actions. Loops are a way to repeat the same
code multiple times.


    - Iteration: a single execution of the loop body
*/

/* While Loop 
Syntax:
        while(condition) {
            // code (loop body) ...
        }

- While condition is truthy, the code from loop body is executed. 
- Any expression or variable can be a loop condition, not just comparisons:
the condition is evaluated and converted to a boolean
- while (i) is the same as while (i != 0) 
*/

let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  console.log( i );
  i++;
}

/* Do While Loop 
Syntax:
        do {
            // code (loop body) ...
        } while(condition);

- First execute the body, then check the condition, and, while it’s truthy, 
execute it again and again.
- This form of syntax should only be used when you want the body of the loop 
to execute at least once regardless of the condition being truthy.
 */

/* The For Loop
Syntax:
        for (begin; condition; step) {
            // loop body
        }

        for (initialization; condition; increment) {
            // loop body 
        }
*/

for(let k = 0; k < 3; k++){
    console.log(k);
}

/* Examining the For Loop
begin	    let k = 0	    Executes once upon entering the loop.
condition	k < 3	        Checked before every loop iteration. If false, the loop stops.
body	    console.log(k)	Runs again and again while the condition is truthy.
step	    k++	            Executes after the body on each iteration.

General Loop Algorithm
1. Run begin (once)
2.  -> (if condition -> run body and run step)
3.  -> (if condition -> run body and run step)
4.  -> (if condition -> run body and run step)
5.  ... 

Inline Variable Declaration
Notice the "counter" variable k is declared right in the loop, an inline 
variable declaration, its scope is limited (i.e. only visible inside loop).
Can use an existing variable thats declared outside the loop. 
 */


/* Skipping Parts of the For Loop */

// Skipping "begin" or initialization 
let j = 0; // we have j already declared and assigned

for (; j < 3; j++) { // no need for "begin"
    console.log(j); // 0, 1, 2
}

// Skipping "step" or increment
let l = 0;
for(; l < 3;) {
    console.log(l++); // notice increment within the loop
} 
// This for loop is identical to while(l < 3)

// Skipping Every Part, making and Infinite Loop
// Note: within for, two semicolons must be present, otherwise syntax error
/*  
for(;;){   
    // repeats without limits
}
*/

/* Breaking the Loop */