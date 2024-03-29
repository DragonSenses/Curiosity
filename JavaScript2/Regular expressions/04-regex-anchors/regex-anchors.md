# Anchors: string start ^ and end $

The caret `^` and dollar `$` characters have special meaning in a regexp. They are called "anchors".

The caret `^` matches at the beginning of the text, and the dollar `$` -- at the end.

For instance, let's test if the text starts with `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

The pattern `^Mary` means: "string start and then Mary".

Similar to this, we can test if the string ends with `snow` using `snow$`:

```js run
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Testing for a full match

Both anchors together `^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that's `\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

Here the match for `\d\d:\d\d` must start exactly after the beginning of the text `^`, and the end `$` must immediately follow.

The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `m` is present. We'll see that in the next article.

---

### Anchors have \"zero width\"
Anchors `^` and `$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).

```