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