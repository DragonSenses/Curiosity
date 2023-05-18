# Summary | Shadow DOM Styling

Shadow DOM can include styles, such as `<style>` or `<link rel="stylesheet">`.

Local styles can affect:
- shadow tree,
- shadow host with `:host` and `:host()` pseudoclasses,
- slotted elements (coming from light DOM), `::slotted(selector)` allows to select  slotted elements themselves, but not their children.

Document styles can affect:
- shadow host (as it lives in the outer document)
- slotted elements and their contents (as that's also in the outer document)

When CSS properties conflict, normally document styles have precedence, unless the property is labelled as `!important`. Then local styles have precedence.

CSS custom properties pierce through shadow DOM. They are used as "hooks" to style the component:

1. The component uses a custom CSS property to style key elements, such as `var(--component-name-title, <default value>)`.
2. Component author publishes these properties for developers, they are same important as other public component methods.
3. When a developer wants to style a title, they assign `--component-name-title` CSS property for the shadow host or above.

---

