# Focusing: focus/blur

An element receives the focus when the user either clicks on it or uses the `key:Tab` key on the keyboard. There's also an `autofocus` HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.

Focusing on an element generally means: "prepare to accept the data here", so that's the moment when we can run the code to initialize the required functionality.

The moment of losing the focus ("blur") can be even more important. That's when a user clicks somewhere else or presses `key:Tab` to go to the next form field, or there are other means as well.

Losing the focus generally means: "the data has been entered", so we can run the code to check it or even to save it to the server and so on.

There are important peculiarities when working with focus events. We'll do the best to cover them further on.

---

## Summary

Events `focus` and `blur` trigger on an element focusing/losing focus.

Their specials are:
- They do not bubble. Can use capturing state instead or `focusin/focusout`.
- Most elements do not support focus by default. Use `tabindex` to make anything focusable.

The current focused element is available as `document.activeElement`.

---

## Events focus/blur

The `focus` event is called on focusing, and `blur` -- when the element loses the focus.

Let's use them for validation of an input field.

In the example below:

- The `blur` handler checks if the field has an email entered, and if not -- shows an error.
- The `focus` handler hides the error message (on `blur` it will be checked again):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // remove the "error" indication, because the user wants to re-enter something
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Modern HTML allows us to do many validations using input attributes: `required`, `pattern` and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it's correct.

## Methods focus/blur

Methods `elem.focus()` and `elem.blur()` set/unset the focus on the element.

For instance, let's make the visitor unable to leave the input if the value is invalid:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // show the error
      this.classList.add("error");
*!*
      // ...and put the focus back
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

It works in all browsers except Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

If we enter something into the input and then try to use `key:Tab` or click away from the `<input>`, then `onblur` returns the focus back.

Please note that we can't "prevent losing focus" by calling `event.preventDefault()` in `onblur`, because `onblur` works *after* the element lost the focus.

In practice though, one should think well, before implementing something like this, because we generally *should show errors* to the user, but *should not prevent their progress* in filling our form. They may want to fill other fields first.

---

### JavaScript-initiated focus loss

A focus loss can occur for many reasons.

One of them is when the visitor clicks somewhere else. But also JavaScript itself may cause it, for instance:

- An `alert` moves focus to itself, so it causes the focus loss at the element (`blur` event), and when the `alert` is dismissed, the focus comes back (`focus` event).
- If an element is removed from DOM, then it also causes the focus loss. If it is reinserted later, then the focus doesn't return.

These features sometimes cause `focus/blur` handlers to misbehave -- to trigger when they are not needed.

The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.

---

