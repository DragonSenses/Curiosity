## Test Organization

### Overview

As mentioned at the start of the chapter, testing is a complex discipline, and different people use different terminology and organization. The Rust community thinks about tests in terms of two main categories: unit tests and integration tests.

### Unit Tests

*Unit tests* are small and more focused, testing one module in isolation at a time. They can test private interfaces, making them ideal for checking the internal workings of your code.

### Integration Tests

*Integration tests* are entirely external to your library. They use your code in the same way any other external code would, relying only on the public interface. These tests often exercise multiple modules per test, ensuring that the different parts of your library work together as expected.

### Importance of Both Test Types

Writing both kinds of tests is crucial to ensure that the pieces of your library are doing what you expect them to, both separately and together.

## Unit Tests

### Purpose

The purpose of unit tests is to test each unit of code in isolation from the rest of the code to quickly pinpoint where code is and isn’t working as expected. You’ll put unit tests in the *src* directory in each file with the code that they’re testing. The convention is to create a module named `tests` in each file to contain the test functions and to annotate the module with `cfg(test)`.

### The Tests Module and `#[cfg(test)]`

The `#[cfg(test)]` annotation on the tests module tells Rust to compile and run the test code only when you run `cargo test`, not when you run `cargo build`. This saves compile time when you only want to build the library and saves space in the resulting compiled artifact because the tests are not included. You’ll see that because integration tests go in a different directory, they don’t need the `#[cfg(test)]` annotation. However, because unit tests go in the same files as the code, you’ll use `#[cfg(test)]` to specify that they shouldn’t be included in the compiled result.