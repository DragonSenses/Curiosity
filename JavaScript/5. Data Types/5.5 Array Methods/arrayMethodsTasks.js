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

function Calculator(str){
    // Assuming string argument is in form of "NUMBER operator NUMBER"
    // delimit string in format number operator number
    this.arr = str.split(' ');

    this.op = arr[1];

    // calculate method
    this.calculate = function() {
        
    };
}

let calc = new Calculator;

console.log( calc.calculate("3 + 7") ); // 10


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

let usersMapped = users.map();

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

console.log( usersMapped[0].id ); // 1
console.log( usersMapped[0].fullName ); // John Smith
}


/* Sort users by age */
/* Write the function sortByAge(users) that gets an array of objects with the 
age property and sorts them by age. */
function sortByAge(){
    // TODO
    return 1;
}

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
}


/* Shuffle an array */
/* Write the function shuffle(array) that shuffles (randomly reorders) elements of the array.

Multiple runs of shuffle may lead to different orders of elements. 

All element orders should have an equal probability. For instance, [1,2,3] 
can be reordered as [1,2,3] or [1,3,2] or [3,1,2] etc, 
with equal probability of each case.
*/
function shuffle(){
    // TODO
    return 4;
}

{ // For instance: 
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
}


/* Get average age */
/* Write the function getAverageAge(users) that gets an array of objects with 
property age and returns the average age.

The formula for the average is (age1 + age2 + ... + ageN) / N. */

function getAverageAge(arr){
    return arr;
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

function unique(arr) {
    return arr;    /* your code */
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