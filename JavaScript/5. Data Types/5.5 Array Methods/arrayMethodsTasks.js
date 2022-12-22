/* Translate border-left-width to borderLeftWidth */
/* Write the function camelize(str) that changes dash-separated words like 
“my-short-string” into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.

P.S. Hint: use split to split the string into an array, transform it and join back.

Examples: */
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';

function camelize(){
    //TODO
}

/* Filter range */
/* Write a function filterRange(arr, a, b) that gets an array arr, looks for 
elements with values higher or equal to a and lower or equal to b and 
return a result as an array.

The function should not modify the array. It should return the new array.

For instance: */
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (matching values)

alert( arr ); // 5,3,8,1 (not modified)


function filterRange(arr, a, b) {
    //TODO
    return arr + a + b;
}

/* Filter range "in place" */
/* Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b. The test is: a ≤ arr[i] ≤ b.

The function should only modify the array. It should not return anything.

For instance: */
arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]


function filterRangeInPlace(arr, a, b) {
    //TODO
    return arr + a + b;
}


/* Sort in decreasing order */
function sortInDecreasingOrder(){
    let arr = [5, 2, 1, -10, 8];

    // ... your code to sort it in decreasing order

    alert( arr ); // 8, 5, 2, 1, -10
}

sortInDecreasingOrder();


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