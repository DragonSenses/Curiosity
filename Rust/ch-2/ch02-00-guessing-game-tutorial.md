# Programming a Guessing Game

- We're diving into Rust through a hands-on project.
- The chapter introduces common Rust concepts, demonstrated in a real program.
- Topics covered include `let`, `match`, methods, associated functions, and external crates.
- Subsequent chapters will explore these ideas further. For now, you'll just practice the fundamentals

We'll implement a classic beginner programming problem: a guessing game. Here's how it works, the program will:

1. Generate a random integer between 1 and 100.
2. Prompt the player to enter a guess.
3. Compare the guess with the generated number:
   - If the guess is too low, provide feedback.
   - If the guess is too high, provide feedback.
   - If the guess is correct, print a congratulatory message and exit.

## Setting Up a New Project

Navigate to your desired project directory (where you want to create the project). Make a new project using Cargo, like so:

```sh
$ cargo new guessing_game
$ cd guessing_game
```

1. The first command, `cargo new`, takes the name of the project (`guessing_game`) as the first argument. 
2. The second command changes to the new project's
directory.

Look at the generated *Cargo.toml* file:

**Filename**: `Cargo.toml`

```toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

- `cargo new` generates a "Hello, world!" program 
  
Check out the *src/main.rs* file

**Filename**: `src/main.rs`

```rust
fn main() {
    println!("Hello, world!");
}
```

- Use `cargo run` to both compile and execute the program in one step

```sh
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 1.50s
     Running `target/debug/guessing_game`
Hello, world!
```

The `run` command comes in handy when you need to rapidly iterate on a project, as we'll do in this game, quickly testing each iteration before moving on to the next one.

Reopen the `src/main.rs` file. You'll be writing all the code in this file.

## Processing a Guess

The first part of the guessing game program will ask for user input, process that input, and check that the input is in the expected form. To start, we'll allow the player to input a guess. Enter the code in Listing 2-1 into *src/main.rs*.

**Filename**: `src/main.rs`

```rust
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
```

Listing 2-1: Code that gets a guess from the user and prints 

Let's break down the Rust code:

1. **Importing the `io` Library:**
   - To handle input/output, we bring the `io` input/output library into scope:
     ```rust
     use std::io;
     ```
   - The `io` library comes from the standard library, known as `std`
   - By default, Rust has a set of items defined in the standard library that it brings into the scope of every program. This set is called the *prelude*, and you can see everything in it [in the standard library documentation](https://doc.rust-lang.org/std/prelude/index.html).
   - Rust's standard library (known as the *prelude*) provides default items, but if a type isn't in the prelude, we explicitly import it using `use`.

2. **The `main` Function:**
   - The `main` function serves as the entry point for the program:
     ```rust
     fn main() {
     ```
   - The `fn` syntax declares a new function
   - It has no parameters (indicated by empty parentheses) and starts with a curly bracket `{`, which starts the body of the function.

3. **Using `println!` for Output:**
   - The `println!` macro prints strings to the screen:
     ```rust
     println!("Guess the number!");
     println!("Please input your guess.");
     ```
   - These lines provide prompts for the game and request user input.

### Storing Values with Variables

Next, create a *variable* to store the user input, like this:

```rust
  let mut guess = String::new();
```

We use the `let` statement to create the variable. Here's another example:

```rust
let apples = 5;
```

- This line creates a new variable named `apples` and binds it to the value 5. 
- In Rust, variables are immutable by default, meaning once we give the variable a value, the value won't change. We'll be discussing this concept in detail in the ["Variables and Mutability"](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#variables-and-mutability) section in Chapter 3. 
 
To make a variable mutable, we add `mut` before the variable name:

```rust
let apples = 5; // immutable
let mut bananas = 5; // mutable
```

> Note: The `//` syntax starts a comment that continues until the end of the
> line. Rust ignores everything in comments. We'll discuss comments in more
> detail in [Chapter 3](https://doc.rust-lang.org/book/ch03-04-comments.html)

1. **Creating a Mutable String Variable:**
   - The line `let mut guess = String::new();` introduces a mutable variable named `guess`.
   - The equal sign (`=`) binds a value to the variable.
   - On the right side of the equal sign, we call `String::new()`, an associated function of the `String` type.
     - `String::new()` function returns a new instance of a `String`. 
   - [`String`](https://doc.rust-lang.org/std/string/struct.String.html) is a growable, UTF-8 encoded text type provided by the standard library.

2. **Understanding Associated Functions:**
   - The `::` syntax in the `::new` line indicates that `new` is an associated function of the `String` type
   - **Associated functions** is a function that's implemented on a type, in this case String. 
   - The `new` function creates a new, empty string.
   - You'll find a `new` function on many types because it's a common name for a function that makes a new value of some kind.

In summary, the line `let mut guess = String::new();` creates a mutable variable (`guess`) that is currently bound to a new, empty instance of a `String`.

### Receiving User Input

1. The program includes input/output functionality from the standard library by importing `std::io` with `use std::io;`.
2. To handle user input, it calls the `stdin()` function from the `io` module.
  ```rust
    io::stdin()
        .read_line(&mut guess)
  ```
  - If we hadn't imported the `io` library with `use std::io;` at the beginning of the program we could still use the function by writing this function call as `std::io::stdin`.
3. The `stdin()` function returns an instance of [`std::io::Stdin`](https://doc.rust-lang.org/std/io/struct.Stdin.html), representing a handle to the standard input for the terminal.
2. The line `.read_line(&mut guess)` invokes the [`read_line`](https://doc.rust-lang.org/std/io/struct.Stdin.html#method.read_line) method on the standard input handle to read input from the user.
3. The argument `&mut guess` specifies the mutable string where the user input will be stored.
4. The full job of `read_line` is to take whatever the user types into standard input and append that into a string (without overwriting its contents), so we therefore pass that string as an argument. The string argument needs to be mutable so the method can change the string's content.
5. The `&` indicates that this argument is a *reference*, which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times.

Remember that references in Rust are immutable by default, so we use `&mut guess` to make it mutable. For more details on references, refer to Chapter 4 of the Rust documentation.

### Handling Potential Failure with `Result`

We're still working on this line of code. We're now discussing a third line of text, but note that it's still part of a single logical line of code. The next part is this method:

```rust
        .expect("Failed to read line");
```

We could have written this code as:

```rust
io::stdin().read_line(&mut guess).expect("Failed to read line");
```

However, one long line is difficult to read, so it's best to divide it. It's often wise to introduce a newline and other whitespace to help break up long lines when you call a method with the `.method_name()` syntax. Now let's discuss what this line does.

`read_line` puts whatever the user enters into the string we pass to it, but it also returns a `Result` value. 

[`Result`](https://doc.rust-lang.org/std/result/enum.Result.html) is an [*enumeration*](https://doc.rust-lang.org/book/ch06-00-enums.html), often called an *enum*, which is a type that can be in one of multiple possible states. We call each possible state a *variant*. [Chapter 6](https://doc.rust-lang.org/book/ch06-00-enums.html) will cover enums in more detail. The purpose of these `Result` types is to encode error-handling information.

`Result`'s variants are `Ok` and `Err`. 
   - The `Ok` variant indicates the operation was successful and inside `Ok` is the successfully generated value. 
   - The `Err` variant means the operation failed, and `Err` contains information about how or why the operation failed.

Values of the `Result` type, like values of any type, have methods defined on them. An instance of `Result` has an [`expect` method](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect) that you can call. If this instance of `Result` is an `Err` value, `expect` will cause the program to crash and display the message that you passed as an argument to `expect`. If the `read_line` method returns an `Err`, it would likely be the result of an error coming from the underlying operating system.

If this instance of `Result` is an `Ok` value `expect` will take the return value that `Ok` is holding and return just that value to you so you can use it. In this case, that value is the number of bytes in the user's input.

If you don't call `expect`, the program will compile, but you'll get a warning:

```sh
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
warning: unused `Result` that must be used
  --> src/main.rs:10:5
   |
10 |     io::stdin().read_line(&mut guess);
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: this `Result` may be an `Err` variant, which should be handled
   = note: `#[warn(unused_must_use)]` on by default
help: use `let _ = ...` to ignore the resulting value
   |
10 |     let _ = io::stdin().read_line(&mut guess);
   |     +++++++

warning: `guessing_game` (bin "guessing_game") generated 1 warning
    Finished dev [unoptimized + debuginfo] target(s) in 0.59s
```

Rust warns that you haven't used the `Result` value returned from `read_line`, indicating that the program hasn't handled a possible error.

The right way to suppress the warning is to actually write error-handling code, but in our case we just want to crash this program when a problem occurs, so we can use `expect`. You'll learn about recovering from errors in [Chapter 9](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html).

#### Result recap

1. **What is `Result`?**
   - `Result` is a built-in enum in the Rust standard library.
   - It has two variants:
     - `Ok(T)`: Represents success and contains a value of type `T`.
     - `Err(E)`: Represents failure and contains an error of type `E`.

2. **Purpose of `Result`:**
   - `Result` is used for functions that can return an error.
   - It encodes error-handling information.

3. **Methods on `Result`:**
   - `expect`: If an instance of `Result` is an `Err` value, calling `expect` will crash the program and display the specified error message. If it's an `Ok` value, `expect` returns the contained value.
   - Example:
     ```rust
     let result: Result<i32, &str> = Ok(-3);
     let value = result.expect("An error occurred");
     ```

4. **Handling Warnings:**
   - When using `Result`, Rust warns if you don't handle the returned value.
   - To suppress the warning, you can use `let _ = ...` to ignore the result.
   - In our case, we're intentionally crashing the program with `expect`.
  
### Printing Values with `println!` Placeholders

Aside from the closing curly bracket, there's only one more line to discuss in the code so far:

```rust
    println!("You guessed: {}", guess);
```

1. `println!`: This is a Rust macro (denoted by the exclamation mark). It prints formatted text to the standard output (usually the console).
2. `"You guessed: {}"`: This is the format string. The `{}` acts as a placeholder for the value that will be inserted.
3. `, guess`: The comma-separated expression(s) following the format string provide the value(s) to be inserted into the placeholders. In this case, it inserts the value of the `guess` variable.

So, when executed, this line will print the user's guessed value along with the text "You guessed: ".

Printing a variable and the result of an expression in one call to `println!` would look like this:

```rust
let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);
```

This code would print `x = 5 and y + 2 = 12`.

### Testing the First Part

Let's test the first part of the guessing game. Run it using `cargo run`:

```sh
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 6.44s
     Running `target/debug/guessing_game`
Guess the number!
Please input your guess.
6
You guessed: 6
```

At this point, the first part of the game is done: we're getting input from the keyboard and then printing it.

## Generating a Secret Number

1. **Purpose:**
   - We want to create a secret number for the guessing game.
   - The secret number should be different each time to keep the game interesting.
   - We'll use a random number between 1 and 100.
  - Rust doesn't yet include random number functionality in its standard library. However, the Rust team does provide a [`rand` crate](https://crates.io/crates/rand) with said functionality.

2. **`rand` Crate:**
   - The `rand` crate provides utilities for random number generation in Rust.
   - It includes functions to generate random integers, floating-point numbers, and more.

3. **Example:**
   - To generate a random integer that fits in an `i8`, you can use:
     ```rust
     let random_i8: i8 = rand::random();
     ```
   - For a random floating-point number that fits in an `f32`, you can use similar methods.

### Using a Crate to Get More Functionality

Remember that a crate is a collection of Rust source code files. The project we've been building is a *binary crate*, which is an executable. The `rand` crate is a *library crate*, which contains code that is intended to be used in other programs and can't be executed on its own.

Cargo's coordination of external crates is where Cargo really shines. Before we can write code that uses `rand`, we need to modify the *Cargo.toml* file to include the `rand` crate as a dependency. Open that file now and add the following line to the bottom, beneath the `[dependencies]` section header that Cargo created for you. Be sure to specify `rand` exactly as we have here, with this version number, or the code examples in this tutorial may not work:

**Filename**: `Cargo.toml`

```toml
[dependencies]
rand = "0.8.5"
```

In the *Cargo.toml* file, everything that follows a header is part of that section that continues until another section starts. In `[dependencies]` you tell Cargo which external crates your project depends on and which versions of those crates you require. In this case, we specify the `rand` crate with the semantic version specifier `0.8.5`. Cargo understands [Semantic Versioning](http://semver.org/) (sometimes called *SemVer*), which is a standard for writing version numbers. The specifier `0.8.5` is actually shorthand for `^0.8.5`, which means any version that is at least 0.8.5 but below 0.9.0.

Cargo considers these versions to have public APIs compatible with version 0.8.5, and this specification ensures you'll get the latest patch release that will still compile with the code in this chapter. Any version 0.9.0 or greater is not guaranteed to have the same API as what the following examples use.

Now, without changing any of the code, let's build the project, as shown in Listing 2-2.

**Listing 2-2**: The output from running `cargo build` after adding the rand crate as a dependency

```sh
$ cargo build
    Updating crates.io index
  Downloaded rand v0.8.5
  Downloaded libc v0.2.127
  Downloaded getrandom v0.2.7
  Downloaded cfg-if v1.0.0
  Downloaded ppv-lite86 v0.2.16
  Downloaded rand_chacha v0.3.1
  Downloaded rand_core v0.6.3
   Compiling libc v0.2.127
   Compiling getrandom v0.2.7
   Compiling cfg-if v1.0.0
   Compiling ppv-lite86 v0.2.16
   Compiling rand_core v0.6.3
   Compiling rand_chacha v0.3.1
   Compiling rand v0.8.5
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53s
```

You may see different version numbers (but they will all be compatible with the code, thanks to SemVer!) and different lines (depending on the operating system), and the lines may be in a different order.

When we include an external dependency, Cargo fetches the latest versions of everything that dependency needs from the *registry*, which is a copy of data from [Crates.io](https://crates.io/). Crates.io is where people in the Rust ecosystem post their open source Rust projects for others to use.

After updating the registry, Cargo checks the `[dependencies]` section and downloads any crates listed that aren't already downloaded. In this case, although we only listed `rand` as a dependency, Cargo also grabbed other crates that `rand` depends on to work. After downloading the crates, Rust compiles them and then compiles the project with the dependencies available.

If you immediately run `cargo build` again without making any changes, you won't get any output aside from the `Finished` line. Cargo knows it has already downloaded and compiled the dependencies, and you haven't changed anything about them in your *Cargo.toml* file. Cargo also knows that you haven't changed anything about your code, so it doesn't recompile that either. With nothing to do, it simply exits.

If you open the *src/main.rs* file, make a trivial change, and then save it and build again, you'll only see two lines of output:

```sh
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53 secs
```

These lines show that Cargo only updates the build with your tiny change to the *src/main.rs* file. Your dependencies haven't changed, so Cargo knows it can reuse what it has already downloaded and compiled for those.

#### Ensuring Reproducible Builds with the *Cargo.lock* File

- **Cargo and Reproducible Builds**:
  - Cargo ensures that you can rebuild the same artifact consistently.
  - It uses only the versions of dependencies specified until you indicate otherwise.
  - When you build a project for the first time, Cargo determines compatible dependency versions and writes them to the `Cargo.lock` file.
  - The `Cargo.lock` file records dependency versions for reproducibility.
  - In subsequent builds, Cargo uses the versions specified in `Cargo.lock`, ensuring reproducibility.
  - In future builds, Cargo uses the versions specified in `Cargo.lock`.
  - This maintains consistency, and your project remains at a specific version until explicitly upgraded.
  - It's common practice to include the `Cargo.lock` file in source control.

#### Updating a Crate to Get a New Version

- **Updating Crates with Cargo**:
  - To update a crate, use `cargo update`.
  - It ignores the `Cargo.lock` file and finds the latest versions within your specified range in `Cargo.toml`.

  - Next `cargo build` will reevaluate dependencies based on the new version.

- **Example: Update rand Crate**
  - For example, if the `rand` crate has versions 0.8.6 and 0.9.0:
    - Running `cargo update` will update to 0.8.6.
```sh
$ cargo update
    Updating crates.io index
    Updating rand v0.8.5 -> v0.8.6
```
  - Cargo ignores the 0.9.0 release. At this point, you would also notice a change in your *Cargo.lock* file noting that the version of the `rand` crate you are now using is 0.8.6. 
  - To use `rand` version 0.9.0 or any version in the 0.9.*x* series, you'd have to update the *Cargo.toml* file to look like this instead:

  ```toml
  [dependencies]
  rand = "0.9.0"
  ```

  - The next time you run `cargo build`, Cargo will update the registry of crates available and reevaluate your `rand` requirements according to the new version you have specified.

- **Cargo Ecosystem**:
  - [Cargo](https://doc.rust-lang.org/cargo/) simplifies library reuse in Rust projects.
    - [Cargo ecosystem](https://doc.rust-lang.org/cargo/reference/publishing.html)
  - It allows assembling smaller projects from various packages.

### Generating a Random Number

Let's start using `rand` to generate a number to guess. The next step is to update *src/main.rs*, as shown in Listing 2-3.

**Listing 2-3**: Adding code to generate a random number

```rust
use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```

1. **Importing Dependencies**:
   - The code starts by importing the necessary dependencies:
     - `std::io` for input/output operations.
     - `rand::Rng` trait for random number generation.
       - The `Rng` trait defines methods that random number generators implement, and this trait must be in scope for us to use those methods.

2. **Random Number Generation**:
  - Next, we're adding two lines in the middle.
    - In the first line, we call the `rand::thread_rng` function that gives us the particular random number generator we're going to use: one that is local to the current thread of execution and is seeded by the operating system.
  - Then we call the `gen_range` method on the random number generator. 
    - This method is defined by the `Rng` trait that we brought into scope with the `use rand::Rng;` statement. 
    - The `gen_range` method takes a range expression as an argument and generates a random number in the range. 
    - The kind of range expression we're using here takes the form `start..=end` and is inclusive on the lower and upper bounds, so we need to specify `1..=100` to request a number between 1 and 100.

> Note: When working with Rust crates, it's essential to consult their documentation for guidance on using traits, methods, and functions. Cargo, the Rust package manager, provides a convenient feature: running `cargo doc --open` generates local documentation for all your dependencies and opens it in your browser. If you're interested in other functionality in the `rand` crate, for example, run `cargo doc --open` and click `rand` in the sidebar on the left.

The second new line prints the secret number. 

```rust
    println!("The secret number is: {secret_number}");
```

This is useful while we're developing the program to be able to test it, but we'll delete it from the final version. It's not much of a game if the program prints the answer as soon as it starts!

Try running the program a few times:

```sh
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 7
Please input your guess.
4
You guessed: 4

$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 83
Please input your guess.
5
You guessed: 5
```

You should get different random numbers, and they should all be numbers between 1 and 100.

## Comparing the Guess to the Secret Number

Now that we have user input and a random number, we can compare them. That step is shown in Listing 2-4. Note that this code won't compile just yet, as we will explain.

**Filename**: `src/main.rs`

```rust,ignore,does_not_compile
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    // --snip--

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}
```

**Listing 2-4**: Handling the possible return values of comparing two numbers

1. `std::cmp::Ordering`
  - First we add another `use` statement, bringing a type called `std::cmp::Ordering` into scope from the standard library. 
  - The `Ordering` type is another enum and has the variants `Less`, `Greater`, and `Equal`. 
    - These are the three outcomes that are possible when you compare two values.

2. `Ordering` type
  - Then we add five new lines at the bottom that use the `Ordering` type. 
  - The `cmp` method compares two values and can be called on anything that can be compared. 
    - It takes a reference to whatever you want to compare with: here it's comparing `guess` to `secret_number`. Then it returns a variant of the `Ordering` enum we brought into scope with the `use` statement. 
    - We use a [`match`](https://doc.rust-lang.org/book/ch06-02-match.html) expression to decide what to do next based on which variant of `Ordering` was returned from the call to `cmp` with the values in `guess` and `secret_number`.

3. `match` expression
  - A `match` expression is made up of *arms*. 
  - An arm consists of a *pattern* to match against, and the code that should be run if the value given to `match` fits that arm's pattern. 
  - Rust takes the value given to `match` and looks through each arm's pattern in turn. 

Patterns and the `match` construct are powerful Rust features: they let you express a variety of situations your code might encounter and they make sure you handle them all. These features will be covered in detail in Chapter 6 and Chapter 18, respectively.

**Example:** Let's walk through an example with the `match` expression we use here.

1. The user guesses 50, and the secret number is 38.
2. The `cmp` method compares 50 to 38 and returns `Ordering::Greater` because 50 is indeed greater than 38.
3. The `match` expression gets the `Ordering::Greater` value and evaluates each arm's pattern.
4. It checks the first arm's pattern, which is `Ordering::Less`. Since `Ordering::Greater` doesn't match `Ordering::Less`, it ignores the code in that arm and moves to the next arm.
5. The next arm's pattern is `Ordering::Greater`, which *does* match the value. Consequently, the associated code executes, printing `"Too big!"` to the screen.
6. The `match` expression ends after the first successful match, so it doesn't consider the last arm in this scenario.

However, the code in Listing 2-4 won't compile yet. Let's try it:

```sh
$ cargo build
   Compiling libc v0.2.86
   Compiling getrandom v0.2.2
   Compiling cfg-if v1.0.0
   Compiling ppv-lite86 v0.2.10
   Compiling rand_core v0.6.2
   Compiling rand_chacha v0.3.0
   Compiling rand v0.8.5
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
error[E0308]: mismatched types
  --> src/main.rs:22:21
   |
22 |     match guess.cmp(&secret_number) {
   |                 --- ^^^^^^^^^^^^^^ expected `&String`, found `&{integer}`
   |                 |
   |                 arguments to this method are incorrect
   |
   = note: expected reference `&String`
              found reference `&{integer}`
note: method defined here
  --> /rustc/07dca489ac2d933c78d3c5158e3f43beefeb02ce/library/core/src/cmp.rs:814:8

For more information about this error, try `rustc --explain E0308`.
error: could not compile `guessing_game` (bin "guessing_game") due to 1 previous error
```

The core of the error states that there are *mismatched types*. 

1. **Type Inference and Explicit Type Annotations:**
   - Rust has a **strong, static type system**, but it also supports **type inference**.
   - When we wrote `let mut guess = String::new()`, Rust inferred that `guess` should be a `String` without requiring us to explicitly specify the type.
   - However, the `secret_number` is a numeric type (e.g., `i32`, `u32`, or `i64`).
     - A few of Rust's number types can have a value between 1 and 100: `i32`, a 32-bit number; `u32`, an unsigned 32-bit number; `i64`, a 64-bit number; as well as others.
   - By default, Rust assumes `secret_number` is an `i32` unless we provide explicit type information elsewhere that would cause Rust to infer a different numerical type.

2. **The Error:**
   - The error occurs because Rust cannot directly compare a string (`guess`) and a numeric type (`secret_number`).

Ultimately, we want to convert the `String` the program reads as input into a number type so we can compare it numerically to the secret number. We do so by adding this line to the `main` function body:

**Filename**: `src/main.rs`

```rust,ignore
    // --snip--

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    let guess: u32 = guess.trim().parse().expect("Please type a number!");

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
```

The line is:

```rust,ignore
let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

We create a variable named `guess`. But wait, doesn't the program already have a variable named `guess`? It does, but helpfully Rust allows us to shadow the previous value of `guess` with a new one.

*Shadowing* lets us reuse the `guess` variable name rather than forcing us to create two unique variables, such as `guess_str` and `guess`.

1. **Variable Shadowing:**
   - When we create a new variable with the same name as an existing one, we're effectively "shadowing" the original variable.
   - Rust allows us to reuse the same variable name within a narrower scope, even if it was previously defined.
   - This feature is helpful because it avoids the need to invent new variable names (e.g., `guess_str` and `guess`) when we want to update or transform an existing value.

2. **Use Cases for Shadowing:**
   - Shadowing is commonly used when converting a value from one type to another.
   - For instance, we might start with a `String` named `guess`, but then shadow it with a new value of a different type (e.g., an integer) after parsing user input.

We'll cover the concept further in [Chapter 3](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#shadowing).

```rust,ignore
let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

Let's see how the `guess` variable is bound to the expression `guess.trim().parse()`:

1. **Binding the New Variable:**
   - We create a new variable named `guess` and bind it to the expression `guess.trim().parse()`.
   - The `guess` in the expression refers to the original `guess` variable that contained the user input as a string.

2. **Trimming Whitespace:**
   - The `trim` method is called on a `String` instance (the original `guess`).
   - It removes any leading or trailing whitespace from the string.
   - Trimming is necessary to compare the cleaned string to the `u32` type, which can only hold numerical data.

3. **Handling Newline Characters:**
   -  The user must press `[enter]` to satisfy `read_line` and input their guess
   - When the user presses `[enter]` after typing their guess, it adds a newline character (e.g., `\n`) to the string.
   - For example, if the user enters `[5]` and presses `[enter]`, the `guess` string looks like this: `5\n`.
   - On Windows, pressing `[enter]` results in a carriage return and a newline (`\r\n`).

4. **Result After Trimming:**
   - The `trim` method eliminates the newline character, resulting in just the numeric value `5`.

Info about the `parse` method, type annotations, and handling potential errors in Rust:

1. **The `parse` Method:**
   - The [`parse` method](https://doc.rust-lang.org/std/primitive.str.html#method.parse) converts a string to another type.
   - In our case, we use it to convert a string (user input) to a numeric value.

2. **Type Annotation (`let guess: u32`):**
   - We need to tell Rust the exact number type we want (via type annotation) by using `let guess: u32`. 
   - The colon (`:`) after `guess` indicates to Rust that we're annotating the variable's type.
   - Here, we choose `u32`, an unsigned 32-bit integer, as a good default choice for a small positive number.
   - You'll learn about other number types in [Chapter 3](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-types).
  
3. **Inference for `secret_number`:**
   - The `u32` annotation and the comparison with `secret_number` means Rust will infer that `secret_number` should be a `u32` as well.
   - Now the comparison will be between two values of the same type.

4. **Handling Errors with `Result`:**
   - The `parse` method will only work on characters that can logically be converted into numbers and so can easily cause errors. 
   - The `parse` method may fail if the string cannot logically be converted into a number (e.g., if it contains non-numeric characters like emojis).
   - If, for example, the string contained `A👍%`, there would be no way to convert that to a number. Because it might fail, the `parse` method returns a `Result` type, much as the `read_line` method does (discussed earlier in ["Handling Potential Failure with `Result`"](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html#handling-potential-failure-with-result)).
   - We'll treat this `Result` the same way by using the `expect` method again.
   - We use the `expect` method to handle potential errors:
     - If `parse` returns an `Err` variant because it couldn't create a number from the string, the program crashes and displays the specified error message.
     - If `parse` can successfully convert the string to a number, it returns the `Ok` variant of `Result`, and `expect` will return the number that we want from the `Ok` value.

Let's run the program now:

```sh
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 58
Please input your guess.
  76
You guessed: 76
Too big!
```

Nice! Even though spaces were added before the guess, the program still figured out that the user guessed 76. Run the program a few times to verify the different behavior with different kinds of input: guess the number correctly, guess a number that is too high, and guess a number that is too low.

We have most of the game working now, but the user can make only one guess. Let's change that by adding a loop!

