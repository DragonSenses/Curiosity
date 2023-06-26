# Java[^script]

We have a regexp `pattern:/Java[^script]/`.

1. Does it match anything in the string `Java`?
2. Does it match anything in the string `JavaScript`?

## **Answer**:

1. **no**

- In the script `Java` it doesn't match anything, because `pattern:[^script]` means "any character except given ones". So the regexp looks for `"Java"` followed by one such symbol, but there's a string end, no symbols after it.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```

2. **yes**

Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```

---

# Find the time as hh:mm or hh-mm

The time can be in the format `hours:minutes` or `hours-minutes`. Both hours and minutes have 2 digits:  `09:00` or `21-30`.

Write a regexp to find time:

```js
let regexp = /your regexp/g;
console.log( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

P.S. In this task we assume that the time is always correct, there's no need to filter out bad strings like "45:67". Later we'll deal with that too.

## **Answer**:
