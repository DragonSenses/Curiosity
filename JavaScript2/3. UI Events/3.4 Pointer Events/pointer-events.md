# Pointer events

Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.

## Summary

Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

For drag'n'drops and complex touch interactions that the browser may decide to hijack and handle on its own - remember to cancel the default action on events and set `touch-action: none` in CSS for elements that we engage.

Additional abilities of pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height`, and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.

---

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there were only mouse events.

    Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.

    But touch devices have more capabilities than a mouse. For example, it's possible to touch multiple points at once ("multi-touch"). Although, mouse events don't have necessary properties to handle such multi-touches.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in detail here, because pointer events are even better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome.

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compatible with Pointer Events level 2.

Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there's no point in using mouse or touch events any more -- we can switch to pointer events.

Then your code will work well with both touch and mouse devices.

That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We'll make note of them in this article.

## Pointer event types

Pointer events are named similarly to mouse events:

| Pointer event | Similar mouse event |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll explain them soon.

---

### Replacing `mouse<event>` with `pointer<event>` in our code

We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

The support for touch devices will also "magically" improve. Although, we may need to add `touch-action: none` in some places in CSS. We'll cover it below in the section about `pointercancel`.

---

## Pointer event properties

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target`, etc., plus some others:

- `pointerId` - the unique identifier of the pointer causing the event.

    Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).
- `pointerType` - the pointing device type. Must be a string, one of: "mouse", "pen" or "touch".

    We can use this property to react differently on various pointer types.
- `isPrimary` - is `true` for the primary pointer (the first finger in multi-touch).

Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`.
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

These properties aren't supported by most devices, so they are rarely used. You can find the details about them in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

---

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

Pointer Events allow handling multi-touch with the help of the `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

1. At the first finger touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and more fingers (assuming the first one is still touching):
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: the `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events, each with their respective coordinates and a different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves and then removes a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.

---

See `multiTouch.html` for the demo that logs `pointerdown` and `pointerup` events:

Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in `pointerId/isPrimary`. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.

---

## Event: pointercancel

The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated.

Such causes are:
- The pointer device hardware was physically disabled.
- The device orientation changed (tablet rotated).
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We'll demonstrate `pointercancel` on a practical example to see how it affects us.

Let's say we're implementing drag'n'drop for a ball, just as in the beginning of the article *mouse-drag-and-drop*.

Here is the flow of user actions and the corresponding events:

1) The user presses on an image, to start dragging
    - `pointerdown` event fires
2) Then they start moving the pointer (thus dragging the image)
    - `pointermove` fires, maybe several times
3) And then the surprise happens! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires in the beginning of the "drag-and-drop" process, and no more `pointermove` events are generated.

---

See `ballOne.html`

Here's the drag'n'drop demo with loggin of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`:

We'd like to implement the drag'n'drop on our own, so let's tell the browser not to take it over.

**Prevent the default browser action to avoid `pointercancel`.**

We need to do two things:

1. Prevent native drag'n'drop from happening:
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are other touch-related browser actions (besides drag'n'drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS.
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and doesn't emit `pointercancel`.

---

For the demo, see `ballTwo.html`

This demo adds these lines.

As you can see, there's no `pointercancel` any more.

---

