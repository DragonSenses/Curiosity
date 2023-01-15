// eslint-disable-next-line no-unused-vars, no-undef
class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
    // Define precision parameter with a default parameter of 1000ms, or 1sec
    let { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}