/* Two functions – one object */
/* Is it possible to create functions A and B so that new A() == new B()? 
If it is, then provide an example of code. 

function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

console.log( a == b ); // true

*/

// Answer: Yes it is possible. 
/* If a function returns an object then "new" returns it instead of this.
So they can return the same external defined object "obj". e.g.,
*/
let obj = {};

function A() { return obj; }
function B() { return obj; }

console.log( new A() == new B() ); // true


/* Create new Calculator 
Create a constructor function Calculator that creates objects with 3 methods:

1. read() prompts for two values and saves them as object properties with names
          a and b respectively.
2. sum() returns the sum of these properties.
3. mul() returns the multiplication product of these properties.
*/

// Answer
function Calculator(){

  this.read = function() {
    this.x = +prompt("x?",0);
    this.y = +prompt("y?",0);
  };

  this.sum = function(){
    return this.x + this.y;
  };

  this.mul = function(){
    return this.x * this.y;
  };
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

/* Create new Accumulator */
/* Create a constructor function Accumulator(startingValue).
Object that it creates should: 
* Store the "current value" in the property value. 
  The starting value is set to the argument of the constructor startingValue.
* The read() method should use prompt to read a new number and add it to value.

In other words, the value property is the sum of all user-entered values with 
the initial value startingValue.
*/
// Answer
function Accumulator(startingValue){
    this.value = startingValue; // Store current value in this property

    this.read = function(){
      this.value += +prompt("How much to add?",0);
    };
}

let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values

