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

console.log(user.ref.name); // Error: Cannot read property 'name' of undefined

/* Answer: an error. 
Result is an Error: "cannot read property 'name' of undefined" because
rules that set "this" do not look at object definition. Only the moment of call
matters.

Here the value of "this" inside "makeUser()" is undefined, because it is called
as a function, not as a method wtih "dot" syntax.

The value of "this" is one for the whole function, code blocks and object 
literals do not affect it.

So "ref: this" actually takes current "this" of the function.

Can rewrite the function and return the same "this" with undefined value:
*/
function makeUser() {
    return this; // this time there's no object literal
}

console.log(makeUser().name); // Error: Cannot read property 'name' of undefined

/* Result of console.log(makeUser().name) is the same result of
console.log(user.ref.name) from previous example 

To fix, make user.ref() a method. And the value of this is set to the object
before the dot.
*/
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    };
}

user = makeUser();

console.log(user.ref().name); // John



/* Create a calculator
Create an object calculator with three methods:
 1. read() prompts for two values and saves them as object properties with names a and b respectively.
 2. sum() returns the sum of saved values.
 3. mul() multiplies saved values and returns the result.
*/
let calculator = {
    a: null,
    b: null,
    read(){
        // Prompt user for two values, and convert them to numbers
        this.a = +prompt("a?",0);
        this.b = +prompt("b?",0);
    },
    sum(){
        return this.a + this.b;
    },
    mul(){
        return this.a * this.b;
    }
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

// Answer: Return the object itself from every call
ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function () { // shows the current step
        alert(this.step);
        return this;
    }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0