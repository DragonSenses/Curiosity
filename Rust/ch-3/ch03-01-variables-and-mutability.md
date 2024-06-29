## Variables and Mutability

1. **Immutability in Rust:**
   - By default, variables in Rust are immutable.
   - Immutability encourages safe and concurrent code.
   - Rust nudges developers toward writing code that takes advantage of safety features.
   - However, you can still make variables mutable if needed.

2. **Illustrating Immutability:**
   - When a variable is immutable, its value cannot be changed after binding.
   - To demonstrate this, create a new project named "variables" in your projects directory using `cargo new variables`.
   - Then, in your new *variables* directory, open *src/main.rs* and replace its code with the following code, which won't compile just yet:

**Filename**: `src/main.rs`

```rust,ignore,does_not_compile
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

Save and run the program using `cargo run`. You should receive an error message regarding an immutability error, as shown in this output:

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

For example, let's change *src/main.rs* to the following:

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

We're allowed to change the value bound to `x` from `5` to `6` when `mut` is used. Ultimately, deciding whether to use mutability or not is up to you and depends on what you think is clearest in that particular situation.

### Constants

Like immutable variables, *constants* are values that are bound to a name and are not allowed to change, but there are a few differences between constants and variables.

1. **Constants vs. Variables:**
   - You aren't allowed to use `mut` with constants. Constants aren't just immutable by default—they're always immutable.
   - Constants are always immutable (no `mut` allowed), unlike variables.
   - Declare constants using the `const` keyword (instead of `let` for variables).
   - The type of the constant value must be annotated.

2. **Scope and Use:**
   - Constants can be declared in any scope, including the global scope.
   - Useful for values that many parts of code need to know about.

3. **Expression Limitation:**
   - Constants may be set only to a constant expression, not the result of a value that could only be computed at runtime.

Here's an example of a constant declaration:

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

1. **Constant Declaration:**
   - Constants are values bound to a name and are always immutable.
   - The constant's name is `THREE_HOURS_IN_SECONDS` and its value is set to the result of multiplying 60 (the number of seconds in a minute) by 60 (the number of minutes in an hour) by 3 (the number of hours we want to count in this program). 
   - The value of `THREE_HOURS_IN_SECONDS` is calculated at compile time (180 seconds).

2. **Naming Convention:**
   - Rust constants use all uppercase with underscores between words.
   - Helps convey meaning and readability.

3. **Compile-Time Evaluation:**
   - Unlike variables, constants must have a value known at compile time.
   - The compiler evaluates the expression during compilation, ensuring correctness.
   - The compiler is able to evaluate a limited set of operations at compile time, which lets us choose to write out this value in a way that's easier to understand and verify, rather than setting this constant to the value 10,800. 
   - See the [Rust Reference's section on constant evaluation](https://doc.rust-lang.org/reference/const_eval.html) for more information on what operations can be used when declaring constants.

4. **Scope and Use:**
   - Constants are valid throughout the program's execution within their declared scope.
   - This property makes constants useful for values in your application domain that multiple parts of the program might need to know about, such as the maximum number of points any player of a game is allowed to earn, or the speed of light.

5. **Maintainability:**
   - Naming hardcoded values used throughout your program as constants is useful in conveying the meaning of that value to future maintainers of the code.
   - Only one place to change if the value needs adjustment.
  
### Shadowing

Rustaceans say that the first variable is *shadowed* by the second, which means that the second
variable is what the compiler will see when you use the name of the variable. In effect, the second variable overshadows the first, taking any uses of the variable name to itself until either it itself is shadowed or the scope ends.

- **Variable Shadowing:**
  - When a variable is declared with the same name as an existing variable in an inner scope, it "shadows" the outer variable.
  - The shadowed variable is temporarily inaccessible within that inner scope.
  - The compiler resolves references to the variable based on the innermost scope where it's declared.
  - Shadowing allows reusing variable names without causing conflicts.

We can shadow a variable by using the same variable’s name and repeating the use of the `let` keyword as follows:

**Filename**: `src/main.rs`

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");
}
```

Let's summarize the behavior of the given Rust program:

1. The program starts by binding the variable `x` to the value `5`.
2. It then creates a new variable `x` by adding `1` to the original value (`x + 1`), resulting in `6`.
3. Within an inner scope (created by curly braces), the third `let` statement shadows `x` and creates a new variable with the value `12` (previous value multiplied by `2`).
4. After the inner scope, the shadowing ends, and `x` returns to its outer value of `6`.

So here's the output we expect:

```sh
The value of x in the inner scope is: 12
The value of x is: 6
```

When the program runs, it will output the following:

```sh
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
    Finished dev [unoptimized + debuginfo] target(s) in 0.31s
     Running `target/debug/variables`
The value of x in the inner scope is: 12
The value of x is: 6
```
