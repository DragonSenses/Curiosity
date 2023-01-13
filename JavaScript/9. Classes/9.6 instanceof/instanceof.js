/* Class checking: "instanceof" */
/* Summary
Let's summarize the type-checking methods that we know:

              works for                         returns
------------------------------------------------------------
typeof       | primitives                       | string
------------------------------------------------------------
{}.toString  | primitives, built-in objects,    | string
             | objects with Symbol.toStringTag  |
------------------------------------------------------------
instanceof   | objects                          | true/false

As we can see, {}.toString is technically a “more advanced” typeof.

And instanceof operator really shines when we are working with a class 
hierarchy and want to check for the class taking into account inheritance.
*/