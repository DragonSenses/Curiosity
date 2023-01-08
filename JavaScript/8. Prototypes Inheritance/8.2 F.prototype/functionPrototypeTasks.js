/* Changing "prototype" */
/* In the code below we create new Rabbit, and then try to modify its prototype.

In the start, we have this code: */
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

{
  let rabbit = new Rabbit();

  console.log( rabbit.eats ); // true
}

/* 1. We added one more string (emphasized). 
What will console.log show now? */
{
  let rabbit = new Rabbit();

  Rabbit.prototype = {};

  console.log( rabbit.eats ); // ?
}

/* 2. …And if the code is like this (replaced one line)? */
{
  let rabbit = new Rabbit();

  Rabbit.prototype.eats = false;

  console.log( rabbit.eats ); // ?
}

/* 3. And like this (replaced one line)? */
{
  let rabbit = new Rabbit();

  delete rabbit.eats;
  
  console.log( rabbit.eats ); // ?
}

/* 4. The last variant: */
{
  let rabbit = new Rabbit();

  delete Rabbit.prototype.eats;

  console.log( rabbit.eats ); // ?
}



/* Create an object with the same constructor */
/* Imagine, we have an arbitrary object obj, created by a constructor function
– we don’t know which one, but we’d like to create a new object using it.

Can we do it like that? 

let obj2 = new obj.constructor();

Give an example of a constructor function for obj which lets such code work 
right. And an example that makes it work wrong. */