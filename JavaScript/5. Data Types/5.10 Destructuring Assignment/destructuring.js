/* Destructuring Assignment */
/* Summary
- Destructuring assignment allows for instantly mapping an object or array onto many variables.

The full object syntax:
        let {prop : varName = default, ...rest} = object

    * This means that property prop should go into the variable varName and, 
      if no such property exists, then the default value should be used.

    * Object properties that have no mapping are copied to the rest object.

The full array syntax:
        let [item1 = default, item2, ...rest] = array

    * The first item goes to item1; the second goes into item2, 
      all the rest makes the array rest.

- It’s possible to extract data from nested arrays/objects, for that the left side 
must have the same structure as the right one.
*/

/* The two most used data structures in JavaScript are Object and Array.

    - Objects allow us to create a single entity that stores data items by key.
    - Arrays allow us to gather data items into an ordered list.

Although, when we pass those to a function, it may need not be an object/array 
as a whole. It may need individual pieces.

Destructuring assignment is a special syntax that allows us to “unpack” arrays 
or objects into a bunch of variables, as sometimes that’s more convenient.

Destructuring also works great with complex functions that have a lot of 
parameters, default values, and so on.
*/

/* Array Destructuring */
/* Here’s an example of how an array is destructured into variables: */
// we have an array with the name and surname
let arr = ["Luna", "Berry"];

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName); // Luna
console.log(surname);   // Berry

/* Now we can work with variables instead of array members.

It looks great when combined with split or other array-returning methods: */
[firstName, surname] = "Luna Berry".split(' ');
console.log(firstName); // Luna
console.log(surname);   // Berry

/* As you can see, the syntax is simple. There are several peculiar details though. 
Let’s see more examples, to better understand it. */

/* “Destructuring” does not mean “destructive”. */
/* It’s called “destructuring assignment,” because it “destructurizes” by copying 
items into variables. But the array itself is not modified.

It’s just a shorter way to write: 
*/
// let [name, name2] = arr;
let name = arr[0];
let name2 = arr[1];

console.log(name + " " + name2);

/* Ignorning elements using commas */
/* Unwanted elements of the array can also be thrown away via an extra comma: */
// second element is not needed
let [name1, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log( title ); // Consul
console.log( name1 ); // Julius
/* In the code above, the second element of the array is skipped, the third one 
is assigned to title, and the rest of the array items is also skipped 
(as there are no variables for them). */


/* Works with any iterable on the right-side */
/* …Actually, we can use it with any iterable, not only arrays: */
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

console.log(a, b, c);
console.log(one, two, three);

/* That works, because internally a destructuring assignment works by iterating 
over the right value. It’s a kind of syntax sugar for calling for..of over the 
value to the right of = and assigning the values. */

/* Assign to anything at the left-side */
/* We can use any “assignables” on the left side.

For instance, an object property: */
let user = {};
[user.name, user.surname] = "Luna Berry".split(' ');

console.log(user.name);     // Luna
console.log(user.surname);  // Berry


/* Looping with .entries() */
/* Previously we saw the Object.entries(obj) method.
We can use it with destructuring to loop over keys-and-values of an object:
*/
user = {
    name: "Luna",
    age: 20
};

// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
    console.log(`${key}:${value}`); // name:Luna, then age:20
}