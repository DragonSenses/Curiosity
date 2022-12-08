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

console.log(guestList); // a list of guests, multiple lines

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

/* Special Characters */
/* It is still possible to create multiline strings with single and double quotes 
by using a so-called “newline character”, written as \n, which denotes a line break: 
*/
guestList = "Guests:\n * Frey\n * Aria\n * Isolet";

console.log(guestList); // a multiline list of guests

// These two lines are equal, just written differently:
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

console.log(str1 == str2); // true

/* List of special characters:
\n	New line

\r	In Windows text files a combination of two characters \r\n represents a new break, 
while on non-Windows OS it’s just \n. That’s for historical reasons, 
most Windows software also understands \n.

\', \", \`	Quotes

\\	Backslash

\t	Tab

\b, \f, \v	Backspace, Form Feed, Vertical Tab – mentioned for completeness, 
    coming from old times, not used nowadays (you can forget them right now).


As you can see, all special characters start with a backslash character \. 
It is also called an “escape character”.

Because it’s so special, if we need to show an actual backslash \ within 
the string, we need to double it:
*/
console.log( `The backslash: \\` ); // The backslash: \

/* So-called “escaped” quotes \', \", \` are used to insert a quote into 
the same-quoted string. e.g: */
alert( 'I\'m the Walrus!' ); // I'm the Walrus!

// Preprended the inner quote by the backslash \', because otherwise it would
// indicate the string end.

/* Only the quotes that are the same as the enclosing ones need to be escaped.
So, as a more elegant solution, we could switch to double quotes or backticks
instead: */
alert( "I'm the Walrus!" ); // I'm the Walrus!

/* Besides special characters, there's also a special notation for 
Unicode codes \u...., it’s rarely used and is covered later in Unicode section. */

/* String Length */
/* The length property has the string length: */

console.log( `My\n`.length ); // 3
// Note that \n is a single “special” character, so the length is indeed 3.

/* Length is a property. People with a background in some other languages
sometimes mistype by calling str.length() instead of just str.length. 

str.length is a numeric property, not a function. 
No need to add parentheses after it. Not .length(), but .length */

/* Accessing Characters */
/* To get a  character at position pos, use square brackets [pos] or call the 
method str.at(pos). The first character starts from the zero position: */
let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.at(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );

/* As you can see, the .at(pos) method has a benefit of allowing negative position. 
If pos is negative, then it’s counted from the end of the string. 

So .at(-1) means the last character, and .at(-2) is the one before it, etc.

The square brackets always return undefined for negative indexes, for instance: */
// let str = `Hello`;
alert( str[-2] ); // undefined
alert( str.at(-2) ); // l

/* We can also iterate over characters using for..of: */
for (let char of "Hello") {
    alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}

/* Strings are Immutable */
/* Strings can't be changed in JavaScript, it is impossible to change a character */
str = 'Hi';

str[0] = 'h';    // error
alert( str[0] ); // doesn't work  

/* The usual workaround is to create a whole new string and assign it to str 
instead of the old one. For instance: */
str = 'Hi';

str = 'h' + str[1]; // replace the string

alert( str ); // hi


/* Changing the case */
/* Methods toLowerCase() and toUpperCase() change the case: */
console.log( 'Interface'.toUpperCase() ); // INTERFACE
console.log( 'Interface'.toLowerCase() ); // interface

// Or, if we want a single character lowercased:
console.log( 'Interface'[0].toLowerCase() ); // 'i'

/* Searching for a substring */
/* Multiple wayts to look for a substring within a string. 

str.indexOf(substr,pos) - looks for substr in str, starting from the given 
position pos, and returns the position where the match was found or -1 if 
nothing can be found. 
e.g: */
str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive
alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)

/* The optional second parameter allows us to start searching from a given position.
For instance, the first occurrence of "id" is at position 1. 
To look for the next occurrence, let’s start the search from position 2:
*/
str = 'Widget with id';

alert( str.indexOf('id', 2) ); // 12

/* To find all occurrences, we can run indexOf in a loop. Every new call is made
the position after the previous match: */
str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
// eslint-disable-next-line no-constant-condition
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}

/* Same algorithm as above, but shorter: */
str = "As sly as a fox, as strong as an ox";
target = "as";

pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  console.log( pos );
} 
// 7, 17, 27

/* str.lastIndexOf(substr, position) searches from the end of a string to its
beginning. Lists the occurrences in the reverses order. 

Recall: that if no further matches can be found, or if nothing can be found,
returns -1. So this should be the escape condition. */

pos = str.len; 
while ((pos = str.lastIndexOf(target, pos - 1)) != -1) {
  console.log(pos);
}
// 27, 17, 7

/* Using indexOf in the if test, must check when it returns -1,
can't put it in the if condition as is: */

str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work!
}

/*
The alert in the example above doesn’t show because str.indexOf("Widget") 
returns 0 (meaning that it found the match at the starting position). 
Right, but if considers 0 to be false.

So, we should actually check for -1, like this:
*/
str = "Widget with id";

if (str.indexOf("Widget") != -1) {
    alert("We found it"); // works now!
}

/* includes(), startsWith(), endsWith() */
/* Use includes() when we want to test for the match, but don't need its position.
  str.includes(substr,pos) 
Returns true/false depending on whether str contains substr within */
alert( "Widget with id".includes("Widget") ); // true
alert( "Hello".includes("Bye") ); // false

/* Optional second argument of str.includes is the position to start searching from: */
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"

/* startsWith() and endsWith() does exactly what they say: */
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"

/* Getting a Substring */
/* In JavaScript, there are 3 methods to get a substring: substring, substr, & slice */
/*      str.slice(start [, end]) 
Returns the part of the string from start to (but not including) end. */
str = "stringify";
alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0

/* If there is no second argument, then slice goes till the end of the string: */
alert( str.slice(2) ); // 'ringify', from the 2nd position till the end

/* Negative values for start/end are also possible. They mean the position is 
counted from the string end: */
// start at the 4th position from the right, end at the 1st from the right
alert( str.slice(-4, -1) ); // 'gif'


/* str.substring(start [, end]) 
Returns the part of the string between start and end (not including end).
- Negative arguments are (unlike slice) not supported, they are treated as 0.
- This is almost the same as slice, but it allows start to be greater than end
  (in this case it simply swaps start and end values).
*/
str = "stringify";

// these are same for substring
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// ...but not for slice:
alert( str.slice(2, 6) ); // "ring" (the same)
alert( str.slice(6, 2) ); // "" (an empty string)

/* str.substr(start [, length]) 
Returns the part of the string from start, with the given length.

In contrast with the previous methods, this one allows us to specify the length
 instead of the ending position:
*/
str = "stringify";
alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters

/* The first argument may be negative, to count from the end: */
alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters

/* This method resides in the Annex B of the language specification. It means that 
only browser-hosted Javascript engines should support it, and it’s not recommended 
to use it. In practice, it’s supported everywhere. */

