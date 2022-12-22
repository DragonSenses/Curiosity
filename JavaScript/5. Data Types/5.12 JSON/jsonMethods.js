/* JSON methods, toJSON */
/* Summary
 - JSON is a data format that has its own independent standard and libraries 
 for most programming languages.

 - JSON supports plain objects, arrays, strings, numbers, booleans, and null.

 - JavaScript provides methods JSON.stringify to serialize into JSON and 
 JSON.parse to read from JSON.

 - Both methods support transformer functions for smart reading/writing.

 - If an object has toJSON, then it is called by JSON.stringify. */


/* Let’s say we have a complex object, and we’d like to convert it into a string, 
to send it over a network, or just to output it for logging purposes.

Naturally, such a string should include all important properties.

We could implement the conversion like this: */

let user = {
    name: "Leo",
    age: 20,
  
    toString() {
      return `{name: "${this.name}", age: ${this.age}}`;
    }
};

console.log(user); // {name: "Leo", age: 20}

/* …But in the process of development, new properties are added, old properties 
are renamed and removed. Updating such toString every time can become a pain. 

We could try to loop over properties in it, but what if the object is complex 
and has nested objects in properties? We’d need to implement their conversion as well.

Luckily, there’s no need to write the code to handle all this. 
The task has been solved already. */

/* JSON.stringify */
/* JSON (JavaScript Object Notation) is a general format to represent values and objects. 

It is described as in RFC 4627 standard. Initially it was made for JavaScript, 
but many other languages have libraries to handle it as well. So it’s easy to 
use JSON for data exchange when the client uses JavaScript and the server is 
written on Ruby/PHP/Java/Whatever.

JavaScript provides methods:
    * JSON.stringify to convert objects into JSON.
    * JSON.parse to convert JSON back into an object.

For instance, here we JSON.stringify a student:
*/

let student = {
    name: 'Luna',
    age: 20,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json = JSON.stringify(student);

console.log(typeof json); // we've got a string!

console.log(json);
/* JSON-encoded object:
{
"name": "Luna",
"age": 20,
"isAdmin": false,
"courses": ["html", "css", "js"],
"spouse": null
}
*/


/* The method JSON.stringify(student) takes the object and converts it into a string.
    The resulting json string is called a JSON-encoded or serialized or stringified 
or marshalled object. We are ready to send it over the wire or put into a plain data store.

Please note that a JSON-encoded object has several important differences from the object literal:

Strings use double quotes. 
 - No single quotes or backticks in JSON. 
 - So 'Leo' becomes "Leo".

Object property names are double-quoted also. That’s obligatory. 
 - So age:20 becomes "age":20.

JSON.stringify can be applied to primitives as well.

JSON supports following data types:
 - Objects { ... }
 - Arrays [ ... ]
 - Primitives:
 - strings,
 - numbers,
 - boolean values true/false,
 - null.

For instance: */
// a number in JSON is just a number
console.log( JSON.stringify(1) ) ;// 1

// a string in JSON is still a string, but double-quoted
console.log( JSON.stringify('test') ); // "test"

console.log( JSON.stringify(true) ); // true

console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]

/* JSON is data-only language-independent specification, so some 
JavaScript-specific object properties are skipped by JSON.stringify. 
    Namely:
 - Function properties (methods).
 - Symbolic keys and values.
 - Properties that store undefined.
*/
user = {
    sayHi() { // ignored
      alert("Hello");
    },
    [Symbol("id")]: 123, // ignored
    something: undefined // ignored
};


console.log( JSON.stringify(user) ); // {} (empty object)

/* Usually that’s fine. If that’s not what we want, then soon we’ll see 
how to customize the process.

The great thing is that nested objects are supported and converted automatically.

For instance: */
let meetup = {
    title: "Conference",
    room: {
      number: 23,
      participants: ["john", "ann"]
    }
};

console.log( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
    "title":"Conference",
    "room":{"number":23,"participants":["john","ann"]},
}
*/

/* The important limitation: there must be no circular references. */
// For instance:
let room = {
    number: 23
};
  
meetup = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup;  // room references meetup

JSON.stringify(meetup); // Error: Converting circular structure to JSON