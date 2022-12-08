/* Arrays */
/* Summary
Array is a special kind of object, suited to storing and managing ordered data items.

The declaration:
        // square brackets (usual)
        let arr = [item1, item2...];

        // new Array (exceptionally rare)
        let arr = new Array(item1, item2...);

The call to new Array(number) creates an array with the given length, but without elements.
  - The length property is the array length or, to be precise, its last numeric index plus one. 
    It is auto-adjusted by array methods.
  - If we shorten length manually, the array is truncated.

Getting the elements:
  - we can get element by its index, like arr[0]
  - also we can use at(i) method that allows negative indexes. 
  For negative values of i, it steps back from the end of the array. 
  If i >= 0, it works same as arr[i].

We can use an array as a deque with the following operations:
  - push(...items) adds items to the end.
  - pop() removes the element from the end and returns it.
  - shift() removes the element from the beginning and returns it.
  - unshift(...items) adds items to the beginning.

To loop over the elements of the array:
  - for (let i=0; i<arr.length; i++) – works fastest, old-browser-compatible.
  - for (let item of arr) – the modern syntax for items only,
  - for (let i in arr) – never use.

To compare arrays, don’t use the == operator (as well as >, < and others), 
as they have no special treatment for arrays. They handle them as any objects, 
and it’s not what we usually want.

Instead you can use for..of loop to compare arrays item-by-item.
*/

/* Arrays 
    Objects allow you to store keyed collections of values. That’s fine.

But quite often we find that we need an ordered collection, where we have a 1st, 
a 2nd, a 3rd element and so on. 
    e.g, we need that to store a list of something: users, goods, HTML elements etc.

It is not convenient to use an object here, because it provides no methods to 
manage the order of elements. We can’t insert a new property “between” the 
existing ones. Objects are just not meant for such use.

There exists a special data structure named Array, to store ordered collections. 
*/

/* Declaration */
/* There are two syntaxes for creating an empty array: 

let arr = new Array();
let arr = [];

Almost all the time, the second syntax is used. We can supply initial elements in the brackets:
*/
let fruits = ["Apple", "Orange", "Plum"];

/* Array elements are numbered, starting with zero. We can get an element by 
its number in square brackets: */
console.log( fruits[0] ); // Apple
console.log( fruits[1] ); // Orange
console.log( fruits[2] ); // Plum

/* We can replace an element: */
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]

/* Or add a new element to the array" */
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]

/* The total count of the elements in the array is its length: */
let fruitBasket = ["Apple", "Orange", "Plum"];

console.log( fruitBasket.length ); // 3

/* We can also use alert to show the whole array */
alert(fruitBasket); // Apple,Orange,Plum
alert( fruits );    // Apple,Orange,Pear,Lemon