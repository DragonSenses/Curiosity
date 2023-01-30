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