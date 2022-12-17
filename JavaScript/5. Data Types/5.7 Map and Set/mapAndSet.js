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
