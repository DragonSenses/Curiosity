# Multiline mode of anchors ^ $, flag "m"

The multiline mode is enabled by the flag `pattern:m`.

It only affects the behavior of `pattern:^` and `pattern:$`.

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

## Searching at line start ^

In the example below the text has multiple lines. The pattern `pattern:/^\d/gm` takes a digit from the beginning of each line:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Without the flag `pattern:m` only the first digit is matched:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of any line.