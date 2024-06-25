## Variables and Mutability

1. **Immutability in Rust:**
   - By default, variables in Rust are immutable.
   - Immutability encourages safe and concurrent code.
   - Rust nudges developers toward writing code that takes advantage of safety features.
   - However, you can still make variables mutable if needed.

2. **Illustrating Immutability:**
   - When a variable is immutable, its value cannot be changed after binding.
   - To demonstrate this, create a new project named "variables" in your projects directory using `cargo new variables`.
   - Then, in your new *variables* directory, open *src/main.rs* and replace its code with the following code, which won’t compile just yet:

**Filename**: `src/main.rs`

```rust,ignore,does_not_compile
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

Save and run the program using `cargo run`. You should receive an error message
regarding an immutability error, as shown in this output:

```sh
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     println!("The value of x is: {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
error: could not compile `variables` (bin "variables") due to 1 previous error
```

1. **Compiler Error Explanation:**
   - The example demonstrates a compiler error encountered during the execution of `cargo run`.
   - Compiler errors indicate that your program isn't safely behaving as intended, but they don't imply that you're a bad programmer.
   - Even experienced Rust developers encounter compiler errors.

2. **Specific Error Message (E0384):**
   - The error message states: ``"cannot assign twice to immutable variable `x`."``
   - You attempted to assign a second value to an immutable variable named `x`.
   - Immutability ensures that values won't change once assigned.

3. **Importance of Immutability:**
   - Compile-time errors prevent situations where assumptions about value immutability lead to bugs.
   - If code relies on a value not changing, the Rust compiler guarantees this behavior.
   - Immutability improves code reasoning and reduces the risk of subtle bugs.

4. **Using Mutable Variables (`mut`):**
   - Although variables are immutable by default, you can make them mutable by adding `mut` before the variable name.
   - Indicating mutability with `mut` clarifies intent for future readers of the code.

For example, let’s change *src/main.rs* to the following:

**Filename**: `src/main.rs`

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

When we run the program now, we get this:

```sh
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
    Finished dev [unoptimized + debuginfo] target(s) in 0.30s
     Running `target/debug/variables`
The value of x is: 5
The value of x is: 6
```

We’re allowed to change the value bound to `x` from `5` to `6` when `mut` is used. Ultimately, deciding whether to use mutability or not is up to you and depends on what you think is clearest in that particular situation.

