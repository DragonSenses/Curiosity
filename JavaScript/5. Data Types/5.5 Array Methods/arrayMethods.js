/* Array Methods */
/* Summary 
To Add/Remove Elements
  - push(...items) – adds items to the end,
  - pop() – extracts an item from the end,
  - shift() – extracts an item from the beginning,
  - unshift(...items) – adds items to the beginning.
  - splice(pos, deleteCount, ...items) – at index pos deletes 
        deleteCount elements and inserts items.
  - slice(start, end) – creates a new array, copies elements from index 
        start till end (not inclusive) into it.
  - concat(...items) – returns a new array: copies all members of the 
        current one and adds items to it. If any of items is an array, then its elements are taken.

To search among elements:
  - indexOf/lastIndexOf(item, pos) – look for item starting from position pos, return the index or -1 if not found.
  - includes(value) – returns true if the array has value, otherwise false.
  - find/filter(func) – filter elements through the function, return first/all values that make it return true.
  - findIndex is like find, but returns the index instead of a value.

To iterate over elements:
  - forEach(func) – calls func for every element, does not return anything.

To transform the array:
  - map(func) – creates a new array from results of calling func for every element.
  - sort(func) – sorts the array in-place, then returns it.
  - reverse() – reverses the array in-place, then returns it.
  - split/join – convert a string to array and back.
  - reduce/reduceRight(func, initial) – calculate a single value over the array
        by calling func for each element and passing an intermediate result between the calls.

Additionally:
  - Array.isArray(value) checks value for being an array, if so returns true, otherwise false.

Please note that methods sort, reverse and splice modify the array itself.
These methods are the most used ones, they cover 99% of use cases. 

But there are few others:
  - arr.some(fn)/arr.every(fn) check the array.
    - The function fn is called on each element of the array similar to map. 
      If any/all results are true, returns true, otherwise false.

  These methods behave sort of like || and && operators: if fn returns a 
  truthy value, arr.some() immediately returns true and stops iterating over 
  the rest of items; if fn returns a falsy value, arr.every() immediately returns 
  false and stops iterating over the rest of items as well.

We can use every to compare arrays:
*/
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
  
alert( arraysEqual([1, 2], [1, 2])); // true

/* More methods:
  - arr.fill(value, start, end) – fills the array with repeating value from index 
    start to end.

  - arr.copyWithin(target, start, end) – copies its elements from position start 
    till position end into itself, at position target (overwrites existing).

  - arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional 
    array.
*/

/* Add/Remove items */
/* We already know methods that add and remove items from the beginning or the end:
    arr.push(...items) – adds items to the end,
    arr.pop() – extracts an item from the end,
    arr.shift() – extracts an item from the beginning,
    arr.unshift(...items) – adds items to the beginning. 

Here are a few others:
*/
/* Consider how to delete an element from the array?
    The arrays are objects so we can try to use delete:
*/
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3

/* Special methods should be used over delete. 
The element was removed, but the array still has 3 elements, we can see that
arr.length == 3. That's natural, because delete obj.key removes a value by the
key. It's all it does. Fine for objects. But for arrays we usually want the rest
of elements to shift and occupy the freed place. We expect to have a shorter 
array now. */

/* splice */
/* arr.splice method is versatile. It can do everything: insert, remove and
replace elements. 

Syntax: 
    arr.splice(start[, deleteCount, elem1, ..., elemN])

Modifies arr starting from the index start: removes deleteCount elements and then
inserts elem1, ..., elemN at their place. 

Returns the array of removed elements.
*/

/* Let's start with deletion: */
arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // from index 1 remove 1 element

alert( arr ); // ["I", "JavaScript"]

/* Remove 3 elements and Replace them with the other two: */
arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ); // now ["Let's", "dance", "right", "now"]

/* splice returns the array of removed elements: */
arr = ["I", "study", "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements

/* splice method is able to insert the elements without any removals. For that
we need to set deleteCount to 0: */
arr = ["I", "study", "JavaScript"];

// From index 2, delete 0, then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"

/* Negative indexes allowed - they specify the position from the end of array: */
arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5


/* slice */
/* It’s similar to a string method str.slice, but instead of substrings it makes subarrays. 
syntax:
        arr.slice([start], [end])

It returns a new array copying to it all items from index start to end (not including end). 
Both start and end can be negative, in that case position from array end is assumed.

    We can also call it without arguments: arr.slice() creates a copy of arr. 
That’s often used to obtain a copy for further transformations that should not affect 
the original array.

For instance:
*/
arr = ["t", "e", "s", "t"];
alert( arr.slice(1, 3) );   // e,s (copy from 1 to 3)
alert( arr.slice(-2) );     // s,t (copy from -2 till the end)


/* concat */
/* arr.concat creates a new array that includes values from other arrays and 
additional items. 

Syntax:
        arr.concat(arg1, arg2...)

It accepts any number of arguments – either arrays or values.

The result is a new array containing items from arr, then arg1, arg2 etc.

If an argument argN is an array, then all its elements are copied. 
    Otherwise, the argument itself is copied.

For instance:
*/
arr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

/* Normally, it only copies elements from arrays. 
Other objects, even if they look like arrays, are added as a whole: */

arr = [1, 2];

let arrayLike = {
    0: "something",
    length: 1
};

console.log( arr.concat(arrayLike) ); // 1,2,[object Object]

/* But if an array-like object has a special Symbol.isConcatSpreadable property,
then it’s treated as an array by concat: its elements are added instead: */
arr = [1, 2];

arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else


/* Iteratre: forEach */
/* arr.forEach() allows to run a function for every element of the array.
The result of the function (if it returns any) is thrown away and ignored.

Syntax:
        arr.forEach(function(item, index, array) {
        // ... do something with item
        });

For instance, this shows each element of the array:
*/
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);

/* And this code is more elaborate about their positions in the target array: */
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
    alert(`${item} is at index ${index} in ${array}`);
});

/* Searching in Array */
/* indexOf/lastIndexOf and includes
The methods arr.indexOf and arr.includes have the similar syntax and do essentially 
the same as their string counterparts, but operate on items instead of characters: 

  - arr.indexOf(item, from) – looks for item starting from index from, and returns 
                              the index where it was found, otherwise -1.
  - arr.includes(item, from) – looks for item starting from index from, returns true if found.

Usually these methods are used with only one argument: the item to search. 
By default, the search is from the beginning.

Please note that indexOf uses the strict equality === for comparison. 
    So, if we look for false, it finds exactly false and not the zero.

If we want to check if item exists in the array, and don’t need the exact index, 
then arr.includes is preferred.

For instance:
*/
arr = [1, 0, false];

console.log( arr.indexOf(0) );      // 1
console.log( arr.indexOf(false) );  // 2
console.log( arr.indexOf(null) );   // -1

console.log( arr.includes(1) );     // true

/* The method arr.lastIndexOf is the same as indexOf, but looks for from right to left. */
let fruits = ['Apple', 'Orange', 'Apple'];

alert( fruits.indexOf('Apple') );       // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') );   // 2 (last Apple)

/* The includes method handles NaN correctly
A minor, but noteworthy feature of includes is that it correctly handles NaN, 
unlike indexOf. That’s because includes was added to JavaScript much later 
and uses the more up to date comparison algorithm internally. */
const nanArray = [NaN];
console.log( nanArray.indexOf(NaN) );     // -1 (wrong, should be 0)
console.log( nanArray.includes(NaN) );    // true (correct)

/* find, findIndex, findLastIndex */
/* arr.find(fn) helps find objects with a specific condition:
Syntax:
        let result = arr.find(function(item, index, array) {
        // if true is returned, item is returned and iteration is stopped
        // for falsy scenario returns undefined
        });

The function is called for elements of the array, one after another:
  * item is the element
  * index is its index
  * array is the array itself
If it returns true, the search is stopped, the item is returned. 
  * If nothing found, undefined is returned.

e.g., we have an array of users, each with the fields id and name. 
    Let’s find the one with id == 1:
*/
let users = [
    {id: 1, name: "Frey"},
    {id: 2, name: "Serena"},
    {id: 3, name: "Kania"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // Frey

/* In real life arrays of objects is a common thing, so the find method is very useful.

Note in the example, to find the function item => item.id == 1 with one argument. 
That’s typical, other arguments of this function are rarely used. */

/* arr.findIndex() method has the same syntax, but returns the index where the 
element was found instead of the element itself. The value of -1 is returned 
if nothing is found. 

arr.findLastIndex() is like findIndex(), but searches from right to left, similar
to lastIndexOf. 

e.g., */
users = [
    {id: 1, name: "Frey"},
    {id: 2, name: "Serena"},
    {id: 3, name: "Kania"},
    {id: 4, name: "Frey"}
];

// Find the index of the first Frey
alert(users.findIndex(user => user.name == 'Frey')); // 0

// Find the index of the last Frey
alert(users.findLastIndex(user => user.name == 'Frey')); // 3

/* filter */
/* find method looks for a single (first) element that makes the function return
true. If there may be many, we can use arr.filter(fn). The syntax is similar to
find, but filter returns an array of all matching elements: 

Syntax:
        let results = arr.filter(function(item, index, array) {
          // if true item is pushed to results and the iteration continues
          // returns empty array if nothing found
        });

For instance:
*/
users = [
  {id: 1, name: "Frey"},
  {id: 2, name: "Serena"},
  {id: 3, name: "Kania"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2


/* Transform an array */
/* map
The arr.map method calls the function for each element of the array and returns
the array of results.

Syntax:
      let result = arr.map(function(item, index, array) {
        // returns the new value instead of item
      });

For instance, here we transform each element into its length:
*/
let lengths = ["Frey", "Serena", "Kania"].map(item => item.length);
alert(lengths); // 4,6,5


/* sort(fn) */
/* arr.sort sorts the array in place, changing its element order.
Also returns the sorted array, but the returned value is uslaly ignored, as
arr itself is modified. e.g: */
arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

alert( arr );  // 1, 15, 2

// The order became 1, 15, 2.
/* Items are Sorted as Strings by default.
Literally, all elements are converted to strings for comparisons. 
  For strings, lexicographic ordering is applied and indeed "2" > "15".

To use our own sorting order, we need to supply a function as the argument of arr.sort().
  The function should compare two arbitrary values and return:
*/
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}

console.log( compare(2, 7) ); 

// Now to sort numbers, we pass in our compare function

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15    -> Now sort works as intended

/* Breakdown of arr.sort(function)
 The arr can be array of anything, right? It may contain numbers or strings 
 or objects or whatever. We have a set of some items. To sort it, we need an 
 ordering function that knows how to compare its elements. The default is a string order.

The arr.sort(fn) method implements a generic sorting algorithm. 
We don’t need to care how it internally works (an optimized quicksort or 
  Timsort most of the time). It will walk the array, compare its elements 
  using the provided function and reorder them, all we need is to provide 
  the fn which does the comparison.

By the way, if we ever want to know which elements are compared – 
nothing prevents from alerting them:
*/
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});

/* The algorithm may compare an element with multiple others in the process, 
but it tries to make as few comparisons as possible. */

/* A comparison function may return any number. 
A comparison function is only required to return a positive number to say
"greater" and a negative number to say "less". That allows to write shorter
functions: */
arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // 1, 2, 15

/* Arrow Functions for neater sorting: */
arr.sort( (a, b) => a - b );

/* Use localeCompare for strings
string comparison compares letters by their codes by default. For many alphabets,
it's better to use str.localeCompare method to correctly sort letters, such as Ö.
e.g, let’s sort a few countries in German: */
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)

/* reverse */
/* arr.reverse reverses the order of elements in arr. 
It also returns the array arr after the reversal.
e.g., */
arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1

/* split and join */
/* Real life application: We are writing a messaging app, and the person enters 
the comma-delimited list of receivers: John, Pete, Mary. 
But for us an array of names would be much more comfortable than a single string. 
How to get it?  */

/* str.split(delim) 
    splits the string into an array by the given delimiter delim.

In the example below, we split by a comma followed by space:
*/
let names = 'Bilbo, Gandalf, Nazgul';

arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}