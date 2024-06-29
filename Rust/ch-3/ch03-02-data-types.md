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
 -- src/main.rs:2:9
  |
2 |     let guess = "42".parse().expect("Not a number!");
  |         ^^^^^        ----- type must be known at this point
  |
  = note: cannot satisfy `<_ as FromStr::Err == _`
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

#### Integer Types

An *integer* is a number without a fractional component. This type declaration indicates that the
value it's associated with should be an unsigned integer (signed integer types start with `i` instead of `u`) that takes up 32 bits of space. 

Table 3-1 shows the built-in integer types in Rust. We can use any of these variants to declare the type of an integer value.

**Table 3-1**: Integer Types in Rust

| Length  | Signed  | Unsigned |
|---------|---------|----------|
| 8-bit   | `i8`    | `u8`     |
| 16-bit  | `i16`   | `u16`    |
| 32-bit  | `i32`   | `u32`    |
| 64-bit  | `i64`   | `u64`    |
| 128-bit | `i128`  | `u128`   |
| arch    | `isize` | `usize`  |

1. **Signed and Unsigned**:
   - Rust provides both signed and unsigned integer types.
   - **Signed**: Can represent positive and negative values (with a sign).
     - Signed numbers are stored using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) representation.
   - **Unsigned**: Only represents positive values (no sign).
     - It's like writing numbers on paper: when the sign matters, a number is shown with a plus sign or a minus sign; however, when it's safe to assume the number is positive, it's shown with no sign.
   - Example:
     - `i8` (signed): Range from -128 to 127.
     - `u8` (unsigned): Range from 0 to 255.

2. **Bit Sizes and Ranges**:
   - Each variant has an explicit size (number of bits).
   - The range of values each type can hold depends on the bit size.
   - For signed integers:
     - Range: -(2^(n-1)) to 2^(n-1) - 1 (where n is the bit size).
     - Example: `i8` can store values from -128 to 127.
   - For unsigned integers:
     - Range: 0 to 2^n - 1.
     - Example: `u8` can store values from 0 to 255.

3. **`isize` and `usize`**:
   - Architecture-dependent types.
   - `isize`: Signed integer size (32 bits on 32-bit architecture, 64 bits on 64-bit architecture).
   - `usize`: Unsigned integer size (same as `isize` based on architecture).

##### Integer literals

Table 3-2: Integer Literals in Rust

| Number literals  | Example       |
|------------------|---------------|
| Decimal          | `98_222`      |
| Hex              | `0xff`        |
| Octal            | `0o77`        |
| Binary           | `0b1111_0000` |
| Byte (`u8` only) | `b'A'`        |

**Integer Literals**:
   - You can represent integers in various forms (shown in Table 3-2).
   - Types include decimal, hexadecimal, octal, binary, and byte literals.

**Type Suffix and Visual Separators**:
   - Use type suffixes (e.g., `57u8`) to specify the numeric type explicitly.
   - Use underscores (`_`) as visual separators for readability (e.g., `1_000`).

   - Note that number literals that can be multiple numeric types allow a type suffix, such as `57u8`, to designate the type. 
   - Number literals can also use `_` as a visual separator to make the number easier to read, such as `1_000`, which will have the same value as if you had specified `1000`.

So how do you know which type of integer to use? If you're unsure, Rust's defaults are generally good places to start: integer types default to `i32`. The primary situation in which you'd use `isize` or `usize` is when indexing some sort of collection.

1. **Decimal Literal**:
   - Written in base 10 (the most common form).
   - Example: `98_222`.

2. **Hexadecimal Literal**:
   - Prefixed with `0x`.
   - Represents values in base 16.
   - Example: `0xff` (equivalent to decimal 255).

3. **Octal Literal**:
   - Prefixed with `0o`.
   - Represents values in base 8.
   - Example: `0o77` (equivalent to decimal 63).

4. **Binary Literal**:
   - Prefixed with `0b`.
   - Represents values in base 2 (binary).
   - Example: `0b1111_0000` (equivalent to decimal 240).

5. **Byte Literal (`u8` only)**:
   - Prefixed with `b`.
   - Represents a single ASCII character.
   - Example: `b'A'` (represents the character 'A').

When choosing an integer type, consider the following:
- Rust defaults to `i32` for integers.
- Use `isize` or `usize` for indexing collections (architecture-dependent).

##### Integer Overflow

*Integer overflow* results in one of two behaviors depending on the mode: panics at runtime or perform two's complement wrapping.
  1. When you're compiling in debug mode, Rust includes checks for integer overflow that cause your program to *panic* at runtime if this behavior occurs.
    - Rust uses the term *panicking* when a program exits with an error; we'll discuss panics in more depth in the ["Unrecoverable Errors with `panic!`"](https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html) section in Chapter 9.
  2.  When you're compiling in release mode with the `--release` flag, Rust does *not* include checks for integer overflow that cause panics. Instead, if overflow occurs, Rust performs *two's complement wrapping*. 
    - In short, values greater than the maximum value the type can hold "wrap around" to the minimum of the values the type can hold.
    - In the case of a `u8`, the value 256 becomes 0, the value 257 becomes 1, and so on. The program won't panic, but the variable will have a value that probably isn't what you were expecting it to have. Relying on integer overflow's wrapping behavior is considered an error.

1. **Integer Overflow**:
   - When working with integer types (e.g., `u8`, `i32`), exceeding their valid range can cause overflow.
   - Example: A `u8` variable can hold values from 0 to 255.
   - If you set a `u8` variable to 256, *integer overflow* occurs.
  
2. **Debug Mode**:
   - In debug mode, Rust checks for integer overflow and panics at runtime if it occurs.
   - Panicking means the program exits with an error.

3. **Release Mode (`--release`)**:
   - In release mode, Rust does not check for overflow.
   - Instead, it performs two's complement wrapping:
     - Values greater than the maximum wrap around to the minimum.
     - Example: 256 becomes 0, 257 becomes 1, and so on.

4. **Handling Overflow Explicitly**:
   - To explicitly handle the possibility of overflow, you can use these families of methods provided by the standard library for primitive numeric types::
     - `wrapping_*`: Wraps around in all modes (e.g., `wrapping_add`).
     - `checked_*`: Returns `None` if overflow occurs.
     - `overflowing_*`: Returns value and a boolean indicating whether there was overflow with the `overflowing_*` methods.
     - `saturating_*`: Saturates at minimum or maximum values.

