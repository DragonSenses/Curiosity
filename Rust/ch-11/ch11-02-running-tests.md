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

### Example: Printing and Returning a Value

Listing 11-10 illustrates a function that prints the value of its parameter and returns 10, with a test that passes and a test that fails.

#### Listing 11-10: Tests for a function that calls `println!`

```rust
fn prints_and_returns_10(a: i32) -> i32 {
    println!("I got the value {a}");
    10
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn this_test_will_pass() {
        let value = prints_and_returns_10(4);
        assert_eq!(value, 10);
    }

    #[test]
    fn this_test_will_fail() {
        let value = prints_and_returns_10(8);
        assert_eq!(value, 5);
    }
}
```

### Running the Tests

When running these tests with `cargo test`, the output will be as follows:

```sh
$ cargo test
   Compiling silly-function v0.1.0 (file:///projects/silly-function)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/lib.rs (target/debug/deps/silly_function-160869f38cff9166)

running 2 tests
test tests::this_test_will_fail ... FAILED
test tests::this_test_will_pass ... ok

failures:

---- tests::this_test_will_fail stdout ----
I got the value 8
thread 'tests::this_test_will_fail' panicked at src/lib.rs:19:9:
assertion `left == right` failed
  left: 10
 right: 5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::this_test_will_fail

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```

### Output Explanation

- The output `I got the value 4` from the test that passes is not shown because it has been captured.
- The output `I got the value 8` from the test that fails is displayed in the test summary output, along with the cause of the test failure.

### Showing Output for Passing Tests

- To see printed values for passing tests, use the `--show-output` flag:

```sh
$ cargo test -- --show-output
```

### Output with `--show-output` Flag

When running the tests again with the `--show-output` flag, the output will be:

```sh
$ cargo test -- --show-output
   Compiling silly-function v0.1.0 (file:///projects/silly-function)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.60s
     Running unittests src/lib.rs (target/debug/deps/silly_function-160869f38cff9166)

running 2 tests
test tests::this_test_will_fail ... FAILED
test tests::this_test_will_pass ... ok

successes:

---- tests::this_test_will_pass stdout ----
I got the value 4


successes:
    tests::this_test_will_pass

failures:

---- tests::this_test_will_fail stdout ----
I got the value 8
thread 'tests::this_test_will_fail' panicked at src/lib.rs:19:9:
assertion `left == right` failed
  left: 10
 right: 5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::this_test_will_fail

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```

## Running a Subset of Tests by Name

### Choosing Specific Tests

Sometimes, running a full test suite can take a long time. If you’re working on code in a particular area, you might want to run only the tests pertaining to that code. You can choose which tests to run by passing `cargo test` the name or names of the test(s) you want to run as an argument.

### Example: `add_two` Function Tests

To demonstrate how to run a subset of tests, we’ll first create three tests for our `add_two` function, as shown in Listing 11-11, and choose which ones to run.

#### Listing 11-11: Three Tests with Three Different Names

```rust
pub fn add_two(a: usize) -> usize {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_two_and_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }

    #[test]
    fn add_three_and_two() {
        let result = add_two(3);
        assert_eq!(result, 5);
    }

    #[test]
    fn one_hundred() {
        let result = add_two(100);
        assert_eq!(result, 102);
    }
}
```

### Running All Tests

If we run the tests without passing any arguments, as we saw earlier, all the tests will run in parallel:

```sh
$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.62s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 3 tests
test tests::add_three_and_two ... ok
test tests::add_two_and_two ... ok
test tests::one_hundred ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

### Running Single Tests

We can pass the name of any test function to `cargo test` to run only that test:

```sh
$ cargo test one_hundred
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.69s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::one_hundred ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out; finished in 0.00s
```

Only the test with the name `one_hundred` ran; the other two tests didn’t match that name. The test output lets us know we had more tests that didn’t run by displaying `2 filtered out` at the end.

