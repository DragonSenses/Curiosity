# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` matches again, as we're between `subject:o` and a comma.

So the pattern `pattern:\bHello\b` would match, but not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `pattern:\w`, so there's no word boundary after it).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```