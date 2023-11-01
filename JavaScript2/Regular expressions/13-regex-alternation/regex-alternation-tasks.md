# Find programming languages

There are many programming languages, for instance Java, JavaScript, PHP, C, C++.

Create a regexp that finds them in the string `subject:Java JavaScript PHP C++ C`:

```js
let regexp = /your regexp/g;

console.log("Java JavaScript PHP C++ C".match(regexp)); // Java JavaScript PHP C++ C
```

## Find programming languages - Answer

The first idea can be to list the languages with `|` in-between.

But that doesn't work right:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

console.log( str.match(regexp) ); // Java,Java,PHP,C,C
```

The regular expression engine looks for alternations one-by-one. That is: first it checks if we have  `match:Java`, otherwise -- looks for `match:JavaScript` and so on.

As a result, `match:JavaScript` can never be found, just because `match:Java` is checked first.

The same with `match:C` and `match:C++`.

There are two solutions for that problem:

1. Change the order to check the longer match first: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Merge variants with the same start: `pattern:Java(Script)?|C(\+\+)?|PHP`.

In action:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

console.log( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```

---

# Find bbtag pairs

A "bb-tag" looks like `[tag]...[/tag]`, where `tag` is one of: `b`, `url` or `quote`.

For instance:
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags can be nested. But a tag can't be nested into itself, for instance:

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Can't happen:
[b][b]text[/b][/b]
```

Tags can contain line breaks, that's normal:

```
[quote]
  [b]text[/b]
[/quote]
```

Create a regexp to find all BB-tags with their contents.

For instance:

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
console.log( str.match(regexp) ); // [url]http://google.com[/url]
```

If tags are nested, then we need the outer tag (if we want we can continue the search in its content):

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
console.log( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```

## Find bbtag paris - Answer

Opening tag is `pattern:\[(b|url|quote)]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.

In action:

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

console.log( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.

---

# Find quoted strings

Create a regexp to find strings in double quotes `subject:"..."`.

The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.

```js
let str = "Just like \"here\".";
```

Please note, in particular, that an escaped quote `subject:\"` does not end a string.

So we should search from one quote to the other ignoring escaped quotes on the way.

That's the essential part of the task, otherwise it would be trivial.

Examples of strings to match:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
console.log(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```

## Find quoted strings - Answer

---

# Find the full tag

Write a regexp to find the tag `<style...>`. It should match the full tag: it may have no attributes  `<style>` or have several of them `<style type="..." id="...">`.

...But the regexp should not match `<styler>`!

For instance:

```js
let regexp = /your regexp/g;

console.log( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```

## Find the full tag - Answer


