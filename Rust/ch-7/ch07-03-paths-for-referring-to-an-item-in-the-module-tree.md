## Paths for Referring to an Item in the Module Tree

To show Rust where to find an item in a module tree, we use a path in the same way we use a path when navigating a filesystem. To call a function, we need to know its path.

A path can take two forms:

* An *absolute path* is the full path starting from a crate root; for code from an external crate, the absolute path begins with the crate name, and for code from the current crate, it starts with the literal `crate`.
* A *relative path* starts from the current module and uses `self`, `super`, or an identifier in the current module.

Both absolute and relative paths are followed by one or more identifiers separated by double colons (`::`).

### Example: `front_of_house` module

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}
```

<span class="caption">Listing 7-1: A `front_of_house` module containing other modules that then contain functions</span>

Returning to Listing 7-1, say we want to call the `add_to_waitlist` function. This is the same as asking: what’s the path of the `add_to_waitlist` function? Listing 7-3 contains Listing 7-1 with some of the modules and functions removed.

We’ll show two ways to call the `add_to_waitlist` function from a new function, `eat_at_restaurant`, defined in the crate root. These paths are correct, but there’s another problem remaining that will prevent this example from compiling as is. We’ll explain why in a bit.

The `eat_at_restaurant` function is part of our library crate’s public API, so we mark it with the `pub` keyword. In the [“Exposing Paths with the `pub` Keyword”](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html#exposing-paths-with-the-pub-keyword) section, we’ll go into more detail about `pub`.

<span class="filename">Filename: src/lib.rs</span>

```rust,ignore,does_not_compile
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

<span class="caption">Listing 7-3: Calling the `add_to_waitlist` function using absolute and relative paths</span>

