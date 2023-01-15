/* Error creating an instance */
/* Here’s the code with Rabbit extending Animal.

Unfortunately, Rabbit objects can’t be created. What’s wrong? Fix it. 

class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
alert(rabbit.name);

*/



/* Extended Clock */
/* We’ve got a Clock class. As of now, it prints the time every second. 


Create a new class ExtendedClock that inherits from Clock and adds the 
parameter precision – the number of ms between “ticks”. 
Should be 1000 (1 second) by default. 

- Your code should be in the file extended-clock.js
- Don’t modify the original clock.js. Extend it.

*/