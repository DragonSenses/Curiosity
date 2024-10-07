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

When you're writing an example to illustrate some concept, including robust error-handling code can make the example less clear. In examples, it's understood that a call to a method like `unwrap` that could panic is meant as a placeholder for the way you'd want your application to handle errors, which can differ based on what the rest of your code is doing.

#### Prototype Code

Similarly, the `unwrap` and `expect` methods are very handy when prototyping, before you're ready to decide how to handle errors. They leave clear markers in your code for when you're ready to make your program more robust.

#### Tests

If a method call fails in a test, you'd want the whole test to fail, even if that method isn't the functionality under test. Because `panic!` is how a test is marked as a failure, calling `unwrap` or `expect` is exactly what should happen.

### Cases in Which You Have More Information Than the Compiler

#### Using `unwrap` or `expect` with Additional Logic

It is appropriate to call `unwrap` or `expect` when you have some other logic that ensures the `Result` will have an `Ok` value, but the logic isn't something the compiler understands. You'll still have a `Result` value that you need to handle: whatever operation you're calling still has the possibility of failing in general, even though it's logically impossible in your particular situation.

#### Ensuring No `Err` Variant

If you can ensure by manually inspecting the code that you'll never have an `Err` variant, it's perfectly acceptable to call `unwrap`, and even better to document the reason you think you'll never have an `Err` variant in the `expect` text. Here's an example:

```rust
use std::net::IpAddr;

let home: IpAddr = "127.0.0.1"
    .parse()
    .expect("Hardcoded IP address should be valid");
```

#### Example Explanation

We're creating an `IpAddr` instance by parsing a hardcoded string. We can see that `127.0.0.1` is a valid IP address, so it's acceptable to use `expect` here. However, having a hardcoded, valid string doesn't change the return type of the `parse` method: we still get a `Result` value, and the compiler will still make us handle the `Result` as if the `Err` variant is a possibility because the compiler isn't smart enough to see that this string is always a valid IP address.

#### Handling User Input

If the IP address string came from a user rather than being hardcoded into the program and therefore *did* have a possibility of failure, we'd definitely want to handle the `Result` in a more robust way instead. Mentioning the assumption that this IP address is hardcoded will prompt us to change `expect` to better error-handling code if, in the future, we need to get the IP address from some other source instead.

### Guidelines for Error Handling

#### When to Use `panic!`

It's advisable to have your code panic when it's possible that your code could end up in a bad state. In this context, a *bad state* is when some assumption, guarantee, contract, or invariant has been broken, such as when invalid values, contradictory values, or missing values are passed to your code—plus one or more of the following:

- The bad state is something that is unexpected, as opposed to something that will likely happen occasionally, like a user entering data in the wrong format.
- Your code after this point needs to rely on not being in this bad state, rather than checking for the problem at every step.
- There's not a good way to encode this information in the types you use. We'll work through an example of what we mean in the ["Encoding States and Behavior as Types"](https://doc.rust-lang.org/book/ch17-03-oo-design-patterns.html#encoding-states-and-behavior-as-types) section of Chapter 17.

#### Handling Invalid Values

If someone calls your code and passes in values that don't make sense, it's best to return an error if you can so the user of the library can decide what they want to do in that case. However, in cases where continuing could be insecure or harmful, the best choice might be to call `panic!` and alert the person using your library to the bug in their code so they can fix it during development. Similarly, `panic!` is often appropriate if you're calling external code that is out of your control and it returns an invalid state that you have no way of fixing.

#### Expected Failures

When failure is expected, it's more appropriate to return a `Result` than to make a `panic!` call. Examples include a parser being given malformed data or an HTTP request returning a status that indicates you have hit a rate limit. In these cases, returning a `Result` indicates that failure is an expected possibility that the calling code must decide how to handle.

#### Safety and Security

When your code performs an operation that could put a user at risk if it's called using invalid values, your code should verify the values are valid first and panic if the values aren't valid. This is mostly for safety reasons: attempting to operate on invalid data can expose your code to vulnerabilities. This is the main reason the standard library will call `panic!` if you attempt an out-of-bounds memory access: trying to access memory that doesn't belong to the current data structure is a common security problem.

#### Function Contracts

Functions often have *contracts*: their behavior is only guaranteed if the inputs meet particular requirements. Panicking when the contract is violated makes sense because a contract violation always indicates a caller-side bug, and it's not a kind of error you want the calling code to have to explicitly handle. In fact, there's no reasonable way for calling code to recover; the calling *programmers* need to fix the code. Contracts for a function, especially when a violation will cause a panic, should be explained in the API documentation for the function.

#### Using Rust's Type System

Having lots of error checks in all of your functions would be verbose and annoying. Fortunately, you can use Rust's type system (and thus the type checking done by the compiler) to do many of the checks for you. If your function has a particular type as a parameter, you can proceed with your code's logic knowing that the compiler has already ensured you have a valid value. For example, if you have a type rather than an `Option`, your program expects to have *something* rather than *nothing*. Your code then doesn't have to handle two cases for the `Some` and `None` variants: it will only have one case for definitely having a value. Code trying to pass nothing to your function won't even compile, so your function doesn't have to check for that case at runtime. Another example is using an unsigned integer type such as `u32`, which ensures the parameter is never negative.

### Guidelines for Error Handling | Summary

- **When to Use `panic!`**:
  - Use `panic!` when your code could end up in a bad state (e.g., invalid, contradictory, or missing values).
  - Bad state is unexpected and can't be easily encoded in types.
  - Example: Out-of-bounds memory access.

- **Handling Invalid Values**:
  - Return an error if possible to let the user decide how to handle it.
  - Use `panic!` if continuing could be insecure or harmful.
  - Example: Calling external code that returns an invalid state.

- **Expected Failures**:
  - Return a `Result` for expected failures (e.g., malformed data, rate limits).
  - Indicates that failure is an expected possibility.

- **Safety and Security**:
  - Verify values are valid before performing operations that could put a user at risk.
  - Use `panic!` for invalid values to prevent vulnerabilities.

- **Function Contracts**:
  - Functions have contracts that guarantee behavior if inputs meet requirements.
  - Panicking on contract violations indicates a caller-side bug.
  - Document contracts in API documentation.

- **Using Rust's Type System**:
  - Use Rust's type system to perform checks at compile time.
  - Example: Using a type instead of `Option` to ensure a value is always present.
  - Example: Using unsigned integers to prevent negative values.

### Creating Custom Types for Validation

#### Introduction

Using Rust's type system to ensure valid values can be taken a step further by creating custom types for validation. For example, in the guessing game from Chapter 2, we asked the user to guess a number between 1 and 100 but didn't validate the range of the guess. Enhancing this validation can guide users toward valid guesses and handle out-of-range guesses differently from invalid inputs like letters.

#### Initial Approach

One way to validate the guess is to parse it as an `i32` (to allow potentially negative numbers) and then check if the number is within the valid range:

<span class="filename">Filename: src/main.rs</span>

```rust
loop {
    // --snip--

    let guess: i32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

    if guess < 1 || guess > 100 {
        println!("The secret number will be between 1 and 100.");
        continue;
    }

    match guess.cmp(&secret_number) {
        // --snip--
    }
}
```

The `if` expression checks if the value is out of range, informs the user, and calls `continue` to prompt for another guess. After this check, we can safely compare `guess` with the secret number.

#### Limitations of the Initial Approach

This approach is not ideal for several reasons:
- If the program must operate only on values between 1 and 100, repeating this check in every function is tedious and might impact performance.

#### Creating a Custom Type

A better solution is to create a new type and put the validations in a function that creates an instance of this type. This ensures that functions using the new type can confidently rely on the validity of the values they receive. Here's how to define a `Guess` type that only allows values between 1 and 100:

<span class="filename">Filename: src/lib.rs</span>

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}
```

<span class="caption">Listing 9-13: A `Guess` type that will only continue with values between 1 and 100</span>

#### Defining the Struct

First, we define a struct named `Guess` that has a field named `value` that holds an `i32`. This is where the number will be stored.

```rust
pub struct Guess {
    value: i32,
}
```

#### Implementing the `new` Function

Next, we implement an associated function named `new` on `Guess` that creates instances of `Guess` values. The `new` function is defined to have one parameter named `value` of type `i32` and to return a `Guess`.

```rust
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
}
```

The code in the body of the `new` function tests `value` to make sure it's between 1 and 100. If `value` doesn't pass this test, we make a `panic!` call, which will alert the programmer who is writing the calling code that they have a bug they need to fix. Creating a `Guess` with a `value` outside this range would violate the contract that `Guess::new` is relying on. The conditions in which `Guess::new` might panic should be discussed in its public-facing API documentation. If `value` does pass the test, we create a new `Guess` with its `value` field set to the `value` parameter and return the `Guess`.

#### Implementing the `value` Method

We then implement a method named `value` that borrows `self`, doesn't have any other parameters, and returns an `i32`. This kind of method is sometimes called a *getter* because its purpose is to get some data from its fields and return it.

```rust
impl Guess {
    pub fn value(&self) -> i32 {
        self.value
    }
}
```

This public method is necessary because the `value` field of the `Guess` struct is private. It's important that the `value` field be private so code using the `Guess` struct is not allowed to set `value` directly: code outside the module *must* use the `Guess::new` function to create an instance of `Guess`, thereby ensuring there's no way for a `Guess` to have a `value` that hasn't been checked by the conditions in the `Guess::new` function.

#### Using the `Guess` Type

A function that has a parameter or returns only numbers between 1 and 100 could then declare in its signature that it takes or returns a `Guess` rather than an `i32` and wouldn't need to do any additional checks in its body.

## Summary: Error Handling

### Comprehensive Summary

Rust's error-handling features are designed to help you write more robust and reliable code. These features include the `panic!` macro and the `Result` enum, each serving distinct purposes in managing errors and ensuring your program behaves correctly under various conditions.

#### The `panic!` Macro

The `panic!` macro is used to signal that your program has encountered a state it cannot handle. When `panic!` is called, it stops the execution of your program, preventing it from proceeding with invalid or incorrect values. This is particularly useful in situations where continuing execution could lead to more severe errors or undefined behavior. By using `panic!`, you can ensure that your program halts immediately when it encounters an unrecoverable error, allowing you to catch and fix bugs early in the development process.

#### The `Result` Enum

The `Result` enum leverages Rust's type system to indicate that an operation might fail in a way that your code can potentially recover from. The `Result` enum has two variants: `Ok` for successful operations and `Err` for errors. By returning a `Result`, your functions can communicate to the calling code that it needs to handle both success and failure cases. This approach encourages more robust error handling and makes your code more resilient to unexpected conditions.

#### Using `panic!` and `Result` Appropriately

Using `panic!` and `Result` in the appropriate situations is crucial for writing reliable Rust code. Here are some guidelines:

- **Use `panic!`**:
  - When your program encounters an unrecoverable error.
  - When continuing execution could lead to more severe issues.
  - To signal bugs that need to be fixed during development.

- **Use `Result`**:
  - When an operation might fail, but the failure is something the calling code can handle.
  - To provide more flexibility in error handling.
  - To allow the calling code to decide how to respond to different error conditions.

By following these guidelines, you can make your code more reliable and easier to maintain. Proper error handling ensures that your program can gracefully handle unexpected situations and continue to function correctly.

#### Moving Forward with Generics

Now that you've seen how the standard library uses generics with the `Option` and `Result` enums, the next step is to understand how generics work and how you can use them in your code. Generics allow you to write more flexible and reusable code by enabling functions, structs, enums, and traits to operate on different data types while maintaining type safety.
