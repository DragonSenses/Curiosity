/* For Loops & While Loops 
Used when we need to repeat actions. Loops are a way to repeat the same
code multiple times.

    - While condition is truthy, the code from loop body is executed. 
    - Any expression or variable can be a loop condition, not just comparisons:
    the condition is evaluated and converted to a boolean

- Iteration: a single execution of the loop body
*/

/* While Loop 
Syntax:
        while(condition) {
            // code (loop body) ...
        }

While condition is truthy, code from loop body is executed.
*/

let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  console.log( i );
  i++;
}