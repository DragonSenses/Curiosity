## Bringing Paths into Scope with the `use` Keyword

### Overview

In Rust, the `use` keyword allows you to create shortcuts to paths, making it more convenient to call functions or access items. Here's how it works:

1. **Bringing a Module into Scope:**
   - You can use `use` to bring a module (or part of it) into the current scope.
   - For example, if you have a module named `front_of_house` with a submodule `hosting`, you can bring it into scope like this:
     ```rust
     mod front_of_house {
         pub mod hosting {
             pub fn add_to_waitlist() {}
         }
     }
     use crate::front_of_house::hosting;
     ```
   - Now, you can call `hosting::add_to_waitlist()` directly without specifying the full path.

2. **Similar to Symbolic Links:**
   - Adding a path with `use` is akin to creating a symbolic link in the filesystem.
   - The path you add becomes a valid name in the current scope, as if it were defined there directly.

3. **Privacy and Scopes:**
   - Paths brought into scope with `use` also check privacy rules.
   - Note that `use` only creates the shortcut for the specific scope where it occurs.
   - If you move a function to a different scope, the shortcut won't apply there.

If you want to bring all public items from a path into scope, you can use the `*` glob operator, like this:

```rust
#![allow(unused)]
fn main() {
    use std::collections::*;
}
```

This brings all public items from `std::collections` into the current scope.

### Bringing a module into scope with `use`

Recall: how to make the `add_to_waitlist` function public by adding the `pub` keyword before its definition.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground,test_harness
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

<span class="caption">Listing 7-7: Adding the `pub` keyword to `mod hosting` and `fn add_to_waitlist` lets us call the function from `eat_at_restaurant`</span>

Having to write out the paths to call functions can feel inconvenient and repetitive. In Listing 7-7, whether we chose the absolute or relative path to the `add_to_waitlist` function, every time we wanted to call `add_to_waitlist` we had to specify `front_of_house` and `hosting` too. Fortunately, there's a way to simplify this process: we can create a shortcut to a path with the `use` keyword once, and then use the shorter name everywhere else in the scope.

In Listing 7-11, we bring the `crate::front_of_house::hosting` module into the scope of the `eat_at_restaurant` function so we only have to specify `hosting::add_to_waitlist` to call the `add_to_waitlist` function in `eat_at_restaurant`.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground,test_harness
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

<span class="caption">Listing 7-11: Bringing a module into scope with `use`</span>

Adding `use` and a path in a scope is similar to creating a symbolic link in the filesystem. By adding `use crate::front_of_house::hosting` in the crate root, `hosting` is now a valid name in that scope, just as though the `hosting` module had been defined in the crate root. Paths brought into scope with `use` also check privacy, like any other paths.

### Shortcut for a path is limited to the specific scope where it occurs

In Rust, the `use` keyword creates a shortcut for a path within the scope where it occurs. However, this shortcut is limited to that specific scope.

Note that `use` only creates the shortcut for the particular scope in which the `use` occurs. Listing 7-12 moves the `eat_at_restaurant` function into a new child module named `customer`, which is then a different scope than the `use`statement, so the function body won't compile.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground,test_harness,does_not_compile,ignore
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}
```

<span class="caption">Listing 7-12: A `use` statement only applies in the scope it's in</span>

The compiler error shows that the shortcut no longer applies within the `customer` module:

```sh
$ cargo build
   Compiling restaurant v0.1.0 (file:///projects/restaurant)
error[E0433]: failed to resolve: use of undeclared crate or module `hosting`
  --> src/lib.rs:11:9
   |
11 |         hosting::add_to_waitlist();
   |         ^^^^^^^ use of undeclared crate or module `hosting`
   |
help: consider importing this module through its public re-export
   |
10 +     use crate::hosting;
   |

warning: unused import: `crate::front_of_house::hosting`
 --> src/lib.rs:7:5
  |
7 | use crate::front_of_house::hosting;
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default

For more information about this error, try `rustc --explain E0433`.
warning: `restaurant` (lib) generated 1 warning
error: could not compile `restaurant` (lib) due to 1 previous error; 1 warning emitted
```

Notice there's also a warning that the `use` is no longer used in its scope! 

1. The code defines a module named `front_of_house` with a submodule `hosting`. The `add_to_waitlist` function is part of the `hosting` submodule.
2. The `use` statement brings the `hosting` module into the current scope, allowing you to call `hosting::add_to_waitlist()` directly.
3. Next, a new module named `customer` is defined, and the `eat_at_restaurant` function is placed inside it.
4. However, the `use` statement from earlier doesn't apply within the `customer` module. As a result, the function body won't compile because it can't find the `hosting` module.

The compiler error indicates that the shortcut (`hosting::add_to_waitlist()`) is no longer valid within the `customer` module. 

To fix this problem, move the `use` within the `customer` module too, or reference the shortcut in the parent module with `super::hosting` within the child `customer` module.

1. **Move the `use` Statement Inside the `customer` Module:**
   - Place the `use` statement within the `customer` module. This way, the shortcut for `hosting::add_to_waitlist()` will be available within the `customer` scope.
   - Here's how you can do it:
     ```rust
     mod front_of_house {
         pub mod hosting {
             pub fn add_to_waitlist() {}
         }
     }

     mod customer {
         // Move the `use` statement here
         use crate::front_of_house::hosting;

         pub fn eat_at_restaurant() {
             hosting::add_to_waitlist();
         }
     }
     ```

2. **Use `super::hosting` to Reference the Parent Module's Shortcut:**
   - Instead of using the `use` statement, you can directly reference the parent module's shortcut using `super::hosting`.
   - Modify the `eat_at_restaurant` function like this:
     ```rust
     mod front_of_house {
         pub mod hosting {
             pub fn add_to_waitlist() {}
         }
     }

     mod customer {
         pub fn eat_at_restaurant() {
             super::hosting::add_to_waitlist();
         }
     }
     ```

### Creating Idiomatic `use` Paths

1. **Idiomatic `use` Paths:**
   - In Rust, it's idiomatic to bring functions into scope using the parent module with `use`.
   - Listing 7-11 demonstrates this approach. We specify `use crate::front_of_house::hosting` and then call `hosting::add_to_waitlist()` within the `eat_at_restaurant` function.
   - This approach makes it clear that the function isn't locally defined while minimizing repetition of the full path.

2. **Structs, Enums, and Other Items:**
   - When bringing in structs, enums, and other items with `use`, it's idiomatic to specify the full path.
   - Listing 7-14 shows how to bring the standard library's `HashMap` struct into scope in an idiomatic way.

3. **Handling Items with the Same Name:**
   - Rust doesn't allow bringing two items with the same name into the same scope using `use` statements.
   - Listing 7-15 demonstrates how to bring two `Result` types (with the same name) into scope by using their parent modules (`std::fmt` and `std::io`).
   - Using the parent modules distinguishes between the two `Result` types.

In Listing 7-11, you might have wondered why we specified `use crate::front_of_house::hosting` and then called `hosting::add_to_waitlist` in `eat_at_restaurant`, rather than specifying the `use` path all the way out to the `add_to_waitlist` function to achieve the same result, as in Listing 7-13.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground,test_harness
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
}
```

<span class="caption">Listing 7-13: Bringing the `add_to_waitlist` function into scope with `use`, which is unidiomatic</span>

Although both Listing 7-11 and Listing 7-13 accomplish the same task, Listing 7-11 is the idiomatic way to bring a function into scope with `use`. Bringing the function's parent module into scope with `use` means we have to specify the parent module when calling the function. Specifying the parent module when calling the function makes it clear that the function isn't locally defined while still minimizing repetition of the full path. The code in Listing 7-13 is unclear as to where `add_to_waitlist` is defined.

On the other hand, when bringing in structs, enums, and other items with `use`, it's idiomatic to specify the full path. Listing 7-14 shows the idiomatic way to bring the standard library's `HashMap` struct into the scope of a binary crate.

<span class="filename">Filename: src/main.rs</span>

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

<span class="caption">Listing 7-14: Bringing `HashMap` into scope in an idiomatic way</span>

There's no strong reason behind this idiom: it's just the convention that has emerged, and folks have gotten used to reading and writing Rust code this way.

The exception to this idiom is if we're bringing two items with the same name into scope with `use` statements, because Rust doesn't allow that. Listing 7-15 shows how to bring two `Result` types into scope that have the same name but different parent modules, and how to refer to them.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground
use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // --snip--
}

fn function2() -> io::Result<()> {
    // --snip--
}
```

<span class="caption">Listing 7-15: Bringing two types with the same name into the same scope requires using their parent modules.</span>

As you can see, using the parent modules distinguishes the two `Result` types. If instead we specified `use std::fmt::Result` and `use std::io::Result`, we'd have two `Result` types in the same scope, and Rust wouldn't know which one we meant when we used `Result`.

### Providing New Names with the `as` Keyword

In Rust, when you need to bring two types with the same name into the same scope using `use` statements, you can use the `as` keyword to provide a new local name (alias) for one of the types.

There's another solution to the problem of bringing two types of the same name into the same scope with `use`: after the path, we can specify `as` and a new local name, or *alias*, for the type. Listing 7-16 shows another way to write the code in Listing 7-15 by renaming one of the two `Result` types using `as`.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
```

<span class="caption">Listing 7-16: Renaming a type when it's brought into scope with the `as` keyword</span>

In the second `use` statement, we chose the new name `IoResult` for the `std::io::Result` type, which won't conflict with the `Result` from `std::fmt` that we've also brought into scope. Listing 7-15 and Listing 7-16 are considered idiomatic, so the choice is up to you!

**Recap:** Let's break down the example from Listing 7-16:

1. **Problem Scenario:**
   - Suppose you have two types named `Result` from different parent modules: `std::fmt::Result` and `std::io::Result`.
   - Bringing both types into the same scope directly using `use` would cause a conflict.

2. **Solution with `as` Keyword:**
   - In Listing 7-16, we address this issue by renaming one of the `Result` types.
   - The line `use std::io::Result as IoResult;` creates an alias named `IoResult` for `std::io::Result`.
   - Now, you can use `IoResult` to refer specifically to the I/O-related `Result` type.

3. **Idiomatic Approach:**
   - Both Listing 7-15 (without alias) and Listing 7-16 (with alias) are considered idiomatic in Rust.
   - The choice between them depends on your preference and readability.

Using aliases with `as` helps distinguish between types with the same name, making your code clearer.

### Re-exporting Names with `pub use`

When we bring a name into scope with the `use` keyword, the name available in the new scope is private. To enable the code that calls our code to refer to that name as if it had been defined in that code's scope, we can combine `pub` and `use`. This technique is called *re-exporting* because we're bringing an item into scope but also making that item available for others to bring into their scope.

1. **Problem Scenario:**
   - Suppose you have a module named `front_of_house` with a submodule `hosting`.
   - Initially, external code would need to call the `add_to_waitlist` function using the path `restaurant::front_of_house::hosting::add_to_waitlist()`.
   - Additionally, the `front_of_house` module would need to be marked as `pub`.

Listing 7-17 shows the code in Listing 7-11 with `use` in the root module changed to `pub use`.

<span class="filename">Filename: src/lib.rs</span>

```rust,noplayground,test_harness
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

<span class="caption">Listing 7-17: Making a name available for any code to use from a new scope with `pub use`</span>

2. **Solution with `pub use`:**
   - In Listing 7-17, the `pub use` statement re-exports the `hosting` module from the root module.
   - Now, external code can use the simpler path `restaurant::hosting::add_to_waitlist()` to call the function.
   - Re-exporting allows you to expose a different structure to external users while maintaining your internal organization.

Before this change, external code would have to call the `add_to_waitlist` function by using the path `restaurant::front_of_house::hosting::add_to_waitlist()`, which also would have required the `front_of_house` module to be marked as `pub`. Now that this `pub use` has re-exported the `hosting` module from the root module, external code can use the path `restaurant::hosting::add_to_waitlist()` instead.

3. **Use Cases:**
   - Re-exporting is useful when your internal code structure differs from how external programmers think about the domain.
   - For example, in a restaurant metaphor, the staff might think in terms of "front of house" and "back of house," but customers visiting the restaurant won't use those terms.
   - With `pub use`, you can create a well-organized library for both library developers and users.

Re-exporting is useful when the internal structure of your code is different from how programmers calling your code would think about the domain. For example, in this restaurant metaphor, the people running the restaurant think about "front of house" and "back of house." But customers visiting a restaurant probably won't think about the parts of the restaurant in those terms. With `pub use`, we can write our code with one structure but expose a different structure. Doing so makes our library well organized for programmers working on the library and programmers calling the library. We'll look at another example of `pub use` and how it affects your crate's documentation in the ["Exporting a Convenient Public API with `pub use`"](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html#exporting-a-convenient-public-api-with-pub-use) section of Chapter 14.
