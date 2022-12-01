/* Comments 
Summary
 An important sign of a good developer is comments: their presence and even their absence.

Good comments allow us to maintain the code well, come back to it after a delay
 and use it more effectively.

Comment this:
    * Overall architecture, high-level view.
    * Function usage.
    * Important solutions, especially when not immediately obvious.
    * URLs to wherever you found a solution to a coding problem online
       - Whether its from Stackoverflow, Codepen, etc.
    
Avoid comments:
    * That tell "how code works" and "what it does", if the code is simple
    * For more larger and complex codebases, well documented code helps
         others comprehend the solutions without digging deeper. 
    * Put them in only if it’s impossible to make the code so simple 
      and self-descriptive that it doesn't require them.

Comments are also used for auto-documenting tools like JSDoc3: they read them 
and generate HTML-docs (or docs in another format).

Try factoring out functions or creating functions that are self-descriptive. 

    In reality, we can’t totally avoid "explanatory" comments. There are complex algorithms. 
And there are smart "tweaks" for purposes of optimization. But generally we 
should try to keep the code simple and self-descriptive.

These are great tips to follow when first starting out, but others may suggest
to comment liberally. With practice & experience one will find how to write
more valuable comments. Too little documentation is worse than too much.
*/

/* "Explanatory" comments should be minimal, i.e. comments that explain what code
is doing. 

Tip: If the code is so unclear that it requires a comment, then maybe it 
should be rewritten instead. */

/* Recipe: factor out functions
    Sometimes beneficial to replace a code piece with a function:
*/
function showPrimes(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {

        // check if i is a prime number
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        alert(i);
    }
}

// Better Variant:
function showPrimes(n) {

    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i);
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }

    return true;
}

// Function isPrime() is self-descriptive and itself becomes the comment

/* Recipe: Create Functions 
    When code structure is split, it's clear what every function does, what it
takes and what it returns. 

If we have a long "code sheet", refactor it into functions. 
*/
// here we add whiskey
for (let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    smell(drop);
    add(drop, glass);
}

// here we add juice
for (let t = 0; t < 3; t++) {
    let tomato = getTomato();
    examine(tomato);
    let juice = press(tomato);
    add(juice, glass);
}

// Refactor it into functions, Better Variant:
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}

/* Good Comments */
/* Describe the Architecture
    Provide a high-level overview of components, how they interact, what's the 
control flow in various situations. In short – the bird’s eye view of the code.
    There's a special language UML to build high-level architecture diagrams 
explaining the code.
 */

/* Document function parameters and usage
Special Syntax: JSDoc to document a function: usage, parameters, returned value
For instance:
*/

/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
 function pow(x, n) {
    // ...
}

/* Function documentation allows us to understand the purpose of the function
and use it right away without peering into its code. 

Tools like JSDoc 3 can generate HTML-documentation from the comments. Read
more information about JSDoc at https://jsdoc.app 
*/

/* Another Good Comment shows "Why is the task solved this way?" 
    What's written is important. But what’s not written may be even more 
important to understand what's going on. Why is the task solved exactly this way? 
The code gives no answer.

If there are many ways to solve the task, why this one? 
    Especially when it's not the most obvious one.

    * Without such comments, one may have the urge to rewrite code written some 
time ago. 
    * In the process of rewriting using the "more obvious & correct" variant,
one realizes that the solution is lacking. 
    * One may even dimly remember why the old solution was the correct variant, 
    but the time was wasted. 

Comments that explain the solution are very important. 
    They help to continue development the right way.
*/

/* Comment any subtle features, or where they are used. 
    If the code has anything subtle and counter-intuitive, 
it's definitely worth commenting.
*/