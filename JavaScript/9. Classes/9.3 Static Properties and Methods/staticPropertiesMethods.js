/* Static Properties and Methods */
/* Summary 
Static methods are used for the functionality that belongs to the class 
“as a whole”. It doesn’t relate to a concrete class instance.

For example, a method for comparison Article.compare(article1, article2) or a 
factory method Article.createTodays().

They are labeled by the word static in class declaration.

Static properties are used when we’d like to store class-level data, also not 
bound to an instance.

Syntax:

class MyClass {
  static property = ...;

  static method() {
    ...
  }
}

Technically, static declaration is the same as assigning to the class itself:
MyClass.property = ...
MyClass.method = ...

Static properties and methods are inherited.

For class B extends A the prototype of the class B itself points to 
A: B.[[Prototype]] = A. So if a field is not found in B, the search continues in A.
*/