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


/* Other built-in prototypes */
/* Other built-in objects such as Array, Date, Function and others also keep 
methods in prototypes.

For instance, when we create an array [1, 2, 3], the default new Array() 
constructor is used internally. So Array.prototype becomes its prototype and 
provides methods. That’s very memory-efficient.

By specification, all of the built-in prototypes have Object.prototype on the 
top. That’s why some people say that “everything inherits from objects”.

Here’s the overall picture (for 3 built-ins to fit): 

                            null
                            /\
                            | [[Prototype]]
              Object.prototype
              [toString: function                     ]
              [other object methods                   ]
               /\          /\                       /\
 [[Prototype]] /           | [[Prototype]]           \
              /            |                          \
Array.prototype         Function.prototype         Number.prototype
[slice: function    ]   [call: function        ]   [toFixed: function   ]
[other array methods]   [other function methods]   [other number methods]
     /\                      /\                        /\
      | [[Prototype]]         | [[Prototype]]           | [[Prototype]]
  [1, 2, 3]            [function f(args) { ... }]      [5]
*/

/* Let's check the prototypes manually: */
{
  let arr = [1, 2, 3];

  // it inherits from Array.prototype?
  console.log( arr.__proto__ === Array.prototype ); // true
  
  // then from Object.prototype?
  console.log( arr.__proto__.__proto__ === Object.prototype ); // true
  
  // and null on the top.
  console.log( arr.__proto__.__proto__.__proto__ ); // null
}

/* Some methods in prototypes may overlap, for instance, Array.prototype 
has its own toString that lists comma-delimited elements: */
{
let arr = [1, 2, 3];
console.log(arr); // 1,2,3 <-- the result of Array.prototype.toString
}

/* As we’ve seen before, Object.prototype has toString as well, 
but Array.prototype is closer in the chain, so the array variant is used. 

Object.prototype
[toString: function]
[ ...              ] 
      /\
       | [[Prototype]]
       |
Array.prototype
[toString: function]
[ ...              ]
      /\
       | [[Prototype]]
       |
    [1,2,3]

In-browser tools like Chrome developer console also show inheritance 
(console.dir may need to be used for built-in objects).

Other built-in objects also work the same way. 
Even functions – they are objects of a built-in Function constructor, 
and their methods (call/apply and others) are taken from Function.prototype. 
Functions have their own toString too.*/
function f() {}

console.log(f.__proto__ == Function.prototype); // true
console.log(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects


/*  */