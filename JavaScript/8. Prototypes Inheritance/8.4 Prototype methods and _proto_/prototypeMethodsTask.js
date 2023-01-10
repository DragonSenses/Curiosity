/* Add toString to the dictionary */
/* There’s an object dictionary, created as Object.create(null), to store 
any key/value pairs.

Add method dictionary.toString() into it, that should return a comma-delimited 
list of keys. Your toString should not show up in for..in over the object.

Here’s how it should work: 
let dictionary = Object.create(null);

// your code to add dictionary.toString method

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// your toString in action
console.log(dictionary); // "apple,__proto__"

*/

/* Answer: 
The method can take all enumerable keys using Object.keys and output their list.

To make toString non-enumerable, let’s define it using a property descriptor. 
The syntax of Object.create allows us to provide an object with property 
descriptors as the second argument. 

When we create a property using a descriptor, its flags are false by default. 
So dictionary.toString is non-enumerable. */

let dictionary = Object.create(null, {
  toString: { // define toString property
    value() { // the value is a function
      return Object.keys(this).join();
    }
  }
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple and __proto__ is in the loop
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// comma-separated list of properties by toString
console.log(dictionary); // "apple,__proto__"



/* The difference between calls */
/* Let’s create a new rabbit object: */
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  console.log(this.name);
};

let rabbit = new Rabbit("Rabbit");

/* These calls do the same thing or not? */
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();


/* Answer: 
The first call has this == rabbit, the other ones have this equal to 
Rabbit.prototype, because it’s actually the object before the dot.

So only the first call shows Rabbit, other ones show undefined: */
rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined