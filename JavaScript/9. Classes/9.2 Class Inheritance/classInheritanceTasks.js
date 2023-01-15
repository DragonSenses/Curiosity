/* Error creating an instance */
/* Here's the code with Rabbit extending Animal.

Unfortunately, Rabbit objects can't be created. What's wrong? Fix it. 

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
console.log(rabbit.name);

*/
/* Answer: That's because the child constructor must call super().

Here's the corrected code:
*/
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // ok now
console.log(rabbit.name); // White Rabbit



/* Extended Clock */
/* We've got a Clock class. As of now, it prints the time every second. 

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

Create a new class ExtendedClock that inherits from Clock and adds the 
parameter precision – the number of ms between "ticks". 
Should be 1000 (1 second) by default. 

- Your code should be in the file extended-clock.js
- Don't modify the original clock.js. Extend it.

*/