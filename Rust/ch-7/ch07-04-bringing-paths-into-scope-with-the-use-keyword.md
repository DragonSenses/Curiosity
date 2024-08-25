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

Having to write out the paths to call functions can feel inconvenient and repetitive. In Listing 7-7, whether we chose the absolute or relative path to the `add_to_waitlist` function, every time we wanted to call `add_to_waitlist` we had to specify `front_of_house` and `hosting` too. Fortunately, there’s a way to simplify this process: we can create a shortcut to a path with the `use` keyword once, and then use the shorter name everywhere else in the scope.

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
