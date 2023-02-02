# **Node properties: type, tag and contents**

Let’s get a more in-depth look at DOM nodes.

In this chapter we’ll see more into what they are and learn their most used properties.

---

## **Summary**

Each DOM node belongs to a certain class. The classes form a hierarchy. The full set of properties and methods come as the result of inheritance.

Main DOM node properties are:

`nodeType`
> We can use it to see if a node is a text or an element node. It has a numeric value: `1` for elements, `3` for text nodes, and a few others for other node types. Read-only.

`nodeName/tagName`
> For elements, tag name (uppercased unless XML-mode). For non-element nodes `nodeName` describes what it is. Read-only.

`innerHTML`
> The HTML content of the element. Can be modified.

`outerHTML`
> The full HTML of the element. A write operation into `elem.outerHTML` does not touch elem itself. Instead it gets replaced with the new HTML in the outer context.

`nodeValue/data`
> The content of a non-element node (text, comment). These two are almost the same, usually we use `data`. Can be modified.

`textContent`
> The text inside the element: HTML minus all `<tags>`. Writing into it puts the text inside the element, with all special characters and tags treated exactly as text. Can safely insert user-generated text and protect from unwanted HTML insertions.

`hidden`

> When set to `true`, does the same as CSS `display:none`.

DOM nodes also have other properties depending on their class. 

For instance, 
- `<input>` elements (`HTMLInputElement`) support value, type, while
- `<a>` elements (`HTMLAnchorElement`) support `href` etc. 

Most standard HTML attributes have a corresponding DOM property.

However, HTML attributes and DOM properties are not always the same, as we’ll see in the next chapter.

---

## **DOM node classes**

Different DOM nodes may have different properties. For instance, an element node corresponding to tag `<a>` has link-related properties, and the one corresponding to `<input>` has input-related properties and so on. Text nodes are not the same as element nodes. But there are also common properties and methods between all of them, because all classes of DOM nodes form a single hierarchy.

Each DOM node belongs to the corresponding built-in class.

The root of the hierarchy is `EventTarget`, that is inherited by `Node`, and other DOM nodes inherit from it.

Here’s the picture, explanations to follow: <img src="img/DOM-node-tree.png">

The classes are:

- <a href="https://dom.spec.whatwg.org/#eventtarget">EventTarget</a> – is the root “abstract” class for everything.

  Objects of that class are never created. It serves as a base, so that all DOM nodes support so-called “events”, we’ll study them later.

- <a href="https://dom.spec.whatwg.org/#interface-node">Node</a> – is also an “abstract” class, serving as a base for DOM nodes.

  It provides the core tree functionality: `parentNode`, `nextSibling`, `childNodes` and so on (they are getters). Objects of `Node` class are never created. But there are other classes that inherit from it (and so inherit the Node functionality).

- <a href="https://dom.spec.whatwg.org/#interface-document">Document</a>, for historical reasons often inherited by `HTMLDocument` (though the latest spec doesn’t dictate it) – is a document as a whole.

  The `document` global object belongs exactly to this class. It serves as an entry point to the DOM.

- <a href="https://dom.spec.whatwg.org/#interface-characterdata">CharacterData</a> – an “abstract” class, inherited by:

  - <a href="https://dom.spec.whatwg.org/#interface-text">Text</a> – the class corresponding to a text inside elements, e.g. `Hello` in `<p>Hello</p>`.
  - <a href="https://dom.spec.whatwg.org/#interface-comment">Comment</a> – the class for comments. They are not shown, but each comment becomes a member of DOM.

<a href="https://dom.spec.whatwg.org/#interface-element">Element</a> – is the base class for DOM elements.

It provides element-level navigation like `nextElementSibling`, `children` and searching methods like `getElementsByTagName`, `querySelector`.

  A browser supports not only HTML, but also XML and SVG. So the `Element` class serves as a base for more specific classes: `SVGElement`, `XMLElement` (we don’t need them here) and `HTMLElement`.

- Finally, <a href="https://html.spec.whatwg.org/multipage/dom.html#htmlelement">HTMLElement</a> is the basic class for all HTML elements. We’ll work with it most of the time.

It is inherited by concrete HTML elements:

  - <a href="https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement">HTMLInputElement</a> – the class for `<input>` elements,
  - <a href="https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement">HTMLBodyElement</a> – the class for `<body>` elements,
  - <a href="https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement">HTMLAnchorElement</a> – the class for `<a>` elements,
  - …and so on.

There are many other tags with their own classes that may have specific properties and methods, while some elements, such as `<span>`, `<section>`, `<article>` do not have any specific properties, so they are instances of `HTMLElement` class.

So, the full set of properties and methods of a given node comes as the result of the chain of inheritance.

For example, let’s consider the DOM object for an `<input>` element. It belongs to `HTMLInputElement` class.

It gets properties and methods as a superposition of (listed in inheritance order):

- `HTMLInputElement` – this class provides input-specific properties,

- `HTMLElement` – it provides common HTML element methods (and getters/setters),

- `Element` – provides generic element methods,
- `Node` – provides common DOM node properties,
- `EventTarget` – gives the support for events,
- …and finally it inherits from `Object`, so “plain object” methods like `hasOwnProperty` are also available.

---

To see the DOM node class name, we can recall that an object usually has the `constructor` property. It references the class constructor, and `constructor.name` is its name:

```javascript
alert( document.body.constructor.name ); // HTMLBodyElement
```

…Or we can just `toString` it:

```javascript
alert( document.body ); // [object HTMLBodyElement]
```

We also can use `instanceof` to check the inheritance:
```javascript
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

As we can see, DOM nodes are regular JavaScript objects. They use prototype-based classes for inheritance.

That’s also easy to see by outputting an element with `console.dir(elem)` in a browser. There in the console you can see `HTMLElement.prototype`, `Element.prototype` and so on.

---

### `console.dir(elem)` **versus** `console.log(elem)`

Most browsers support two commands in their developer tools: `console.log` and `console.dir`. They output their arguments to the console. For JavaScript objects these commands usually do the same.

But for DOM elements they are different:

- `console.log(elem)` shows the element DOM tree.
- `console.dir(elem)` shows the element as a DOM object, good to explore its properties.

Try it on `document.body`.

---

### **IDL in the spec**

In the specification, DOM classes aren’t described by using JavaScript, but a special <a href="https://en.wikipedia.org/wiki/Interface_description_language">Interface description language</a> (IDL), that is usually easy to understand.

In IDL all properties are prepended with their types. For instance, DOMString, boolean and so on.

Here’s an excerpt from it, with comments:

```javascript
// Define HTMLInputElement
// The colon ":" means that HTMLInputElement inherits from HTMLElement
interface HTMLInputElement: HTMLElement {
  // here go properties and methods of <input> elements

  // "DOMString" means that the value of a property is a string
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // boolean value property (true/false)
  attribute boolean autofocus;
  ...
  // now the method: "void" means that the method returns no value
  void select();
  ...
}
```

---

## **The “nodeType” property**

The `nodeType` property provides one more, “old-fashioned” way to get the “type” of a DOM node.

It has a numeric value:

  - `elem.nodeType == 1` for element nodes,
  - `elem.nodeType == 3` for text nodes,
  - `elem.nodeType == 9` for the document object,
  - there are few other values in the [specification](https://dom.spec.whatwg.org/#node).

For instance:

```html
<body>
  <script>
  let elem = document.body;

  // let's examine: what type of node is in elem?
  alert(elem.nodeType); // 1 => element

  // and its first child is...
  alert(elem.firstChild.nodeType); // 3 => text

  // for the document object, the type is 9
  alert( document.nodeType ); // 9
  </script>
</body>
```

In modern scripts, we can use `instanceof` and other class-based tests to see the node type, but sometimes `nodeType` may be simpler. We can only read `nodeType`, not change it.

---

## **Tag: nodeName and tagName**

Given a DOM node, we can read its tag name from `nodeName` or `tagName` properties:

For instance:

```javascript
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

Is there any difference between `tagName` and `nodeName`?

Sure, the difference is reflected in their names, but is indeed a bit subtle.

  - The `tagName` property exists only for `Element` nodes.
  - The `nodeName` is defined for any `Node`:
    - for elements it means the same as `tagName`.
    - for other node types (text, comment, etc.) it has a string with the node type.

In other words, `tagName` is only supported by element nodes (as it originates from Element class), while `nodeName` can say something about other node types.

For instance, let’s compare `tagName` and `nodeName` for the `document` and a comment node:

```html
<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined (not an element)
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined (not an element)
    alert( document.nodeName ); // #document
  </script>
</body>
```

If we only deal with elements, then we can use both `tagName` and `nodeName` – there’s no difference.

---

### **The tag name is always uppercase except in XML mode**

The browser has two modes of processing documents: HTML and XML. Usually the HTML-mode is used for webpages. XML-mode is enabled when the browser receives an XML-document with the header: `Content-Type: application/xml+xhtml`.

In HTML mode `tagName/nodeName` is always uppercased: it’s `BODY` either for `<body>` or `<BoDy>`.

In XML mode the case is kept “as is”. Nowadays XML mode is rarely used.

---