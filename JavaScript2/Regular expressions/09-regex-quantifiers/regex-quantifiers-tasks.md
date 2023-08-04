#  How to find an ellipsis "..." ?

Create a regexp to find ellipsis: 3 (or more?) dots in a row.

Check it:

```js
let regexp = /your regexp/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

## Answer:

```js run
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

Please note that the dot is a special character, so we have to escape it and insert as `\.`

---

# Regexp for HTML colors

Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadecimal characters.

An example of use:

```js
let regexp = /...your regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.S. In this task we do not need other color formats like `#123` or `rgb(1,2,3)` etc.

## Answer

We need to look for `#` followed by 6 hexadecimal characters.

A hexadecimal character can be described as `pattern:[0-9a-fA-F]`. Or if we use the `pattern:i` flag, then just  `pattern:[0-9a-f]`.

Then we can look for 6 of them using the quantifier `pattern:{6}`.

As a result, we have the regexp: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

The problem is that it finds the color in longer sequences:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

To fix that, we can add `pattern:\b` to the end:

```js run
// color
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// not a color
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```