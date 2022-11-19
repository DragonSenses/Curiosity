/* Nullish Coalescing Operator ?? */
/* Summary 
    - The nullish coalescing operator ?? provides a short way to choose the 
    first defined value from a list.
        - A value is defined when it's neither null nor undefined

    -It's used to assign default values to variables
        e.g., // set height=100, if height is null or undefined
        height = height ?? 100;

    - The operator ?? has a very low precedence, only a bit higher than ? and =
    so consider adding parentheses when using it an expression.
    - It's forbidden to use it with || or && without explicit parentheses
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
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // MangoStick