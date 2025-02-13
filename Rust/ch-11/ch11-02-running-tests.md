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

## Running Tests in Parallel or Consecutively

### Default Parallel Execution

- By default, tests run in parallel using threads, allowing faster completion and quicker feedback.
- Ensure tests don't depend on each other or shared state, such as the current working directory or environment variables.

### Example Issue with Parallel Tests

- If multiple tests write to the same file (e.g., *test-output.txt*), one test might overwrite the file between another test's writing and reading.
- This interference can cause test failures unrelated to code correctness.

### Solutions to Prevent Interference

- **Use Different Files:** Ensure each test writes to a different file.
- **Run Tests Sequentially:** Run tests one at a time.

### Customizing Test Runs

- You can specify command line options to change default behavior.
- Use the `--test-threads` flag to control the number of threads for running tests.

### Example Command

```sh
$ cargo test -- --test-threads=1
```

- Setting the number of test threads to `1` disables parallelism, preventing interference.
- Running tests with one thread takes longer but avoids shared state issues.

## Showing Function Output

### Default Output Behavior

- By default, if a test passes, Rust’s test library captures anything printed to standard output.
- For example, `println!` output in a passing test is not shown in the terminal; only the line indicating the test passed is displayed.
- If a test fails, the output printed to standard output appears with the rest of the failure message.

