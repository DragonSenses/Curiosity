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

Reopen the `src/main.rs` file. You’ll be writing all the code in this file.

## Processing a Guess

The first part of the guessing game program will ask for user input, process that input, and check that the input is in the expected form. To start, we’ll allow the player to input a guess. Enter the code in Listing 2-1 into *src/main.rs*.

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
