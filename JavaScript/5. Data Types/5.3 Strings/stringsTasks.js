/* Uppercase the first character */
/* Write a function ucFirst(str) that returns the string str with the 
uppercased first character, for instance:
*/
ucFirst("john") == "John";

/* Answer: Note that strings are immutable, so we can't "replace" the first
character, but we can make a new string based on the existing one with the
uppercased first character:

    str[0].toUpperCase() + str.slice(1);

Problem: If str is empty, then str[0] is undefined, and as undefined doesn't
have the toUpperCase() method we'll get an error. 
    So we have to test for an empty string, like this:
*/

function ucFirst(str){
    // validate argument as string
    if(!str) return str;    // empty string evaluates to 0, or false

    // uppercase first letter, then concatenate with the remaining substring
    return str[0].toUpperCase() + str.slice(1);
}

console.log(ucFirst("luna")); // returns Luna


/* Check for Spam */
/* Write a function checkSpam(str) that returns true if str contains 
‘viagra’ or ‘XXX’, otherwise false. The function must be case-insensitive: */
checkSpam('buy ViAgRA now') == true;
checkSpam('free xxxxx') == true;
checkSpam("innocent rabbit") == false;

function checkSpam(str){
    // validate argument as string
    if(!str) return false;

    // Case-insensitive so normalize the string to lowercase or uppercase
    let lowerStr = str.toLowerCase();
    
    // Check for a match {'viagra' or 'XXX'} -> use includes()
    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

/* Truncate the Text */
/* Create a function truncate(str, maxlength) that checks the length of 
the str and, if it exceeds maxlength – replaces the end of str with the 
ellipsis character "…", to make its length equal to maxlength.

The result of the function should be the truncated (if needed) string.

For instance: */
truncate("What I'd like to tell on this topic is:", 20); // "What I'd like to te…";

truncate("Hi everyone!", 20); // "Hi everyone!";

/* Answer: Replace the last character of str with ellipsis character when str.length
exceeds maxlength. Otherwise return the string itself. 

To replace the string's last character with ellipsis, we slice up to maxlength -1 
to give space for the ellipsis:      str.slice(0, maxlength - 1) + '…'
*/

function truncate(str, maxlength){
    // Extract length & Compare with maxlength 
    // If it exceeds maxlength, then replace last char with '\u2026' or '…'
    return (str.length > maxlength) ? 
        str.slice(0, maxlength - 1) + '\u2026' : str;
}


/* Extract the Money */
/* We have a cost in the form "$120". 
That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value
from such string and return it.

The example: */

console.log( extractCurrencyValue('$120') === 120 ); // true

/* Answer: Assuming all input strings are valid, i.e. are in the form of 
(Symbol)Number, and that the symbol only takes up one space, then we can
just slice the string from the first position. 

Edge cases that this does not check for are NaN and (+/-)Infinity.

Then once we have the string number, we convert to Number data type through
unary operator + */
function extractCurrencyValue(str){
    return +str.slice(1);
}