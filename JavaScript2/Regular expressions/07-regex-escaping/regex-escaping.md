# Summary | Escaping, special characters

- To search for special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with a backslash `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string to `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.

---

# Escaping, special characters

As we've seen, a backslash `pattern:\` is used to denote character classes, e.g. `pattern:\d`. So it's a special character in regexps (just like in regular strings).

There are other special characters as well, that have special meaning in a regexp, such as `pattern:[ ] { } ( ) \ ^ $ . | ? * +`. They are used to do more powerful searches.

Don't try to remember the list -- soon we'll deal with each of them, and you'll know them by heart automatically.

## Escaping

Let's say we want to find literally a dot. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

