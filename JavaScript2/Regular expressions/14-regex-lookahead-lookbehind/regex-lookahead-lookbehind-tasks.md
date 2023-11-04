# Find non-negative integers

There's a string of integer numbers.

Create a regexp that looks for only non-negative ones (zero is allowed).

An example of use:
```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123
```

## Answer - Find non-negative intergers

The regexp for an integer number is `pattern:\d+`.

We can exclude negatives by prepending it with the negative lookbehind: `pattern:(?<!-)\d+`.

Although, if we try it now, we may notice one more "extra" result:

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

As you can see, it matches `match:8`, from `subject:-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another (non-matching) number.

We can do it by specifying another negative lookbehind: `pattern:(?<!-)(?<!\d)\d+`. Now `pattern:(?<!\d)` ensures that a match does not start after another digit, just what we need.

We can also join them into a single lookbehind here:

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123
```

---

# Insert After Head

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

After that the value of `str` should be:

```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```

## Answer - Insert After Head