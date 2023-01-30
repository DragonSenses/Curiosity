# **Attributes and properties**

# Summary

- Attributes – is what’s written in HTML.
- Properties – is what’s in DOM objects.

A small comparison:


_ | Properties	| Attributes
-| ---------- | ----------
Type | Any value, standard properties have types described in the spec |	A string
Name | Name is case-sensitive	| Name is not case-sensitive

Methods to work with attributes are:

- `elem.hasAttribute(name)` – to check for existence.
- `elem.getAttribute(name)` – to get the value.
- `elem.setAttribute(name, value)` – to set the value.
- `elem.removeAttribute(name)` – to remove the attribute.
- `elem.attributes` is a collection of all attributes.

For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

 - We need a non-standard attribute. But if it starts with `data-`, then we should use `dataset`.

- We want to read the value “as written” in HTML. The value of the DOM property may be different, for instance the `href` property is always a full URL, and we may want to get the “original” value.

---

