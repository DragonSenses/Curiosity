# Summary | ShadowDOM slots, composition

Usually, if an element has shadow DOM, then its light DOM is not displayed. Slots allow to show elements from light DOM in specified places of shadow DOM.

There are two kinds of slots:

- Named slots: `<slot name="X">...</slot>` -- gets light children with `slot="X"`.
- Default slot: the first `<slot>` without a name (subsequent unnamed slots are ignored) -- gets unslotted light children.
- If there are many elements for the same slot -- they are appended one after another.
- The content of `<slot>` element is used as a fallback. It's shown if there are no light children for the slot.

The process of rendering slotted elements inside their slots is called "composition". The result is called a "flattened DOM".

Composition does not really move nodes, from JavaScript point of view the DOM is still same.

JavaScript can access slots using methods:
- `slot.assignedNodes/Elements()` -- returns nodes/elements inside the `slot`.
- `node.assignedSlot` -- the reverse property, returns slot by a node.

If we'd like to know what we're showing, we can track slot contents using:
- `slotchange` event -- triggers the first time a slot is filled, and on any add/remove/replace operation of the slotted element, but not its children. The slot is `event.target`.
- [MutationObserver](info:mutation-observer) to go deeper into slot content, watch changes inside it.

Now, as we know how to show elements from light DOM in shadow DOM, let's see how to style them properly. The basic rule is that shadow elements are styled inside, and light elements -- outside, but there are notable exceptions.

---

