/* Unicode, String internals */
/* Advanced knowledge */
/* The section goes deeper into string internals. This knowledge will be 
useful for you if you plan to deal with emoji, rare mathematical or 
hieroglyphic characters, or other rare symbols. */

/* As we already know, JavaScript strings are based on Unicode: each character 
is represented by a byte sequence of 1-4 bytes.

JavaScript allows us to insert a character into a string by specifying its 
hexadecimal Unicode code with one of these three notations: 

  \xXX

XX must be two hexadecimal digits with a value between 00 and FF, then \xXX is 
the character whose Unicode code is XX.

Because the \xXX notation supports only two hexadecimal digits, it can be used 
only for the first 256 Unicode characters.

These first 256 characters include the Latin alphabet, most basic syntax 
characters, and some others. For example, "\x7A" is the same as "z" (Unicode U+007A).
*/
alert( "\x7A" ); // z
alert( "\xA9" ); // ©, the copyright symbol


/* 
  \uXXXX XXXX  must be exactly 4 hex digits with the value between 0000 and FFFF, 
then \uXXXX is the character whose Unicode code is XXXX. 

Characters with Unicode values greater than U+FFFF can also be represented 
with this notation, but in this case, we will need to use a so called surrogate pairs 
*/
alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
alert( "\u044F" ); // я, the Cyrillic alphabet letter
alert( "\u2191" ); // ↑, the arrow up symbol

/* 
  \u{X…XXXXXX} 
  
X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the 
highest code point defined by Unicode). This notation allows us to easily 
represent all existing Unicode characters. */
alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)


/* Surrogate pairs */