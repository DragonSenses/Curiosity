## Controlling How Tests Are Run

### Compilation and Execution

- `cargo run` compiles your code and runs the resulting binary.
- `cargo test` compiles your code in test mode and runs the resulting test binary.

### Default Behavior

- The binary produced by `cargo test` runs all the tests in parallel.
- Captures output generated during test runs.
- Prevents output from being displayed, making it easier to read the test results.

