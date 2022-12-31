/* The "new Function" syntax */
/* Summary
Syntax:
        let func = new Function ([arg1, arg2, ...argN], functionBody); 
        
For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces


Functions created with new Function, have 
    [[Environment]] referencing the global Lexical Environment, not the outer one. 
    
Hence, they cannot use outer variables. But that’s actually good, because it insures 
us from errors. Passing parameters explicitly is a much better method 
architecturally and causes no problems with minifiers. */