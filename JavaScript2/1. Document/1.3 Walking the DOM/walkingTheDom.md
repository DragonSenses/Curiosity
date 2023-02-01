# Walking the DOM

## Summary

Given a DOM node, we can go to its immediate neighbors using navigation properties.

There are two main sets of them:

- For all nodes: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.

- For element nodes only: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Some types of DOM elements, e.g. tables, provide additional properties and collections to access their content.

---

The DOM allows us to do anything with the elements and their contents, but first we need to reach the corresponding DOM object.

Al operations on the DOM start with the `document` object. That’s the main “entry point” to DOM. From it we can access any node.

Here’s a picture of links that allow for travel between DOM nodes: <img src="img/DOM-tree.png">

---

## **On top: documenttElement and body**

The topmost tree nodes are available directly as `document` properties:

1. `<html>` = `document.documentElement`
  *  The topmost document node is `document.documentElement`
  * That’s the DOM node of the `<html>` tag.

2. `<body>` = `document.body`

  * Another widely used DOM node is the `<body>` element – `document.body`

3. `<head>` = document.head
  * The `<head>` tag is available as `document.head`


> There's a catch `document.body` can be `null`
A script 