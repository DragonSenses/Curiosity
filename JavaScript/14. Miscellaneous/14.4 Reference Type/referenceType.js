/* Reference Type */
/* Note: In-Depth language feature  
This article covers an advanced topic, to understand certain edge-cases better.
Read on if you want to know how things work under the hood. */

/* Summary 
Reference Type is an internal type of the language.

Reading a property, such as with dot . in obj.method() returns not exactly 
the property value, but a special “reference type” value that stores both 
the property value and the object it was taken from.

That’s for the subsequent method call () to get the object and set this to it.

For all other operations, the reference type automatically becomes the 
property value (a function in our case).

The whole mechanics is hidden from our eyes. It only matters in subtle 
cases, such as when a method is obtained dynamically from the object, 
using an expression.*/
