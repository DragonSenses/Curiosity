# Summary | Capturing Groups

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with  `(?<name>...)`.

The content, matched by a group, can be obtained in the results:

- The method `str.match` returns capturing groups only without flag `pattern:g`.
- The method `str.matchAll` always returns capturing groups.

If the parentheses have no name, then their contents is available in the match array by its number. Named parentheses are also available in the property `groups`.

We can also use parentheses contents in the replacement string in `str.replace`: by the number `$n` or the name `$<name>`.

A group may be excluded from numbering by adding `pattern:?:` in its start. That's used when we need to apply a quantifier to the whole group, but don't want it as a separate item in the results array. We also can't reference such parentheses in the replacement string.

# Capturing groups

A part of a pattern can be enclosed in parentheses `pattern:(...)`. This is called a "capturing group".

That has two effects:

1. It allows to get a part of the match as a separate item in the result array.
2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole.

## Examples

Let's see how parentheses work in examples.

### Example: gogogo

Without parentheses, the pattern `pattern:go+` means `subject:g` character, followed by `subject:o` repeated one or more times. For instance, `match:goooo` or `match:gooooooooo`.

Parentheses group characters together, so `pattern:(go)+` means `match:go`, `match:gogo`, `match:gogogo` and so on.

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

### Example: domain

Let's make something more complex -- a regular expression to search for a website domain.

For example:

```
mail.com
users.mail.com
smith.users.mail.com
```

As we can see, a domain consists of repeated words, a dot after each one except the last one.

In regular expressions that's `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

The search works, but the pattern can't match a domain with a hyphen, e.g. `my-site.com`, because the hyphen does not belong to class `pattern:\w`.

We can fix it by replacing `pattern:\w` with `pattern:[\w-]` in every word except the last one: `pattern:([\w-]+\.)+\w+`.

### Example: email

The previous example can be extended. We can create a regular expression for emails based on it.

The email format is: `name@domain`. Any word can be the name, hyphens and dots are allowed. In regular expressions that's `pattern:[-.\w]+`.

The pattern:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

That regexp is not perfect, but mostly works and helps to fix accidental mistypes. The only truly reliable check for an email can only be done by sending a letter.

## Parentheses contents in the match

Parentheses are numbered from left to right. The search engine memorizes the content matched by each of them and allows to get it in the result.

The method `str.match(regexp)`, if `regexp` has no flag `g`, looks for the first match and returns it as an array:

