## Generic Data Types

We use generics to create definitions for items like function signatures or structs, which we can then use with many different concrete data types. Let's first look at how to define functions, structs, enums, and methods using generics. Then we'll discuss how generics affect code performance.

### In Function Definitions

When defining a function that uses generics, we place the generics in the signature of the function where we would usually specify the data types of the parameters and return value. Doing so makes our code more flexible and provides more functionality to callers of our function while preventing code duplication.

Continuing with our `largest` function, Listing 10-4 shows two functions that both find the largest value in a slice. We'll then combine these into a single function that uses generics.

#### Example: src/main.rs

```rust
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {result}");
}
```

<span class="caption">Listing 10-4: Two functions that differ only in their names and in the types in their signatures</span>

### Eliminate Duplication with Generics

The `largest_i32` function is the one we extracted in Listing 10-3 that finds the largest `i32` in a slice. The `largest_char` function finds the largest `char` in a slice. The function bodies have the same code, so let's eliminate the duplication by introducing a generic type parameter in a single function.

To parameterize the types in a new single function, we need to name the type parameter, just as we do for the value parameters to a function. You can use any identifier as a type parameter name. But we'll use `T` because, by convention, type parameter names in Rust are short, often just one letter, and Rust's type-naming convention is UpperCamelCase. Short for *type*, `T` is the default choice of most Rust programmers.

### Declaring Type Parameters in Function Signatures

When we use a parameter in the body of the function, we have to declare the parameter name in the signature so the compiler knows what that name means. Similarly, when we use a type parameter name in a function signature, we have to declare the type parameter name before we use it.

To define the generic `largest` function, we place type name declarations inside angle brackets, `<>`, between the name of the function and the parameter list, like this:

```rust, ignore
fn largest<T>(list: &[T]) -> &T {
```

We read this definition as: the function `largest` is generic over some type `T`. This function has one parameter named `list`, which is a slice of values of type `T`. The `largest` function will return a reference to a value of the same type `T`.

Listing 10-5 shows the combined `largest` function definition using the generic data type in its signature. The listing also shows how we can call the function with either a slice of `i32` values or `char` values. Note that this code won't compile yet, but we'll fix it later in this chapter.

<span class="filename">Filename: src/main.rs</span>

```rust,ignore,does_not_compile
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {result}");
}
```

<span class="caption">Listing 10-5: The `largest` function using generic type parameters; this doesn't compile yet</span>

If we compile this code right now, we'll get this error:

```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0369]: binary operation `>` cannot be applied to type `&T`
 --> src/main.rs:5:17
  |
5 |         if item > largest {
  |            ---- ^ ------- &T
  |            |
  |            &T
  |
help: consider restricting type parameter `T`
  |
1 | fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
  |             ++++++++++++++++++++++

For more information about this error, try `rustc --explain E0369`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

### Enabling Comparisons with Traits

- The help text mentions `std::cmp::PartialOrd`, a *trait*.
- This error indicates that the body of `largest` won't work for all possible types that `T` could be.
- To compare values of type `T` in the body, we can only use types whose values can be ordered.
- The standard library has the `std::cmp::PartialOrd` trait for enabling comparisons.
- By following the help text's suggestion, we restrict `T` to types that implement `PartialOrd`.
- This example will compile because the standard library implements `PartialOrd` on both `i32` and `char`.

### In Struct Definitions

We can also define structs to use a generic type parameter in one or more fields using the `<>` syntax. Listing 10-6 defines a `Point<T>` struct to hold `x` and `y` coordinate values of any type.

<span class="filename">Filename: src/main.rs</span>

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}
```

<span class="caption">Listing 10-6: A `Point<T>` struct that holds `x` and `y` values of type `T`</span>

The syntax for using generics in struct definitions is similar to that used in function definitions. First we declare the name of the type parameter inside angle brackets just after the name of the struct. Then we use the generic type in the struct definition where we would otherwise specify concrete data types.

Note that because we've used only one generic type to define `Point<T>`, this definition says that the `Point<T>` struct is generic over some type `T`, and the fields `x` and `y` are *both* that same type, whatever that type may be. If we create an instance of a `Point<T>` that has values of different types, as in Listing 10-7, our code won't compile.

<span class="filename">Filename: src/main.rs</span>

```rust,ignore,does_not_compile
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let wont_work = Point { x: 5, y: 4.0 };
}
```

<span class="caption">Listing 10-7: The fields `x` and `y` must be the same type because both have the same generic data type `T`.</span>

In this example, when we assign the integer value `5` to `x`, we let the compiler know that the generic type `T` will be an integer for this instance of `Point<T>`. Then when we specify `4.0` for `y`, which we've defined to have the same type as `x`, we'll get a type mismatch error like this:

```sh
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0308]: mismatched types
 --> src/main.rs:7:38
  |
7 |     let wont_work = Point { x: 5, y: 4.0 };
  |                                      ^^^ expected integer, found floating-point number

For more information about this error, try `rustc --explain E0308`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error
```

To define a `Point` struct where `x` and `y` are both generics but could have different types, we can use multiple generic type parameters. For example, in Listing 10-8, we change the definition of `Point` to be generic over types `T` and `U` where `x` is of type `T` and `y` is of type `U`.

<span class="filename">Filename: src/main.rs</span>

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

<span class="caption">Listing 10-8: A `Point<T, U>` generic over two types so that `x` and `y` can be values of different types</span>

Now all the instances of `Point` shown are allowed! You can use as many generic type parameters in a definition as you want, but using more than a few makes your code hard to read. If you're finding you need lots of generic types in your code, it could indicate that your code needs restructuring into smaller pieces.

#### Summary of Using Generics in Struct Definitions

##### Defining Structs with Generics

- Define structs to use a generic type parameter using the `<>` syntax.
- **Example**: 
  - `Point<T>` struct holds `x` and `y` values of any type `T`.
  - Usage:
    ```rust
    struct Point<T> {
        x: T,
        y: T,
    }
    fn main() {
        let integer = Point { x: 5, y: 10 };
        let float = Point { x: 1.0, y: 4.0 };
    }
    ```
- Syntax similar to function definitions: declare the type parameter name inside angle brackets after the struct name.
- Note: Using one generic type `Point<T>` means `x` and `y` are the same type.
- **Error Example**:
  - Instance with different types for `x` and `y` will not compile:
    ```rust,ignore,does_not_compile
    struct Point<T> {
        x: T,
        y: T,
    }
    fn main() {
        let wont_work = Point { x: 5, y: 4.0 };
    }
    ```
  - Error message example:
    ```sh
    $ cargo run
       Compiling chapter10 v0.1.0 (file:///projects/chapter10)
    error[E0308]: mismatched types
     --> src/main.rs:7:38
      |
    7 |     let wont_work = Point { x: 5, y: 4.0 };
      |                                      ^^^ expected integer, found floating-point number
    ```

##### Multiple Generic Types

- To define a `Point` struct where `x` and `y` can have different types, use multiple generic type parameters:
  ```rust
  struct Point<T, U> {
      x: T,
      y: U,
  }
  fn main() {
      let both_integer = Point { x: 5, y: 10 };
      let both_float = Point { x: 1.0, y: 4.0 };
      let integer_and_float = Point { x: 5, y: 4.0 };
  }
  ```

- Use as many generic type parameters as needed, but avoid overusing them to keep code readable. Too many generic types may indicate a need for code restructuring.

### In Enum Definitions

As we did with structs, we can define enums to hold generic data types in their variants. Let's take another look at the `Option<T>` enum that the standard library provides, which we used in Chapter 6:

```rust
enum Option<T> {
    Some(T),
    None,
}
```

This definition should now make more sense to you. As you can see, the `Option<T>` enum is generic over type `T` and has two variants: `Some`, which holds one value of type `T`, and a `None` variant that doesn't hold any value. By using the `Option<T>` enum, we can express the abstract concept of an optional value, and because `Option<T>` is generic, we can use this abstraction no matter what the type of the optional value is.

Enums can use multiple generic types as well. The definition of the `Result` enum that we used in Chapter 9 is one example:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

The `Result` enum is generic over two types, `T` and `E`, and has two variants: `Ok`, which holds a value of type `T`, and `Err`, which holds a value of type `E`. This definition makes it convenient to use the `Result` enum anywhere we have an operation that might succeed (return a value of some type `T`) or fail (return an error of some type `E`). In fact, this is what we used to open a file in Listing 9-3, where `T` was filled in with the type `std::fs::File` when the file was opened successfully and `E` was filled in with the type `std::io::Error` when there were problems opening the file.

When you recognize situations in your code with multiple struct or enum definitions that differ only in the types of the values they hold, you can avoid duplication by using generic types instead.

#### In Enum Definitions - Summary

- **Defining Enums with Generics**:
  - Enums can be defined to hold generic data types using the `<>` syntax.
  - Example: The `Option<T>` enum is generic over type `T` and has two variants:
    - `Some(T)`: Holds a value of type `T`.
    - `None`: Doesn't hold any value.

- **Usage of `Option<T>`**:
  - Expresses the abstract concept of an optional value.
  - Can be used with any type due to its generic nature.

- **Multiple Generic Types in Enums**:
  - Example: The `Result<T, E>` enum is generic over two types, `T` and `E`.
    - `Ok(T)`: Holds a value of type `T`.
    - `Err(E)`: Holds a value of type `E`.

- **Usage of `Result<T, E>`**:
  - Convenient for operations that might succeed (return a value of type `T`) or fail (return an error of type `E`).
  - Example: Opening a file where:
    - `T` is `std::fs::File` on success.
    - `E` is `std::io::Error` on failure.

- **Avoiding Duplication**:
  - Use generic types to avoid duplication when you have multiple struct or enum definitions that differ only in the types of values they hold.

### In Method Definitions

#### Using Generics in Method Definitions

We can implement methods on structs and enums (as we did in Chapter 5) and use generic types in their definitions too. Listing 10-9 shows the `Point<T>` struct we defined in Listing 10-6 with a method named `x` implemented on it.

<span class="filename">Filename: src/main.rs</span>

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

<span class="caption">Listing 10-9: Implementing a method named `x` on the `Point<T>` struct that will return a reference to the `x` field of type `T`</span>

Here, we've defined a method named `x` on `Point<T>` that returns a reference to the data in the field `x`.

Note that we have to declare `T` just after `impl` so we can use `T` to specify that we're implementing methods on the type `Point<T>`. By declaring `T` as a generic type after `impl`, Rust can identify that the type in the angle brackets in `Point` is a generic type rather than a concrete type. We could have chosen a different name for this generic parameter than the generic parameter declared in the struct definition, but using the same name is conventional. Methods written within an `impl` that declares the generic type will be defined on any instance of the type, no matter what concrete type ends up substituting for the generic type.

We can also specify constraints on generic types when defining methods on the type. We could, for example, implement methods only on `Point<f32>` instances rather than on `Point<T>` instances with any generic type. In Listing 10-10 we use the concrete type `f32`, meaning we don't declare any types after `impl`.

<span class="filename">Filename: src/main.rs</span>

```rust
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

<span class="caption">Listing 10-10: An `impl` block that only applies to a struct with a particular concrete type for the generic type parameter `T`</span>

This code means the type `Point<f32>` will have a `distance_from_origin` method; other instances of `Point<T>` where `T` is not of type `f32` will not have this method defined. The method measures how far our point is from the point at coordinates (0.0, 0.0) and uses mathematical operations that are available only for floating-point types.

Generic type parameters in a struct definition aren't always the same as those you use in that same struct's method signatures. Listing 10-11 uses the generic types `X1` and `Y1` for the `Point` struct and `X2` `Y2` for the `mixup` method signature to make the example clearer. The method creates a new `Point` instance with the `x` value from the `self` `Point` (of type `X1`) and the `y` value from the passed-in `Point` (of type `Y2`).

<span class="filename">Filename: src/main.rs</span>

```rust
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> Point<X1, Y1> {
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
```

<span class="caption">Listing 10-11: A method that uses generic types different from its struct's definition</span>

In `main`, we've defined a `Point` that has an `i32` for `x` (with value `5`) and an `f64` for `y` (with value `10.4`). The `p2` variable is a `Point` struct that has a string slice for `x` (with value `"Hello"`) and a `char` for `y` (with value `c`). Calling `mixup` on `p1` with the argument `p2` gives us `p3`, which will have an `i32` for `x` because `x` came from `p1`. The `p3` variable will have a `char` for `y` because `y` came from `p2`. The `println!` macro call will print `p3.x = 5, p3.y = c`.

The purpose of this example is to demonstrate a situation in which some generic parameters are declared with `impl` and some are declared with the method definition. Here, the generic parameters `X1` and `Y1` are declared after `impl` because they go with the struct definition. The generic parameters `X2` and `Y2` are declared after `fn mixup` because they're only relevant to the method.

### Summary of Using Generics in Method Definitions

#### Implementing Methods on Structs and Enums

- You can implement methods on structs and enums using generic types.
- Example: `Point<T>` struct with a method named `x` that returns a reference to the `x` field.

#### Declaring Type Parameters in Methods

- Declare the generic type after `impl` to specify you're implementing methods on `Point<T>`.
- Rust uses the generic type in angle brackets to identify it as a generic type rather than a concrete type.
- It's conventional to use the same generic type name as declared in the struct definition.

#### Defining Methods with Constraints

- Specify constraints on generic types when defining methods on the type.
- Example: `Point<f32>` with a `distance_from_origin` method that only applies to `Point<f32>` instances.
- The method measures the distance from the origin using floating-point operations.

#### Using Different Generic Types in Methods

- Generic type parameters in a struct definition can differ from those in method signatures.
- Example: `Point<X1, Y1>` struct with a `mixup` method that uses `X2, Y2` for its parameters.
- The method creates a new `Point` with the `x` value from `self` and the `y` value from the passed-in `Point`.

#### Practical Example

- Demonstrates creating `Point` instances with different types and using the `mixup` method to combine them.
- Example: Combining an `i32` and `f64` `Point` with a `string slice` and `char` `Point`.

### Performance of Code Using Generics - Summary

- **No Runtime Cost**: Using generic types won't make your program run any slower than using concrete types.

- **Monomorphization**:
  - *Definition*: Monomorphization is the process of turning generic code into specific code by filling in concrete types used at compile time.
  - *Process*: The compiler looks at all the places where generic code is called and generates code for the concrete types the generic code is called with.

- **Example with `Option<T>` Enum**:
  - When Rust compiles code using `Option<T>`, it performs monomorphization to create specific code for each concrete type used.
  - For example, `Option<i32>` and `Option<f64>` are generated for `i32` and `f64` types used with `Option<T>`.

- **Monomorphized Version of the Code**:
  - The compiler creates specific definitions for each type, replacing the generic definition with specific ones.
  - Example: `Option_i32` and `Option_f64` are generated for `i32` and `f64`.

- **Efficiency**:
  - Rust compiles generic code into code that specifies the type in each instance, leading to no runtime cost for using generics.
  - The code runs as efficiently as if each definition was written by hand.

### Performance of Code Using Generics

You might be wondering whether there is a runtime cost when using generic type parameters. The good news is that using generic types won't make your program run any slower than it would with concrete types.

Rust accomplishes this by performing monomorphization of the code using generics at compile time. *Monomorphization* is the process of turning generic code into specific code by filling in the concrete types that are used when compiled. In this process, the compiler does the opposite of the steps we used to create the generic function in Listing 10-5: the compiler looks at all the places where generic code is called and generates code for the concrete types the generic code is called with.

Let's look at how this works by using the standard library's generic `Option<T>` enum:

```rust
let integer = Some(5);
let float = Some(5.0);
```

When Rust compiles this code, it performs monomorphization. During that process, the compiler reads the values that have been used in `Option<T>` instances and identifies two kinds of `Option<T>`: one is `i32` and the other is `f64`. As such, it expands the generic definition of `Option<T>` into two definitions specialized to `i32` and `f64`, thereby replacing the generic definition with the specific ones.

The monomorphized version of the code looks similar to the following (the compiler uses different names than what we're using here for illustration):

<span class="filename">Filename: src/main.rs</span>

```rust
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```

The generic `Option<T>` is replaced with the specific definitions created by the compiler. Because Rust compiles generic code into code that specifies the type in each instance, we pay no runtime cost for using generics. When the code runs, it performs just as it would if we had duplicated each definition by hand. The process of monomorphization makes Rust's generics extremely efficient at runtime.
