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

/* Answer: 
  1. true, taken from rabbit.
  2. null, taken from animal.
  3. undefined, there’s no such property any more.
*/


/* Searching algorithm */
/* The task has two parts.

Given the following objects:
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
  pen: 3,
  __proto__: head
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table
};

let pockets = {
  money: 2000,
  __proto__: bed
};

console.log( pockets.pen ); // 3
console.log( bed.glasses ); // 1
console.log( table.money ); // undefined

/* Answer for 2.  
In modern engines, performance-wise, there’s no difference whether we take a 
property from an object or its prototype. They remember where the property 
was found and reuse it in the next request.

For instance, for pockets.glasses they remember where they found glasses 
(in head), and next time will search right there. They are also smart enough 
to update internal caches if something changes, so that optimization is safe.
*/
}


/* Where does it write? */
/* We have rabbit inheriting from animal.

If we call rabbit.eat(), which object receives the full 
property: animal or rabbit? */
{
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
}
/* Answer: rabbit
That’s because this is an object before the dot, so rabbit.eat() modifies rabbit.

Property lookup and execution are two different things.

The method rabbit.eat is first found in the prototype, then executed with this=rabbit.
*/


/*  */