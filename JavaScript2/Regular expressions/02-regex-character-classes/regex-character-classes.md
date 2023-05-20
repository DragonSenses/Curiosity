# Summary | Character classes

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter), is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the `regex-unicode`.

---

# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, let's find the first digit in the phone number:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

---

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:

```js run
alert( "Z".match(/./) ); // Z
```

Or in the middle of a regexp:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

Please note that a dot means "any character", but not the "absence of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```
