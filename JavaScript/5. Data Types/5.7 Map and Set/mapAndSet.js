/* Map and Set */
/* Summary
Map – is a collection of keyed values.
    Map methods and properties:
 -new Map([iterable]) – creates the map, with optional iterable (e.g. array) of
  [key,value] pairs for initialization.
 -map.set(key, value) – stores the value by the key, returns the map itself.
 -map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
 -map.has(key) – returns true if the key exists, false otherwise.
 -map.delete(key) – removes the element by the key, returns true if key existed
  at the moment of the call, otherwise false.
 -map.clear() – removes everything from the map.
 -map.size – returns the current element count.

The differences from a regular Object:
    - Any keys, objects can be keys.
    - Additional convenient methods, the size property.


Set – is a collection of unique values.
    Set methods and properties:
 -new Set([iterable]) – creates the set, with optional iterable (e.g. array) 
  of values for initialization.
 -set.add(value) – adds a value (does nothing if value exists), returns the set itself.
 -set.delete(value) – removes the value, returns true if value existed at the 
  moment of the call, otherwise false.
 -set.has(value) – returns true if the value exists in the set, otherwise false.
 -set.clear() – removes everything from the set.
 -set.size – is the elements count.

Iteration over Map and Set is always in the insertion order, so we can’t say 
that these collections are unordered, but we can’t reorder elements or directly 
get an element by its number.

*/


/* Till now, we’ve learned about the following complex data structures:
    - Objects are used for storing keyed collections.
    - Arrays are used for storing ordered collections.
But that’s not enough for real life. That’s why Map and Set also exist. 
*/

/* Map is a collection of keyed data items, just like an Object. 
But the main difference is that Map allows keys of any type.

Methods and properties are:
 -new Map([iterable]) – creates the map, with optional iterable (e.g. array) of
  [key,value] pairs for initialization.
 -map.set(key, value) – stores the value by the key, returns the map itself.
 -map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
 -map.has(key) – returns true if the key exists, false otherwise.
 -map.delete(key) – removes the element by the key, returns true if key existed
  at the moment of the call, otherwise false.
 -map.clear() – removes everything from the map.
 -map.size – returns the current element count.

For instance:
*/
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3

/* As we can see, unlike objects, keys are not converted to strings. 
Any type of key is possible. */

/* NOTE: map[key] isn’t the right way to use a Map 
Although map[key] also works, e.g. we can set map[key] = 2, 
this is treating map as a plain JavaScript object, so it implies all corresponding
limitations (only string/symbol keys and so on).

So we should use map methods: set, get and so on.
*/

/* Map can also use objects as keys */
let luna = { name: "Luna" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// luna is the key for the map
visitsCountMap.set(luna, 123);

alert( visitsCountMap.get(luna) ); // 123

/* Using objects as keys is one of the most notable and important Map features. 
The same does not count for Object. String as a key in Object is fine, but we 
can’t use another Object as a key in Object. */
let albedo = { name: "Albedo" };
let shalltear = { name: "Shalltear" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[shalltear] = 234; // try to use shalltear object as the key
visitsCountObj[albedo] = 123; // try to use albedo object as the key, shalltear object will get replaced

// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123

/* As visitsCountObj is an object, it converts all Object keys, such as albedo and shalltear above, 
same string "[object Object]". Definitely not what we want. */

/* How Map compares keys */
/* To test keys for equivalence, Map uses the algorithm SameValueZero. 
It is roughly the same as strict equality ===, but the difference is that NaN 
is considered equal to NaN. So NaN can be used as the key as well.

This algorithm can’t be changed or customized. */

/* Chaining */
/* Every map.set call returns the map itself, so we can “chain” the calls: */
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');


/* Iteration over Map */
/* For looping over a map, there are 3 methods:
1. map.keys() – returns an iterable for keys,
2. map.values() – returns an iterable for values,
3. map.entries() – returns an iterable for entries [key, value], 
                   it’s used by default in for..of.

For instance:
 */
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);
  
  // iterate over keys (vegetables)
  for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
  }
  
  // iterate over values (amounts)
  for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
  }
  
  // iterate over [key, value] entries
  for (let entry of recipeMap) { // the same as of recipeMap.entries()
    alert(entry); // cucumber,500 (and so on)
}

/* Insertion order is used */
/* The iteration goes in the same order as the values were inserted. 
Map preserves this order, unlike a regular Object. */

/* Besides that, Map has a built-in forEach method, similar to Array: */
// runs the function for each (key, value) pair
recipeMap.forEach( (value, key) => {
    alert(`${key}: ${value}`); // cucumber: 500, tomatoes: 350, onion: 50
});


/* Object.entries: Map from Object */
/* When a Map is created, we can pass an array (or another iterable) with 
key/value pairs for initialization, like this: */
// array of [key, value] pairs
map = new Map([
    ['1',  'str1'],
    [1,    'num1'],
    [true, 'bool1']
]);
  
alert( map.get('1') ); // str1

/* If we have a plain object, and we’d like to create a Map from it, 
then we can use built-in method Object.entries(obj) that returns an array of 
key/value pairs for an object exactly in that format.

So we can create a map from an object like this: */

let obj = {
    name: "Luna",
    age: 20
};

map = new Map(Object.entries(obj));

alert( map.get('name') ); // Luna

/* Here, Object.entries returns the array of key/value pairs: 
[ ["name","Luna"], ["age", 20] ]. That’s what Map needs. */


/* Object.fromEntries: Object from Map */
/* We’ve just seen how to create Map from a plain object with Object.entries(obj).

There’s Object.fromEntries method that does the reverse: given an array of 
[key, value] pairs, it creates an object from them: */
let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2

/* We can use Object.fromEntries to get a plain object from Map.

E.g. we store the data in a Map, but we need to pass it to a 3rd-party code 
that expects a plain object.

Here we go: */
map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

obj = Object.fromEntries(map.entries()); // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2