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