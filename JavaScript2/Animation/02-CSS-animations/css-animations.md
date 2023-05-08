# Summary | CSS Animations

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

|Merits|Demerits|
|------|--------|
|+ Simple things done simply. | - JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element. |
|+ Fast and lightweight for CPU.| - Not just property changes. We can create new elements in JavaScript as part of the animation.|

---

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.

---

