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

/* We can also assign a method to the class as a whole. Such methods are called static.

In a class declaration, they are prepended by static keyword, like this: */
{
  class User {
    static staticMethod() {
      console.log(this === User);
    }
  }
  
  User.staticMethod(); // true
}

/* That actually does the same as assigning it as a property directly: */
{
  class User { }

User.staticMethod = function() {
  console.log(this === User);
};

User.staticMethod(); // true
}


/* The value of this in User.staticMethod() call is the class constructor User 
itself (the “object before dot” rule).

Usually, static methods are used to implement functions that belong to the 
class as a whole, but not to any particular object of it.

For instance, we have Article objects and need a function to compare them.

A natural solution would be to add Article.compare static method: */
{
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static compare(articleA, articleB) {
      return articleA.date - articleB.date;
    }
  }
  
  // usage
  let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
  ];
  
  articles.sort(Article.compare);
  
  console.log( articles[0].title ); // CSS
}

/* Here Article.compare method stands “above” articles, as a means to compare them. 
It’s not a method of an article, but rather of the whole class.

Another example would be a so-called “factory” method. */