# **Summary: *Text***

- There are properties to control the choice of font, size, weight, style and spacing.
- There is a limited choice of fonts that you can assume most people will have installed
- If you want to use a wider range of typefaces there are several options, but you need to have the right license to use them.
- You can control the space between lines of text, individual letters, and words. Text can also be aligned to the left, right, center, or justified. It can also be indented.
- You can use pseudo-classes to change the style of an element when a user hovers over or clicks on text, or when they have visited a link.

---

## Typeface Terminology

* **Serif** fonts have extra details on the ends of main strokes of letters, known as serifs
    * In print, serif fonts traditionally used for long passages of text because it was considered easier to read
    * e.g., Times New Roman, Georgia, Times
* **Sans-Serif** fonts have straight ends to letters, and have a much cleaner design
    * Screens have lowert resolution than print. So, if text is small, sans-serif fonts can be clearer to read
    * e.g., Arial, Verdana, Helvetica
* **Monospace** (or fixed-width) font has every letter to have the same width
    * Monospace fonts are commonly used for code because they align nicely, making the text easier to follow
    * e.g., Courier, Courier New
* **Cursive** fonts have joining strokes or other cursive characteristics, such as handwriting styles
    * e.g., Comic Sans MS, Monotype Corsiva
* **Fantasy** fonts are usually decorative fonts and are often used for titles, not designed for long bodies of text
    * e.g., Impact, Haettenschweiler

### Font Terminology

1. **Ascender** is above the cap height
2. **Cap Height** is the top of flat letters (Top of T)
3. **X-Height** is height of letter x
4. **Baseline** is line that the letters sit on
5. **Descender** is below the baseline 

* **Font Weight** not only adds emphasis but can also affect the amount of white space and contrast on a page
    * Light, Medium, Bold, Black
* **Font Style** or Italic fonts have a cursive aspect to some of the lettering. Oblique font styles take the normal style and put it on an angle
    * Normal, Italic, Oblique
* **Font Stretch** in condensed (or narrow) versions of the font, letters are thinner and closer together. In expanded versions they are thicker and further apart
    * Condensed, Regular, Extended

***


## Attribute Selectors

- A set of attribute selectors that allow you to create rules that apply to elements that have an attribute with a specific value

Selector|Meaning|Example
--------|-------|-------
***Existence***| `[]` Matches a specific attribute (whatever its value) | `p[class]` Targets any `<p>` element with an attribute called class
***Equality***| `[=]` Matches a specific attribute with a specific value | `p[class="dog"]` Targets any `<p>` element with an attribute called class whose value is dog
***Space*** | `[~=]` Matches a specific attribute whose value appears in a space-separated list of words | `p[class~="dog"]` Targets any `<p>` element with an attribute called class whose value is a list of space-separated words, one of which is dog
***Prefix***| `[^=]` Matches a specific attribute whose value begins with a specific string | `p[attr^"d"]` Targets any `<p>` element with an attribute whose value begins with the letter "d"
***Substring*** |  `[*=]` Matches a specific attribute whose value contains a specific substring | `p[attr*"do"]` Targets any `<p>` element with an attribute whose value contains the letters "do"
***Suffix*** | `[$=]` Matches a specific attribute whose value ends with a specific string | `p[attr$"g"]` Targets any `<p>` element with an attribute whose value ends with the letter "g"