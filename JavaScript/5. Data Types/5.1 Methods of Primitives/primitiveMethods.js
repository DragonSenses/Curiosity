/* Methods of Primitives */
/* Summary
  - Primitives except null and undefined provide many helpful methods
  - Formally, these methods work via temporary objects, but JavaScript
  engines are well tuned to optimize that internally, so they are not expensive
  to call
*/

/* Key distinctions between Primitives and Objects 
A primitive
  - is a value of a primitive type.
  - There are 7 primitive types: 
    {string, number, bigint, boolean, symbol, null, undefined}

An object
  - is capable of storing multiple values as properties.
  - Can be created with {}, for instance: {name: "Leo", age: 20}. 
  - There are other kinds of objects in JavaScript: e.g. functions
*/

/* One of the best things about objects is that we can store a function as
one of its properties. */
let leo = {
    name: "Leo", 
    sayHi: function() {
        console.log("Hi buddy!");
    }
};

leo.sayHi(); // Hi buddy!

/* Many built-in objects already exist, such as those that work with dates, 
errors, HTML elements, etc. They have different properties and methods. 

But these features come with a cost!

Objects are "heavier" than primitives, i.e. they require additional resources
to support the internal machinery. 
*/

/* A primitive as an object

The Paradox faced by creator of JavaScript:
  - There are many things one would want to do with a primitive, it would be great
  to access them using methods
  - Primitives must be as fast and lightweight as possible

Solution:
  1. Primitives are still primitive. A single value, as desired.
  2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
  3. In order for that to work, a special “object wrapper” that provides the 
  extra functionality is created, and then is destroyed.

The “object wrappers” are different for each primitive type and are called: 
  String, Number, Boolean, Symbol and BigInt. 
  
Thus, they provide different sets of methods.

For instance, there exists a string method str.toUpperCase() that 
returns a capitalized str. e.g:
*/
let str = "Hello";
alert( str.toUpperCase() ); // HELLO

/* What actually happens in str.toUpperCase()
1. The string str is a primitive. So in the moment of accessing its property, 
  a special object is created that knows the value of the string, and has 
  useful methods, like toUpperCase().

2. That method runs and returns a new string (shown by alert).

3. The special object is destroyed, leaving the primitive str alone.

So primitives can provide methods, but they still remain lightweight.

The JavaScript engine highly optimizes this process. It may even skip the 
creation of the extra object at all. But it must still adhere to the 
specification and behave as if it creates one.
*/

/* A number has methods of its own, for instance, toFixed(n) rounds 
the number to the given precision: */
let n = 1.23456;
alert( n.toFixed(2) ); // 1.23

/* Constructors String/Number/Boolean are for internal use only 

  Some languages like Java allow us to explicitly create "wrapper objects"
for primitives using a syntax like new NumbeR(1) or new Boolean(false).

In JavaScript, that's also possible for historical reasons, but HIGHLY UNCRECOMMENDED.
Things will go crazy in several places. For instance:
*/
alert( typeof 0 ); // "number"
alert( typeof new Number(0) ); // "object"!

/* Objects are always truthy in if, so here the alert will show up: */
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}

/* On the other hand, using the same functions String/Number/Boolean without 
new is totally fine and useful thing. They convert a value to the corresponding
type: to a string, a number, or a boolean (primitive). 

e.g., this is entirely valid:
*/
let numb = Number("123"); // convert a string to number
alert(numb); // 123

/* null/undefined have no methods */
/* The special primitives null and undefined are exceptions, i.e. they have no
corresponding "wrapper objects" and provide no methods. In a sense, they are
"the most primitive". 

An attempt to access a property of such value would give the error:
*/
alert(null.test); // error