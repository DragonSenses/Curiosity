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
