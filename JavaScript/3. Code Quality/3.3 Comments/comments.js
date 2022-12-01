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