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

