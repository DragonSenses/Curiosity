## Summary | Greedy and lazy quantifiers

Quantifiers have two modes of work:

**Greedy**

By default the regular expression engine tries to repeat the quantified character as many times as possible. For instance, `pattern:\d+` consumes all possible digits. When it becomes impossible to consume more (no more digits or string end), then it continues to match the rest of the pattern. If there's no match then it decreases the number of repetitions (backtracks) and tries again.

**Lazy**

Enabled by the question mark `pattern:?` after the quantifier. The regexp engine tries to match the rest of the pattern before each repetition of the quantified character.

As we've seen, the lazy mode is not a "panacea" from the greedy search. An alternative is a "fine-tuned" greedy search, with exclusions, as in the pattern `pattern:"[^"]+"`.

---

# Greedy and lazy quantifiers

Quantifiers are very simple from the first sight, but in fact they can be tricky.

We should understand how the search works very well if we plan to look for something more complex than `pattern:/\d+/`.

Let's take the following task as an example.

We have a text and need to replace all quotes `"..."` with guillemet marks: `«...»`. They are preferred for typography in many countries.

For instance: `"Hello, world"` should become `«Hello, world»`. There exist other quotes, such as `„Witaj, świecie!”` (Polish) or `「你好，世界」` (Chinese), but for our task let's choose `«...»`.

The first thing to do is to locate quoted strings, and then we can replace them.

A regular expression like `pattern:/".+"/g` (a quote, then something, then the other quote) may seem like a good fit, but it isn't!

Let's try it:

```js run
let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
```

...We can see that it works not as intended!

Instead of finding two matches `match:"witch"` and `match:"broom"`, it finds one: `match:"witch" and her "broom"`.

That can be described as "greediness is the cause of all evil".

## Greedy search

To find a match, the regular expression engine uses the following algorithm:

- For every position in the string
    - Try to match the pattern at that position.
    - If there's no match, go to the next position.

These common words do not make it obvious why the regexp fails, so let's elaborate how the search works for the pattern `pattern:".+"`.

1. The first pattern character is a quote `pattern:"`.

    The regular expression engine tries to find it at the zero position of the source string `subject:a "witch" and her "broom" is one`, but there's `subject:a` there, so there's immediately no match.

    Then it advances: goes to the next positions in the source string and tries to find the first character of the pattern there, fails again, and finally finds the quote at the 3rd position:

    ![](witch_greedy1.svg)

2. The quote is detected, and then the engine tries to find a match for the rest of the pattern. It tries to see if the rest of the subject string conforms to `pattern:.+"`.

    In our case the next pattern character is `pattern:.` (a dot). It denotes "any character except a newline", so the next string letter `match:'w'` fits:

    ![](witch_greedy2.svg)

3. Then the dot repeats because of the quantifier `pattern:.+`. The regular expression engine adds to the match one character after another.

    ...Until when? All characters match the dot, so it only stops when it reaches the end of the string:

    ![](witch_greedy3.svg)

4. Now the engine finished repeating `pattern:.+` and tries to find the next character of the pattern. It's the quote `pattern:"`. But there's a problem: the string has finished, there are no more characters!

    The regular expression engine understands that it took too many `pattern:.+` and starts to *backtrack*.

    In other words, it shortens the match for the quantifier by one character:

    ![](witch_greedy4.svg)

    Now it assumes that `pattern:.+` ends one character before the string end and tries to match the rest of the pattern from that position.

    If there were a quote there, then the search would end, but the last character is `subject:'e'`, so there's no match.

5. ...So the engine decreases the number of repetitions of `pattern:.+` by one more character:

    ![](witch_greedy5.svg)

    The quote `pattern:'"'` does not match `subject:'n'`.

6. The engine keep backtracking: it decreases the count of repetition for `pattern:'.'` until the rest of the pattern (in our case `pattern:'"'`) matches:

    ![](witch_greedy6.svg)