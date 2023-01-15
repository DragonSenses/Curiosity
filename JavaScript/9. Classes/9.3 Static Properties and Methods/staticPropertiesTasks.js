/* Class extends Object? */
/* As we know, all objects normally inherit from Object.prototype and get 
access to "generic" object methods like hasOwnProperty etc.

For instance: */
{
  class Rabbit {
    constructor(name) {
      this.name = name;
    }
  }
  
  let rabbit = new Rabbit("Rab");
  
  // hasOwnProperty method is from Object.prototype
  // eslint-disable-next-line no-prototype-builtins
  console.log( rabbit.hasOwnProperty('name') ); // true
}

/* But if we spell it out explicitly like "class Rabbit extends Object", 
then the result would be different from a simple "class Rabbit"?

What's the difference?

Here's an example of such code (it doesn't work – why? fix it?): 

class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

console.log( rabbit.hasOwnProperty('name') ); // Error

*/

/* Answer:
First, let's see why the latter code doesn't work.

The reason becomes obvious if we try to run it. An inheriting class constructor
must call super(). Otherwise "this" won't be "defined".

So here's the fix:
*/
{
  class Rabbit extends Object {
    constructor(name) {
      super(); // need to call the parent constructor when inheriting
      this.name = name;
    }
  }
  
  let rabbit = new Rabbit("Rab");
  
  // eslint-disable-next-line no-prototype-builtins
  console.log( rabbit.hasOwnProperty('name') ); // Error
}

/* But that's not all yet.

Even after the fix, there's still an important difference between 
"class Rabbit extends Object" and class Rabbit.

As we know, the "extends" syntax sets up two prototypes: 
  1. Between "prototype" of the constructor functions (for methods).
  2. Between the constructor functions themselves (for static methods).

In the case of class Rabbit extends Object it means: */
{
  class Rabbit extends Object {}

  console.log( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
  console.log( Rabbit.__proto__ === Object ); // (2) true
}

/* So Rabbit now provides access to the static methods of Object via Rabbit, 
like this: */
{
  class Rabbit extends Object {}

  // normally we call Object.getOwnPropertyNames
  console.log ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
}

/* But if we don't have extends Object, then Rabbit.__proto__ is not set to Object.

Here's the demo: */
{
  class Rabbit {}

  console.log( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
  console.log( Rabbit.__proto__ === Object ); // (2) false (!)
  console.log( Rabbit.__proto__ === Function.prototype ); // as any function by default

  // error, no such function in Rabbit
  console.log ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
}

/* So Rabbit doesn't provide access to static methods of Object in that case.

By the way, Function.prototype also has "generic" function methods, like call, 
bind etc. They are ultimately available in both cases, because for the built-in 
Object constructor, Object.__proto__ === Function.prototype.

Here's the picture: 
class Rabbit            class Rabbit extends Object

Function.prototype      Function.prototype
[call: function]        [call: function  ]
[bind: function]        [bind: function  ]
[...]                   [...]
      /\                        /\
      | [[Prototype]]            |  [[Prototype]]
Rabbit                  Object
[constructor]           [constructor]
                                /\
                                 |  [[Prototype]]
                        Rabbit
                        [constructor]

So, to put it short, there are two differences:

class Rabbit	                            class Rabbit extends Object
–	                                        needs to call super() in constructor
Rabbit.__proto__ === Function.prototype	  Rabbit.__proto__ === Object
*/