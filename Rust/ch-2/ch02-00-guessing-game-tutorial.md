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

```rust,ignore
  let mut guess = String::new();
```

We use the `let` statement to create the variable. Here's another example:

```rust,ignore
let apples = 5;
```

- This line creates a new variable named `apples` and binds it to the value 5. 
- In Rust, variables are immutable by default, meaning once we give the variable a value, the value won't change. We'll be discussing this concept in detail in the ["Variables and Mutability"](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#variables-and-mutability) section in Chapter 3. 
 
To make a variable mutable, we add `mut` before the variable name:

```rust,ignore
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
  ```rust,ignore
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

