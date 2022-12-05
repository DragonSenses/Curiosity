/* leftpad */
/* Paying homage to an important piece of code that highlights the 
power of open-source, and how almost all software is built on top
of other software, which also depends on other software. 

Interesting Links: 
https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code
https://www.reddit.com/r/programming/comments/4bjss2/an_11_line_npm_package_called_leftpad_with_only/
https://xkcd.com/2347/
*/
module.exports = leftpad;

/**
 * Add characters to the beginning of a string of text.
 * 
 * @author Azer Koculu
 * @param {String} str the String to pad
 * @param {Number} len the length of the padding
 * @param {String} ch  the character to pad with
 * @returns the string padded, to the left len times, with the character
 */
function leftpad( str, len, ch ) {
    str = String(str);
    var i = -1;
    
    if (!ch && ch !== 0) {
        ch = ' ';
    }

    len = len - str.length;

    while (++i < len) {
        str = ch + str;
    }

    return str;
}
