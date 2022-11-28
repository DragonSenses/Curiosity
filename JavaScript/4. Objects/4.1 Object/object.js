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

/* Property names limitations 
  - A variable cannot have a name equal to one of the language-reserved words
    e.g., for, let, return...
  - But for an object property, there's no such restriction.
  - In short, there are no limitations on property names. They can be any 
  strings or symbols (a special type of identifiers)
  - Other types are automatically converted to strings.
  - Minor Exception is special property named __proto__ , cannot be non-obj value
*/

// these properties are all right, object properties have no restrictions
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6

// Other types are automatically converted to strings.
// Fpr instance, a number 0 becomes a String "0" when used as a property key:
let obj2 = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj2["0"] ); // test
alert( obj2[0] );   // test (same property)

/* __proto__ can't be set to a non-object value */
let obj3 = {};
obj3.__proto__ = 5; // assign a number
alert(obj3.__proto__); // [object Object] - the value is an object, didn't work as intended

/* Property Existence Test - "in" operator 

Notable feature of objects in JavaScript is that it's possible to access any
property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns undefined. So we can easily test
whether the property exists:
*/
let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"

/* in - special operator to check for non-existing properties.
Syntax:
        "key" in object 

Note: left side of "in" there must be a property name. That's usually a quoted
String. Can omit quotes if a variable contains the actual name to be tested.

*/
let user = { name: "Luna", age: 20 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

// If we omit quotes, that means a variable should contain the actual name to be tested. For instance:
let user = { age: 30 };

key = "age";
alert( key in user ); // true, property "age" exists

/* Why use "in" operator over comparing against undefined? 
- Most cases work, but a special case when comparing fails but "in" works 
correctly: when an object property exists, but stores undefined 
*/
let obj4 = {
  test: undefined
};

alert( obj4.test ); // it's undefined, so - no such property?

alert( "test" in obj4 ); // true, the property does exist!

// Technically obj4.test technically exists, so in operator works right
// Situations like thihs happen rarely, because undefined should not be 
// explicitly assigned. Mostly use null for "unknown" or "empty" values
// So the in operator is an exotic guest in the code


/* The "for..in" loop 
Syntax:
          for(key in object){
            // executes the body for each key among object properties
          }

To walk all over keys of an object, there exists a special form of the loop:
for..in. We can declare the looping variable inside the loop, like "let key".
Can also use another variable name, e.g. "for (let prop in obj)" also used.
*/

// Output all properties of user:
user = {
  name: "Leo",
  age: 20,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // Leo, 20, true
}

/* Ordered like an object 
When looping over an object, do we get all properties in the same order when 
they were added?

Answer: "Ordered in a special fashion":
  - Integer properties are Sorted (ascending sorted order)
  - Others appear in creation order

Integer properties are a String that can be converted to-and-from an integer
without a change. So "49" is an integer property name, because when it's 
transformed to an integer number and back, it's still the same.

But "+49" and "1.2" are not
*/

// Note on Integer Properties
// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property

// An object with phone codes, has it's integer properties sorted when looped
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}

/* On the other hand, if keys are non-integer, then they are listed in Creation
Order, for instance: */

user = {
  name: "Luna",
  surname: "Berry"
};
user.age = 20; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}

/* To "fix" the issue with phone codes, we can "cheat" by making the codes 
non-integer with unary plus opoerator before each code: */
codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}