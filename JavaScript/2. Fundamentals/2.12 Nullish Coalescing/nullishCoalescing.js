/* Nullish Coalescing Operator ?? */
/* Summary 
    - The nullish coalescing operator ?? provides a short way to choose the 
    first defined value from a list.
        - A value is defined when it's neither null nor undefined

    -It's used to assign default values to variables
        e.g., // set height=100, if height is null or undefined
        height = height ?? 100;

    - ?? returns the first "defined" value
    - || retunrs the first "truthy" value

    - The operator ?? has a very low precedence, only a bit higher than ? and =
    so consider adding parentheses when using it an expression.

    - It's forbidden to use ?? with || or && without explicit parentheses
*/

/* result of a ?? b is 
    - if a is defined, then a,
    - if a isn't defined, then b.

?? returns the first argument if it's not null/undefined
Otherwise, returns the second argument. 

Nice syntax to get the first "defined" value of the two. 
*/

let result;
result = a ?? b;

// Can be rewritten with other operators as:
result = (a !== null && a !== undefined) ? a : b;


// Common Use case for ?? is to provide a default value
// e.g., user is outputted if value isn't null/undefined, otherwise "Anonymous"
let user;
console.log(user ?? "Anonymous");   // Anonymous (user is undefined)

// Example with user2 assigned a name
let user2 = "Reinhardt";
console.log(user ?? "Anonymous"); // Reinhardt (user is not null/undefined)

/* Showing the first defined value 
Let's say we have a user's data in variables: {firstName, lastName, nickName}.
All of them may be not defined, if the user decided not to fill in the 
corresponding values. We'd like to display the user name using one of these
variables, or show "Anonymous" if all of them are null/undefined.
*/

let firstName = null;
let lastName = null;
let nickName = "MangoStick";

// shows the first defined value:
console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // MangoStick

/* How is it different with the OR Operator? */
// The above code has the same result with OR ||
console.log(firstName || lastName || nickName || "Anonymous"); // MangoStick

/* Difference:
    || returns the first TRUTHY value
    ?? returns the first DEFINED value

    || OR treats {false, 0, "" (empty string), null, undefined} the same - falsy values
        - if any of these is the first argument of ||, then we'll get the second argument
        as a result

    ?? only treats {null, undefined} similarly

In practice, what if a default value can be false, 0, or an empty string?
*/

let height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0

// In || case, height is checked as a falsy value so 100 is returned
// In ?? case, height is checked as null/undefined, it isn't, so height is returned
// In praxis, 0 height is often a valid value and shouldn't be replaced with default

/* Precedence of ?? operator is the same as ||, with a precedence value of 3 */

/* ?? and || is evaluated before {= assignment, ? ternary} but after most other
 operations {+, *} 
 
 May need to add parentheses in expressions. Consider: */
 height = null;
 let width = null;
 
 // important: use parentheses
 let area = (height ?? 100) * (width ?? 50);
 
 console.log(area); // 5000

// Omitting parentheses allows * to execute first over ??
area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
area = height ?? (100 * width) ?? 50;

// We want to set the default values when possible first, before calculating
// Otherwise (100 * width) = (100 * null) = (100 * 0) = 0
// Then (height ?? 0 ?? 50) = (null ?? 0 ?? 50) = 0  (the first defined value)

/* Warning: for safety reasons, JavaScript forbids using ?? together with &&
and || operators, unless the precedence is explicitly specified with parentheses

Added in language specs to help programmers ease into transition from || to ??
*/

// Code below triggers a syntax error
// let x = 1 && 2 ?? 3; // Syntax error

let x = (1 && 2) ?? 3; // Works
console.log(x); // 2