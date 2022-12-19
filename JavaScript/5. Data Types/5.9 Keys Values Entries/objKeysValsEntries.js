/* Object.keys, values, entries */
/* Previously, we saw methods: map.keys(), map.values(), map.entries(). 
These methods are generic, there is a common agreement to use them for data structures. 
If we ever create a data structure of our own, we should implement them too.

They are supported for:
* Map
* Set
* Array

Plain objects also support similar methods, but the syntax is a bit different.

Object.keys, values, entries
For plain objects, the following methods are available:

* Object.keys(obj) – returns an array of keys.
* Object.values(obj) – returns an array of values.
* Object.entries(obj) – returns an array of [key, value] pairs.

Please note the distinctions (compared to map for example):

                Map                 Object
Call Syntax     maps.keys()         Object.keys(obj)        , but not obj.keys()
Returns         iterable            "real" Array

The first difference is that we have to call Object.keys(obj), and not obj.keys().

Why so? The main reason is flexibility. Remember, objects are a base of all 
complex structures in JavaScript. So we may have an object of our own like data 
that implements its own data.values() method. And we still can call Object.values(data) on it.

The second difference is that Object.* methods return “real” array objects, 
not just an iterable. That’s mainly for historical reasons.

For instance:
 */
let user = {
    name: "Luna",
    age: 20
};

console.log(user);

/* 
Object.keys(user) = ["name", "age"]
Object.values(user) = ["Luna", 20]
Object.entries(user) = [ ["name","Luna"], ["age",20] ]
*/

console.log(Object.keys(user));
console.log(Object.values(user));
console.table(Object.entries(user));
