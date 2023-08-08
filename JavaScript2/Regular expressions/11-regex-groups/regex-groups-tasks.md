# Check MAC-address

[MAC-address](https://en.wikipedia.org/wiki/MAC_address) of a network interface consists of 6 two-digit hex numbers separated by a colon.

For instance: `subject:'01:32:54:67:89:AB'`.

Write a regexp that checks whether a string is MAC-address.

Usage:
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ at the end)
```

## Answer:

A two-digit hex number is `pattern:[0-9a-f]{2}` (assuming the flag `pattern:i` is set).

We need that number `NN`, and then `:NN` repeated 5 times (more numbers);

The regexp is: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let's show that the match should capture all the text: start at the beginning and end at the end. That's done by wrapping the pattern in `pattern:^...$`.

Finally:

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
```

---

# Find color in the format #abc or #abcdef

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:
```js
let regexp = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

P.S. This should be exactly 3 or 6 hex digits. Values with 4 digits, s

## Answer:

A regexp to search 3-digit color `#abc`: `pattern:/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don't need more or less. The color has either 3 or 6 digits.

Let's use the quantifier `pattern:{1,2}` for that: we'll have `pattern:/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `pattern:[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `pattern:{1,2}`.

In action:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

---

# Find all numbers

Write a regexp that looks for all decimal numbers including integer ones, with the floating point and negative ones.

An example of use:

```js
let regexp = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) ); // -1.5, 0, 2, -123.4
```

A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.

Let's add the optional `pattern:-` in the beginning:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```

---

