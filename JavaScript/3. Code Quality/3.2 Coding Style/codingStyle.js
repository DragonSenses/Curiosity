/* Coding Style
The art of programming is to take a complex task and code it in a way that is 
both correct and human-readable. A good code style greatly assists in that.

Rules on Syntax aim to increase the readability of your code. They are subject
to dispute. The main things to ask are:
    - "What makes code more redable and easier to understand"
    - "What can help us avoid errors?"

Popular style guides allow you to keep up to date with latest ideas about code 
style trends and best practices.
*/

/* Syntax Suggestions
- No space between function name and parentheses, 
between parentheses and the parameter
- A space between parameters
- Curly brace { on the same line, after a space
- Indentation 2 spaces
- A space after for/if/while...
- Spaces around operators
- A semicolon ; is mandatory
- A space between arguments
- An empty line between logical blocks
- else { without a line break
- Spaces around a nested call
- Lines are not very long
*/

/* Curly Braces 
"Egyptian" style with opening brace on the same line as the corresponding 
    keyword - not on a new line. Also a space before the opening bracket.

For a single-line construct, such as if (condition) doSomething()
    - Tip if putting it on one line & its short, omit the curly braces
    - Otherwise, follow Egyptian style.
*/
if (condition) {
    // do this
    // ...and that
    // ...and that
}

// Tip, this maybe the least readable:
if (n < 0) {alert(`Power ${n} is not supported`);}

// This makes it easy to make an error when adding new lines:
if (n < 0)
  alert(`Power ${n} is not supported`);

// Acceptable
if (n < 0) alert(`Power ${n} is not supported`);

// Guaranteed Clean
if (n < 0) {
    alert(`Power ${n} is not supported`);
}

/* Line Length */
/* Best practice to split a long horizontal line of code. 
- Maximum line length should be agreed upon at the team-level. 
    It's usually 80 or 120 characters.
*/

// backtick quotes ` allow to split the string into multiple lines
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;

// Splitting if statements
if (
    id === 123 &&
    moonPhase === 'Waning Gibbous' &&
    zodiacSign === 'Libra'
  ) {
    letTheSorceryBegin();
}

/* Indents */
/* 2 Types of Indents:
1. Horizontal indents: 2 or 4 spaces.
    A horizontal indentation is made using either 2 or 4 spaces or the 
    horizontal tab symbol (key Tab). Which one to choose is an old holy war. 
    Spaces are more common nowadays.

One advantage of spaces over tabs is that spaces allow more flexible 
configurations of indents than the tab symbol.

2. Vertical indents: empty lines for splitting code into logical blocks.
    Even a single function can often be divided into logical blocks. 

    Insert an extra newline where it helps to make the code more readable. 
    There should not be more than nine lines of code without a vertical indentation.

In the example below, the initialization of variables, the main loop and 
returning the result are split vertically:
*/

function pow(x, n) {
    let result = 1;
    //              <--
    for (let i = 0; i < n; i++) {
      result *= x;
    }
    //              <--
    return result;
}

/* Semicolons */
/* A semicolon should be present after each statement, even if it 
could possibly be skipped. */

/* Nesting Levels */
/* Try to avoid nesting code too many levels deep.

e.g., in the loop, it’s sometimes a good idea to use the continue directive 
    to avoid extra nesting.

e.g., instead of adding a nested if conditional like this:
*/
for (let i = 0; i < 10; i++) {
    if (cond) {
       // ... <- one more nesting level
    }
}

// Instead, we can write:
for (let i = 0; i < 10; i++) {
    if (!cond) continue;
      // ... <- no extra nesting level
}

/* A similar thing can be done with if/else and return 
    e.g., Two Constructs below are identical:
*/

function pow(x, n) {    // Option 1
    if (n < 0) {
      alert("Negative 'n' not supported");
    } else {
      let result = 1;
  
      for (let i = 0; i < n; i++) {
        result *= x;
      }
  
      return result;
    }
}

function pow(x, n) {    // Option 2
    if (n < 0) {
      alert("Negative 'n' not supported");
      return;
    }
  
    let result = 1;
  
    for (let i = 0; i < n; i++) {
      result *= x;
    }
  
    return result;
}

// Second one is more redable because the "special case" of n < 0 is handled
// very early on. Once the check is done we can move on to the "main" code
// flow without the need for additional nesting