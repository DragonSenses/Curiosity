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