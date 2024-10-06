## To `panic!` or Not to `panic!`

### Deciding Between `panic!` and `Result`

- **When to Use `panic!`**:
  - Use `panic!` when there is no way to recover from an error.
  - Calling `panic!` makes the decision that a situation is unrecoverable on behalf of the calling code.

- **When to Return `Result`**:
  - Returning `Result` gives the calling code options to handle the error.
  - The calling code can attempt to recover or decide that the error is unrecoverable and call `panic!` itself.
  - Returning `Result` is a good default choice for functions that might fail.

#### Situations for Using `panic!`

- **Examples, Prototype Code, and Tests**:
  - In these cases, it's more appropriate to write code that panics instead of returning a `Result`.

#### Compiler Limitations and Human Judgment

- **Compiler Limitations**:
  - There are situations where the compiler can't tell that failure is impossible, but you as a human can.

#### Guidelines for Library Code

- **General Guidelines**:
  - The chapter concludes with guidelines on how to decide whether to panic in library code.

### Additional Considerations

- **Using the `?` Operator**:
  - The `?` operator can be used to propagate errors in functions that return `Result` or `Option`.
  - It simplifies error handling by reducing boilerplate code.

- **Error Handling in Production Code**:
  - In production code, prefer returning `Result` to allow for graceful error handling.
  - Reserve `panic!` for truly unrecoverable situations or bugs.

### Examples, Prototype Code, and Tests

#### Examples

When you’re writing an example to illustrate some concept, including robust error-handling code can make the example less clear. In examples, it’s understood that a call to a method like `unwrap` that could panic is meant as a placeholder for the way you’d want your application to handle errors, which can differ based on what the rest of your code is doing.

#### Prototype Code

Similarly, the `unwrap` and `expect` methods are very handy when prototyping, before you’re ready to decide how to handle errors. They leave clear markers in your code for when you’re ready to make your program more robust.

#### Tests

If a method call fails in a test, you’d want the whole test to fail, even if that method isn’t the functionality under test. Because `panic!` is how a test is marked as a failure, calling `unwrap` or `expect` is exactly what should happen.
