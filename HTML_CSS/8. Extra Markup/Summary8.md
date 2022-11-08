# **Summary: *Extra Markup***

- DOCTYPES tell browsers which version of HTML you are using
- You can add comments to your code between the  
<! -- and --> markers  
- The id and class attributes allow you to identify particular elements
- The `<div>` and `<span>` elements allow you to group block-level and inline elements together
- `<iframes>` cut windows into your web pages through which other pages can be displayed 
- The `<meta>` tag allows you to supply all kinds of information about your web page
- Escape characters are used to include special characters in your pages such as &lt;, &gt;, and &#169; (which is `&lt;`  `&gt;` `&#169` respectively)

---

## Attributes: `id` vs. `class` 

--- 
### `id`
>- The `id` attribute is used to specify a unique id for an HTML element
>- The value of the `id` attribute must be unique within the HTML document
>- The `id` attribute is used by CSS and JavaScript to style/select a specific element
>- The value of the `id` attribute is case sensitive
>- The `id` attribute is also used to create HTML bookmarks
>- JavaScript can access an element with a specific `id` with the getElementById() method

### `class` 
>- The HTML `class` attribute specifies one or more class names for an element
>- Classes are used by CSS and JavaScript to select and access specific elements
>- The `class` attribute can be used on any HTML element
>- The class name is case sensitive
>- Different HTML elements can point to the same class name
>- JavaScript can access elements with a specific class name with the getElementsByClassName() method
---

## Display Values: Block vs. Inline
    Every HTML element has a default display value, depending on what type of element it is.

>- There are two display values: block and inline
>- A block-level element always starts on a new line and takes up the full width available
>- An inline element does not start on a new line and it only takes up as much width as necessary
>- The `<div>` element is a block-level and is often used as a container for other HTML elements
>- The `<span>` element is an inline container used to mark up a part of a text, or a part of a document

--- 

## Meta
`<meta>` HTML element represents metadata that cannot be represented by other HTML meta-related elements, like `<base>, <link>, <script>, <style> or <title>`

* It is a void element so it does not need closing tag. 

Attributes show what type of metadata it can provide:
* `name` provides document-level metadata, applying to the whole page
* `http-equiv` attribute is set, the `<meta> element is a pragma directtive, providing information equivalent to what can be given by a similar-named HTTP header
* `charset` is a charset declaration, giving the character encoding in which the document is encoded

---

## Escape Characters
    There are some characters that are used in and reserved by HTML code (e.g, left & right angled brackets). Therefore, to make them appear on page you use "escape characters" (i.e., escape codes or entity references)

> Notice that codes start with `&#`, followed by ASCII code, and appended by semicolon `;`

|Symbol|Code|Alternate Code|
|------|----|--------------|
| &lt; |`&lt;`| `&#60;` |
| &gt; |`&gt;`| `&#62;` |
| &#36;| `&#36;`| ----- |
| &quot; |`&quot;`| `&#34;`|    

---

## DOCTYPES

    Each page begins with a DOCTYPE declaration to tell browser which version of HTML the page is using.

#### HTML5
> `<!DOCTYPE html>`

#### HTML4
> `<!DOCTYPE html PUBLIC
"-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">`

#### Transitional XHTML 1.0
> `<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/
xhtml1-transitional.dtd">`

#### Strict XHTML 1.0
>`<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/
xhtml1-strict.dtd">`

#### XML Declaration
> `<?xml version="1.0" ?>`
