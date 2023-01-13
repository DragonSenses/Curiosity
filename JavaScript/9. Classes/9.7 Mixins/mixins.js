/* Mixins */
/* Summary
Mixin – is a generic object-oriented programming term: a class that contains 
methods for other classes.

Some other languages allow multiple inheritance. JavaScript does not support 
multiple inheritance, but mixins can be implemented by copying methods into 
prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, 
like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite 
existing class methods. So generally one should think well about the naming 
methods of a mixin, to minimize the probability of that happening.
*/

/* In JavaScript we can only inherit from a single object. There can be 
only one [[Prototype]] for an object. And a class may extend only one other 
class.

But sometimes that feels limiting. For instance, we have a class 
StreetSweeper and a class Bicycle, and want to make their mix: a 
StreetSweepingBicycle.

Or we have a class User and a class EventEmitter that implements event 
generation, and we’d like to add the functionality of EventEmitter to User, 
so that our users can emit events.

There’s a concept that can help here, called “mixins”.

As defined in Wikipedia, a mixin is a class containing methods that can be 
used by other classes without a need to inherit from it.

In other words, a mixin provides methods that implement a certain behavior, 
but we do not use it alone, we use it to add the behavior to other classes. 
*/

/* A mixin example */
/* The simplest way to implement a mixin in JavaScript is to make an 
object with useful methods, so that we can easily merge them into a 
prototype of any class.

For instance here the mixin sayHiMixin is used to add some “speech” for User: */
{
  // mixin
  let sayHiMixin = {
    sayHi() {
      alert(`Hello ${this.name}`);
    },
    sayBye() {
      alert(`Bye ${this.name}`);
    }
  };

  // usage:
  class User {
    constructor(name) {
      this.name = name;
    }
  }

  // copy the methods
  Object.assign(User.prototype, sayHiMixin);

  // now User can say hi
  new User("World").sayHi(); // Hello World!
}

/* There’s no inheritance, but a simple method copying. So User may inherit 
from another class and also include the mixin to “mix-in” the additional methods, 
like this: 

class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);


Mixins can make use of inheritance inside themselves.

For instance, here sayHiMixin inherits from sayMixin:
*/
{
  let sayMixin = {
    say(phrase) {
      alert(phrase);
    }
  };
  
  let sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
  
    sayHi() {
      // call parent method
      super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
      super.say(`Bye ${this.name}`); // (*)
    }
  };
  
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  // copy the methods
  Object.assign(User.prototype, sayHiMixin);
  
  // now User can say hi
  new User("World").sayHi(); // Hello World!
}
/* Please note that the call to the parent method super.say() from 
sayHiMixin (at lines labelled with (*)) looks for the method in the prototype 
of that mixin, not the class.

Here’s the diagram (see the right part): 

                                    sayMixin
                                    [say: function    ]
                                        /\
                                        | [[Prototype]]
User.prototype                      sayHiMixin
[constructor: User] [[HomeObject]]  [sayHi: function ]
[sayHi: function  ] --------------> [sayBye: function]
[sayBye: function ] -------------->
      /\
      | [[Prototype]]
user
[name: ... ]

That’s because methods sayHi and sayBye were initially created in 
sayHiMixin. So even though they got copied, their [[HomeObject]] internal 
property references sayHiMixin, as shown in the picture above.

As super looks for parent methods in [[HomeObject]].[[Prototype]], that 
means it searches sayHiMixin.[[Prototype]].
*/


/* EventMixin */
/* Now let’s make a mixin for real life.

An important feature of many browser objects (for instance) is that they 
can generate events. Events are a great way to “broadcast information” to 
anyone who wants it. So let’s make a mixin that allows us to easily add 
event-related functions to any class/object. 

  - The mixin will provide a method .trigger(name, [...data]) to “generate an 
  event” when something important happens to it. The name argument is a name 
  of the event, optionally followed by additional arguments with event data.

  - Also the method .on(name, handler) that adds handler function as the 
  listener to events with the given name. It will be called when an event with 
  the given name triggers, and get the arguments from the .trigger call.

  - …And the method .off(name, handler) that removes the handler listener.


After adding the mixin, an object user will be able to generate an event "login" 
when the visitor logs in. And another object, say, calendar may want to listen 
for such events to load the calendar for the logged-in person.

Or, a menu can generate the event "select" when a menu item is selected, and 
other objects may assign handlers to react on that event. And so on.

Here’s the code:
*/