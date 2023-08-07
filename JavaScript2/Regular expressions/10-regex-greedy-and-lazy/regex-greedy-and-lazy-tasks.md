# A match for /d+? d+?/

What's the match here?

```js
alert( "123 456".match(/\d+? \d+?/g) ); // ?
```

---

## ***Answer***:

The result is: `match:123 4`.

First the lazy `pattern:\d+?` tries to take as little digits as it can, but it has to reach the space, so it takes  `match:123`.

Then the second `\d+?` takes only one digit, because that's enough.

---

# Find HTML comments

Find all HTML comments in the text:

```js
let regexp = /your regexp/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```


## ***Answer***:

