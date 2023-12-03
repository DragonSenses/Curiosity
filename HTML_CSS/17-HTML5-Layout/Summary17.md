# **Summary: *HTML5 Layout***

- The new HTML5 elements indicate the purpose of different parts of a web page and help to describe its structure.

- The new elements provide clearer code (compared with using multiple `<div>` elements).

- Older browsers that do not understand HTML5 elements need to be told which elements are block-level elements.

- To make HTML5 elements work in Internet Explorer 8 (and older versions of IE), extra JavaScript is needed, which is available free from [HTML5shiv](https://github.com/aFarkas/html5shiv).

---

## HTML5shiv

HTML5shiv is a JavaScript script that enables the use of HTML5 sectioning elements in legacy browsers that do not support them natively. It also provides basic HTML5 styling for some older browser.

The current and maintained version of HTML5shiv is hosted on GitHub, a popular platform for code hosting and collaboration. The URL `https://github.com/aFarkas/html5shiv` can be used to access the latest source code, documentation, and releases of HTML5shiv.

HTML5shiv has an API that allows users to configure the elements to shiv, as well as a printshiv option that enables HTML5 elements to be styled and contain children while being printed in IE 6-8.

HTML5shiv works as a simple drop-in solution that can be included in the `<head>` section of a web page using a conditional comment:

```html
<!-- [if lt IE 9]>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
<! [endif]-->
```

This will load the HTML5shiv script from a CDN (content delivery network) only for browsers that are less than IE 9.

*Caveat:* Unfortunately, this workaround does require that anyone using IE8 or earlier versions of IE has JavaScript enabled in their browser. 

If they do not have JavaScript enabled then they will not be able to see the content of these HTML5 elements.

### Provide a fallback for browsers that have JavaScript disabled

To provide a fallback for browsers that have JavaScript disabled, it is recommended to use the [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) element and provide alternative content or instructions.

```js
<noscript>
  <p>Please enable JavaScript or upgrade your browser to view this content.</p>
</noscript>
```

This will display a message to the user if JavaScript is disabled, while hiding it if JavaScript is enabled

## Helping Older Browsers Understand

Older browsers that do not know the new HTML5 elements will automatically treat them as inline elements. 

Therefore, to help older browsers, you should include the line of CSS on the left which states which new elements should be rendered as block-level elements.

IE9 was the first version of Internet Explorer to allow CSS rules to be associated with these new HTML5 layout elements.

In order to style these elements using earlier versions of IE, you need to use a script known as the **HTML5 shiv**.

It should be placed inside a **conditional
comment** which checks if the browser version is less than (hence the lt) IE9.

# Traditional HTML Layouts

For a long time, web page authors used `<div>` elements to group together related elements on the page (such as the elements that form a header, an article, footer or sidebar). 

Authors used `class` or `id` attributes to indicate the role of the `<div>` element in the structure of the page.

Here is a layout that is quite common (patricularly on blog sites).

```html
<!DOCTYPE html>
<body>
  <div id="page">

    <div id="header">
      <div id="nav"></div>
    </div>

    <div id="content">
      <div class="article"></div>
      <div class="article"></div>
    </div>

    <div id="sidebar"></div>

    <div id="footer"></div>

  </div>
</body>
</html>
```

- At the top of the page is the header, containing a logo and the primary navigation.

- Under this are one or more articles or posts. Sometimes these are summaries that link to individual posts.

- There is a side bar on the righthand side (perhaps featuring a search option, links to other recent articles, other sections of the site, or even ads).

- When coding a site like this, developers would usually put these main sections of the page inside `<div>` elements and use the `class` or `id` attributes to indicate the purpose of that part of the page.

## HTML5 Layout - Semantic Elements

HTML5 introduces a semantic elements that allow you to divide up the parts of a page. The names of these elements indicate the kind of content you will find in them.

[Semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements) are elements that describe their **meaning** and **purpose** to both the browser and the developer, rather than just using generic elements like `<div>` and `<span>`.

We can use semantic elements like this:

```html
<!DOCTYPE html>
<body>
  <div id="page">

    <header>
      <nav></nav>
    </header>

    <div id="content">
      <article></article>
      <article></article>
    </div>

    <aside></aside>

    <footer></footer>

  </div>
</body>
</html>
```

It has the same structure as the traditional HTML layout but many of the `div` elements have been replaced by semantic elements.

- For example, the header sits
inside a `<header>` element,
the navigation in a `<nav>`
element, and the articles are in
individual `<article>` elements.

The point of creating these new elements is so that web page authors can use them to help describe the structure of the page. 

For example, screen reader software might allow users to ignore headers and footers and get straight to the content. 

Similarly, search engines might place more weight on the content in an `<article>` element than that in the `<header>` or `<footer>` elements.

Semantic elements improve:

- Code readability
- Accessibility
- Search Engine Optimization
