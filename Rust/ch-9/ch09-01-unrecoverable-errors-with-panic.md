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
