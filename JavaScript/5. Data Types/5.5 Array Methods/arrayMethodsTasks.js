/* Translate border-left-width to borderLeftWidth */
/* Write the function camelize(str) that changes dash-separated words like 
“my-short-string” into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.

P.S. Hint: use split to split the string into an array, transform it and join back.

Examples: */
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';

function camelize(str){
    return str
    .split('-') // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));

/* camelize attempt 1:
function camelize(str){
    let index = 0;
    do{
        // 1. Find dash using indexOf('-')
        index = str.indexOf('-');
        
        // 2. Create new string with dash removed
        if(index === 0) {
            str = str.slice(1); // slice string till end
        } else {
            str = str.slice(0,index) + str.slice(index+1);
        }

        // 3. Create a new string with the char at index capitalized
        // Capitalize (uppercase) the character at the index
        str = str.slice(0, index) + str[index].toUpperCase() + str.slice(index+1);
        
    } while( str.includes('-'));
    
    // Keep doing this until -1 is returned
    return str;
// s.slice(0,10) + s[10].toUpperCase() + s.slice(11);
console.log(camelize("background-color"));

} */

/* Filter range */
/* Write a function filterRange(arr, a, b) that gets an array arr, looks for 
elements with values higher or equal to a and lower or equal to b and 
return a result as an array.

The function should not modify the array. It should return the new array.
*/
function filterRange(arr, a, b) {
    // added brackets around the expression for better readability
    return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

console.log( filtered ); // 3,1 (matching values)

console.log( arr ); // 5,3,8,1 (not modified)


/* Filter range "in place" */
/* Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b. The test is: a ≤ arr[i] ≤ b.

The function should only modify the array. It should not return anything.

For instance: */
function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++){
        let val = arr[i];

        // remove if outside of the interval
        if (val < a || val > b){
            arr.splice(i,1);
            i--;    // Remember to reduce the index after splice (removal)
        }
    }
    return arr + a + b;
}

arr = [5, 3, 8, 1];

filtered = filterRangeInPlace(arr, 1, 4);

console.log( filtered ); // 3,1 (matching values)

console.log( arr ); // 5,3,8,1 (not modified)



/* Sort in decreasing order */
function sortInDecreasingOrder(arr){
    // ... your code to sort it in decreasing order
    return arr.sort((a,b) =>  b - a );
}

arr = [5, 2, 1, -10, 8];
console.log( `Array before sort:\t ${arr}` ); // 5, 2, 1, -10, 8

sortInDecreasingOrder(arr);
console.log( `Array after sort:\t ${arr}` ); // 8, 5, 2, 1, -10


/* Copy and sort array */
/* We have an array of strings arr. We’d like to have a sorted copy of it, 
but keep arr unmodified.

Create a function copySorted(arr) that returns such a copy. */

/**
 * Returns a new sorted copy of the array. 
 * @param {string[]} arr array of strings to sort
 * @returns a new sorted copy of the array
 */
function copySorted(arr){
    // Use slice() to make a copy and run the sort on it.
    return arr.slice().sort();
}

arr = ["HTML", "JavaScript", "CSS"];
console.log( `Array before sort:\t ${arr}` ); // HTML, JavaScript, CSS

let sorted = copySorted(arr);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (no changes)

/* attempt 1 - copySorted(arr)
function copySorted(arr){
    let aux = new Array(arr.length); 

    for(let i=0; i < arr.length; i++){
        aux[i] = arr[i];
    }

    return aux.sort();
}
*/


/* Create an extendable calculator */
/* Create a constructor function Calculator that creates “extendable” calculator objects. 
The task consists of two parts.
1. First, implement the method calculate(str) that takes a string like "1 + 2" 
in the format “NUMBER operator NUMBER” (space-delimited) and returns the result. 
Should understand plus + and minus -.

Usage example:

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10


2. Then add the method addMethod(name, func) that teaches the calculator a new 
operation. It takes the operator name and the two-argument function func(a,b) 
that implements it.

For instance, let’s add the multiplication *, division / and power **:

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8


* No parentheses or complex expressions in this task.
* The numbers and the operator are delimited with exactly one space.
* There may be error handling if you’d like to add it.
*/

function Calculator(){

    /* Please note how methods are stored. They are simply added to 
    this.methods property. */
    this.methods = {
        "-": (a,b) => a-b,
        "+": (a,b) => a+b
    };

    // Assuming string argument is in form of "NUMBER operator NUMBER"
    // delimit string in format number operator number


    /* All tests and numeric conversions are done in the calculate method. 
    In future it may be extended to support more complex expressions. */
    this.calculate = function(str) {
        let split = str.split(' ');
        let a = +split[0];
        let op = split[1];
        let b = +split[2];

        /* Check if any part of the string is invalid. 
            - Operands are NaN 
            - Operator is not supported
        */
        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        
        return this.methods[op](a, b);
    };

    /**
     * Teaches the calculator a new operation. It takes the operator name and 
     * the two-argument function func(a,b) that implements it.
     * 
     * usage: addMethod("**", (a, b) => a ** b);
     * 
     * @param {string} name operation name (e.g. "*" or "/" or "**")
     * @param {function} func implements how the operation is done
     */
    this.addMethod = function(name, func) {
        this.methods[name] = func;
    };
}

let calc = new Calculator;
console.log( calc.calculate("3 + 7") ); // 10

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8


/* Map to names */
/* You have an array of user objects, each one has user.name. 
Write the code that converts it into an array of names.

For instance: */
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = users.map( (obj) => obj.name );

console.log( users ); 
console.log( names ); // John, Pete, Mary


/* Map to objects */
/* You have an array of user objects, each one has name, surname and id.

Write the code to create another array from it, of objects with id and fullName, 
where fullName is generated from name and surname.

So, actually you need to map one array of objects to another. 

Try using => here. There’s a small catch.

For instance: */
{ 
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

let usersMapped = users.map( user => ({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

console.log( usersMapped[0].id ); // 1
console.log( usersMapped[0].fullName ); // John Smith

// Print contents of array
users.forEach( user => console.log(user) );
usersMapped.forEach( user => console.log(user) );

/* Note that in the arrow functions we need to use additional brackets.  
Cannot be written like this:
let usersMapped = users.map(user => {
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});

As we remember, there are two arrow functions: 
    without body value => expr and with body value => {...}.

Here JavaScript would treat { as the start of function body, not the start of 
    the object. 
    
The workaround is to wrap them in the “normal” brackets:
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/
}


/* Sort users by age */
/* Write the function sortByAge(users) that gets an array of objects with the 
age property and sorts them by age. */

/**
 * @param {object[]} users an array of users 
 * @returns sorts the array of users by age
 */
function sortByAge(users){
    return users.sort( (a, b) => a.age - b.age );
}

// return users.sort(compareByAge);
// function compareByAge(a, b){
//     return a.age - b.age;
// }

{ // Sort users by age, For instance: 
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
console.log(arr[0].name); // John
console.log(arr[1].name); // Mary
console.log(arr[2].name); // Pete

arr.forEach( user => console.log( user ) );
}


/* Shuffle an array */
/* Write the function shuffle(array) that shuffles (randomly reorders) elements of the array.

Multiple runs of shuffle may lead to different orders of elements. 

All element orders should have an equal probability. For instance, [1,2,3] 
can be reordered as [1,2,3] or [1,3,2] or [3,1,2] etc, 
with equal probability of each case.

// For instance: 
let arr = [1, 2, 3];

shuffle(arr); // arr = [3, 2, 1]

shuffle(arr); // arr = [2, 1, 3]

shuffle(arr); // arr = [3, 1, 2]
*/

/**
 * Shuffles the array of numbers. Employs the Fisher-Yates shuffle algorithm.
 * Walks the array in reverse order and swap each element with a random one
 * before it. Modifies the array itself.
 */
function shuffle(array){
    // walk the array in reverse order
    for (let i = array.length -1; i > 0; i--){
         // Get a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

{ 
/* Test Code runs shuffle() 1,000,000 times and counts appearances of all
possible results */

// counts of appearances for all possible permutations
let count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
};

for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    shuffle(array);
    count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
    console.log(`${key}: ${count[key]}`);
}
/* Example Output 
123: 166159
132: 166400
213: 166889
231: 166832
312: 167124
321: 166596

123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316

Looks good, all permutations appear with roughly the same probability.
Also, performance-wise the Fisher-Yates algorithm is much better, 
there’s no “sorting” overhead.
*/

/* Here is a simple but substandard solution for shuffle: */
let shuffleSimple = function(array) {
    array.sort(() => Math.random() - 0.5);
};
/* It somewhat works, because Math.random() - 0.5 is a random number that may 
be positive or negative, so the sorting function reorders elements randomly.

But because the sorting function is not meant to be used this way, not all 
permutations have the same probability. Let's test it. */

// counts of appearances for all possible permutations
count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
};

// Populate count array
for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    shuffleSimple(array);
    count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
    console.log(`${key}: ${count[key]}`);
}

/* Example Output (depends on JS engine): 
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
// We can see the bias clearly: 123 and 213 appear much more often than others.

// In Google Chrome's V8 engine
123: 374674
132: 62370
213: 125181
231: 62552
312: 62800
321: 312423

// Here the bias is 123, 213, and 321. 
The result of the code may vary between JavaScript engines, but we can already 
see that the approach is unreliable.

Why it doesn’t work? Generally speaking, sort is a “black box”: we throw an array 
and a comparison function into it and expect the array to be sorted. 

But due to the utter randomness of the comparison the black box goes mad, and 
how exactly it goes mad depends on the concrete implementation that differs between engines.
*/

}


/* Get average age */
/* Write the function getAverageAge(users) that gets an array of objects with 
property age and returns the average age.

The formula for the average is (age1 + age2 + ... + ageN) / N. */

/**
 * @param {objects[]} users array of user objects with age property
 * @returns average age of the objects
 */
function getAverageAge(users){
    return users.reduce((sum, current) => sum + current.age, 0)/arr.length;
}

{ // For instance:
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

console.log( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
}


/* Filter unique array members */
/* Let arr be an array.

Create a function unique(arr) that should return an array with unique items of arr.

For instance:
*/

/**
 * indexOf will always only return the index of the first occurrence of 
 * "item" (the string) in the array and then you are comparing it with "index" 
 * (the index of the current item being iterated over).
 * 
 * if the index of the first occurrence of the string === the index of the 
 * current item being compared, this means that the current item being 
 * iterated over is its own first occurrence in the array.
 * 
 * and subsequent comparisons for the same item will always be false as duplicate 
 * values will not have the same index as the first occurrence of the item.
 * 
 * @param {*[]} arr array of items. 
 * @returns array of unique items 
 */
function unique(arr) {
    return arr.filter( (item, index) => arr.indexOf(item) === index);   
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
"Krishna", "Krishna", "Hare", "Hare", ":-O"
];
  
console.log( unique(strings) ); // Hare, Krishna, :-O


/* Create keyed object from array */
/* Let’s say we received an array of users in the form {id:..., name:..., age:... }.

Create a function groupById(arr) that creates an object from it, with id as the key, 
and array items as values.

Such function is really handy when working with server data.

In this task we assume that id is unique. There may be no two array items with the same id.

Please use array .reduce method in the solution.

For example: */

function groupById(arr){
    return arr;
}

{
let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

console.log(usersById);
/*
// after the call we should have:

usersById = {
john: {id: 'john', name: "John Smith", age: 20},
ann: {id: 'ann', name: "Ann Smith", age: 24},
pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
}