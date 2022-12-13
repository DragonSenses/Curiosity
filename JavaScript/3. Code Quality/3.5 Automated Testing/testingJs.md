# Automated Testing with Mocha

**When testing a code by manual re-runs, it’s easy to miss something.**

**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**

---

# Behavior Driven Development (BDD)

    BDD is three things in one: tests AND documentation AND examples.

## **Development of *pow*: the spec**

Let’s say we want to make a `function pow(x, n)` that raises `x` to an integer power `n`. We assume that `n≥0`.

That task is just an example: there’s the `**` operator in JavaScript that can do that, but here we concentrate on the development flow that can be applied to more complex tasks as well.

### **Specification**

Before creating the code of pow, we can imagine what the function should do and describe it.

Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:

`describe("pow", function() {`

  &nbsp;&nbsp;`it("raises to n-th power", function() {`
    &nbsp;&nbsp;&nbsp;&nbsp;`assert.equal(pow(2, 3), 8);`

&nbsp;`});`

`});`

A spec has three main building blocks that you can see above:

1. `describe("title", function() { ... })`
    * What is the functionality we are describing?
    * Describing the function `pow`.
    * Used to group "workers" - i.e. `it` blocks

2. `it("use case description", function() { ... })`
    * In title of `it`, in a *human-readable* way, describe the particular use case
    * The second argument is a function that tests it

3. `assert.equal(value1, value2)`
    * code inside `it` block, if the implementation is correct, should execute without errors.

> Functions `assert.*` are used to check whether `pow` works as expected. Here we use `assert.equal()`, which compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2,3)` equals `8`.

The specification can be executed, and it will run the test specified in `it` block. 

---

## **The Development Flow**

The flow of development usually looks like this:

1. An initial spec is written, with tests for the most basic functionality.

2. An initial implementation is created.

3. To check whether it works, we run the testing framework <a href = "https://mochajs.org/"> Mocha </a> that runs the spec. 
    * While the functionality is not complete, errors are displayed. 
    * We make corrections until everything works.

4. Now we have a working initial implementation with tests.

5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.

6. Go to 3, update the implementation till tests give no errors.

7. Repeat steps 3-6 till the functionality is ready.

#### Development is *iterative*
    We write the spec, implement it, make sure tests pass, then write more tests, make sure those tests pass, etc.

For our example: `pow` the initial spec has been made, so the first step is complete. 

Before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working. (*they will all fail*).

---

## **The spec in action**

* <a href="https://mochajs.org/">Mocha</a> – the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.

* <a href="https://www.chaijs.com/">Chai</a>  – the library with many assertions. It allows to use a lot of different assertions, for now we need only assert.equal.

* <a href="https://sinonjs.org/">Sinon</a>  – a library to spy over functions, emulate built-in functions and more, we’ll need it much later.

The JavaScript libraries used here are suitable for both in-browser and server-side testing. Here we will consider the browser variant. 