/* Constructor, operator "new"
Summary
 - Constructor functions or, briefly, constructors, are regular functions, 
 but there’s a common agreement to name them with capital letter first.
 - Constructor functions should only be called using new. Such a call implies 
 a creation of empty this at the start and returning the populated one at the end.

We can use constructor functions to make multiple similar objects.

JavaScript provides constructor functions for many built-in language objects: 
like Date for dates, Set for sets & others 
*/

/* Constructor Function */
/* Regular functions but with two conventions:
 1. Named with capital letter first
 2. Should be executed only with "new" operator

 Example:
*/
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Luna");

console.log(user.name);    // Luna
console.log(user.isAdmin); // false

/* Breakdown when a function is executed with "new", does following steps:
    1. A new empty object is created and assigned to "this"
    2. The function body executes. 
        * Usually it modifies "this", adds new properties to it
    3. The value of "this" is returned

Note: Any function can be used as a constructor, when run with "new" it will
    execute the algorithm above. The "capital letter first" is a common 
    agreement, to make it clear that a function is to be run with new.
    - Does not apply to Arrow Functions, since they do not have "this"
*/

function Person(name) {
    // this = {};  (implicitly)

    // add properties to this
    this.name = name;

    // return this;  (implicitly)  
}

let person = new Person("Luna");
console.log(person.name);

// let person = new Person("Luna"); is the same as doing
// let person = { name: "Luna" };

/* Main purpose of Constructors is to implement reusable object creation code.
    - Create other users like new User("Ann") or new User("Alice")
*/

/* One-Time construction of a single complex object
The trick aims to encapsulate the code that constructs the single object, without
future reuse. The constructor can be wrapped in an immediately called constructor
function. The constructor can't be called again, because it is not saved anywhere,
just created and called. 
*/
// Create a function and immediately call it with new
let example = new function () {
    this.name = "Leo";
    this.isAdmin = false;
    // other code for user creation, complex logic, statements, local variables
};
console.log(example.name);  // "Leo"

/* [Advanced] Constructor mode test: new.target */
/* Inside a function, we can check whether it was called with "new" or without it.
Using a special "new.target" property. It is undefined for regular calls and
equals the function if called with "new". This allows us to know whether: 
    * "in Constructor Mode" - function was called with "new"
    * "in Regular Mode" -   function was called without "new" 
*/
function TestMe() {
    console.log(new.target);
}

// without "new":
TestMe(); // undefined

// with "new":
new TestMe(); // function TestMe { ... // function code }

/* [Advanced]  Make both "new" and regular calls to behave the same. Approach 
is used in libraries to make syntax more flexible. So people may call function
with or without new, and it still works. 

HOWEVER, probably not good to use everywhere, because omitting "new" makes it 
less obvious what's going on. With new we all know that the new object is being
created. e.g: */

function Dog(name) {
    if (!new.target) { // if you run me without new
        return new Dog(name); // ...I will add new for you
    }

    this.name = name;
}

let lucky = Dog("Lucky");   // redirects call to new Dog
console.log(lucky.name);    // Lucky