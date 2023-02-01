# Searching: `getElement*`, `querySelector*`

DOM navigation properties are great when elements are close to each other. What if they are not? How to get an arbitrary element of the page?

There are additional searching methods for that.

---

# Summary

There are 6 main methods to search for nodes in DOM:

Method | Searches by...	| Can call on an element?	| Live?
------ | -------------- | ---------------------- | -----
`querySelector` |	CSS-selector |	✔	| -
`querySelectorAll` |	CSS-selector	| ✔ |	-
`getElementById`	| `id`	|-| -
`getElementsByName`	| `name` | -	| ✔
`getElementsByTagName` | tag or `'*'` |	✔ | 	✔
`getElementsByClassName`	| class |	✔	| ✔

By far the most used are `querySelector` and `querySelectorAll`, but `getElement(s)By*` can be sporadically helpful or found in the old scripts.

Besides that:

- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.

- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `` itself is also checked.

And let’s mention one more method here to check for the child-parent relationship, as it’s sometimes useful:

- `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`

--- 

## document.getElementById or just id

If an element has the `id` attribute, we can get the element using the method document.`getElementById(id)`, no matter where it is.

For instance:

```javascript
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // get the element
  let elem = document.getElementById('elem');

  // make its background red
  elem.style.background = 'red';
</script>
```

Also, there’s a global variable named by `id` that references the element:

```javascript
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // elem is a reference to DOM-element with id="elem"
  elem.style.background = 'red';

  // id="elem-content" has a hyphen inside, so it can't be a variable name
  // ...but we can access it using square brackets: window['elem-content']
</script>
```

…That’s unless we declare a JavaScript variable with the same name, then it takes precedence:
```javascript
<div id="elem"></div>

<script>
  let elem = 5; // now elem is 5, not a reference to <div id="elem">

  alert(elem); // 5
</script>
```

---

### Please don’t use id-named global variables to access elements

This behavior is described in the <a href="https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object"> specification</a>, but it is supported mainly for compatibility.

The browser tries to help us by mixing namespaces of JS and DOM. That’s fine for simple scripts, inlined into HTML, but generally isn’t a good thing. There may be naming conflicts. Also, when one reads JS code and doesn’t have HTML in view, it’s not obvious where the variable comes from.

Here in the tutorial we use `id` to directly reference an element for brevity, when it’s obvious where the element comes from.

In real life `document.getElementById` is the preferred method.

---

### The `id` must be unique

The `id` must be unique. There can be only one element in the document with the given `id`.

If there are multiple elements with the same `id`, then the behavior of methods that use it is unpredictable, e.g. `document.getElementById` may return any of such elements at random. So please stick to the rule and keep `id` unique.

---

### Only `document.getElementById`, not `anyElem.getElementById`

The method `getElementById` can be called only on `document` object. It looks for the given `id` in the whole document.

---

## **querySelectorAll**

By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector.

Here we look for all `<li>` elements that are last children:

```html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

This method is indeed powerful, because any CSS selector can be used.

### **Can use pseudo-classes as well**

Pseudo-classes in the CSS selector like `:hover` and `:active` are also supported. For instance, `document.querySelectorAll(':hover')` will return the collection with elements that the pointer is over now (in nesting order: from the outermost `<html>` to the most nested one).

