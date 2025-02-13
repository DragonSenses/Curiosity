## Controlling How Tests Are Run

### Compilation and Execution

- `cargo run` compiles your code and runs the resulting binary.
- `cargo test` compiles your code in test mode and runs the resulting test binary.

### Default Behavior

- The binary produced by `cargo test` runs all the tests in parallel.
- Captures output generated during test runs.
- Prevents output from being displayed, making it easier to read the test results.

### Customizing Test Runs

- You can specify command line options to change the default behavior.
- Some command line options go to `cargo test`, and some go to the resulting test binary.

### Separating Arguments

- List the arguments for `cargo test` first.
- Followed by the separator `--`.
- Then list the arguments for the test binary.

### Getting Help

- Running `cargo test --help` displays options you can use with `cargo test`.
- Running `cargo test -- --help` displays options you can use after the separator.
