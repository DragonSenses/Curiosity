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

/* Any expression is allowed after extends */
/* Class syntax allows to specify not just a class, but any expression after 
extends.

For instance, a function call that generates the parent class: */
{
  // eslint-disable-next-line no-inner-declarations
  function f(phrase) {
    return class {
      sayHi() { console.log(phrase); }
    };
  }
  
  class User extends f("Hello") {}
  
  new User().sayHi(); // Hello

/* Here class User inherits from the result of f("Hello").

That may be useful for advanced programming patterns when we use functions 
to generate classes depending on many conditions and can inherit from them. */
}


/* Overriding a method */
/* Now let’s move forward and override a method. By default, all methods that
 are not specified in class Rabbit are taken directly “as is” from class Animal.

But if we specify our own method in Rabbit, such as stop() then it will be 
used instead: */
{
  class Rabbit extends Animal {
    stop() {
      // ...now this will be used for rabbit.stop()
      // instead of stop() from class Animal
    }
  }

  console.log(Rabbit);
}
/* Usually, however, we don’t want to totally replace a parent method, but 
rather to build on top of it to tweak or extend its functionality. We do 
something in our method, but call the parent method before/after it or in 
the process. */

/* Classes provide "super" keyword for that. 
  - super.method(...) to call a parent method.
  - super(...) to call a parent constructor (inside our constructor only).

For instance, let our rabbit autohide when stopped: */
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
  
  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!`);
    }
  
    stop() {
      super.stop(); // call parent stop
      this.hide(); // and then hide
    }
  }
  
  let rabbit = new Rabbit("White Rabbit");
  
  rabbit.run(5); // White Rabbit runs with speed 5.
  rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
}
/* Now Rabbit has the stop method that calls the parent super.stop() in the process. */


/* Arrow functions have no super */
/* As was mentioned in the chapter Arrow functions revisited, arrow functions 
do not have super.

If accessed, it’s taken from the outer function. For instance: */
{
  class Rabbit extends Animal {
    stop() {
      setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
    }
  }

  console.log(Rabbit);

/* The super in the arrow function is the same as in stop(), so it works as 
intended. If we specified a “regular” function here, there would be an error: */

  // Unexpected super
  // setTimeout(function() { super.stop() }, 1000);
}


/* Overriding constructor */
/* With constructors it gets a little bit tricky.

Until now, Rabbit did not have its own constructor.

According to the specification, if a class extends another class and has no 
constructor, then the following “empty” constructor is generated: */
{
  class Rabbit extends Animal {
    // generated for extending classes without own constructors
    constructor(...args) {
      super(...args);
    }
  }

  console.log(Rabbit);

}
/* As we can see, it basically calls the parent constructor passing it all 
the arguments. That happens if we don’t write a constructor of our own.

Now let’s add a custom constructor to Rabbit. It will specify the earLength 
in addition to name: 
{
  class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    // ...
  }
  
  class Rabbit extends Animal {
  
    constructor(name, earLength) {
      this.speed = 0;
      this.name = name;
      this.earLength = earLength;
    }
  
    // ...
  }
  
  // Doesn't work!
  
}

*/
/* Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?

The short answer is: 
- Constructors in inheriting classes must call super(...), and (!) do it 
before using this.

…But why? What’s going on here? Indeed, the requirement seems strange.

Of course, there’s an explanation. Let’s get into details, so you’ll really 
understand what’s going on.

In JavaScript, there’s a distinction between a constructor function of an 
inheriting class (so-called “derived constructor”) and other functions. 
A derived constructor has a special internal property [[ConstructorKind]]:"derived". 
That’s a special internal label.

That label affects its behavior with new.
  - When a regular function is executed with new, it creates an empty object 
  and assigns it to this.
  - But when a derived constructor runs, it doesn’t do this. It expects the 
  parent constructor to do this job.

So a derived constructor must call super in order to execute its parent (base) 
constructor, otherwise the object for this won’t be created. And we’ll get an error.
*/