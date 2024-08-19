## Defining Modules to Control Scope and Privacy

- **Modules**:
  - Organize code into logical units.
  - Encapsulate related functionality.
- **Paths**:
  - Allow you to name items (functions, structs, etc.).
- **`use` keyword**:
  - Brings a path into scope for easier access.
- **`pub` keyword**:
  - Makes items public (visible outside the module).
- Other topics include:
  - **`as` keyword**
  - **External packages**
  - **Glob operator**

Before we get to the details of modules and paths, here we provide a quick reference on how modules, paths, the `use` keyword, and the `pub` keyword work in the compiler, and how most developers organize their code.

### Modules Cheat Sheet

- **Start from the crate root**:
  - When compiling a crate, the compiler first looks in the crate root file (usually *src/lib.rs* for a library crate or *src/main.rs* for a binary crate) for code to compile.

- **Declaring modules**:
  - In the crate root file, you can declare new modules.
  - For example, if you declare a “garden” module with `mod garden;`, the compiler will look for the module’s code in these places:
    - Inline, within curly brackets that replace the semicolon following `mod garden`.
    - In the file *src/garden.rs*.
    - In the file *src/garden/mod.rs*.

- **Declaring submodules**:
  - In any file other than the crate root, you can declare submodules.
  - For instance, you might declare `mod vegetables;` in *src/garden.rs*.
  - The compiler will look for the submodule’s code within the directory named for the parent module in these places:
    - Inline, directly following `mod vegetables`, within curly brackets instead of the semicolon.
    - In the file *src/garden/vegetables.rs*.
    - In the file *src/garden/vegetables/mod.rs*.

- **Paths to code in modules**:
  - Once a module is part of your crate, you can refer to code in that module from anywhere else in that same crate (as long as the privacy rules allow).
  - Use the path to the code. For example, an `Asparagus` type in the garden vegetables module would be found at `crate::garden::vegetables::Asparagus`.

- **Private vs. public**:
  - Code within a module is private from its parent modules by default.
  - To make a module public, declare it with `pub mod` instead of `mod`.
  - To make items within a public module public as well, use `pub` before their declarations.

- **The `use` keyword**:
  - Within a scope, the `use` keyword creates shortcuts to items to reduce repetition of long paths.
  - For instance, in any scope that can refer to `crate::garden::vegetables::Asparagus`, you can create a shortcut with `use crate::garden::vegetables::Asparagus;`.
  - From then on, you only need to write `Asparagus` to use that type in the scope.

#### Creating the `backyard` Binary Crate

Here, we create a binary crate named `backyard` that illustrates these rules. The crate’s directory, also named `backyard`, contains the following files and directories:

```
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

The crate root file in this case is *src/main.rs*, and it contains the following code:

```rust
use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {plant:?}!");
}
```

The `pub mod garden;` line tells the compiler to include the code it finds in *src/garden.rs*, which is as follows:

**Filename: src/garden.rs**

```rust
pub mod vegetables;
```

Here, `pub mod vegetables;` means the code in *src/garden/vegetables.rs* is included too. That code defines the `Asparagus` struct.

## Grouping Related Code in Modules

*Modules* allow us to organize code within a crate for readability and easy reuse. They also provide control over the *privacy* of items, as code within a module is private by default. Private items are internal implementation details not available for external use. However, we can choose to make modules and the items within them public, exposing them for external code to use and depend on.

### Example: Restaurant Functionality

Let's create a library crate named `restaurant` to illustrate how modules can help organize code. We'll define function signatures without implementing their bodies, focusing on code organization rather than restaurant functionality.

In the restaurant industry, some areas are referred to as *front of house* and others as *back of house*:
- **Front of house**:
  - Where customers interact.
  - Includes seating, order-taking, and bartending.
- **Back of house**:
  - Where chefs, cooks, dishwashers, and managers work.

To structure our crate accordingly, we'll organize functions into nested modules. Start by creating a new library named `restaurant` using `cargo new restaurant --lib`. Then add the following code to *src/lib.rs* to define modules and function signatures for the front of house section:

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

Here's what's happening:
- We define a module named `front_of_house` using the `mod` keyword.
- Inside `front_of_house`, we have two nested modules: `hosting` and `serving`.
- Modules can also hold other items like structs, enums, constants, and functions (as shown in Listing 7-1).

By using modules, we group related definitions together and provide meaningful organization. Programmers can navigate the code based on these groups, making it easier to find relevant definitions. When adding new functionality, developers know where to place the code to maintain organization.

