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

