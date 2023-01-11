/* Class Inheritance */
/* Summary
1. To extend a class: class Child extends Parent:
  - That means Child.prototype.__proto__ will be Parent.prototype, so methods 
  are inherited.
2. When overriding a constructor:
  - We must call parent constructor as super() in Child constructor before using this.
3. When overriding another method:
  - We can use super.method() in a Child method to call Parent method.
4. Internals:
  - Methods remember their class/object in the internal [[HomeObject]] property. 
  That’s how super resolves parent methods.
  - So it’s not safe to copy a method with super from one object to another.

  Also:
  - Arrow functions don’t have their own this or super, so they transparently fit 
  into the surrounding context.
*/
/* Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing. */

/* The “extends” keyword */
/* Let’s say we have class Animal: */
{
  class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still.`);
    }
  }
  
  let animal = new Animal("My animal");
  console.log(animal);


/* Here’s how we can represent animal object and Animal class graphically:

Animal  prototype Animal.prototype
[     ] --------> [constructor: Animal] 
                  [run: function      ]
                  [stop:function      ]
                        /\
                        | [[Prototype]]
                        |
            new Animal  |
                  [name: "My animal"  ]


…And we would like to create another class Rabbit.

As rabbits are animals, Rabbit class should be based on Animal, have access 
to animal methods, so that rabbits can do what “generic” animals can do.

The syntax to extend another class is: class Child extends Parent.

Let’s create class Rabbit that inherits from Animal:
*/
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
}

/* Object of Rabbit class have access both to Rabbit methods, such as 
rabbit.hide(), and also to Animal methods, such as rabbit.run().

Internally, extends keyword works using the good old prototype mechanics. 
It sets Rabbit.prototype.[[Prototype]] to Animal.prototype. So, if a method 
is not found in Rabbit.prototype, JavaScript takes it from Animal.prototype.

Animal  prototype Animal.prototype
[     ] --------> [constructor: Animal] 
                  [run : function     ]
                  [stop: function     ]
                        /\
                        | [[Prototype]]   // extends
                        |
      Rabbit.prototype  |
Rabbit            [constructor: Rabbit  ]
[constructor] --> [hide: function       ] 
                        /\
                        | [[Prototype]]
            new Rabbit  |
                  [name: "White Rabbit" ]

For instance, to find rabbit.run method, the engine checks (bottom-up on 
the picture):
  1. The rabbit object (has no run).
  2. Its prototype, that is Rabbit.prototype (has hide, but not run).
  3. Its prototype, that is (due to extends) Animal.prototype, that 
  finally has the run method.

As we can recall from the chapter Native prototypes, JavaScript itself uses 
prototypal inheritance for built-in objects. E.g. Date.prototype.[[Prototype]] 
is Object.prototype. That’s why dates have access to generic object methods.
*/