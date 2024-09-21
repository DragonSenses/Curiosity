## Unrecoverable Errors with `panic!`

### Introduction

Sometimes bad things happen in your code, and there's nothing you can do about it. In these cases, Rust has the `panic!` macro.

### Causes of Panic

There are two ways to cause a panic in practice:
1. **Implicit Panic**: By taking an action that causes our code to panic (such as accessing an array past the end).
2. **Explicit Panic**: By explicitly calling the `panic!` macro.

### Panic Behavior

In both cases, we cause a panic in our program. By default, these panics will:
- Print a failure message.
- Unwind and clean up the stack.
- Quit the program.

### Debugging Panics

Via an environment variable, you can also have Rust display the call stack when a panic occurs to make it easier to track down the source of the panic.

### Unwinding the Stack or Aborting in Response to a Panic

By default, when a panic occurs the program starts *unwinding*, which means Rust walks back up the stack and cleans up the data from each function it encounters. However, walking back and cleaning up is a lot of work. Rust, therefore, allows you to choose the alternative of immediately *aborting*, which ends the program without cleaning up.

Memory that the program was using will then need to be cleaned up by the operating system. If in your project you need to make the resultant binary as small as possible, you can switch from unwinding to aborting upon a panic by adding `panic = 'abort'` to the appropriate `[profile]` sections in your Cargo.toml file. For example, if you want to abort on panic in release mode, add this:

```toml
[profile.release]
panic = 'abort'
```

### Example: Calling `panic!` in a Simple Program

Let's try calling `panic!` in a simple program:

**Filename:** `src/main.rs`

```rust,should_panic,panics
fn main() {
  panic!("crash and burn");
}
```

### Running the Program

When you run the program, you'll see something like this:

```sh
$ cargo run
   Compiling panic v0.1.0 (file:///projects/panic)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.25s
     Running `target/debug/panic`
thread 'main' panicked at src/main.rs:2:5:
crash and burn
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

### Explanation

The call to `panic!` causes the error message contained in the last two lines. The first line shows our panic message and the place in our source code where the panic occurred: `src/main.rs:2:5` indicates that it's the second line, fifth character of our `src/main.rs` file.

In this case, the line indicated is part of our code, and if we go to that line, we see the `panic!` macro call. In other cases, the `panic!` call might be in code that our code calls, and the filename and line number reported by the error message will be someone else's code where the `panic!` macro is called, not the line of our code that eventually led to the `panic!` call.

