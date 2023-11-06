# Catastrophic backtracking

Some regular expressions are looking simple, but can execute a veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior. The typical symptom -- a regular expression works fine sometimes, but for certain strings it "hangs", consuming 100% of CPU.

In such case a web-browser suggests to kill the script and reload the page. Not a good thing for sure.

For server-side JavaScript such a regexp may hang the server process, that's even worse. So we definitely should take a look at it.

## Example

Let's say we have a string, and we'd like to check if it consists of words `pattern:\w+` with an optional space `pattern:\s?` after each.

An obvious way to construct a regexp would be to take a word followed by an optional space `pattern:\w+\s?` and then repeat it with `*`.

That leads us to the regexp `pattern:^(\w+\s?)*$`, it specifies zero or more such words, that start at the beginning `pattern:^` and finish at the end `pattern:$` of the line.

In action:

```js run
let regexp = /^(\w+\s?)*$/;

console.log( regexp.test("A good string") ); // true
console.log( regexp.test("Bad characters: $@#") ); // false
```

The regexp seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine "hangs" with 100% CPU consumption.

If you run the example below, you probably won't see anything, as JavaScript will just "hang". A web-browser will stop reacting on events, the UI will stop working (most browsers allow only scrolling). After some time it will suggest to reload the page. So be careful with this:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// will take a very long time
console.log( regexp.test(str) );
```

To be fair, let's note that some regular expression engines can handle such a search effectively, for example V8 engine version starting from 8.8 can do that (so Google Chrome 88 doesn't hang here), while Firefox browser does hang. 

## Simplified example

What's the matter? Why does the regular expression hang?

To understand that, let's simplify the example: remove spaces `pattern:\s?`. Then it becomes `pattern:^(\w+)*$`.

And, to make things more obvious, let's replace `pattern:\w` with `pattern:\d`. The resulting regular expression still hangs, for instance:

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// will take a very long time (careful!)
alert( regexp.test(str) );
```

So what's wrong with the regexp?

First, one may notice that the regexp `pattern:(\d+)*` is a little bit strange. The quantifier `pattern:*` looks extraneous. If we want a number, we can use `pattern:\d+`.

Indeed, the regexp is artificial; we got it by simplifying the previous example. But the reason why it is slow is the same. So let's understand it, and then the previous example will become obvious.

What happens during the search of `pattern:^(\d+)*$` in the line `subject:123456789z` (shortened a bit for clarity, please note a non-digit character `subject:z` at the end, it's important), why does it take so long?

Here's what the regexp engine does:

1. First, the regexp engine tries to find the content of the parentheses: the number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:

    ```
    \d+.......
    (123456789)z
    ```

    After all digits are consumed, `pattern:\d+` is considered found (as `match:123456789`).

    Then the star quantifier `pattern:(\d+)*` applies. But there are no more digits in the text, so the star doesn't give anything.

    The next character in the pattern is the string end `pattern:$`. But in the text we have `subject:z` instead, so there's no match:

    ```
               X
    \d+........$
    (123456789)z
    ```

2. As there's no match, the greedy quantifier `pattern:+` decreases the count of repetitions, backtracks one character back.

    Now `pattern:\d+` takes all digits except the last one (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```
3. Then the engine tries to continue the search from the next position (right after `match:12345678`).

    The star `pattern:(\d+)*` can be applied -- it gives one more match of `pattern:\d+`, the number `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    The engine tries to match `pattern:$` again, but fails, because it meets `subject:z` instead:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```

  4. There's no match, so the engine will continue backtracking, decreasing the number of repetitions. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it reaches the minimum. Then the previous greedy quantifier decreases, and so on.

    All possible combinations are attempted. Here are their examples.

    The first number `pattern:\d+` has 7 digits, and then a number of 2 digits:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    The first number has 7 digits, and then two numbers of 1 digit each:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    The first number has 6 digits, and then a number of 3 digits:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    The first number has 6 digits, and then 2 numbers:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...And so on.

There are many ways to split a sequence of digits `123456789` into numbers. To be precise, there are <code>2<sup>n</sup>-1</code>, where `n` is the length of the sequence.

- For `123456789` we have `n=9`, that gives 511 combinations.
- For a longer sequence with `n=20` there are about one million (1048575) combinations.
- For `n=30` - a thousand times more (1073741823 combinations).

Trying each of them is exactly the reason why the search takes so long.

## Back to words and strings

The similar thing happens in our first example, when we look for words by pattern `pattern:^(\w+\s?)*$` in the string `subject:An input that hangs!`.

The reason is that a word can be represented as one `pattern:\w+` or many:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

For a human, it's obvious that there may be no match, because the string ends with an exclamation sign `!`, but the regular expression expects a wordly character `pattern:\w` or a space `pattern:\s` at the end. But the engine doesn't know that.

It tries all combinations of how the regexp `pattern:(\w+\s?)*` can "consume" the string, including variants with spaces `pattern:(\w+\s)*` and without them `pattern:(\w+)*` (because spaces `pattern:\s?` are optional). As there are many such combinations (we've seen it with digits), the search takes a lot of time.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won't help: if we replace `pattern:\w+` with `pattern:\w+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but most engines don't, and it doesn't always help.

## How to fix?