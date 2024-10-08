## The `match` Control Flow Construct

Rust has an extremely powerful control flow construct called `match` that allows you to compare a value against a series of patterns and then execute code based on which pattern matches. Patterns can be made up of literal values, variable names, wildcards, and many other things; [Chapter 18](https://doc.rust-lang.org/book/ch18-00-patterns.html) covers all the different kinds of patterns and what they do. The power of `match` comes from the expressiveness of the patterns and the fact that the compiler confirms that all possible cases are handled.

Think of a match expression like a coin-sorting machine: just as coins fall through the first hole that fits their size, values pass through each pattern in a match, and when a matching pattern is found, the associated code block is executed.

Speaking of coins, let's use them as an example using `match`! We can write a function that takes an unknown US coin and, in a similar way as the counting machine, determines which coin it is and returns its value in cents, as shown in Listing 6-3.

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

<span class="caption">Listing 6-3: An enum and a `match` expression that has the variants of the enum as its patterns</span>

1. **Syntax and Purpose**:

  Let's break down the `match` in the `value_in_cents` function. 
  - First we list the `match` keyword followed by an expression, which in this case is the value `coin`. 
  - This seems very similar to a conditional expression used with `if`, but there's a big difference: with `if`, the condition needs to evaluate to a Boolean value, but here it can be any type. 
  - The type of `coin` in this example is the `Coin` enum that we defined on the first line.
  - A `match` expression branches on a pattern. It compares a scrutinee value (in this case, the `coin` value) against different patterns.
   - The goal is to execute code associated with the first matching pattern.

2. **Patterns and Arms**:

  Next are the `match` arms. 
  - An arm has two parts: a pattern and associated code. 
  - The first arm here has a pattern that is the value `Coin::Penny` and then the `=>` operator that separates the pattern and the code to run. 
  - The code in this case is just the value `1`. 
  - Each arm is separated from the next with a comma.

3. **Execution Flow**:

  When the `match` expression executes, it compares the resultant value against the pattern of each arm, in order. 
  - If a pattern matches the value, the code associated with that pattern is executed. 
  - If that pattern doesn't match the value, execution continues to the next arm (similar to a coin-sorting machine). 
  - We can have as many arms as we need: in Listing 6-3, our `match` has four arms.

4. **Expression Result**:

   - The code within each arm is an expression.
   - The value of the expression in the matching arm becomes the overall result of the `match` expression.

5. **Curly Brackets and Commas**:

   - Curly brackets `{}` are typically used when the match arm code is longer or requires multiple lines.
   - The comma after each arm is optional if the arm returns a single value.
   - If you want to run multiple lines of code in a match arm, you must use curly brackets, and the comma following the arm is then optional. 

For example, the following code prints "Lucky penny!" every time the method is called with a `Coin::Penny`, but still returns the last value of the block, `1`:

```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

### Patterns That Bind to Values

In Rust, match arms have a powerful feature: **they can bind to parts of the values that match the pattern**. This allows us to extract data from enum variants.

As an example, consider the following scenario:

- From 1999 to 2008, the United States minted quarters with different designs for each of the 50 states on one side.
- No other coins had state designs; only quarters had this extra value.

To incorporate this information into our `enum`, we modify the `Coin` variant:

- We change the `Quarter` variant to include a `UsState` value stored inside it.
- The `UsState` enum represents the different states (e.g., Alabama, Alaska, etc.).

```rust
#[derive(Debug)] // So we can inspect the state in a minute
enum UsState {
    Alabama,
    Alaska,
    // ... (other states)
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}
```

<span class="caption">Listing 6-4: A `Coin` enum in which the `Quarter` variant also holds a `UsState` value</span>

Now, when dealing with quarters, we can access both the coin type (`Coin::Quarter`) and the associated state value (e.g., `UsState::Alaska`).

1. **Scenario**:
   - Imagine a friend collecting all 50 state quarters.
   - While sorting loose change by coin type, we want to call out the associated state name for each quarter.

2. **`match` Expression**:
   - The code snippet defines a function called `value_in_cents(coin: Coin) -> u8`.
   - Inside this function, there's a `match` expression that handles different coin variants.
   - For example, we add a variable called `state` to the pattern that matches values of the variant `Coin::Quarter`.

3. **Pattern Matching for `Coin::Quarter`**:
   - When the input `coin` matches the `Coin::Quarter` variant, the `state` variable is bound to the value of that quarter's state.
   - The `state` binding allows us to access the inner state value.

```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {state:?}!");
            25
        }
    }
}
```

4. **Example Usage**:
   - If we call `value_in_cents(Coin::Quarter(UsState::Alaska))`, the `coin` value is `Coin::Quarter(UsState::Alaska)`.
   - The `match` expression checks each arm, and when it reaches `Coin::Quarter(state)`, the binding for `state` becomes `UsState::Alaska`.
   - We can then use `state` in the `println!` expression to display the state name.

In summary, this code snippet demonstrates how to extract the inner state value from the `Coin` enum variant for quarters. 

### Matching with `Option<T>`

1. **Scenario**:
   - We're working with `Option<T>` where `T` represents a value (e.g., `i32`).
   - The goal is to handle both the `Some` case (when there's a value) and the `None` case (when there's no value).

2. **Using `match`**:
   - Similar to how we used `match` with the `Coin` enum, we can use it with `Option<T>`.
   - The `match` expression compares the variant of `Option<T>` and executes code based on the match.

3. **Example Function: `plus_one`**:
   - We define a function called `plus_one(x: Option<i32>) -> Option<i32>`.
   - Inside the function, we use `match` to handle the different cases:
     - If `x` is `None`, return `None`.
     - If `x` is `Some(i)`, return `Some(i + 1)` (adding 1 to the inner value).

   - We create an `Option<i32>` with the value `5` (`let five = Some(5)`).
   - Calling `plus_one(five)` results in `Some(6)` (adding 1 to 5).
   - Calling `plus_one(None)` returns `None`.

In the previous section, we wanted to get the inner `T` value out of the `Some` case when using `Option<T>`; we can also handle `Option<T>` using `match`, as we did with the `Coin` enum! Instead of comparing coins, we'll compare the variants of `Option<T>`, but the way the `match` expression works remains the same.

Let's say we want to write a function that takes an `Option<i32>` and, if there's a value inside, adds 1 to that value. If there isn't a value inside, the function should return the `None` value and not attempt to perform any operations.

This function is very easy to write, thanks to `match`, and will look like Listing 6-5.

```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
```

<span class="caption">Listing 6-5: A function that uses a `match` expression on an `Option<i32>`</span>

Let's examine the first execution of `plus_one` in more detail. When we call `plus_one(five)`, the variable `x` in the body of `plus_one` will have the value `Some(5)`. We then compare that against each match arm:

```rust,ignore
            None => None,
```

The `Some(5)` value doesn't match the pattern `None`, so we continue to the next arm:

```rust,ignore
            Some(i) => Some(i + 1),
```

Does `Some(5)` match `Some(i)`? It does! We have the same variant. The `i` binds to the value contained in `Some`, so `i` takes the value `5`. The code in the match arm is then executed, so we add 1 to the value of `i` and create a new `Some` value with our total `6` inside.

Now let's consider the second call of `plus_one` in Listing 6-5, where `x` is `None`. We enter the `match` and compare to the first arm:

```rust,ignore
            None => None,
```

It matches! There's no value to add to, so the program stops and returns the `None` value on the right side of `=>`. Because the first arm matched, no other arms are compared.

Combining `match` and enums is useful in many situations. You'll see this pattern a lot in Rust code: `match` against an enum, bind a variable to the data inside, and then execute code based on it. It's a bit tricky at first, but once you get used to it, you'll wish you had it in all languages. It's consistently a user favorite.

### Matches Are Exhaustive

There's one other aspect of `match` we need to discuss: the arms' patterns must cover all possibilities. Consider this version of our `plus_one` function, which has a bug and won't compile:

```rust,ignore,does_not_compile
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            Some(i) => Some(i + 1),
        }
    }
```

We didn't handle the `None` case, so this code will cause a bug. Luckily, it's a bug Rust knows how to catch. If we try to compile this code, we'll get this error:

```sh
$ cargo run
   Compiling enums v0.1.0 (file:///projects/enums)
error[E0004]: non-exhaustive patterns: `None` not covered
 --> src/main.rs:3:15
  |
3 |         match x {
  |               ^ pattern `None` not covered
  |
note: `Option<i32>` defined here
 --> /rustc/9b00956e56009bab2aa15d7bff10916599e3d6d6/library/core/src/option.rs:572:1
 ::: /rustc/9b00956e56009bab2aa15d7bff10916599e3d6d6/library/core/src/option.rs:576:5
  |
  = note: not covered
  = note: the matched value is of type `Option<i32>`
help: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown
  |
4 ~             Some(i) => Some(i + 1),
5 ~             None => todo!(),
  |

For more information about this error, try `rustc --explain E0004`.
error: could not compile `enums` (bin "enums") due to 1 previous error
```

Rust knows that we didn't cover every possible case, and even knows which pattern we forgot! Matches in Rust are *exhaustive*: we must exhaust every last possibility in order for the code to be valid. Especially in the case of `Option<T>`, when Rust prevents us from forgetting to explicitly handle the `None` case, it protects us from assuming that we have a value when we might have null, thus making the billion-dollar mistake discussed earlier impossible.

Key points about exhaustive pattern matching in Rust:

- When using the `match` expression, ensure that the arms cover all possibilities.
- Rust's exhaustive pattern matching prevents forgetting to handle specific cases.
- The `_` pattern serves as a wildcard catch-all case for remaining possibilities.
- It's a powerful tool for avoiding costly mistakes.

### Catch-all Patterns and the `_` Placeholder

Using enums, we can also take special actions for a few particular values, but for all other values take one default action. Imagine we're implementing a game where, if you roll a 3 on a dice roll, your player doesn't move, but instead gets a new fancy hat. If you roll a 7, your player loses a fancy hat. For all other values, your player moves that number of spaces on the game board. Here's a `match` that implements that logic, with the result of the dice roll hardcoded rather than a random value, and all other logic represented by functions without bodies because actually implementing them is out of scope for this example:

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
```

For the first two arms, the patterns are the literal values `3` and `7`. For the last arm that covers every other possible value, the pattern is the variable we've chosen to name `other`. The code that runs for the `other` arm uses the variable by passing it to the `move_player` function.

This code compiles, even though we haven't listed all the possible values a `u8` can have, because the last pattern will match all values not specifically listed. This catch-all pattern meets the requirement that `match` must be exhaustive. Note that we have to put the catch-all arm last because the patterns are evaluated in order. If we put the catch-all arm earlier, the other arms would never run, so Rust will warn us if we add arms after a catch-all!

Rust also has a pattern we can use when we want a catch-all but don't want to *use* the value in the catch-all pattern: `_` is a special pattern that matches any value and does not bind to that value. This tells Rust we aren't going to use the value, so Rust won't warn us about an unused variable.

Let's change the rules of the game: now, if you roll anything other than a 3 or a 7, you must roll again. We no longer need to use the catch-all value, so we can change our code to use `_` instead of the variable named `other`:

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
```

This example also meets the exhaustiveness requirement because we're explicitly ignoring all other values in the last arm; we haven't forgotten anything.

Finally, we'll change the rules of the game one more time so that nothing else happens on your turn if you roll anything other than a 3 or a 7. We can express that by using the unit value (the empty tuple type we mentioned in ["The Tuple Type"](https://doc.rust-lang.org/book/ch03-02-data-types.html#the-tuple-type) section) as the code that goes with the `_` arm:

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
```

Here, we're telling Rust explicitly that we aren't going to use any other value that doesn't match a pattern in an earlier arm, and we don't want to run any code in this case.

There's more about patterns and matching that we'll cover in [Chapter 18](https://doc.rust-lang.org/book/ch18-00-patterns.html). For now, we're going to move on to the `if let` syntax, which can be useful in situations where the `match` expression is a bit wordy.

#### Catch-all Patterns and the `_` placeholder | Overview

Key points about catch-all patterns and the `_` placeholder in Rust:

1. **Catch-All Patterns:**
   - Enums allow us to handle specific values differently while providing a default action for all other values.
   - Example: Imagine a game where rolling a 3 results in a fancy hat, rolling a 7 causes the player to lose a hat, and other rolls move the player on the game board.
   - We use a `match` expression to implement this logic, with patterns for `3` and `7`, and a catch-all pattern for other values.
   - The catch-all pattern (usually named `other`) covers all remaining possibilities.
   - The order of arms matters; the catch-all arm must come last to ensure other arms are evaluated first.

2. **The `_` Placeholder:**
   - `_` is a special pattern that matches any value without binding to it.
   - It serves as a catch-all when we don't need to use the value.
   - Rust won't warn about unused variables when `_` is used.
   - Example: Changing the game rules so that any roll other than 3 or 7 requires a re-roll:

   ```rust
   match roll_result {
       3 => get_fancy_hat(),
       7 => lose_fancy_hat(),
       _ => roll_again(),
   }
   ```

3. **Using the Unit Value:**
   - To express that nothing should happen for other values, use the unit value (empty tuple type) as the code for the catch-all arm.
   - Example: If anything other than 3 or 7 occurs, no additional action is taken:

   ```rust
   match roll_result {
       3 => get_fancy_hat(),
       7 => lose_fancy_hat(),
       _ => (),
   }
   ```