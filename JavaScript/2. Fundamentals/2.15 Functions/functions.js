/* Functions in JavaScript
Summary
Function Declaration:
    function name(parameters, delimited, by, comma){
        ... code body
    }
    
    - Values passed to a function as parameters are copied to its local variables.
    -  A function may access outer variables. But it works only from inside out. 
    The code outside of the function doesn’t see its local variables.
    - A function can return a value. If it doesn’t, then its result is undefined. 

Readability
    - Mainly use localy variables and parameters in the function, not outer variables
    - Easier to understand a function with parameters, works with them and 
    returns a result than a function which gets no parameters, but modifies outer
    variables as a side effect
Function Naming
    - Self-Describing, name should clearly describe what the function does and returns
    - Functions are actions, so function names are usually Verbal
    - Many well-known function prefixes like create, show, get, check... 
*/