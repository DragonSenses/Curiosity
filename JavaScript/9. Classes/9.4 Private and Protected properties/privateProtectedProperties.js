/* Private and protected properties and methods */
/* Summary 
In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.

It gives the following benefits:
  - Protection for users
      - If a user of a class will change things not intended to be changed from 
      the outside – the consequences are unpredictable.
      
  - Supportable
    - Code constantly undergoes development and improvement.
    - If we strictly delimit the internal interface, then the developer of the 
    class can freely change its internal properties and methods, even without 
    informing the users.
    - If you’re a developer of such class, it’s great to know that private 
    methods can be safely renamed, their parameters can be changed, and even 
    removed, because no external code depends on them.
  - For users, when a new version comes out, it may be a total overhaul 
  internally, but still simple to upgrade if the external interface is the same.
  
  - Hiding complexity
    - It’s always convenient when implementation details are hidden, and a 
    simple, well-documented external interface is available.

To hide an internal interface we use either protected or private properties:
  - Protected fields start with _. That’s a well-known convention, not enforced
  at the language level. Programmers should only access a field starting 
  with _ from its class and classes inheriting from it.

  - Private fields start with #. JavaScript makes sure we can only access those
  from inside the class.

Right now (as of June 18, 2021), private fields are not well-supported among 
browsers, but can be polyfilled.
*/