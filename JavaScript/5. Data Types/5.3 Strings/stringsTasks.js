/* Uppercase the first character */
/* Write a function ucFirst(str) that returns the string str with the 
uppercased first character, for instance:
*/
ucFirst("john") == "John";

function ucFirst(){
    // TO DO
}

/* Check for Spam */
/* Write a function checkSpam(str) that returns true if str contains 
‘viagra’ or ‘XXX’, otherwise false. The function must be case-insensitive: */
checkSpam('buy ViAgRA now') == true;
checkSpam('free xxxxx') == true;
checkSpam("innocent rabbit") == false;

function checkSpam(){
    // TO DO
}

/* Truncate the Text */
/* Create a function truncate(str, maxlength) that checks the length of 
the str and, if it exceeds maxlength – replaces the end of str with the 
ellipsis character "…", to make its length equal to maxlength.

The result of the function should be the truncated (if needed) string.

For instance: */
truncate("What I'd like to tell on this topic is:", 20); // "What I'd like to te…";

truncate("Hi everyone!", 20); // "Hi everyone!";

function truncate(str, maxlength){
    // TO DO
    return str + maxlength;
}


/* Extract the Money */
/* We have a cost in the form "$120". 
That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value
from such string and return it.

The example: */

console.log( extractCurrencyValue('$120') === 120 ); // true

function extractCurrencyValue(){

}