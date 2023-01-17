/* Promises Chaining */
/* Summary 
If a .then (or catch/finally, doesn’t matter) handler returns a promise, the 
rest of the chain waits until it settles. When it does, its result (or error) 
is passed further.

the call of .then(handler) always returns a promise:
[state: "pending"]
[result: undefined]

if handler ends with...

1. return value
[state: "fulfilled"]
[result: value]

2. throw error
that promise settles with:
[state: "rejected"]
[result: error]

3. return promise
...with the result of the new promise...
*/