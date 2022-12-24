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
arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)

function copySorted(arr){
    return arr;
}

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

/* Map to names */
/* You have an array of user objects, each one has user.name. 
Write the code that converts it into an array of names.

For instance: */
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = /* ... your code */

console.log( users);
console.log( names ); // John, Pete, Mary


/* Map to objects */