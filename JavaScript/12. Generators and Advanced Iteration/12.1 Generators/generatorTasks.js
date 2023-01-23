/* Pseudo-random generator */
/* There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. 
to test things out well.

In JavaScript, we could use Math.random(). But if something goes wrong, 
we'd like to be able to repeat the test, using exactly the same data.

For that, so called "seeded pseudo-random generators" are used. They take 
a "seed", the first value, and then generate the next ones using a formula 
so that the same seed yields the same sequence, and hence the whole flow is 
easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed 
values: 

next = previous * 16807 % 2147483647

If we use 1 as the seed, the values will be:

  1. 16807
  2. 282475249
  3. 1622650073
  4. …and so on…

The task is to create a generator function pseudoRandom(seed) that takes seed 
and creates the generator with this formula.

Usage example: */

function* pseudoRandom(seed){
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647;
    yield value;
  }
}


let generator = pseudoRandom(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073

/* Please note, the same can be done with a regular function, like this: */
{
  // eslint-disable-next-line no-inner-declarations
  function pseudoRandom(seed) {
    let value = seed;
  
    return function() {
      value = value * 16807 % 2147483647;
      return value;
    };
  }
  
  let generator = pseudoRandom(1);
  
  console.log(generator()); // 16807
  console.log(generator()); // 282475249
  console.log(generator()); // 1622650073

}

/* That also works. But then we lose ability to iterate with for..of and 
to use generator composition, that may be useful elsewhere. */