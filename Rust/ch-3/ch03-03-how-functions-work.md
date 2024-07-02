## Functions

Functions are prevalent in Rust code. You've already seen one of the most important functions in the language: the `main` function, which is the entry point of many programs. You've also seen the `fn` keyword, which allows you to declare new functions.

Rust code uses *snake case* as the conventional style for function and variable names, in which all letters are lowercase and underscores separate words. Here's a program that contains an example function definition:

**Filename**: `src/main.rs`

```rust
fn main() {
    println!("Hello, world!");

    another_function();
}

fn another_function() {
    println!("Another function.");
}
```

We define a function in Rust by entering `fn` followed by a function name and a set of parentheses. The curly brackets tell the compiler where the function body begins and ends.

We can call any function we've defined by entering its name followed by a set of parentheses. Because `another_function` is defined in the program, it can be called from inside the `main` function. Note that we defined `another_function` *after* the `main` function in the source code; we could have defined it before
as well. Rust doesn't care where you define your functions, only that they're defined somewhere in a scope that can be seen by the caller.

- Rust doesn't impose strict ordering of function definitions; you can define functions in any order as long as they're visible within their scope. In this case, `another_function` is defined after `main`, but it could have been defined before as well.

**Example:** Let's start a new binary project named *functions* to explore functions further. Place the `another_function` example in *src/main.rs* and run it. You should see the following output:

```sh
$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
    Finished dev [unoptimized + debuginfo] target(s) in 0.28s
     Running `target/debug/functions`
Hello, world!
Another function.
```

The lines execute in the order in which they appear in the `main` function. First the “Hello, world!” message prints, and then `another_function` is called and its message is printed.

### Parameters

- **Parameters**: These are special variables declared as part of a function's signature. They allow you to pass data into the function. Parameters define the input that the function expects.
- **Arguments**: When you call a function, you provide specific values for its parameters. These values are called arguments. 
- In casual conversation, people often use "parameter" and "argument" interchangeably for either the variables in a function's definition or the concrete values passed in when you call a function.

In this version of `another_function` we add a parameter:

**Filename**: `src/main.rs`

```rust
fn main() {
    another_function(5);
}

fn another_function(x: i32) {
    println!("The value of x is: {x}");
}
```

Try running this program; you should get the following output:

```sh
$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
    Finished dev [unoptimized + debuginfo] target(s) in 1.21s
     Running `target/debug/functions`
The value of x is: 5
```

The declaration of `another_function` has one parameter named `x`. The type of `x` is specified as `i32`. When we pass `5` in to `another_function`, the `println!` macro puts `5` where the pair of curly brackets containing `x` was in the format string.

In function signatures, you *must* declare the type of each parameter. This is a deliberate decision in Rust's design: requiring type annotations in function definitions means the compiler almost never needs you to use them elsewhere in the code to figure out what type you mean. The compiler is also able to give
more helpful error messages if it knows what types the function expects.

When defining multiple parameters, separate the parameter declarations with commas, like this:

**Filename**: `src/main.rs`

```rust
fn main() {
    print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}
```

This example creates a function named `print_labeled_measurement` with two parameters. The first parameter is named `value` and is an `i32`. The second is named `unit_label` and is type `char`. The function then prints text containing both the `value` and the `unit_label`.

Let's try running this code. Replace the program currently in your *functions* project's *src/main.rs* file with the preceding example and run it using `cargo run`:

```sh
$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
    Finished dev [unoptimized + debuginfo] target(s) in 0.31s
     Running `target/debug/functions`
The measurement is: 5h
```

Because we called the function with `5` as the value for `value` and `'h'` as the value for `unit_label`, the program output contains those values.

#### Parameters recap

```rust
fn main() {
    print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}
```

1. **Function Parameters**:
   - When defining a function, you can specify parameters (variables) that it accepts.
   - Parameters allow you to pass data into the function.
   - In the example provided, the `print_labeled_measurement` function has two parameters: `value` and `unit_label`.

2. **Type Annotations for Parameters**:
   - In Rust, you must declare the type of each parameter explicitly.
   - This deliberate design choice helps the compiler provide better error messages and ensures clarity.
   - The type of `value` is `i32`, and the type of `unit_label` is `char`.

3. **Calling the Function**:
   - We call `print_labeled_measurement(5, 'h')`.
   - The function prints the measurement with the provided values: `5` for `value` and `'h'` for `unit_label`.

### Statements and Expressions

Function bodies are made up of a series of statements optionally ending in an expression. So far, the functions we've covered haven't included an ending expression, but you have seen an expression as part of a statement. Because Rust is an expression-based language, this is an important distinction to
understand. Other languages don't have the same distinctions, so let's look at what statements and expressions are and how their differences affect the bodies of functions.

* **Statements** are instructions that perform some action and do not return
  a value.
* **Expressions** evaluate to a resultant value. 

Let's look at some examples.

We've actually already used statements and expressions. Creating a variable and assigning a value to it with the `let` keyword is a statement. In Listing 3-1, `let y = 6;` is a statement.

**Filename**: `src/main.rs`

```rust
fn main() {
    let y = 6;
}
```

**Listing 3-1**: A `main` function declaration containing one statement

Function definitions are also statements; the entire preceding example is a statement in itself.

Statements do not return values. Therefore, you can't assign a `let` statement to another variable, as the following code tries to do; you'll get an error:

**Filename**: `src/main.rs`

```rust,ignore,does_not_compile
fn main() {
    let x = (let y = 6);
}
```

When you run this program, the error you'll get looks like this:

```sh
$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
error: expected expression, found `let` statement
 --> src/main.rs:2:14
  |
2 |     let x = (let y = 6);
  |              ^^^
  |
  = note: only supported directly in conditions of `if` and `while` expressions

warning: unnecessary parentheses around assigned value
 --> src/main.rs:2:13
  |
2 |     let x = (let y = 6);
  |             ^         ^
  |
  = note: `#[warn(unused_parens)]` on by default
help: remove these parentheses
  |
2 -     let x = (let y = 6);
2 +     let x = let y = 6;
  |

warning: `functions` (bin "functions") generated 1 warning
error: could not compile `functions` (bin "functions") due to 1 previous error; 1 warning emitted
```

The `let y = 6` statement does not return a value, so there isn't anything for `x` to bind to. This is different from what happens in other languages, such as C and Ruby, where the assignment returns the value of the assignment. In those languages, you can write `x = y = 6` and have both `x` and `y` have the value
`6`; that is not the case in Rust.

Expressions evaluate to a value and make up most of the rest of the code that you'll write in Rust. Consider a math operation, such as `5 + 6`, which is an expression that evaluates to the value `11`. 

Expressions can be part of statements: in Listing 3-1, the `6` in the statement `let y = 6;` is an expression that evaluates to the value `6`. Calling a function is an expression. Calling a macro is an expression. A new scope block created with curly brackets is an expression, for example:

**Filename**: `src/main.rs`

```rust
fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
}
```

This expression:

```rust,ignore
{
    let x = 3;
    x + 1
}
```

is a block that, in this case, evaluates to `4`. That value gets bound to `y` as part of the `let` statement. Note that the `x + 1` line doesn't have a semicolon at the end, which is unlike most of the lines you've seen so far. Expressions do not include ending semicolons. If you add a semicolon to the end of an expression, you turn it into a statement, and it will then not return a value. Keep this in mind as you explore function return values and expressions next.

#### Statements and Expressions recap

1. **Statements**:
   - Statements are instructions that perform actions but do not return a value.
   - Examples of statements include variable declarations (`let y = 6;`) and function definitions.
   - Statements are terminated by semicolons (`;`).

2. **Expressions**:
   - Expressions evaluate to a resultant value.
   - In Rust, almost everything is an expression, including function calls, arithmetic operations, and blocks.
   - Expressions do not end with semicolons; omitting the semicolon turns a statement into an expression.

3. **Example 1**:

```rust,ignore,does_not_compile
fn main() {
    let x = (let y = 6);
}
```
   - In this code snippet, `let y = 6;` is a statement (assigning a value to `y`).
   - Attempting to assign a `let` statement to another variable (`let x = (let y = 6);`) results in an error because statements do not return values.

4. **Example 2**:
  
```rust
fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
}
```
   - The code snippet demonstrates a block expression:
     ```rust,ignore
     {
         let x = 3;
         x + 1
     }
     ```
     - This block evaluates to `4`.
     - The `x + 1` line lacks a semicolon because it's an expression.
     - Adding a semicolon would turn it into a statement (which doesn't return a value).
