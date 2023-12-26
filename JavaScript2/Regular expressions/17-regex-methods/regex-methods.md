# Methods of RegExp and String

In this article we'll cover various methods that work with regexps in-depth.

## str.match(regexp)

The method `str.match(regexp)` finds matches for `regexp` in the string `str`.

It has 3 modes:

1. If the `regexp` doesn't have flag `pattern:g`, then it returns the first match as an array with capturing groups and properties `index` (position of the match), `input` (input string, equals `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (full match)
    alert( result[1] );     // Script (first capturing group)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 7 (match position)
    alert( result.input );  // I love JavaScript (source string)
    ```

2. If the `regexp` has flag `pattern:g`, then it returns an array of all matches as strings, without capturing groups and other details.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. If there are no matches, no matter if there's flag `pattern:g` or not, `null` is returned.

    That's an important nuance. If there are no matches, we don't get an empty array, but `null`. It's easy to make a mistake forgetting about it, e.g.:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    If we want the result to be an array, we can write like this:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

A recent addition to the language. So old browsers may need polyfills.

The method `str.matchAll(regexp)` is a "newer, improved" variant of `str.match`.

It's used mainly to search for all matches with all groups.

There are 3 differences from `match`:

1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns an empty iterable object instead of `null`.

Usage example:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

If we use `for..of` to loop over `matchAll` matches, then we don't need `Array.from` any more.
