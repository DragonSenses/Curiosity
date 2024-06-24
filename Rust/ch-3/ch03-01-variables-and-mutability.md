## Variables and Mutability

As mentioned in the [Storing Values with Variables](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html#storing-values-with-variables) section, by default,
variables are immutable. This is one of many nudges Rust gives you to write
your code in a way that takes advantage of the safety and easy concurrency that
Rust offers. However, you still have the option to make your variables mutable.
Let’s explore how and why Rust encourages you to favor immutability and why
sometimes you might want to opt out.

When a variable is immutable, once a value is bound to a name, you can’t change
that value. To illustrate this, generate a new project called *variables* in
your *projects* directory by using `cargo new variables`.

Then, in your new *variables* directory, open *src/main.rs* and replace its
code with the following code, which won’t compile just yet:

<span class="filename">Filename: src/main.rs</span>

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-01-variables-are-immutable/src/main.rs}}
```

Save and run the program using `cargo run`. You should receive an error message
regarding an immutability error, as shown in this output:

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-01-variables-are-immutable/output.txt}}
```

