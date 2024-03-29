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

/* An array can store elements of any type */

function makeMixedArray(){
  // mix of values
  return [ 'Apple', { name: 'Luna' }, true, function() { alert('hello'); } ];
}

let mixedArray = makeMixedArray();

// get the object at index 1 and then show its name
console.log( mixedArray[1].name ); // Luna

// get the function at index 3 and run it
mixedArray[3](); // hello

/* Trailing Comma - an array, just like an object, may end with a comma:
 let fruits = [
  "Apple",
  "Orange",
  "Plum",
];

The “trailing comma” style makes it easier to insert/remove items, because all lines become alike.
*/

/* Get last elements with "at" */
/* To get last element of the array, some languages allow the use of negative indexes
for the same purpose, like fruits[-1]. 

In JavaScript, it won't work since the result be undefined, because the index
in square brackets is treated literally. 

We can explicitly calculate the last element index and then access it: 
  fruits[fruits.length - 1].
*/
fruits = ["Apple", "Orange", "Plum"];
alert( fruits[fruits.length-1] ); // Plum

/* Shorter Syntax: fruits.at(-1): */
alert( fruits.at(-1) ); // Plum, same as fruits[fruits.length-1]

/* In other words, arr.at(i) 
  - is exactly the same as arr[i], if i >= 0 
  - for negative values of i, it steps back from the end of the array. 
*/

/* Arrays in JavaScript can work both as a queue and as a stack. They allow you
to add/remove elements, both to/from the beginning or the end. The data 
structure that allows this is called deque (i.e. doubly ended queue) */

/* Methods that work with the end of the array: push() and pop() */
// push() appends the element to the end of the array:
fruits = ["Apple", "Orange"];

fruits.push("Pear");

alert( fruits ); // Apple, Orange, Pear

// pop() extracts the last element of the array and returns it:
fruits = ["Apple", "Orange", "Pear"];

alert( fruits.pop() ); // remove "Pear" and alert it

alert( fruits ); // Apple, Orange

/* Methods that work with the beginning of the array: unshift() and shift() */
// unshift() ADDS the element to the beginning of the array
fruits = ["Orange", "Pear"];

fruits.unshift('Apple');

alert( fruits ); // Apple, Orange, Pear

// shift() EXTRACTS the first element of the array and returns it:
fruits = ["Apple", "Orange", "Pear"];

alert( fruits.shift() ); // remove Apple and alert it

alert( fruits ); // Orange, Pear


/* Methods push() and unshift() can add multiple elements at once: */
fruits = ["Apple"];

fruits.push("Orange", "Peach");       // push 2 elements
fruits.unshift("Pineapple", "Lemon"); // unshift 2 elements

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );


/* Internals - An array is a special kind of object. 
  The square brackets used to access a property arr[0] actually come from the 
object syntax. That’s essentially the same as obj[key], where arr is the 
object, while numbers are used as keys.

They extend objects providing special methods to work with ordered collections
of data and also the length property. But at the core it’s still an object.

Remember, there are only eight basic data types in JavaScript. 
  Array is an object and thus behaves like an object.
    For instance, it is copied by reference:
*/
fruits = ["Banana"];

let arr = fruits; // copy by reference (two variables reference the same array)

alert( arr === fruits ); // true

arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now

/* What makes arrays really special is their internal representation. 
  The engine tries to store its elements in the contiguous memory area, 
  one after another; and there are other optimizations as well, 
  to make arrays work really fast.

But they all break if we quit working with an array as with an “ordered collection” 
and start working with it as if it were a regular object.

  For instance, technically we can do this:
*/
fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name

/* That’s possible, because arrays are objects at their base. We can add any 
properties to them.

But the engine will see that we’re working with the array as with a regular object. 
Array-specific optimizations are not suited for such cases and will be turned off, 
their benefits disappear. 

The ways to misuse an array:
  * Add a non-numeric property like arr.test = 5.
  * Make holes, like: add arr[0] and then arr[1000] (and nothing between them).
  * Fill the array in the reverse order, like arr[1000], arr[999] and so on.
  
Please think of arrays as special structures to work with the ordered data. 
They provide special methods for that. Arrays are carefully tuned inside 
JavaScript engines to work with contiguous ordered data, please use them this way. 
And if you need arbitrary keys, chances are high that you actually require a regular object {}.
*/

/* Performance
  Fast - pop/push
  Slow - shift/unshift
*/
fruits.shift(); // take 1 element from the start

/* Not enough to take and remove the element with the index 0. Other elements
need to be renumbered as well. The shift operation must do 3 things:
  1. Remove the element with the index 0.
  2. Move all elements to the left, renumber them from the index 1 to 0, 
     from 2 to 1 and so on.
  3. Update the length property.

The more elements in the array, the more time to move them, more in-memory operations.
The similar thing happens with unshift: to add an element to the beginning of the array, 
we need first to move existing elements to the right, increasing their indexes.

And what’s with push/pop? They do not need to move anything. To extract an element from 
the end, the pop method cleans the index and shortens length.

The actions for the pop operation:
*/
fruits.pop(); // take 1 element from the end

/* The pop method does not need to move anything, because other elements keep their indexes. 
That’s why it’s blazingly fast. The similar thing with the push method. */

/* Loops - cycling through array items */
/* One of the oldest ways is the for loop over indexes: */
arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
  alert( arr[i] );
}

/* Another form of loop, for..of: */
// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}

/* Note: for..of doesn't give access to the number of the current element, just
its value, but in most cases that's enough and more concise. */

/* Technically, because arrays are objects, it is also possible to use for..in: */
for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}

/* But that’s actually a bad idea. There are potential problems with it:
  1. The loop for..in iterates over all properties, not only the numeric ones.
    There are so-called “array-like” objects in the browser and in other environments, 
    that look like arrays. That is, they have length and indexes properties, 
    but they may also have other non-numeric properties and methods, which we 
    usually don’t need. 
    
    The for..in loop will list them though. So if we need to work with 
    array-like objects, then these “extra” properties can become a problem.

  2. The for..in loop is optimized for generic objects, not arrays, and thus 
  is 10-100 times slower. Of course, it’s still very fast. The speedup may only 
  matter in bottlenecks. But still we should be aware of the difference.

Generally, we shouldn’t use for..in for arrays. */

/* A word about "length" */
/* The length property automatically updates when we modify the array. 

To be precise, it is actually not the count of values in the array, 
  but the greatest numeric index plus one. 
  
For instance, a single element with a large index gives a big length:
*/
fruits = [];
fruits[123] = "Apple";  // Not usually how arrays are used
alert( fruits.length ); // 124

/* length property is writable. */
/* If we increase it manually, nothing interesting happens. 
But if we decrease it, the array is truncated. The process is irreversible, 
e.g: */
arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return

/* So, the simplest way to clear the array is: arr.length = 0; */
arr.length = 0; // Simplest way to clear the array

/* new Array() - one more syntax to create an array: */
let array = new Array("Apple", "Pear", "etc");
console.log(array);

/* Rarely used because square brackets [] are shorter. Also there's a tricky
feature with it. If new Array is called with a single argument which is a number, 
then it creates an array without items, but with the given length. 

Avoid such surprises by using square bracket syntax, unless we know what we're
doing.

e.g: */
array = new Array(2); // will it create an array of [2] ?
console.log( array[0] );     // undefined! no elements.
console.log( array.length ); // length 2


/* Multidimensional arrays */
/* Arrays can have items that are also arrays. We can use it for multidimensional arrays, 
for example to store matrices: */

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log( matrix[1][1] ); // 5, the central element

/* toString() */
/* Arrays have their own implementation of toString method that returns a 
comma-separated list of elements. e.g: */
arr = [1, 2, 3];
console.log( arr ); // 1,2,3
console.log( String(arr) === '1,2,3' ); // true

/* Arrays do not have Symbol.toPrimitive, neither a viable valueOf(), they 
implement only toString conversion. SO [] becomes an empty string, [1] becomes
"1" and [1,2] becomes "1,2". */
console.log( [] + 1 );    // "1"
console.log( [1] + 1 );   // "11"
console.log( [1,2] + 1 ); // "1,21"

/* When the binary plus "+" operator adds something to a string, it converts 
it to a string as well, so the next step looks like this: */
console.log( "" + 1 );    // "1"
console.log( "1" + 1 );   // "11"
console.log( "1,2" + 1 ); // "1,21"

/* Don't compare arrays with == */
/* Arrays in JavaScript shouldn't be compared with operator ==

This operator has no special treatment for arrays, it works with them as with
any objects. Let's recall the rules:
  * Two objects are equal == only if they’re references to the same object.
  * If one of the arguments of == is an object, and the other one is a primitive, 
    then the object gets converted to primitive, as explained in the chapter Object 
    to primitive conversion.
  * …With an exception of null and undefined that equal == each other and nothing else.

The strict comparison === is even simpler, as it doesn’t convert types.

So, if we compare arrays with ==, they are never the same, unless we compare 
two variables that reference exactly the same array.

e.g:
*/
console.log( [] == [] );    // false
console.log( [0] == [0] );  // false

/* These arrays are technically different objects. So they aren’t equal. 
The == operator doesn’t do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well: */
console.log( 0 == [] );   // true
console.log('0' == [] );  // false

/* Here, in both cases, we compare a primitive with an array object. 
So the array [] gets converted to primitive for the purpose of comparison and 
becomes an empty string ''.

Then the comparison process goes on with the primitives: */
// after [] was converted to ''
console.log( 0 == '' );   // true, as '' becomes converted to number 0
console.log('0' == '' );  // false, no type conversion, different strings

/* To compare arrays DO NOT use == operator. Instead, compare them item-by-item
in a loop or using iteration methods. */