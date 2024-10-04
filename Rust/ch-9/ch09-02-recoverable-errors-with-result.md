## Recoverable Errors with `Result`

### Introduction

Most errors aren't serious enough to require the program to stop entirely. Sometimes when a function fails, it's for a reason that you can easily interpret and respond to. For example, if you try to open a file and that operation fails because the file doesn't exist, you might want to create the file instead of terminating the process.

### The `Result` Enum

Recall from ["Handling Potential Failure with `Result`"](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html#handling-potential-failure-with-result) in Chapter 2 that the `Result` enum is defined as having two variants, `Ok` and `Err`, as follows:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```
### Generic Type Parameters

The `T` and `E` are generic type parameters. We'll discuss generics in more detail in Chapter 10. What you need to know right now is that `T` represents the type of the value that will be returned in a success case within the `Ok` variant, and `E` represents the type of the error that will be returned in a failure case within the `Err` variant. Because `Result` has these generic type parameters, we can use the `Result` type and the functions defined on it in many different situations where the success value and error value we want to return may differ.

### Example: Opening a File

Let's call a function that returns a `Result` value because the function could fail. In Listing 9-3, we try to open a file.

#### Filename: src/main.rs

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");
}
```

#### Listing 9-3: Opening a file

The return type of `File::open` is a `Result<T, E>`. The generic parameter `T` has been filled in by the implementation of `File::open` with the type of the success value, `std::fs::File`, which is a file handle. The type of `E` used in the error value is `std::io::Error`. This return type means the call to `File::open` might succeed and return a file handle that we can read from or write to. The function call also might fail: for example, the file might not exist, or we might not have permission to access the file. The `File::open` function needs to have a way to tell us whether it succeeded or failed and at the same time give us either the file handle or error information. This information is exactly what the `Result` enum conveys.

## Handling `Result` with `match`

### Success and Failure Cases

In the case where `File::open` succeeds, the value in the variable `greeting_file_result` will be an instance of `Ok` that contains a file handle. In the case where it fails, the value in `greeting_file_result` will be an instance of `Err` that contains more information about the kind of error that occurred.

### Adding Error Handling

We need to add to the code in Listing 9-3 to take different actions depending on the value `File::open` returns. Listing 9-4 shows one way to handle the `Result` using a basic tool, the `match` expression that we discussed in Chapter 6.

#### Filename: src/main.rs

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {error:?}"),
    };
}
```

#### Listing 9-4: Using a `match` expression to handle the `Result` variants that might be returned

### Scope of `Result` Enum

Note that, like the `Option` enum, the `Result` enum and its variants have been brought into scope by the prelude, so we don't need to specify `Result::` before the `Ok` and `Err` variants in the `match` arms.

### Explanation of `match` Expression

When the result is `Ok`, this code will return the inner `file` value out of the `Ok` variant, and we then assign that file handle value to the variable `greeting_file`. After the `match`, we can use the file handle for reading or writing.

The other arm of the `match` handles the case where we get an `Err` value from `File::open`. In this example, we've chosen to call the `panic!` macro. If there's no file named *hello.txt* in our current directory and we run this code, we'll see the following output from the `panic!` macro:

```sh
$ cargo run
   Compiling error-handling v0.1.0 (file:///projects/error-handling)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.73s
     Running `target/debug/error-handling`
thread 'main' panicked at src/main.rs:8:23:
Problem opening the file: Os { code: 2, kind: NotFound, message: "No such file or directory" }
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

### Output Explanation

As usual, this output tells us exactly what has gone wrong.

## Matching on Different Errors

The code in Listing 9-4 will `panic!` no matter why `File::open` failed. However, we want to take different actions for different failure reasons. If `File::open` failed because the file doesn't exist, we want to create the file and return the handle to the new file. If `File::open` failed for any other reason—for example, because we didn't have permission to open the file—we still want the code to `panic!` in the same way it did in Listing 9-4. For this, we add an inner `match` expression, shown in Listing 9-5.

#### Filename: src/main.rs

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {e:?}"),
            },
            other_error => panic!("Problem opening the file: {other_error:?}"),
        },
    };
}
```

#### Listing 9-5: Handling different kinds of errors in different ways

### Error Handling with `io::Error`

The type of the value that `File::open` returns inside the `Err` variant is `io::Error`, which is a struct provided by the standard library. This struct has a method `kind` that we can call to get an `io::ErrorKind` value. The enum `io::ErrorKind` is provided by the standard library and has variants representing the different kinds of errors that might result from an `io` operation. The variant we want to use is `ErrorKind::NotFound`, which indicates the file we're trying to open doesn't exist yet. So we match on `greeting_file_result`, but we also have an inner match on `error.kind()`.

### Inner `match` Expression

The condition we want to check in the inner match is whether the value returned by `error.kind()` is the `NotFound` variant of the `ErrorKind` enum. If it is, we try to create the file with `File::create`. However, because `File::create` could also fail, we need a second arm in the inner `match` expression. When the file can't be created, a different error message is printed. The second arm of the outer `match` stays the same, so the program panics on any error besides the missing file error.

### Matching on Different Errors | Key Points

1. **Different Actions for Different Errors**:
   - Instead of panicking for all errors, handle specific errors differently.
   - For example, if a file doesn't exist, create it; otherwise, panic.

2. **Using `io::Error` and `io::ErrorKind`**:
   - `File::open` returns an `io::Error` inside the `Err` variant.
   - Use the `kind` method on `io::Error` to get an `io::ErrorKind` value.

3. **Matching on `ErrorKind`**:
   - Match on the result of `File::open`.
   - Use an inner `match` to handle specific `ErrorKind` variants.
   - For `ErrorKind::NotFound`, attempt to create the file.
   - For other errors, panic with an appropriate message.

4. **Example Code**:
   - Demonstrates how to use nested `match` expressions to handle different error kinds.

5. **Handling File Creation Errors**:
   - When trying to create a file, handle potential errors from `File::create`.
   - Provide a specific error message if file creation fails.


### Alternatives to Using `match` with `Result<T, E>`

That's a lot of `match`! The `match` expression is very useful but also very much a primitive. In Chapter 13, you'll learn about closures, which are used with many of the methods defined on `Result<T, E>`. These methods can be more concise than using `match` when handling `Result<T, E>` values in your code.

#### Using Closures and `unwrap_or_else`

For example, here's another way to write the same logic as shown in Listing 9-5, this time using closures and the `unwrap_or_else` method:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {error:?}");
            })
        } else {
            panic!("Problem opening the file: {error:?}");
        }
    });
}
```

#### Benefits of Using `unwrap_or_else`

Although this code has the same behavior as Listing 9-5, it doesn't contain any `match` expressions and is cleaner to read. 

#### Further Reading

Come back to this example after you've read Chapter 13, and look up the `unwrap_or_else` method in the standard library documentation. Many more of these methods can clean up huge nested `match` expressions when you're dealing with errors.

### Shortcuts for Panic on Error: `unwrap` and `expect`

Using `match` works well enough, but it can be a bit verbose and doesn't always communicate intent well. The `Result<T, E>` type has many helper methods defined on it to do various, more specific tasks.

#### The `unwrap` Method

The `unwrap` method is a shortcut implemented just like the `match` expression we wrote in Listing 9-4. If the `Result` value is the `Ok` variant, `unwrap` will return the value inside the `Ok`. If the `Result` is the `Err` variant, `unwrap` will call the `panic!` macro for us. Here is an example of `unwrap` in action:

#### Filename: src/main.rs

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}
```

#### Example Output

If we run this code without a *hello.txt* file, we'll see an error message from the `panic!` call that the `unwrap` method makes:

```sh
thread 'main' panicked at src/main.rs:4:49:
called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }
```

#### The `expect` Method

Similarly, the `expect` method lets us also choose the `panic!` error message. Using `expect` instead of `unwrap` and providing good error messages can convey your intent and make tracking down the source of a panic easier. The syntax of `expect` looks like this:

#### Filename: src/main.rs

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}
```

#### Example Output

We use `expect` in the same way as `unwrap`: to return the file handle or call the `panic!` macro. The error message used by `expect` in its call to `panic!` will be the parameter that we pass to `expect`, rather than the default `panic!` message that `unwrap` uses. Here's what it looks like:

```sh
thread 'main' panicked at src/main.rs:5:10:
hello.txt should be included in this project: Os { code: 2, kind: NotFound, message: "No such file or directory" }
```

#### Best Practices

In production-quality code, most Rustaceans choose `expect` rather than `unwrap` and give more context about why the operation is expected to always succeed. That way, if your assumptions are ever proven wrong, you have more information to use in debugging.

### Propagating Errors

When a function's implementation calls something that might fail, instead of handling the error within the function itself, you can return the error to the calling code so that it can decide what to do. This is known as *propagating* the error and gives more control to the calling code, where there might be more information or logic that dictates how the error should be handled than what you have available in the context of your code.

### Example: Reading a Username from a File

For example, Listing 9-6 shows a function that reads a username from a file. If the file doesn't exist or can't be read, this function will return those errors to the code that called the function.

#### Filename: src/main.rs

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

#### Listing 9-6: A function that returns errors to the calling code using `match`

### Explanation

- **Error Propagation**: Instead of handling errors within the function, return them to the caller.
- **Control to Calling Code**: This approach gives more control to the calling code, which might have more context or logic to handle the error appropriately.
- **Example Function**: The example function attempts to read a username from a file and propagates any errors encountered during file opening or reading.

### Example Breakdown

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

This function can be written in a much shorter way, but we're going to start by doing a lot of it manually in order to explore error handling. At the end, we'll show the shorter way.

### Return Type

The return type of the function is `Result<String, io::Error>`. This means the function returns a value of the type `Result<T, E>`, where:
- `T` is the concrete type `String`
- `E` is the concrete type `io::Error`

### Success and Error Handling

- **Success**: If the function succeeds, the calling code receives an `Ok` value containing a `String` (the `username` read from the file).
- **Error**: If the function encounters any problems, the calling code receives an `Err` value containing an instance of `io::Error` with more information about the problem.

### Error Type Choice

We chose `io::Error` as the return type because it is the type of the error value returned from both operations in the function that might fail:
- `File::open`
- `read_to_string`

### Function Body

1. **Opening the File**:
   - The function starts by calling `File::open`.
   - The `Result` value is handled with a `match`.
   - If `File::open` succeeds, the file handle is assigned to `username_file`.
   - If `File::open` fails, the function returns early with the error value.

2. **Reading the File**:
   - If the file handle is valid, a new `String` is created in `username`.
   - The `read_to_string` method is called on the file handle to read the contents into `username`.
   - The `Result` from `read_to_string` is handled with another `match`.
   - If `read_to_string` succeeds, the function returns the `username` wrapped in an `Ok`.
   - If `read_to_string` fails, the function returns the error value.

### Handling the Result

The calling code will handle either:
- An `Ok` value containing a username
- An `Err` value containing an `io::Error`

### Calling Code's Responsibility

The calling code decides what to do with the values:
- It could call `panic!` and crash the program.
- Use a default username.
- Look up the username from another source.

### Propagating Errors

This pattern of propagating errors is common in Rust. Rust provides the question mark operator `?` to make this easier.

### A Shortcut for Propagating Errors: the `?` Operator

#### Introduction

Listing 9-7 shows an implementation of `read_username_from_file` that has the same functionality as in Listing 9-6, but this implementation uses the `?` operator.

#### Filename: `src/main.rs`

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```
*Listing 9-7: A function that returns errors to the calling code using the `?` operator*

#### Explanation of the `?` Operator

- **Functionality**: The `?` operator works similarly to the `match` expressions used to handle `Result` values.
- **Success Case**: If the `Result` is `Ok`, the value inside `Ok` is returned, and the program continues.
- **Error Case**: If the `Result` is `Err`, the `Err` is returned from the function, propagating the error to the calling code.

#### Difference from `match`

- **Conversion**: The `?` operator calls the `from` function from the `From` trait to convert error types.
- **Utility**: This is useful when a function returns one error type to represent multiple failure reasons.

#### Custom Error Type Example

- **Custom Error**: You can define a custom error type, e.g., `OurError`.
- **Conversion Implementation**: Implement `From<io::Error>` for `OurError`.
- **Automatic Conversion**: The `?` operator will convert `io::Error` to `OurError` using the `from` function.

#### Context of Listing 9-7

- **File Opening**: The `?` after `File::open` returns the `Ok` value to `username_file` or propagates the `Err`.
- **Reading File**: The `?` after `read_to_string` does the same for reading the file contents.

#### Simplification

- **Boilerplate Reduction**: The `?` operator reduces boilerplate code.
- **Further Shortening**: Method calls can be chained immediately after the `?`, as shown in Listing 9-8.

### Chaining Method Calls with the `?` Operator

#### Filename: `src/main.rs`
```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
```
*Listing 9-8: Chaining method calls after the `?` operator*

#### Explanation

- **String Initialization**: The creation of the new `String` in `username` is moved to the beginning of the function.
- **Chaining Calls**: Instead of creating a variable `username_file`, the call to `read_to_string` is chained directly onto the result of `File::open("hello.txt")?`.
- **Error Handling**: The `?` operator is used at the end of the `read_to_string` call to propagate any errors.
- **Return Value**: The function returns an `Ok` value containing `username` when both `File::open` and `read_to_string` succeed.

#### Functionality

- The functionality remains the same as in Listings 9-6 and 9-7.
- This approach is more ergonomic and concise.

### Using `fs::read_to_string`

#### Filename: `src/main.rs`

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```
*Listing 9-9: Using `fs::read_to_string` instead of opening and then reading the file*

#### Explanation

- **Convenience**: The standard library provides the `fs::read_to_string` function for reading a file into a string.
- **Functionality**: This function opens the file, creates a new `String`, reads the contents into the `String`, and returns it.
- **Simplification**: Using `fs::read_to_string` simplifies the code further by eliminating the need to manually handle file opening and reading.

#### Summary

- **Error Handling**: The `?` operator simplifies error propagation.
- **Ergonomics**: Chaining method calls and using `fs::read_to_string` make the code more concise and readable.
- **Educational Value**: The longer approach was used initially to explain error handling in detail.
