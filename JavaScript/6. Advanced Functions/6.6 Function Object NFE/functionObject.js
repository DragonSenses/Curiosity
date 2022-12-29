/* Function object, NFE (Named Function Expression) */
/* Summary
Functions are objects.

Here we covered their properties:
 1. name – the function name. Usually taken from the function definition, 
 but if there’s none, JavaScript tries to guess it from the context (e.g. an assignment).
 2. length – the number of arguments in the function definition. 
 Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), 
and it carries the name, then it is called a Named Function Expression. 
The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript 
libraries make great use of this feature.

They create a “main” function and attach many other “helper” functions to it. 
For instance, the jQuery library creates a function named $. The lodash library 
creates a function _, and then adds _.clone, _.keyBy and other properties to it 
(see the docs when you want to learn more about them). Actually, they do it to 
lessen their pollution of the global space, so that a single library gives only 
one global variable. That reduces the possibility of naming conflicts.

So, a function can do a useful job by itself and also carry a bunch of other 
functionality in properties.
*/