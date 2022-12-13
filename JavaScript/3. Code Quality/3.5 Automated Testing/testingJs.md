# Automated Testing with Mocha

**When testing a code by manual re-runs, it’s easy to miss something.**

**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**

---

# Behavior Driven Development (BDD)

    BDD is three things in one: tests AND documentation AND examples.

## Development of "pow": the spec

Let’s say we want to make a `function pow(x, n)` that raises `x` to an integer power `n`. We assume that `n≥0`.

That task is just an example: there’s the `**` operator in JavaScript that can do that, but here we concentrate on the development flow that can be applied to more complex tasks as well.

### **Specification**

Before creating the code of pow, we can imagine what the function should do and describe it.

Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:

describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});

A spec has three main building blocks that you can see above:
