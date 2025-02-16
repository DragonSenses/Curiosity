## Test Organization

### Overview

As mentioned at the start of the chapter, testing is a complex discipline, and different people use different terminology and organization. The Rust community thinks about tests in terms of two main categories: unit tests and integration tests.

### Unit Tests

*Unit tests* are small and more focused, testing one module in isolation at a time. They can test private interfaces, making them ideal for checking the internal workings of your code.

### Integration Tests

*Integration tests* are entirely external to your library. They use your code in the same way any other external code would, relying only on the public interface. These tests often exercise multiple modules per test, ensuring that the different parts of your library work together as expected.

### Importance of Both Test Types

Writing both kinds of tests is crucial to ensure that the pieces of your library are doing what you expect them to, both separately and together.