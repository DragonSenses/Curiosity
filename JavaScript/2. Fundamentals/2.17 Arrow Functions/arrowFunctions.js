/* Arrow Functions, the Basics
Summary
Arrow functions are handy for simple actions, especially for one-liners. 

They come in two flavors:
1. Without curly braces: (...args) => expression 
    – the right side is an expression: the function evaluates it and returns the result. 
    - Parentheses can be omitted, if there’s only a single argument
    - e.g. n => n*2.

2. With curly braces: (...args) => { body } 
    – brackets allow us to write multiple statements inside the function, 
    but we need an explicit return to return something.
*/