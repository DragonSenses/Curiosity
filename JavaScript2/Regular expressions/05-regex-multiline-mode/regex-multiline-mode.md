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

console.log( str.match(/^\d/gm) ); // 1, 2, 3
```

Without the flag `pattern:m` only the first digit is matched:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

console.log( str.match(/^\d/g) ); // 1

```

That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of any line.

---

### ***Please note:***

"Start of a line" formally means "immediately after a line break": the test  `pattern:^` in multiline mode matches at all positions preceded by a newline character `\n`.

And at the text start.

---

## Searching at line end $

The dollar sign `pattern:$` behaves similarly.

The regular expression `pattern:\d$` finds the last digit in every line

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
```

Without the flag `pattern:m`, the dollar `pattern:$` would only match the end of the whole text, so only the very last digit would be found.

---

### ***Please note:***
"End of a line" formally means "immediately before a line break": the test  `pattern:$` in multiline mode matches at all positions succeeded by a newline character `\n`.

And at the text end.

---

