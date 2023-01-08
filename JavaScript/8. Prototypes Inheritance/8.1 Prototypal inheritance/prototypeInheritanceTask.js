/* Working with prototype */
/* Here’s the code that creates a pair of objects, then modifies them.

Which values are shown in the process? There should be 3 answers. */
{
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

console.log( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

console.log( rabbit.jumps ); // ? (2)

delete animal.jumps;

console.log( rabbit.jumps ); // ? (3)
}


/* Searching algorithm */
/* The task has two parts.

Given the following objects. 
  1. Use __proto__ to assign prototypes in a way that any property lookup will 
  follow the path: pockets → bed → table → head. For instance, pockets.pen 
  should be 3 (found in table), and bed.glasses should be 1 (found in head).
  
 2. Answer the question: is it faster to get glasses as pockets.glasses or 
 head.glasses? Benchmark if needed.

*/
{
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
}