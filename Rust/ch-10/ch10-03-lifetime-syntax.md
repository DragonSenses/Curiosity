## Validating References with Lifetimes

### Overview
Lifetimes are a kind of generic we've been using. Unlike ensuring a type has the desired behavior, lifetimes ensure references are valid for as long as needed.

#### References and Borrowing
Every reference in Rust has a *lifetime*, defining the scope for which the reference is valid. This concept was touched on in Chapter 4's ["References and Borrowing"](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#references-and-borrowing) section.

#### Implicit and Inferred Lifetimes
Most of the time, lifetimes are implicit and inferred, similar to how types are inferred. Annotation is required only when multiple types or lifetimes could be related in different ways.

#### Annotating Lifetimes
Rust requires annotation of relationships using generic lifetime parameters to ensure the actual references used at runtime will be valid.

#### Unfamiliar Concept
Annotating lifetimes is unfamiliar to most programming languages. While this chapter won't cover lifetimes in their entirety, common lifetime syntax will be discussed to get comfortable with the concept.

#### Conclusion
Understanding and using lifetimes ensures the safety and validity of references in Rust, helping prevent issues at runtime.

### Preventing Dangling References with Lifetimes

#### Overview
The main aim of lifetimes is to prevent *dangling references*, which cause a program to reference data other than the data it's intended to reference.

#### Example: Dangling Reference
Consider the program in Listing 10-16, which has an outer scope and an inner scope.

```rust,ignore,does_not_compile
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {r}");
}
```

**Listing 10-16**: An attempt to use a reference whose value has gone out of scope.

**Note**: The examples in Listing 10-16, 10-17, and 10-23 declare variables without giving them an initial value, so the variable name exists in the outer scope. At first glance, this might appear to be in conflict with Rust's having no null values. However, if we try to use a variable before giving it a value, we'll get a compile-time error, which shows that Rust indeed does not allow null values.

#### Explanation
In the outer scope, a variable named `r` is declared without an initial value. In the inner scope, a variable named `x` with the initial value of `5` is declared. Inside the inner scope, we attempt to set `r` as a reference to `x`. When the inner scope ends, `x` goes out of scope, but `r` is still valid in the outer scope.

#### Error Message
```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0597]: `x` does not live long enough
 --> src/main.rs:6:13
  |
5 |         let x = 5;
  |             - binding `x` declared here
6 |         r = &x;
  |             ^^ borrowed value does not live long enough
7 |     }
  |     - `x` dropped here while still borrowed
8 |
9 |     println!("r: {r}");
  |                  --- borrow later used here

For more information about this error, try `rustc --explain E0597`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

#### Compile-Time Error
This code won't compile because `r` is referring to a value (`x`) that has gone out of scope. The error message indicates that `x` "does not live long enough."

#### Borrow Checker
Rust uses a borrow checker to determine that this code is invalid. The borrow checker ensures that references are valid as long as they are used, preventing issues like dangling references.

#### Additional Notes
- Declares variables without initial values, explaining Rust's behavior of not allowing null values.
- Error Message: Provides details about why the code fails to compile, referencing the lifecycle of `x` and `r`.

#### Conclusion
Understanding lifetimes and the borrow checker is crucial to prevent dangling references, ensuring safe and valid references in Rust.

### The Borrow Checker

#### Overview
The Rust compiler has a *borrow checker* that compares scopes to determine whether all borrows are valid.

#### Example: Annotated Lifetimes
Listing 10-17 shows the same code as Listing 10-16 but with annotations showing the lifetimes of the variables.

```rust,ignore,does_not_compile
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+
```

<span class="caption">Listing 10-17: Annotations of the lifetimes of `r` and `x`, named `'a` and `'b`, respectively</span>

#### Explanation
In this example, the lifetime of `r` is annotated with `'a`, and the lifetime of `x` with `'b`. The inner `'b` block is much smaller than the outer `'a` lifetime block. At compile time, Rust compares the size of the two lifetimes and sees that `r` has a lifetime of `'a` but refers to memory with a lifetime of `'b`. The program is rejected because `'b` is shorter than `'a`.

#### Fixing Dangling References
Listing 10-18 fixes the code so it doesn't have a dangling reference and compiles without any errors.

```rust
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+
```

<span class="caption">Listing 10-18: A valid reference because the data has a longer lifetime than the reference</span>

#### Valid Reference
In the fixed version, `x` has the lifetime `'b`, which is larger than `'a`. This means `r` can reference `x` because Rust knows that the reference in `r` will always be valid while `x` is valid.

#### Next Steps
Now that you know what the lifetimes of references are and how Rust analyzes lifetimes to ensure references will always be valid, let's explore generic lifetimes of parameters and return values in the context of functions.

### Generic Lifetimes in Functions

#### Overview
We'll write a function that returns the longer of two string slices. This function will take two string slices and return a single string slice.

#### Implementation
After we've implemented the `longest` function, the code in Listing 10-19 should print `The longest string is abcd`.

**Filename**: src/main.rs

```rust,ignore
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");
}
```

**Listing 10-19**: A `main` function that calls the `longest` function to find the longer of two string slices.

#### Note
We want the function to take string slices, which are references, rather than strings, because we don't want the `longest` function to take ownership of its parameters. Refer to the ["String Slices as Parameters"](https://doc.rust-lang.org/book/ch04-03-slices.html#string-slices-as-parameters) section in Chapter 4 for more discussion about why the parameters we use in Listing 10-19 are the ones we want.

#### Compilation Error
If we try to implement the `longest` function as shown in Listing 10-20, it won't compile.

**Filename**: src/main.rs

```rust,ignore,does_not_compile
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

**Listing 10-20**: An implementation of the `longest` function that returns the longer of two string slices but does not yet compile.

Instead, we get the following error that talks about lifetimes:

```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0106]: missing lifetime specifier
 --> src/main.rs:9:33
  |
9 | fn longest(x: &str, y: &str) -> &str {
  |               ----     ----     ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `x` or `y`
help: consider introducing a named lifetime parameter
  |
9 | fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  |           ++++     ++          ++          ++

For more information about this error, try `rustc --explain E0106`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

#### Error Explanation
The help text reveals that the return type needs a generic lifetime parameter on it because Rust can't tell whether the reference being returned refers to `x` or `y`. Actually, we don't know either, because the `if` block in the body of this function returns a reference to `x` and the `else` block returns a reference to `y`!

#### Lifetimes and Borrow Checker
When we're defining this function, we don't know the concrete values that will be passed into this function, so we don't know whether the `if` case or the `else` case will execute. We also don't know the concrete lifetimes of the references that will be passed in, so we can't look at the scopes as we did in Listings 10-17 and 10-18 to determine whether the reference we return will always be valid. The borrow checker can't determine this either, because it doesn't know how the lifetimes of `x` and `y` relate to the lifetime of the return value.

#### Solution
To fix this error, we'll add generic lifetime parameters that define the relationship between the references so the borrow checker can perform its analysis.

### Lifetime Annotation Syntax

#### **Purpose:**
- Lifetime annotations describe the relationships of the lifetimes of multiple references to each other without affecting their actual lifetimes.
- Functions can accept references with any lifetime by specifying a generic lifetime parameter, similar to generic type parameters.

#### **Syntax:**
- Lifetime parameter names must start with an apostrophe (`'`) and are usually short and lowercase.
- Common convention: use `'a` for the first lifetime annotation.
- Place lifetime parameter annotations after the `&` of a reference, separated by a space.

#### **Examples:**

Here are some examples: a reference to an `i32` without a lifetime parameter, a reference to an `i32` that has a lifetime parameter named `'a`, and a mutable reference to an `i32` that also has the lifetime `'a`.

```rust,ignore
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

#### Context

- One lifetime annotation alone doesn't convey much meaning. They are meant to show how generic lifetime parameters of multiple references relate to each other.
- Let's examine how lifetime annotations relate in the context of the longest function.
