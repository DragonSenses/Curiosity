## Data Types

1. **Data Types in Rust**:
   - Every value in Rust is of a certain *data type*.
   - Data types tell Rust how to work with the data.
   - Rust supports two main data type subsets: **scalar** and **compound**.

2. **Statically Typed Language**:
   - Rust is statically typed, which means that it must know the types of all variables at compile time.
   - The compiler usually infers types based on values and usage.
   - When multiple types are possible (e.g., converting a `String` to a numeric type), we add type annotations.
   - Example:
     ```rust
     let guess: u32 = "42".parse().expect("Not a number!");
     ```

3. **Type Inference and Annotations**:
   - Type inference helps determine types automatically.
   - Type annotations (like `: u32`) provide explicit information when needed.

If we don't add the `: u32` type annotation shown in the preceding code, Rust will display the following error, which means the compiler needs more information from us to know which type we want to use:

```sh
$ cargo build
   Compiling no_type_annotations v0.1.0 (file:///projects/no_type_annotations)
error[E0284]: type annotations needed
 --> src/main.rs:2:9
  |
2 |     let guess = "42".parse().expect("Not a number!");
  |         ^^^^^        ----- type must be known at this point
  |
  = note: cannot satisfy `<_ as FromStr>::Err == _`
help: consider giving `guess` an explicit type
  |
2 |     let guess: /* Type */ = "42".parse().expect("Not a number!");
  |              ++++++++++++

For more information about this error, try `rustc --explain E0284`.
error: could not compile `no_type_annotations` (bin "no_type_annotations") due to 1 previous error
```

You'll see different type annotations for other data types.

### Scalar Types

A *scalar* type represents a single value. 

Rust has four primary scalar types:

1. **Integer Types**:
   - Integers represent whole numbers without fractional components.
   - Rust provides various integer types, both signed and unsigned:
     - `i8`, `i16`, `i32`, `i64`, `i128`: Signed integers with specific bit sizes.
     - `u8`, `u16`, `u32`, `u64`, `u128`: Unsigned integers with specific bit sizes.
     - `isize`, `usize`: Architecture-dependent signed and unsigned integers.
   - Example:
     ```rust
     let my_number: i32 = 42;
     ```

2. **Floating-Point Numbers**:
   - Represent real numbers with fractional components.
   - Two variants: `f32` (single precision) and `f64` (double precision).
   - Example:
     ```rust
     let pi_approx: f64 = 3.14159;
     ```

3. **Booleans**:
   - Represent true or false values.
   - Type: `bool`.
   - Example:
     ```rust
     let is_sunny: bool = true;
     ```

4. **Characters**:
   - Represent single Unicode characters.
   - Type: `char`.
   - Example:
     ```rust
     let first_letter: char = 'A';
     ```

