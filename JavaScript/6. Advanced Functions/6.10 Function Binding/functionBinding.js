/* Function Binding */
/* Summary
Method func.bind(context, ...args) returns a “bound variant” of function func 
that fixes the context this and first arguments if given.

Usually we apply bind to fix this for an object method, so that we can pass it 
somewhere. For example, to setTimeout.

When we fix some arguments of an existing function, the resulting (less 
universal) function is called partially applied or partial.

Partials are convenient when we don’t want to repeat the same argument over 
and over again. Like if we have a send(from, to) function, and from should 
always be the same for our task, we can get a partial and go on with it.
*/