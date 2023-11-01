# Alternation (OR) |

Alternation is the term in regular expression that is actually a simple "OR".

In a regular expression it is denoted with a vertical line character `pattern:|`.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding regexp: `pattern:html|php|java(script)?`.

A usage example:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

We already saw a similar thing -- square brackets. They allow to choose between multiple characters, for instance `pattern:gr[ae]y` matches `match:gray` or `match:grey`.

Square brackets allow only characters or character classes. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.

To apply alternation to a chosen part of the pattern, we can enclose it in parentheses:
- `pattern:I love HTML|CSS` matches `match:I love HTML` or `match:CSS`.
- `pattern:I love (HTML|CSS)` matches `match:I love HTML` or `match:I love CSS`.

## Example: regexp for time

In previous articles there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 minutes match the pattern, but that time is invalid).

How can we make a better pattern?

We can use more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can be any: `pattern:[01]\d`.
- Otherwise, if the first digit is `2`, then the next must be `pattern:[0-3]`.
- (no other first digit is allowed)

We can write both variants in a regexp using alternation: `pattern:[01]\d|2[0-3]`.

Next, minutes must be from `00` to `59`. In the regular expression language that can be written as `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.

If we glue hours and minutes together, we get the pattern: `pattern:[01]\d|2[0-3]:[0-5]\