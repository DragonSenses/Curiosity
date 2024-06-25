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