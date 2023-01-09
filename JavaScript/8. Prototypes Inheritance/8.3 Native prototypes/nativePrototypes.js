/* Native prototypes */
/* Summary
- All built-in objects follow the same pattern:
  - The methods are stored in the prototype (Array.prototype, Object.prototype, 
    Date.prototype, etc.)
  - The object itself stores only the data (array items, object properties, 
    the date)

- Primitives also store methods in prototypes of wrapper objects: 
Number.prototype, String.prototype and Boolean.prototype. 
Only undefined and null do not have wrapper objects

- Built-in prototypes can be modified or populated with new methods. 
But it’s not recommended to change them. The only allowable case is probably 
when we add-in a new standard, but it’s not yet supported by the JavaScript engine
*/

/* The "prototype" property is widely used by the core of JavaScript itself. 
All built-in constructor functions use it.

First we’ll look at the details, and then how to use it for adding new 
capabilities to built-in objects. */

/* Object.prototype */
/* Let’s say we output an empty object: */
let obj = {};
console.log( obj ); // "[object Object]" ?

/* Where’s the code that generates the string "[object Object]"? 
That’s a built-in toString method, but where is it? The obj is empty!

…But the short notation obj = {} is the same as obj = new Object(), where 
Object is a built-in object constructor function, with its own prototype 
referencing a huge object with toString and other methods.

Here’s what’s going on: 

Object  prototype   Object.prototype
[     ] --------> [ constructor: Object]
                  [ toString: function ]
                  [...                 ]
                  
When new Object() is called (or a literal object {...} is created), the
[[Prototype]] of it is set to Object.prototype according to the rule that we
discussed in the previous chapter: 

Object  prototype   Object.prototype
[     ] --------> [ constructor: Object]
                  [ toString: function ]
                  [...                 ]
                        /\
                        | [[Prototype]]
                        |
                  obj = new Object()
                  [                    ]

So then when obj.toString() is called the method is taken from Object.prototype.
We can check it like this:
*/
{
let obj = {};

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true

/* Please note that there is no more [[Prototype]] in the chain above 
Object.prototype: */

console.log(Object.prototype.__proto__); // null
}
