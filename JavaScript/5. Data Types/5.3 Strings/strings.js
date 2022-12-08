/* Strings */
/* Summary
  - There are 3 types of quotes. Backticks allow a string to span multiple lines
   and embed expressions ${…}.
  - We can use special characters, such as a line break \n.
  - To get a character, use: [] or at method.
  - To get a substring, use: slice or substring.
  - To lowercase/uppercase a string, use: toLowerCase/toUpperCase.
  - To look for a substring, use: indexOf, or includes/startsWith/endsWith 
    for simple checks.
  - To compare strings according to the language, use: localeCompare, 
    otherwise they are compared by character codes.

  There are several other helpful methods in strings:
    - str.trim() – removes (“trims”) spaces from the beginning and end of the string.
    - str.repeat(n) – repeats the string n times.
    - ...and more to be found in the manual.

Strings also have methods for doing search/replace with regular expressions;
covered later in Regular expressions.

Also, as of now it’s important to know that strings are based on Unicode encoding,
and hence there’re issues with comparisons. 
*/

/* In JavaScript, the textual data is stored as strings. There is no separate
type for a single character.

The internal format for strings is always UTF-16, it is not tied to the page encoding. */

/* Quotes */
/* Strings can be enclosed within either single quotes, double quotes or backticks: */
let single = 'single-quoted';
let double = "double-quoted";
let backticks = `backticks`;

console.log(`'${single}'  "${double}"  \`${backticks}\``);

/* Single and double quotes are essentially the same. 
Backticks, however, allow us to embed any expression into the string, 
by wrapping it in ${…}: 
*/

function sum(a, b) {
    return a + b;
  }
  
alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

/* Another advantage of Backticks is that they allow a string to span multiple lines: */
let guestList = `Guests:
 * Frey
 * Serena
 * Kania
 * Irina
 * Ferloche
 * Clana
`;

alert(guestList); // a list of guests, multiple lines

/* Single or Double quotes do not allow the use of multiple lines, there'll be an error:
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";

Single and double quotes come from ancient times of language creation, 
when the need for multiline strings was not taken into account. 
Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a “template function” before the first backtick. 
The syntax is: func`string`. The function func is called automatically, 
receives the string and embedded expressions and can process them. 
This feature is called “tagged templates”, it’s rarely seen, 
but you can read about it in the MDN: Template literals.
*/