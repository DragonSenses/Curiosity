# Live timer element

We already have `<time-formatted>` element to show a nicely formatted time.

Create `<live-timer>` element to show the current time:
1. It should use `<time-formatted>` internally, not duplicate its functionality.
2. Ticks (updates) every second.
3. For every tick, a custom event named `tick` should be generated, with the current date in `event.detail` (see chapter <info:dispatch-events>).

Usage:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Source Code:

```html
<!doctype html>
<!-- don't modify this -->
<script src="time-formatted.js"></script>

<!-- your code here: -->
<script src="live-timer.js"></script>

<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

`live-timer.js`
```js
class LiveTimer extends HTMLElement {
  /* your code here */
}

customElements.define("live-timer", LiveTimer);
```

`time-formatted.js`
```js
class TimeFormatted extends HTMLElement {

  render() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
```

---