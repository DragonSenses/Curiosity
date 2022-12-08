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