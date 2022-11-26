/* A recap of JavaScript's subtle features */

/* Code Structure */

// Statements are delimited with a semicolon
alert('Hello'); alert('World');

// Usually, a line-break is also treated as a delmiter
alert('Hello')
alert('World')

// That’s called "automatic semicolon insertion". 
// Sometimes it doesn’t work, for instance:
alert("There will be an error after this message")

[1, 2].forEach(alert)

// Most codestyle guides agree to put a semicolon after each statement

// Semicolons are not required after code blocks {...} and syntax constructs 
// with them like loops. Putting an extra semicolon is not an error, it will be ignored.
function f() {
    // no semicolon needed after function declaration
}

for (; ;) {
    // no semicolon needed after the loop
}

/* Strict Mode 
Start scripts with "use strict" to enable all features of modern JavaScript.
Directive must be at top of script or beginning of a function body. 
*/

/* Variables can be declared using 
    - let
    - const (constant, can't be changed) 
    - var (old-style)

Variable Names can include
- Letters and digits, but the first character may not be a digit.
- Characters $ and _ are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.
*/