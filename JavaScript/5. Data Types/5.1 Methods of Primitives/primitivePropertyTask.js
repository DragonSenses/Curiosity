/* Can I add a String property? 
    
Will it work? What will be shown? 

Consider the following code:
*/
let str = "Hello";

str.test = 5;

alert(str.test);

/* Answer: No 
Depending on whether you have use strict or not, the result may be:
    1. undefined    (no strict mode)
    2. An error     (strict mode)

Replay what's happening at the line "str.test = 5":
  1. When a property of str is accessed, a “wrapper object” is created.
  2. In strict mode, writing into it is an error.
  3. Otherwise, the operation with the property is carried on, the object 
  gets the test property, but after that the “wrapper object” disappears, 
  so in the last line str has no trace of the property.

This example clearly shows that primitives are not objects.
    Primitives can't store additional data.
*/