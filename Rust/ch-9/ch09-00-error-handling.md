# Error Handling

Errors are a fact of life in software, so Rust has a number of features for handling situations in which something goes wrong. In many cases, Rust requires you to acknowledge the possibility of an error and take some action before your code will compile. This requirement makes your program more robust by ensuring that you'll discover errors and handle them appropriately before you've deployed your code to production!

Rust groups errors into two major categories: *recoverable* and *unrecoverable* errors. For a recoverable error, such as a *file not found* error, we most likely just want to report the problem to the user and retry the operation. Unrecoverable errors are always symptoms of bugs, such as trying to access a location beyond the end of an array, and so we want to immediately stop the program.

Most languages don't distinguish between these two kinds of errors and handle both in the same way, using mechanisms such as exceptions. Rust doesn't have exceptions. Instead, it has the type `Result<T, E>` for recoverable errors and the `panic!` macro that stops execution when the program encounters an unrecoverable error. This chapter covers calling `panic!` first and then talks about returning `Result<T, E>` values. Additionally, we'll explore considerations when deciding whether to try to recover from an error or to stop execution.

## Error Handling | Overview

### Importance of Error Handling

Errors are a fact of life in software, so Rust has a number of features for handling situations in which something goes wrong. Rust requires you to acknowledge the possibility of an error and take some action before your code will compile. This requirement makes your program more robust by ensuring that you'll discover errors and handle them appropriately before deploying your code to production.

### Categories of Errors

Rust groups errors into two major categories:
- **Recoverable Errors**: Errors that can be handled and recovered from, such as a *file not found* error. In these cases, you might want to report the problem to the user and retry the operation.
- **Unrecoverable Errors**: Errors that are symptoms of bugs, such as trying to access a location beyond the end of an array. These errors should cause the program to stop immediately.

### Error Handling in Other Languages

Most languages don't distinguish between these two kinds of errors and handle both in the same way, using mechanisms such as exceptions.

### Rust's Approach to Error Handling

Rust doesn't have exceptions. Instead, it uses:
- **`Result<T, E>`**: For recoverable errors.
- **`panic!` Macro**: For unrecoverable errors that stop execution.

### Detailed Topics

This chapter covers:
1. **Calling `panic!`**: How and when to use the `panic!` macro.
2. **Returning `Result<T, E>` Values**: How to handle recoverable errors using the `Result` type.
3. **Considerations**: Deciding whether to try to recover from an error or to stop execution.
