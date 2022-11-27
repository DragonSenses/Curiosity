/* Objects Summary
Objects are associate arrays with several special features.

    They store properties (key-value pairs), where:
    - Property keys must be strings or symbols (usually strings).
    - Values can be of any type.

    To access a property, we can use:
    - The dot notation: obj.property.
    - Square brackets notation obj["property"]. Square brackets allow 
      taking the key from a variable, like obj[varWithKey].

    Additional operators:
    - To delete a property: delete obj.prop.
    - To check if a property with the given key exists: "key" in obj.
    - To iterate over an object: for (let key in obj) loop.

What we've studied so far is called a "plain object", or just Object.

There are many other kinds of objects in JavaScript:
  - Array to store ordered data collections,
  - Date to store the information about the date and time,
  - Error to store the information about an error.

They have their special features. Some call them "Array type" or "Date type",
but formally they are not types of their own, but belong to a single "object" 
data type. And they extend it in various ways. 
*/

/* Creating an empty object
  Object can be created with figure brackets {...} with an optional list of
properties. 
  Properties are Key:Value pairs, where key is a String called a 
property name, and value can be anything. 
*/

let user1 = new Object();  // "object constructor" syntax
let user2 = {};  // "object literal" syntax

/* Literals and Properties 
A property has a key (aka name or identifier) before the colon ":" and a value
to the right of it. Note the comma "," after every property except the last.

The last property in the list may end with a comma, called a trailing/hanging 
comma, which makes it easier to add/remove/move around properties, because all
lines are alike.
*/

let user = {    // an object
  name: "Leo",  // by key "name" store value "Leo"
  age: 20       // by key "age" store value 30
};

// In the user object, there are two properties
// <name,"Leo"> - first property has the name "name" and value of "Leo"
// <age,20> - second property has name "age" and value of 30

/* Dot Notation allows Accessing, Removing, and Deleting Properties 
  The dot requires the key to be a valid variable identifier. That implies: 
  - contains no spaces
  - doesn’t start with a digit
  - doesn’t include special characters ($ and _ are allowed).
*/

/* Access Property values via dot notation: */
alert( user.name ); // Leo
alert( user.age );  // 20

/* Adding a Property */
user.isAdmin = true;

/* Removing a Property using delete operator */
delete user.age;

/* Multiword property names can be used but must be quoted */
user = {
  name: "Luna",
  age: 20,
  "likes birds": true,   // multiword property name must be quoted
}                        // Last property in list may end with a comma ,

/* Multiword Properties must use Square Brackets, not dot notation

// this would give a syntax error
user.likes birds = true 

  JavaScript thinks we address "user.likes" and then gives a syntax error when
it comes across unexpected "birds". The dot requires the key to be a valid 
variable identifier. That implies: contains no spaces, doesn’t start with a 
digit and doesn’t include special characters ($ and _ are allowed).
*/

/* Square Brackets */
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

/* Note: Square Brackets works with any String, but must be properly quoted.

Square brackets also provide a way to obtain the property name as the result
of any expression - as opposed to a literal string - like from a variable as
follows:
*/
let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;

/* Flexibility. The variable "key" may be calculated at run-time or depend 
on the user input. Then we use it to access the property.  e.g., */
let user = {
  name: "Luna",
  age: 20
};

key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // Luna (if enter "name")

/* Dot notation cannot be used in a similar way: */
let user = {
  name: "Leo",
  age: 20
};

key = "name";
alert( user.key ) // undefined


/* Computed Properties 
When creating an object, we can use square brackets in an object literal called
computed properties. e.g: 
*/
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"

// Essentially, works the same as:
fruit = prompt("Which fruit to buy?", "apple");
bag = {};

// take property name from the fruit variable
bag[fruit] = 5;

/* Using more Complex Expressions inside Square Brackets */
fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

/* Dot Notation vs. Square Bracketts
- Dot is used when propert names are known and simple
- Square Brackets used for something more complex, allows any property names
and variables, but also more cumbersome to write
*/

/* Property Value shorthand 
In real code, we often use existing variables as values for property names:
*/
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("Leo", 20);
alert(user.name); // Leo

// The use-case of making a property from a variable is so common, that there's
// a special property value shorthand to make it shorter
// Instead of "name:name" we can just write "name", like this:
function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}

// We can use Both normal properties and shorthands in the same object:
let user3 = {
  name, // same as name:name
  age: 30
};