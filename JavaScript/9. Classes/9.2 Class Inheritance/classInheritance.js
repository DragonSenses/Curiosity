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
      alert(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      alert(`${this.name} stands still.`);
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
*/




}