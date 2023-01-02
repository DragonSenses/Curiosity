/* Decorators and forwarding, call/apply */
/* Summary
Decorator is a wrapper around a function that alters its behavior. 
    The main job is still carried out by the function.

Decorators can be seen as “features” or “aspects” that can be added to a function. 
We can add one or add many. And all this without changing its code!

To implement cachingDecorator, we studied methods:
 - func.call(context, arg1, arg2…) – calls func with given context and arguments.
 - func.apply(context, args) – calls func passing context as this and array-like 
                               args into a list of arguments.

The generic call forwarding is usually done with apply:

let wrapper = function() {
  return original.apply(this, arguments);
};

Method Borrowing takes a method from an object and call it in the context of 
another object. It is quite common to take array methods and apply them to
arguments. The alternative is to use rest parameters object that is a real array.
*/

/* JavaScript gives exceptional flexibility when dealing with functions. 
They can be passed around, used as objects, and now we’ll see how to forward 
calls between them and decorate them. */

