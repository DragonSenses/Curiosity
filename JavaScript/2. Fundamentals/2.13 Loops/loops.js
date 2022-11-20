/* For Loops & While Loops 
Used when we need to repeat actions. Loops are a way to repeat the same
code multiple times.

- Iteration: a single execution of the loop body

Summary
3 types of loops:
    1. while – The condition is checked before each iteration.
    2. do..while – The condition is checked after each iteration.
    3. for (;;) – The condition is checked before each iteration, 
    additional settings available.

- To make an infinite loop, usually the while(true) construct is used. 
Such a loop, just like any other, can be stopped with the break directive.

If we don’t want to do anything in the current iteration and would like to 
forward to the next one, we can use the continue directive.

break/continue support labels before the loop. A label is the only way for 
break/continue to escape a nested loop to go to an outer one.
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

/* Breaking the Loop using "break" */
// useful combo of "infinite loop + break" when condition should be checked not
// at beginning or end of loop but in middle (or several places) of its body

let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

  if (!value) break; // If user enters empty line or cancels input, stops loop

  sum += value;

}
console.log( 'Sum: ' + sum );   // After break, control is passed to this line


/* Continue to next Iteration using "continue" */
// for loop that outputs only odd values up to 10
for (let i = 0; i < 10; i++) {

    // if true, skip the remaining part of the body
    if (i % 2 == 0) continue;
  
    console.log(i); // 1, then 3, 5, 7, 9
}

// continue directive decreases nesting and improves readability
// instead of putting the print statement inside if loop

/* Using Labels for break/continue 
    - Sometimes we need to break out from multiple nested loops at once.
    e.g., in code below we loop over x and y, prompting for the coordinates 
    (x, y) from (0,0) to (2,2)
*/

for (let x = 0; x < 3; x++){

    for (let y = 0; y < 3; y++){

        let input = prompt(`Value at coords (${x},${y})`, '');

        // Want to Exit from here to Done (below)?
    }
}
console.log('Done!');

// To stop the process if the user cancels the input.
// break would only break the inner loop

/* A Label is an identifier with a colon before a loop:
Syntax:
        labelName: for(...){
            ...
        } 

- break<labelName> statement in the loop below breaks out to the label
- Can move the label onto a separate line:
        label: 
        for(...) {...}
- continue directive can also be used with a label, code execution jumps to the
next iteration of the labeled loop
*/

outer: for (let x = 0; x < 3; x++){ 

    for (let y = 0; y < 3; y++){

        let input = prompt(`Value at coords (${x},${y})`, '');

         // if an empty string or canceled, then break out of both loops
        if (!input) break outer; // (*)

        // do something with the value...
    }
}
console.log('Done!');

/* break outer looks upwards for the label named outer and breaks out of that
loop. So the control goes straight from (*) to console.log('Done!') 
*/

/* Labels do not allow a jump to just anywhere

Impossible to do this:
break label;    // jump to label below (doesn't work)
label : for(...)

A break directive must be inside a code block.
A continue is only possible from inside a loop.

Technically, any labelled code block will do, e.g.,
    label: {
        ...
        break label; // works
        ...
    }
But 99.9 % of the time break is used inside loops. 
*/