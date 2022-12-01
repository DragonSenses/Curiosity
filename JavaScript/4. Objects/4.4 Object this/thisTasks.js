/* Using "this" in object literal
Here the function makeUser returns an object.

What is the result of accessing its ref? Why?
*/
function makeUser() {
    return {
        name: "John",
        ref: this
    };
}

let user = makeUser();

alert(user.ref.name); // What's the result?


/* Create a calculator
Create an object calculator with three methods:
 1. read() prompts for two values and saves them as object properties with names a and b respectively.
 2. sum() returns the sum of saved values.
 3. mul() multiplies saved values and returns the result.
*/
let calculator = {
    // ... your code ...
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());

/* Chaining 
There’s a ladder object that allows to go up and down:
*/
let ladder = {
    step: 0,
    up() {
        this.step++;
    },
    down() {
        this.step--;
    },
    showStep: function () { // shows the current step
        alert(this.step);
    }
};

// Now, if we need to make several calls in sequence, can do it like this:
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

// Modify the code of up, down and showStep to make the calls chainable, like this:
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

// Such approach is widely used across JavaScript libraries.