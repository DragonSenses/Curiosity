## Packages and Crates

The first parts of the module system we'll cover are packages and crates.

### **Crate**:
  - A crate is the smallest amount of code that the Rust compiler considers at a time.
  - Even if you run `rustc` directly (without using `cargo`) and pass a single source code file, the compiler treats that file as a crate.
  - Crates can contain modules, and these modules may be defined in other files that get compiled with the crate.
  - Crates come in two forms: binary crates and library crates.
    - **Binary crates** are programs that compile to an executable (e.g., command-line programs or servers).
    - Each binary crate must have a `main` function that defines what happens when the executable runs.
    - Most of the crates we've created so far have been binary crates.
  - **Library crates** don't have a `main` function and don't compile to an executable.
    - Instead, they define functionality intended to be shared across multiple projects.
    - For example, the `rand` crate provides functionality for generating random numbers.
    - Rustaceans often use the term "crate" interchangeably with the general programming concept of a "library."

### **Crate Root**:
  - The crate root is a source file from which the Rust compiler starts.
  - It forms the root module of your crate.
  - We'll explore modules in more detail in the ["Defining Modules to Control Scope and Privacy"](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html) section.

### **Package**:
  - A package bundles one or more crates together to provide a set of functionality.
  - Each package contains a *Cargo.toml* file that describes how to build its crates.
  - Cargo itself is a package:
    - It contains the binary crate for the command-line tool you've been using to build your code.
    - The Cargo package also includes a library crate that the binary crate depends on.
    - Other projects can depend on the Cargo library crate to use the same logic as the Cargo command-line tool.
  - A package can contain as many binary crates as you like, but at most only one library crate.
  - A package must contain at least one crate, whether that’s a library or binary crate.

### Example: Package Creation

Let’s walk through what happens when we create a package using Cargo. Here are the steps:

1. First, we enter the command `cargo new my-project` in the terminal:

    ```console
    $ cargo new my-project
         Created binary (application) `my-project` package
    ```

2. After running `cargo new my-project`, we use `ls` to see what Cargo creates:
   - In the project directory (`my-project`), we find:
     - A *Cargo.toml* file, which defines our package.
     - A *src* directory that contains *main.rs*.
   - Note that *Cargo.toml* does not explicitly mention *src/main.rs*. Cargo follows a convention:
     - If *src/main.rs* exists, it serves as the crate root for a binary crate with the same name as the package.
     - If the package directory contains *src/lib.rs*, it contains a library crate with the same name, and *src/lib.rs* is its crate root.
     - Cargo passes the crate root files to `rustc` for building the library or binary.

3. In this example:
   - Our package contains only *src/main.rs*, resulting in a binary crate named `my-project`.
   - If a package contains both *src/main.rs* and *src/lib.rs*, it has two crates: a binary and a library, both with the same name as the package.
   - To have multiple binary crates, we can place files in the *src/bin* directory, where each file becomes a separate binary crate.
