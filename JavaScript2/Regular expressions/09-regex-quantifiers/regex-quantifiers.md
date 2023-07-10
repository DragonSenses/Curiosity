# Quantifiers +, *, ? and {n}

Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `pattern:\d`. To mark how many we need, we can append a *quantifier*.

## Quantity {n}

The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `pattern:{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.

    The example below looks for a 5-digit number:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    We can add `\b` to exclude longer numbers: `pattern:\b\d{5}\b`.

The range: `pattern:{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Shorthands

There are shorthands for most used quantifiers:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So, `pattern:colou?r` finds both `match:color` and `match:colour`:

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

