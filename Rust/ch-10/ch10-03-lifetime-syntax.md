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

### Lifetime Annotations in Function Signatures

#### Declaring Lifetime Parameters
- To use lifetime annotations in function signatures, declare the generic *lifetime* parameters inside angle brackets between the function name and the parameter list, similar to generic *type* parameters.

#### Expressing Constraints
- The signature should express that the returned reference will be valid as long as both parameters are valid. This relationship between the lifetimes of the parameters and the return value is crucial.
- Name the lifetime `'a` and add it to each reference, as shown in Listing 10-21.

#### Example
- *Listing 10-21* demonstrates the `longest` function definition specifying that all references in the signature must have the same lifetime `'a`.

**Filename**: src/main.rs

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

Listing 10-21: The `longest` function definition specifying that all the references in the signature must have the same lifetime `'a`

This code should compile and produce the result we want when we use it with the `main` function in Listing 10-19.

#### Function Signature Analysis
- The function signature informs Rust that for some lifetime `'a`, the function takes two parameters, both of which are string slices that live at least as long as lifetime `'a`.
- The returned string slice will live at least as long as lifetime `'a`, meaning the reference returned by the `longest` function is valid for the smaller of the lifetimes of the values referred to by the function arguments.
- These relationships are what we want Rust to use when analyzing this code.

#### Borrow Checker Constraints
- Specifying lifetime parameters in the function signature does not change the lifetimes of any values passed in or returned. It tells the borrow checker to reject values that don't adhere to these constraints.
- The `longest` function doesn't need to know exactly how long `x` and `y` will live, only that some scope can be substituted for `'a` that will satisfy this signature.

#### Function Signature and Lifetime Contract
- Annotations go in the function signature, not in the function body. They become part of the function's contract, similar to the types in the signature.
- Having function signatures contain the lifetime contract simplifies the Rust compiler's analysis, making error detection more precise.
- If there's a problem with the way a function is annotated or the way it is called, the compiler errors can point to the part of our code and the constraints more precisely. If, instead, the Rust compiler made more inferences about what we intended the relationships of the lifetimes to be, the compiler might only be able to point to a use of our code many steps away from the cause of the problem.

#### Concrete Lifetime Substitution
- When passing concrete references to `longest`, the concrete lifetime substituted for `'a` is the part of the scope of `x` that overlaps with the scope of `y`.
- The generic lifetime `'a` will have the concrete lifetime equal to the smaller of the lifetimes of `x` and `y`.
- The returned reference will be valid for the length of the smaller of the lifetimes of `x` and `y`.

### Lifetime Annotations and Restrictions

#### Different Concrete Lifetimes
- Analyze how lifetime annotations restrict the `longest` function by passing in references with different concrete lifetimes.
- Refer to *Listing 10-22* for a straightforward example.

#### Listing 10-22

**Filename**: src/main.rs

```rust
fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {result}");
    }
}
```

**Listing 10-22**: Using the `longest` function with references to `String` values that have different concrete lifetimes

#### Example Overview
- In the example, `string1` is valid until the end of the outer scope, `string2` is valid until the end of the inner scope, and `result` references something valid until the end of the inner scope.
- The code will compile and print `The longest string is long string is long`.

#### Lifetime of Reference in `result`
- Next, let's try an example where the lifetime of `result` must be the smaller lifetime of the two arguments.
- Move the declaration of `result` outside the inner scope, keep the assignment inside, and move the `println!` to outside the inner scope.
- Refer to *Listing 10-23* for this example which will not compile.

#### **Listing 10-23**

**Filename**: src/main.rs

```rust,ignore,does_not_compile
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}");
}
```

**Listing 10-23**: Attempting to use `result` after `string2` has gone out of scope

When we try to compile this code, we get this error:

```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0597]: `string2` does not live long enough
 --> src/main.rs:6:44
  |
5 |         let string2 = String::from("xyz");
  |             ------- binding `string2` declared here
6 |         result = longest(string1.as_str(), string2.as_str());
  |                                            ^^^^^^^ borrowed value does not live long enough
7 |     }
  |     - `string2` dropped here while still borrowed
8 |     println!("The longest string is {result}");
  |                                     -------- borrow later used here

For more information about this error, try `rustc --explain E0597`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

#### Compilation Error
- Compilation will fail, showing that for `result` to be valid for the `println!` statement, `string2` needs to be valid until the end of the outer scope.
- This is known because the lifetimes of the function parameters and return values were annotated using the same lifetime parameter `'a`.

#### Human vs Compiler Perspective
- Humans can see that `string1` is longer than `string2`, and `result` will reference `string1` which is still valid.
- However, the compiler disallows the code because the lifetime of the reference returned by the `longest` function is the same as the smaller of the lifetimes of the references passed in.

#### Experiment and Hypothesize
- Design experiments varying the values and lifetimes of references passed to the `longest` function and the usage of the returned reference.
- Make hypotheses about whether the experiments will pass the borrow checker before compiling and then check to see if you're right.

### Thinking in Terms of Lifetimes

Understanding how to specify lifetime parameters is crucial for writing Rust functions.

The way in which you need to specify lifetime parameters depends on what your function is doing. 

#### Example: Returning the First Parameter

If the implementation of the `longest` function is changed to always return the first parameter rather than the longest string slice, there's no need to specify a lifetime for the `y` parameter. This code compiles without issue:

<span class="filename">Filename: src/main.rs</span>

```rust
fn longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}
```

- Lifetime parameter `'a` is specified for `x` and the return type.
- No lifetime is specified for `y` as its lifetime is unrelated to `x` or the return value.

#### Returning References with Lifetimes

When returning a reference from a function, the return type's lifetime parameter must match the lifetime parameter of one of the input parameters. If not, the returned reference must relate to a value created within the function, which can lead to a dangling reference.

##### Example: Dangling Reference (Won't Compile)

This `longest` function tries to return a reference to a locally created value, which leads to compilation errors:

<span class="filename">Filename: src/main.rs</span>

```rust,ignore,does_not_compile
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}
```

- This code fails to compile because the return value's lifetime does not relate to the parameters' lifetimes. The `result` variable goes out of scope at the end of the function, leading to a dangling reference.

Here, even though we've specified a lifetime parameter `'a` for the return type, this implementation will fail to compile because the return value lifetime is not related to the lifetime of the parameters at all. Here is the error message we get:

```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0515]: cannot return value referencing local variable `result`
  --> src/main.rs:11:5
   |
11 |     result.as_str()
   |     ------^^^^^^^^^
   |     |
   |     returns a value referencing data owned by the current function
   |     `result` is borrowed here

For more information about this error, try `rustc --explain E0515`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

The error message received highlights that returning a value referencing a local variable that gets cleaned up at the function's end results in a dangling reference.

The problem is that `result` goes out of scope and gets cleaned up at the end of the `longest` function. We're also trying to return a reference to `result` from the function. There is no way we can specify lifetime parameters that would change the dangling reference, and Rust won't let us create a dangling reference. 

In this case, the best fix would be to return an owned data type rather than a reference so the calling function is then responsible for cleaning up the value.

#### The Importance of Lifetime Syntax

Lifetime syntax connects the lifetimes of various parameters and return values in functions. Proper connection allows Rust to ensure memory-safe operations and prevent operations that could create dangling pointers or otherwise violate memory safety.

- **Memory Safety**: Lifetime parameters help Rust manage memory safely.
- **Avoiding Dangling References**: Ensuring the return type's lifetime matches one of the input parameters prevents dangling references.

By understanding and correctly specifying lifetimes, you can write functions in Rust that are both safe and efficient.

### Lifetime Annotations in Struct Definitions

So far, the structs we've defined all hold owned types. We can define structs to hold references, but in that case we would need to add a lifetime annotation on every reference in the struct's definition. Listing 10-24 has a struct named `ImportantExcerpt` that holds a string slice.

<span class="filename">Filename: src/main.rs</span>

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

<span class="caption">Listing 10-24: A struct that holds a reference, requiring a lifetime annotation</span>

This struct has the single field `part` that holds a string slice, which is a reference. As with generic data types, we declare the name of the generic lifetime parameter inside angle brackets after the name of the struct so we can use the lifetime parameter in the body of the struct definition. This annotation means an instance of `ImportantExcerpt` can't outlive the reference it holds in its `part` field.

#### Creating Instances with Valid Lifetimes

The `main` function here creates an instance of the `ImportantExcerpt` struct that holds a reference to the first sentence of the `String` owned by the variable `novel`. The data in `novel` exists before the `ImportantExcerpt` instance is created. In addition, `novel` doesn't go out of scope until after the `ImportantExcerpt` goes out of scope, so the reference in the `ImportantExcerpt` instance is valid.

### Lifetime Elision

You've learned that every reference has a lifetime and that you need to specify lifetime parameters for functions or structs that use references. However, we had a function in Listing 4-9, shown again in Listing 10-25, that compiled without lifetime annotations.

<span class="filename">Filename: src/lib.rs</span>

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

<span class="caption">Listing 10-25: A function we defined in Listing 4-9 that compiled without lifetime annotations, even though the parameter and return type are references</span>

#### Historical Context

The reason this function compiles without lifetime annotations is historical. In early versions (pre-1.0) of Rust, this code wouldn't have compiled because every reference needed an explicit lifetime. At that time, the function signature would have been written like this:

```rust,ignore
fn first_word<'a>(s: &'a str) -> &'a str {
```

After writing a lot of Rust code, the Rust team found that Rust programmers were entering the same lifetime annotations over and over in particular situations. These situations were predictable and followed a few deterministic patterns. The developers programmed these patterns into the compiler's code so the borrow checker could infer the lifetimes in these situations and wouldn't need explicit annotations.

#### Lifetime Elision Rules

This piece of Rust history is relevant because it's possible that more deterministic patterns will emerge and be added to the compiler. In the future, even fewer lifetime annotations might be required. 

The patterns programmed into Rust's analysis of references are called the *lifetime elision rules*. These aren't rules for programmers to follow; they're a set of particular cases that the compiler will consider, and if your code fits these cases, you don't need to write the lifetimes explicitly. 

The elision rules don't provide full inference. If there is still ambiguity as to what lifetimes the references have after Rust applies the rules, the compiler won't guess what the lifetime of the remaining references should be. Instead of guessing, the compiler will give you an error that you can resolve by adding the lifetime annotations.

#### Input and Output Lifetimes

Lifetimes on function or method parameters are called *input lifetimes*, and lifetimes on return values are called *output lifetimes*.

The compiler uses three rules to figure out the lifetimes of the references when there aren't explicit annotations. The first rule applies to input lifetimes, and the second and third rules apply to output lifetimes. If the compiler gets to the end of the three rules and there are still references for which it can't figure out lifetimes, the compiler will stop with an error. These rules apply to `fn` definitions as well as `impl` blocks.

#### The Three Rules

1. **First Rule**: The compiler assigns a lifetime parameter to each parameter that's a reference. For example:
   
  - A function with one parameter gets one lifetime parameter: `fn foo<'a>(x: &'a i32)`; 
  - a function with two parameters gets two separate lifetime parameters: `fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`; 
  - and so on.
   
2. **Second Rule**: If there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters. For example:
   
   ```rust
   fn foo<'a>(x: &'a i32) -> &'a i32
   ```
   
3. **Third Rule**: If there are multiple input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of `self` is assigned to all output lifetime parameters. This rule makes methods much nicer to read and write because fewer symbols are necessary.

#### Applying the Rules

Let's pretend we're the compiler. We'll apply these rules to figure out the lifetimes of the references in the signature of the `first_word` function in Listing 10-25. The signature starts without any lifetimes associated with the references:

```rust,ignore
fn first_word(s: &str) -> &str {
```

Then the compiler applies the first rule, which specifies that each parameter gets its own lifetime. We'll call it `'a` as usual, so now the signature is this:

```rust,ignore
fn first_word<'a>(s: &'a str) -> &str {
```

The second rule applies because there is exactly one input lifetime. The second rule specifies that the lifetime of the one input parameter gets assigned to the output lifetime, so the signature is now this:

```rust,ignore
fn first_word<'a>(s: &'a str) -> &'a str {
```

Now all the references in this function signature have lifetimes, and the compiler can continue its analysis without needing the programmer to annotate the lifetimes in this function signature.

Let's look at another example, this time using the `longest` function that had no lifetime parameters when we started working with it in Listing 10-20:

```rust,ignore
fn longest(x: &str, y: &str) -> &str {
```

Let's apply the first rule: each parameter gets its own lifetime. This time we have two parameters instead of one, so we have two lifetimes:

```rust,ignore
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {
```

You can see that the second rule doesn't apply because there is more than one input lifetime. The third rule doesn't apply either, because `longest` is a function rather than a method, so none of the parameters are `self`. After working through all three rules, we still haven't figured out what the return type's lifetime is. This is why we got an error trying to compile the code in Listing 10-20: the compiler worked through the lifetime elision rules but still couldn't figure out all the lifetimes of the references in the signature.

#### Method Signatures

Because the third rule really only applies in method signatures, we'll look at lifetimes in that context next to see why the third rule means we don't have to annotate lifetimes in method signatures very often.

### Lifetime Annotations in Method Definitions

When we implement methods on a struct with lifetimes, we use the same syntax as that of generic type parameters. Where we declare and use the lifetime parameters depends on whether they're related to the struct fields or the method parameters and return values.

#### Declaring Lifetime Names for Struct Fields

Lifetime names for struct fields always need to be declared after the `impl` keyword and then used after the struct's name because those lifetimes are part of the struct's type.

#### Lifetime Annotations in Method Signatures

In method signatures inside the `impl` block, references might be tied to the lifetime of references in the struct's fields, or they might be independent. In addition, the lifetime elision rules often make it so that lifetime annotations aren't necessary in method signatures. Let's look at some examples using the struct named `ImportantExcerpt`.

#### Example: Method with Only `self` Reference

First, we'll use a method named `level` whose only parameter is a reference to `self` and whose return value is an `i32`, which is not a reference to anything:

```rust
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

The lifetime parameter declaration after `impl` and its use after the type name are required, but we're not required to annotate the lifetime of the reference to `self` because of the first elision rule.

#### Example: Method with Two Input Lifetimes

Here is an example where the third lifetime elision rule applies:

```rust
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {announcement}");
        self.part
    }
}
```

There are two input lifetimes, so Rust applies the first lifetime elision rule and gives both `&self` and `announcement` their own lifetimes. Then, because one of the parameters is `&self`, the return type gets the lifetime of `&self`, and all lifetimes have been accounted for.

### The Static Lifetime

One special lifetime we need to discuss is `'static`, which denotes that the affected reference *can* live for the entire duration of the program. All string literals have the `'static` lifetime, which we can annotate as follows:

```rust
let s: &'static str = "I have a static lifetime.";
```

The text of this string is stored directly in the program's binary, which is always available. Therefore, the lifetime of all string literals is `'static`.

#### Using `'static` Lifetime

You might see suggestions to use the `'static` lifetime in error messages. But before specifying `'static` as the lifetime for a reference, think about whether the reference you have actually lives the entire lifetime of your program or not, and whether you want it to. 

#### Common Issues and Solutions

Most of the time, an error message suggesting the `'static` lifetime results from attempting to create a dangling reference or a mismatch of the available lifetimes. In such cases, the solution is to fix those problems, not to specify the `'static` lifetime.


