# **Summary: *HTML5 Layout***

- The new HTML5 elements indicate the purpose of different parts of a web page and help to describe its structure.

- The new elements provide clearer code (compared with using multiple `<div>` elements).

- Older browsers that do not understand HTML5 elements need to be told which elements are block-level elements.

- To make HTML5 elements work in Internet Explorer 8 (and older versions of IE), extra JavaScript is needed, which is available free from [HTML5shiv](https://github.com/aFarkas/html5shiv).

---



## Helping Older Browsers Understand

Older browsers that do not know the new HTML5 elements will automatically treat them as inline elements. 

Therefore, to help older browsers, you should include the line of CSS on the left which states which new elements should be rendered as block-level elements.

IE9 was the first version of Internet Explorer to allow CSS rules to be associated with these new HTML5 layout elements.

In order to style these elements using earlier versions of IE, you need to use a script known as the **HTML5 shiv**.

It should be placed inside a **conditional
comment** which checks if the browser version is less than (hence the lt) IE9.

*Caveat:* Unfortunately, this workaround does require that anyone using IE8 or earlier versions of IE has JavaScript enabled in their browser. 

If they do not have JavaScript enabled then they will not be able to see the content of these HTML5 elements.