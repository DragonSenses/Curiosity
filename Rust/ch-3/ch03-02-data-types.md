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

#### Floating-Point Types

1. **Floating-Point Types**:
   - Rust provides two primitive *floating-point* types: `f32` (single precision) and `f64` (double precision).
   - `f32` is 32 bits, and `f64` is 64 bits.
   - Default type: `f64`.
   - All floating-point types are signed.

2. **Precision and Performance**:
   - `f64` is the default because it offers more precision.
   - On modern CPUs, `f64` is roughly as fast as `f32`.
   - Choose based on precision needs.

3. **IEEE-754 Standard**:
   - *Floating-point numbers*, which are numbers with decimal points, follow the IEEE-754 standard.
   - `f32` type (single-precision float) and `f64` type (double-precision float) adhere to this standard.

Here's an example that shows floating-point numbers in action:

**Filename**: `src/main.rs`

```rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
}
```

#### Numeric Operations

Rust supports the basic mathematical operations you'd expect for all the number types: addition, subtraction, multiplication, division, and remainder. Integer division truncates toward zero to the nearest integer.

The following code shows how you'd use each numeric operation in a `let` statement:

**Filename**: `src/main.rs`

```rust
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let truncated = -5 / 3; // Results in -1

    // remainder
    let remainder = 43 % 5;
}
```

Each expression in these statements uses a mathematical operator and evaluates to a single value, which is then bound to a variable. [Appendix B](https://doc.rust-lang.org/book/appendix-02-operators.html) contains a list of all operators that Rust provides.

#### The Boolean Type

As in most other programming languages, a Boolean type in Rust has two possible values: `true` and `false`. Booleans are one byte in size. The Boolean type in Rust is specified using `bool`. For example:

**Filename**: `src/main.rs`

```rust
fn main() {
    let t = true;

    let f: bool = false; // with explicit type annotation
}
```

The main way to use Boolean values is through conditionals, such as an `if` expression. We'll cover how `if` expressions work in Rust in the ["Control Flow"](https://doc.rust-lang.org/book/ch03-05-control-flow.html#control-flow) section.

#### The Character Type

Rust's `char` type is the language's most primitive alphabetic type. Here are some examples of declaring `char` values:

**Filename**: `src/main.rs`

```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

1. **Character Literals**:
   - In Rust, we specify `char` literals using single quotes (`'`), while string literals use double quotes (`"`).
   - For example: `'A'` is a `char` literal, and `"hello"` is a string literal.

2. **Size and Representation**:
   - Rust's `char` type is always four bytes in size.
   - It represents a Unicode Scalar Value, which means it can represent a lot more than just ASCII characters.
   - Accented letters; Chinese, Japanese, Korean characters; emoji; and zero-width spaces are all valid `char` values in Rust.
   - Four bytes is simply the smallest power of two in which you can store any Unicode scalar value. The decision was driven by the domain, not by architectural constraints.
  
3. **Unicode Scalar Values**:
   - Unicode Scalar Values cover the entire range of valid `char` values.
   - They range from `U+0000` to `U+D7FF` and from `U+E000` to `U+10FFFF`, inclusive.
   - Note that not all Unicode scalar values represent real characters; some are reserved or noncharacters.

4. **Human Intuition vs. Unicode Concepts**:
   - However, a "character" isn't really a concept in Unicode, so your human intuition for what a "character" is may not match up with what a `char` is in Rust.
   - While humans think of characters intuitively, Unicode's definition of a "character" may differ.
   - Rust's `char` type aligns with Unicode Scalar Values, ensuring consistency across platforms.

5. **Further Exploration**:
   - We'll discuss this topic in detail in ["Storing UTF-8 Encoded Text with Strings"](https://doc.rust-lang.org/book/ch08-02-strings.html#storing-utf-8-encoded-text-with-strings) in Chapter 8 of the Rust book.

### Compound Types

*Compound types* can group multiple values into one type. Rust has two primitive compound types: tuples and arrays.

#### The Tuple Type

A *tuple* is a general way of grouping together a number of values with a variety of types into one compound type. Tuples have a fixed length: once declared, they cannot grow or shrink in size.

We create a tuple by writing a comma-separated list of values inside parentheses. Each position in the tuple has a type, and the types of the different values in the tuple don't have to be the same. We've added optional
type annotations in this example:

**Filename**: `src/main.rs`

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```
The variable `tup` binds to the entire tuple because a tuple is considered a single compound element. To get the individual values out of a tuple, we can use pattern matching to destructure a tuple value, like this:

**Filename**: `src/main.rs`

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

1. A tuple is created with three elements: `(500, 6.4, 1)` and binds it to the variable `tup`
2. It then uses a pattern with `let` and assigns each element of the tuple to three separate variables (`x`, `y`, and `z`).
3. This process is known as *destructuring* because it breaks down the tuple into its individual parts.
4. The program then prints the value of `y`, which is `6.4`.

**Tuple Element Access**:

- We can access a tuple element directly by using a period (`.`) followed by the index of the value we want to access.

For example:

**Filename**: `src/main.rs`

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

This program creates the tuple `x` and then accesses each element of the tuple using their respective indices.

1. **Indexing Starts at 0**:
   - Like most programming languages, tuple indexing starts from 0.
   - The first element is accessed using `.0`, the second using `.1`, and so on.

2. **Unit Tuple**:
   - A tuple without any values is called the *unit* tuple.
   - It is represented by `()` and serves as an empty value or an empty return type.
   - Expressions implicitly return the unit value if they don't return any other value.

#### The Array Type

1. **Arrays**:
   - Arrays provide a way to store multiple values of the same type.
   - Unlike tuples, all elements in an array must have the same data type.
   - Rust arrays have a fixed length, which means you specify the size when creating them.

We write the values in an array as a comma-separated list inside square brackets:

**Filename**: `src/main.rs`

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

Arrays are useful when you want your data allocated on the stack rather than the heap (we will discuss the stack and the heap more in [Chapter 4](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#the-stack-and-the-heap)) or when you want to ensure you always have a fixed number of elements. 

An array isn't as flexible as the vector type, though. A *vector* is a similar collection type provided by the standard library that *is* allowed to grow or shrink in size. If you're unsure whether to use an array or a vector, chances are you should use a vector. [Chapter 8](https://doc.rust-lang.org/book/ch08-01-vectors.html) discusses vectors in more detail.

1. **Arrays**:
   - Useful when you want data allocated on the stack (as opposed to the heap).
   - Ideal for fixed-size collections where the number of elements remains constant.
   - Not as flexible as vectors.

2. **Vectors**:
   - Similar to arrays but dynamically sized (can grow or shrink).
   - Provided by the standard library.
   - If unsure, opt for vectors due to their flexibility.

However, arrays are more useful when you know the number of elements will not need to change. For example, if you were using the names of the month in a program, you would probably use an array rather than a vector because you know it will always contain 12 elements:

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
```

##### Declaring an array

1. To define an array's type:
   - Use square brackets with the type of each element.
   - Add a semicolon and specify the number of elements in the array.

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
```

Here, `i32` is the type of each element. After the semicolon, the number `5` indicates the array contains five elements.

2. Initializing an array with the same value for all elements:
   - Specify the initial value followed by a semicolon.
   - Indicate the length of the array in square brackets.

```rust
let a = [3; 5]; // Creates an array with 5 elements, all set to the value 3
```

The array named `a` will contain `5` elements that will all be set to the value `3` initially. This is the same as writing `let a = [3, 3, 3, 3, 3];` but in a more concise way.

##### Accessing Array Elements

1. **Array Basics**:
   - An array is a single chunk of memory with a fixed size.
   - It can be allocated on the stack.
   - All elements in an array must have the same data type.

2. **Accessing Elements**:
   - You can access array elements using indexing, like this:

**Filename**: `src/main.rs`

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];   // Value at index 0 (1)
    let second = a[1];  // Value at index 1 (2)
}
```

In this example, the variable named `first` will get the value `1` because that is the value at index `[0]` in the array. The variable named `second` will get the value `2` from index `[1]` in the array.

##### Invalid Array Element Access

Let's see what happens if you try to access an element of an array that is past the end of the array. Say you run this code to get an array index from the user:

**Filename**: `src/main.rs`

```rust,ignore,panics
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}
```

This code compiles successfully. If you run this code using `cargo run` and enter `0`, `1`, `2`, `3`, or `4`, the program will print out the corresponding value at that index in the array. If you instead enter a number past the end of the array, such as `10`, you'll see output like this:

```sh
thread 'main' panicked at src/main.rs:19:19:
index out of bounds: the len is 5 but the index is 10
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

