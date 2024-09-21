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

## Using Backtrace to Debug `panic!`

We can use the backtrace of the functions the `panic!` call came from to figure out the part of our code that is causing the problem. To understand how to use a `panic!` backtrace, let's look at another example and see what it's like when a `panic!` call comes from a library because of a bug in our code instead of from our code calling the macro directly.

### Example Code

**Filename:** `src/main.rs`

```rust,should_panic,panics
fn main() {
    let v = vec![1, 2, 3];

    v[99];
}
```

### Explanation

**Listing 9-1:** Attempting to access an element beyond the end of a vector, which will cause a call to `panic!`.

Here, we're attempting to access the 100th element of our vector (which is at index 99 because indexing starts at zero), but the vector has only three elements. In this situation, Rust will panic. Using `[]` is supposed to return an element, but if you pass an invalid index, there's no element that Rust could return here that would be correct.

## Undefined Behavior in C vs. Rust's Safety

In C, attempting to read beyond the end of a data structure is undefined behavior. You might get whatever is at the location in memory that would correspond to that element in the data structure, even though the memory doesn't belong to that structure. This is called a *buffer overread* and can lead to security vulnerabilities if an attacker is able to manipulate the index in such a way as to read data they shouldn't be allowed to that is stored after the data structure.

### Rust's Approach

To protect your program from this sort of vulnerability, if you try to read an element at an index that doesn't exist, Rust will stop execution and refuse to continue. Let's try it and see:

### Running the Program

```sh
$ cargo run
   Compiling panic v0.1.0 (file:///projects/panic)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.27s
     Running `target/debug/panic`
thread 'main' panicked at src/main.rs:4:6:
index out of bounds: the len is 3 but the index is 99
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

