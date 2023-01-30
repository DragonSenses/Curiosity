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