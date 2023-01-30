/* Modifying the document
DOM modification is the key to creating “live” pages.

Here we’ll see how to create new elements “on the fly” and modify the existing page content. */

/* Summary 

Methods to create new nodes:

document.createElement(tag) – creates an element with the given tag,
document.createTextNode(value) – creates a text node (rarely used),
elem.cloneNode(deep) – clones the element, if deep==true then with all descendants.
Insertion and removal:

node.append(...nodes or strings) – insert into node, at the end,
node.prepend(...nodes or strings) – insert into node, at the beginning,
node.before(...nodes or strings) –- insert right before node,
node.after(...nodes or strings) –- insert right after node,
node.replaceWith(...nodes or strings) –- replace node.
node.remove() –- remove the node.
Text strings are inserted “as text”.

There are also “old school” methods:

parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)
All these methods return node.

Given some HTML in html, elem.insertAdjacentHTML(where, html) inserts it depending on the value of where:

"beforebegin" – insert html right before elem,
"afterbegin" – insert html into elem, at the beginning,
"beforeend" – insert html into elem, at the end,
"afterend" – insert html right after elem.
Also there are similar methods, elem.insertAdjacentText and elem.insertAdjacentElement, that insert text strings and elements, but they are rarely used.

To append HTML to the page before it has finished loading:

document.write(html)
After the page is loaded such a call erases the document. Mostly seen in old scripts.

*/