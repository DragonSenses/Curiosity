/* Two functions – one object */
/* Is it possible to create functions A and B so that new A() == new B()? 
If it is, then provide an example of code. */
function A() { /* ... */ }
function B() { /* ... */ }

let a = new A();
let b = new B();

alert( a == b ); // true

/* Create new Calculator 
Create a constructor function Calculator that creates objects with 3 methods:

1. read() prompts for two values and saves them as object properties with names
          a and b respectively.
2. sum() returns the sum of these properties.
3. mul() returns the multiplication product of these properties.

For instance:
*/
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

// Answer
function Calculator(){

}


/* Create new Accumulator */
/* Create a constructor function Accumulator(startingValue).
Object that it creates should: 
* Store the "current value" in the property value. 
  The starting value is set to the argument of the constructor startingValue.
* The read() method should use prompt to read a new number and add it to value.

In other words, the value property is the sum of all user-entered values with 
the initial value startingValue.

Here's the demo of the code:
*/
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values

// Answer
function Accumulator(){
    
}