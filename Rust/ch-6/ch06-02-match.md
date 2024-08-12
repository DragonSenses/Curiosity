## The `match` Control Flow Construct

Rust has an extremely powerful control flow construct called `match` that allows you to compare a value against a series of patterns and then execute code based on which pattern matches. Patterns can be made up of literal values, variable names, wildcards, and many other things; [Chapter 18](https://doc.rust-lang.org/book/ch18-00-patterns.html) covers all the different kinds of patterns and what they do. The power of `match` comes from the expressiveness of the patterns and the fact that the compiler confirms that all possible cases are handled.

Think of a match expression like a coin-sorting machine: just as coins fall through the first hole that fits their size, values pass through each pattern in a match, and when a matching pattern is found, the associated code block is executed.

Speaking of coins, let’s use them as an example using `match`! We can write a function that takes an unknown US coin and, in a similar way as the counting machine, determines which coin it is and returns its value in cents, as shown in Listing 6-3.

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

  Let’s break down the `match` in the `value_in_cents` function. 
  - First we list the `match` keyword followed by an expression, which in this case is the value `coin`. 
  - This seems very similar to a conditional expression used with `if`, but there’s a big difference: with `if`, the condition needs to evaluate to a Boolean value, but here it can be any type. 
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
  - If that pattern doesn’t match the value, execution continues to the next arm (similar to a coin-sorting machine). 
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
