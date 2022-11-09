# **Summary: *Introducing CSS***

- CSS treats each HTML element as if it appears inside its own box and uses rules to indicate how that element should look
- Rules are made up of selectors and declarations
    - Selectors - specify the elements the rule applies to
    - Declarations - indicate what these elements should look like
- Different types of selectors allow you to target your rules at different elements
- Declarations are made up of two parts: the properties of those elements. 
    - e.g., the font-family property sets the choice of font, and the value arial specifies Arial as the preferred typeface 
- CSS rules usually appear in a separate document, although they may appear within an HTML page

---

### CSS Associates Style Rules with HTML Elements
    A CSS rule contains two parts: a selector and a declaration

> `p {
     font-family: Arial; } `

> p is the selector, the rest is the declaration

- This rule indicates that all `<p>` elements should be shown in the Arial typeface.
- **Selectors** indicate which element the rule applies to.
    - The same rule can apply to more than one element if you separate the element names with commas.
- **Declarations** indicate how the elements referred to in the selector should be styled.
    - Declarations are split into two parts (a property and a value), and are separated by a colon.

---

### CSS Properties Affect How Elements are Displayed

    CSS declarations sit inside curly brackets and each is made up of two parts: a property and a value, separated by a colon. You can specify several properties in one declaration, each separated by a semi-colon.

> ` h1, h2, h3 { font-family: Arial;
                color: yellow; }` 

- This rule indicates that all `<h1>`, `<h2>` and `<h3>` elements should be shown in the Arial
typeface, in a yellow color.
- **Properties** indicate the aspects of the element you want to change. For example, color, font width, height and border.
- **Values** specify the settings you want to use for the chosen properties. For example, if you want to specify a color property then the value is the color you want the text in these elements to be.

---
