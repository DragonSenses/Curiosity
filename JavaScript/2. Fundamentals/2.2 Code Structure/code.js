/* 
Statements are syntax constructs and commands that perform actions.
    - Can have as many statements in our code as we want
    - Can be separated with a semicolon
*/

// Splitting "Hello World" into two alerts, on one line
alert('Hello'); alert('World');

// Usually, statements are written on separate lines to make code more readable
alert('Hello');
alert('World');

/* 
Semicolons may be omitted in most cases when a line break exists 
    - JavaScript interprets the line break as an "implicit" semicolon (called
        automatic semicolon insertion)
    - In most cases, a newline implies a semicolon. 
    - But "in most cases" does not mean "always"!
    - There are situations where JavaScript "fails" to assume a semicolon where
    it is really needed. These Errors that occur which are hard to find and fix.

NOTE: Best practice and widely adopted by community to put semicolons between
statements even if they are separated by newlines.
*/

// This works:
alert('Hello')
alert('World')

// Case when a newline does not mean a semicolon
alert(3 +
    1
    + 2);

// Above code outputs 6 because JS does not insert semicolons, when a line ends
// with a "+", the it is an incomplete expression, so a semicolon would be 
// incorrect. So it works as intended

// Situations where JavaScript fails to assume semicolons
alert("Hello");

[1, 2].forEach(alert);

// Removing the semicolon after the alert 
alert("Hello")

[1, 2].forEach(alert);

// JS does not assume a semicolon before the square brackets [...]. So code in
// last example is treated as a single statement

// Engine sees it like this:
alert("Hello")[1, 2].forEach(alert);

/* 
Comments describes what the code does and why. 
    - Can be put into any place of a script.
    - Does not affect script execution because engine simply ignores them
    - One-line comments start with two forward slash characters "//"
    - Multi-line comments start with a forward slash and an asterisk and end
    with an asterisk and a forward slash 

Note: Nested comments are not supported! There can't be a multi-line comment 
within another one. 
- When parser sees "/*" it ignores everything after it up 
to the next occurrence of "asterisk forward slash". 
- For "//", it ignores everything up until the newline character.
- Pseudo-Nested comment is really just breaking the inner end-comments so that
the parser does not recognize them, by adding a backslash "\" in between the
asterisk "*" and forward slash "/"
*/

// One-line comment

/* Multi-line comment 
   This is an example.
*/

/**
 * Another multi-line comment
 */

/*  
/* pseudo-Nested Comment Workaround*\/
*/

/*
/* pseudo-nested comment 1 *\/
/* pseudo-nested comment 2*\/
/* Helps comment out a block of code that is already commented. 
*/

/* Comments increase the overall code footprint, but that’s not a problem at all. 
There are many tools which minify code before publishing to a production server. 
They remove comments, so they don’t appear in the working scripts. Therefore, 
comments do not have negative effects on production at all. 
*/



