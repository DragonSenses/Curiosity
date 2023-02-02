## **Count descendants**

Write the code that for each `<li>` shows:

  1. What’s the text inside it (without the subtree)
  2. The number of nested `<li>` – all descendants, including the deeply nested ones.

**Answer:** 

Let's make a loop over `<li>`

```javascript
for (let li of document.querySelectorAll('li')) {
  // ...
}
```

In the loop we need to get the text inside every `li`.

We can read the text from the first child node of `li`, that is the text node:

```javascript
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

Then we can get the number of descendants as:

```javascript
  li.getElementsByTagName('li').length;
```

---

## **What's in the nodeType?**

What does the script show?

```html
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```


> **Answer**: There’s a catch here.

At the time of `<script>` execution the last DOM node is exactly `<script>`, because the browser did not process the rest of the page yet.

So the result is `1` (element node).

---

## **Tag in comment**

What does this code show? 

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // what's here?
</script>
```

**Answer**: BODY.

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```
What’s going on step by step:

1. The content of `<body>` is replaced with the comment. The comment is `<!--BODY-->`, because `body.tagName == "BODY"`. As we remember, `tagName` is always uppercase in HTML.
2. The comment is now the only child node, so we get it in `body.firstChild`.
3. The `data` property of the comment is its contents (inside `<!--...-->`): `"BODY"`.

---

## **Where's the "document" in the hierarchy?**

- Which class does the document belong to?

- What’s its place in the DOM hierarchy?

- Does it inherit from Node or Element, or maybe HTMLElement?


**Answer:** HTMLDocument class. 

We can see which class it belongs by outputting it, like:

```javascript
alert(document); // [object HTMLDocument]

// Or:

alert(document.constructor.name); // HTMLDocument
```

So, `document` is an instance of `HTMLDocument` class.

- What’s its place in the hierarchy?

We *could* browse the specification, but it would be faster to figure out manually.

Let’s traverse the prototype chain via `__proto__`.

As we know, methods of a class are in the `prototype` of the constructor. For instance, `HTMLDocument.prototype` has methods for documents.

Also, there’s a reference to the constructor function inside the `prototype`:

```javascript
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

To get a name of the class as a string, we can use `constructor.name`. Let’s do it for the whole `document` prototype chain, till class `Node`:

```javascript
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

That’s the hierarchy.

We also could examine the object using `console.dir(document)` and see these names by opening `__proto__`. The console takes them from `constructor` internally.

---