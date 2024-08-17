## Concise Control Flow with `if let`

The `if let` syntax lets you combine `if` and `let` into a less verbose way to handle values that match one pattern while ignoring the rest.

### Summary of `if let` syntax in Rust:

1. **Purpose of `if let`:**
   - `if let` combines `if` and `let` to handle values that match one pattern while ignoring others.
   - It provides a more concise alternative to `match` for specific cases.

2. **Syntax:**
   - The `if let` syntax consists of a pattern and an expression separated by an equal sign.
   - The pattern is similar to a `match` arm, and it binds variables if the value matches the pattern.
   - The code inside the `if let` block runs only when the value matches the pattern.

3. **Benefits of `if let`:**
   - Less typing, indentation, and boilerplate compared to `match`.
   - Useful for scenarios where exhaustive checking isn't necessary.

4. **Comparison with `match`:**
   - `if let` is like syntax sugar for a `match` that handles a specific case.
   - Use `match` for exhaustive checking and more complex patterns.

5. **Using `else` with `if let`:**
   - You can include an `else` block with an `if let`.
   - The `else` block behaves similarly to the `_` case in a corresponding `match`.

Remember that both `match` and `if let` have their place in Rust, depending on your specific needs.

### `if let`

Consider the program in Listing 6-6 that matches on an `Option<u8>` value in the `config_max` variable but only wants to execute code if the value is the `Some` variant.

```rust
    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {max}"),
        _ => (),
    }
```

<span class="caption">Listing 6-6: A `match` that only cares about executing code when the value is `Some`</span>

If the value is `Some`, we print out the value in the `Some` variant by binding the value to the variable `max` in the pattern. We don't want to do anything with the `None` value. To satisfy the `match` expression, we have to add `_ => ()` after processing just one variant, which is annoying boilerplate code to add.

Instead, we could write this in a shorter way using `if let`. The following code behaves the same as the `match` in Listing 6-6:

```rust
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {max}");
    }
```

The syntax `if let` takes a pattern and an expression separated by an equal sign. It works the same way as a `match`, where the expression is given to the `match` and the pattern is its first arm. In this case, the pattern is `Some(max)`, and the `max` binds to the value inside the `Some`. We can then use `max` in the body of the `if let` block in the same way we used `max` in the corresponding `match` arm. The code in the `if let` block isn't run if the value doesn't match the pattern.

Using `if let` means less typing, less indentation, and less boilerplate code. However, you lose the exhaustive checking that `match` enforces. Choosing between `match` and `if let` depends on what you're doing in your particular situation and whether gaining conciseness is an appropriate trade-off for losing exhaustive checking.

In other words, you can think of `if let` as syntax sugar for a `match` that runs code when the value matches one pattern and then ignores all other values.

We can include an `else` with an `if let`. The block of code that goes with the `else` is the same as the block of code that would go with the `_` case in the `match` expression that is equivalent to the `if let` and `else`. Recall the `Coin` enum definition in Listing 6-4, where the `Quarter` variant also held a `UsState` value. If we wanted to count all non-quarter coins we see while also announcing the state of the quarters, we could do that with a `match` expression, like this:

```rust
    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {state:?}!"),
        _ => count += 1,
    }
```

Or we could use an `if let` and `else` expression, like this:

```rust
    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {state:?}!");
    } else {
        count += 1;
    }
```

If you have a situation in which your program has logic that is too verbose to express using a `match`, remember that `if let` is in your Rust toolbox as well.

## Summary: Enums and Pattern Matching in Rust

### Understanding Enums
- In Rust, an **enum** (short for enumeration) is a type that can be any one of several variants.
- Enums allow you to define a custom type by enumerating its possible variants.
- Each variant can carry additional data or be empty.

### Leveraging Pattern Matching
- Pattern matching in Rust is primarily done through the `match` expression.
- The `match` expression is similar to a switch statement in other languages but is far more powerful.
- It allows you to run different code for different values of an enum.
- Pattern matching ensures exhaustive handling of all possible cases.

### Enums with Data
- Enums can have associated data, making them versatile for modeling different scenarios.
- For example, an enum representing different types of messages could have variants like `Text(String)`, `Image(Vec<u8>)`, etc.
- The associated data allows you to encode meaning along with the variant.

### Matching with Enums and Data
- When working with enums that carry data, use pattern matching to extract and process the data.
- The `match` expression allows you to handle each variant and its associated data separately.
- You can bind variables to the data within each variant, making it accessible in the corresponding code block.

### Advanced Pattern Matching
- Rust's pattern matching capabilities extend beyond simple value checks.
- You can match on nested enums, tuples, structs, and even ranges.
- The `_` placeholder serves as a catch-all pattern for handling remaining cases.

### Conclusion
- Enums and pattern matching are powerful tools in Rust for expressing domain-specific concepts.
- By creating custom types using enums, you ensure type safety and prevent errors.
- Next, consider organizing your code using Rust's modules to provide a well-structured API.

### Closing argument

We've now covered how to use enums to create custom types that can be one of a set of enumerated values. We've shown how the standard library's `Option<T>` type helps you use the type system to prevent errors. When enum values have data inside them, you can use `match` or `if let` to extract and use those values, depending on how many cases you need to handle.

Your Rust programs can now express concepts in your domain using structs and enums. Creating custom types to use in your API ensures type safety: the compiler will make certain your functions only get values of the type each function expects.

In order to provide a well-organized API to your users that is straightforward to use and only exposes exactly what your users will need, let's now turn to Rust's modules.
