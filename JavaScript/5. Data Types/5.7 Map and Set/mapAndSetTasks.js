/* Filter unique array members */
/* Let arr be an array.

Create a function unique(arr) that should return an array with unique items of arr.

P.S. Here strings are used, but can be values of any type.
P.P.S. Use Set to store unique values.

For instance: */
function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // Hare, Krishna, :-O



/* Filter anagrams */
/* Anagrams are words that have the same number of same letters, but in different order.

For instance: 
nap - pan
ear - are - era
cheaters - hectares - teachers

Write a function aclean(arr) that returns an array cleaned from anagrams.

From every anagram group should remain only one word, no matter which one.

For instance:
*/
function aclean(arr){
    // sort the string or item in arr
    // map it
    // if map (!has(key) then add)
    // return Array.from(map)
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"



/* Iterable keys */
/* We’d like to get an array of map.keys() in a variable and then apply 
array-specific methods to it, e.g. .push.

But that doesn’t work: 
{
let map = new Map();

map.set("name", "John");

let keys = map.keys();

// Error: keys.push is not a function
keys.push("more");
}

Why? How can we fix the code to make keys.push work?
*/