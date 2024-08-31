## Storing Lists of Values with Vectors

- The first collection type is `Vec<T>`, also known as a *vector*.
- Vectors allow you to store multiple values in a single data structure.
- All values in a vector are stored next to each other in memory.
- Vectors can only store values of the same type.
- They are useful for lists of items, such as:
  - Lines of text in a file.
  - Prices of items in a shopping cart.

### Creating a New Vector

To create a new empty vector, we call the `Vec::new` function, as shown in Listing 8-1.

```rust
let v: Vec<i32> = Vec::new();
```

<span class="caption">Listing 8-1: Creating a new, empty vector to hold values of type `i32`</span>

- **Type Annotation**: We added a type annotation because we aren't inserting any values into this vector. Rust doesn't know what kind of elements we intend to store.
- **Generics**: Vectors are implemented using generics. The `Vec<T>` type can hold any type. When creating a vector to hold a specific type, we specify the type within angle brackets. In Listing 8-1, we've told Rust that the `Vec<T>` in `v` will hold elements of the `i32` type.

More often, you'll create a `Vec<T>` with initial values, and Rust will infer the type of value you want to store, so you rarely need to do this type annotation. Rust conveniently provides the `vec!` macro, which will create a new vector that holds the values you give it. Listing 8-2 creates a new `Vec<i32>` that holds the values `1`, `2`, and `3`. The integer type is `i32` because that's the default integer type, as discussed in the ["Data Types"](https://doc.rust-lang.org/book/ch03-02-data-types.html#data-types) section of Chapter 3.

```rust
let v = vec![1, 2, 3];
```

<span class="caption">Listing 8-2: Creating a new vector containing values</span>

Because we've given initial `i32` values, Rust can infer that the type of `v` is `Vec<i32>`, and the type annotation isn't necessary.

Next, we'll look at how to modify a vector.

### Updating a Vector

To add elements to a vector, use the `push` method. Here's an example:

```rust
    let mut v = Vec::new();

    v.push(5);
    v.push(6);
    v.push(7);
    v.push(8);
```

- **Mutability**: The vector must be mutable (`mut`) to allow changes.
- **Type Inference**: Rust infers the type (`i32` in this case) from the data, so explicit type annotation (`Vec<i32>`) is not needed.

### Reading Elements of Vectors

There are two ways to reference a value stored in a vector: via indexing or by using the `get` method. Here are the details:

- **Indexing**: Access an element directly using the index.
- **`get` Method**: Access an element using the `get` method, which returns an `Option`.

#### Example

Listing 8-4 shows both methods of accessing a value in a vector:

```rust
    let v = vec![1, 2, 3, 4, 5];

    let third: &i32 = &v[2];
    println!("The third element is {third}");

    let third: Option<&i32> = v.get(2);
    match third {
        Some(third) => println!("The third element is {third}"),
        None => println!("There is no third element."),
    }
```

<span class="caption">Listing 8-4: Using indexing syntax and using the `get` method to access an item in a vector</span>

#### Key Points

- **Indexing**: Use the index value of `2` to get the third element because vectors are zero-indexed.
- **Reference**: Using `&` and `[]` gives a reference to the element at the index.
- **`get` Method**: Returns an `Option<&T>`, which can be used with `match` to handle the possibility of the element not being present.

### Handling Out-of-Bounds Indexing in Vectors

Rust provides two ways to reference an element in a vector, allowing you to choose how the program behaves when an index is out of range. Here's an example of accessing an element at index 100 in a vector of five elements (Listing 8-5):

```rust,should_panic,panics
    let v = vec![1, 2, 3, 4, 5];

    let does_not_exist = &v[100];
    let does_not_exist = v.get(100);
```

<span class="caption">Listing 8-5: Attempting to access the element at index 100 in a vector containing five elements</span>

#### Indexing with `[]`

- **Behavior**: Causes the program to panic if the index is out of bounds.
- **Use Case**: Best used when you want the program to crash if an invalid index is accessed.

When we run this code, the first `[]` method will cause the program to panic because it references a nonexistent element. This method is best used when you want your program to crash if there's an attempt to access an element past the end of the vector.

#### Using the `get` Method

- **Behavior**: Returns `None` if the index is out of bounds, without panicking.
- **Use Case**: Useful when out-of-bounds access might occur under normal circumstances. Allows handling of `Some(&element)` or `None` gracefully.

When the `get` method is passed an index that is outside the vector, it returns
`None` without panicking. You would use this method if accessing an element
beyond the range of the vector may happen occasionally under normal
circumstances. Your code will then have logic to handle having either
`Some(&element)` or `None`.

Example Scenario:
- If the index comes from user input, using `get` allows you to handle invalid input more gracefully by informing the user and giving them another chance to enter a valid value, rather than crashing the program.

### Borrow Checker and References in Vectors

When a program has a valid reference, the borrow checker enforces ownership and borrowing rules to ensure the reference and any other references to the contents of the vector remain valid. Recall the rule that you can't have mutable and immutable references in the same scope. This rule applies in Listing 8-6, where we hold an immutable reference to the first element in a vector and try to add an element to the end. This program won't work if we also try to refer to that element later in the function.

#### Example

```rust,ignore,does_not_compile
    let mut v = vec![1, 2, 3, 4, 5];

    let first = &v[0];

    v.push(6);

    println!("The first element is: {first}");
```

<span class="caption">Listing 8-6: Attempting to add an element to a vector while holding a reference to an item</span>

#### Compilation Error

Compiling this code will result in the following error:

```sh
$ cargo run
   Compiling collections v0.1.0 (file:///projects/collections)
error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:5
  |
4 |     let first = &v[0];
  |                  - immutable borrow occurs here
5 |
6 |     v.push(6);
  |     ^^^^^^^^^ mutable borrow occurs here
7 |
8 |     println!("The first element is: {first}");
  |                                     ------- immutable borrow later used here

For more information about this error, try `rustc --explain E0502`.
error: could not compile `collections` (bin "collections") due to 1 previous error
```

#### Explanation

- **Immutable and Mutable References**: The code in Listing 8-6 might look like it should work, but it fails because you cannot have both mutable and immutable references in the same scope.
- **Memory Allocation**: Vectors store values contiguously in memory. Adding a new element might require reallocating memory and copying the old elements to the new space if there isn't enough room. This would invalidate the reference to the first element, which could point to deallocated memory.
- **Borrowing Rules**: The borrowing rules prevent programs from ending up in such situations, ensuring memory safety.

> Note: For more on the implementation details of the `Vec<T>` type, see ["The Rustonomicon"](https://doc.rust-lang.org/nomicon/vec/vec.html).

### Iterating Over the Values in a Vector

To access each element in a vector sequentially, you can iterate through all the elements rather than using indices to access them one at a time.

#### Immutable Iteration

Listing 8-7 shows how to use a `for` loop to get immutable references to each element in a vector of `i32` values and print them:

```rust
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{i}");
    }
```

<span class="caption">Listing 8-7: Printing each element in a vector by iterating over the elements using a `for` loop</span>

#### Mutable Iteration

You can also iterate over mutable references to each element in a mutable vector to modify all the elements. The `for` loop in Listing 8-8 will add `50` to each element:

```rust
    let mut v = vec![100, 32, 57];
    for i in &mut v {
        *i += 50;
    }
```

<span class="caption">Listing 8-8: Iterating over mutable references to elements in a vector</span>

To change the value that the mutable reference refers to, use the `*` dereference operator to access the value in `i` before using the `+=` operator. More details on the dereference operator can be found in the ["Following the Pointer to the Value with the Dereference Operator"](https://doc.rust-lang.org/book/ch15-02-deref.html#following-the-pointer-to-the-value-with-the-dereference-operator) section of Chapter 15.

#### Safety and Borrow Checker

Iterating over a vector, whether immutably or mutably, is safe due to the borrow checker's rules. If you attempt to insert or remove items in the `for` loop bodies in Listings 8-7 and 8-8, you would get a compiler error similar to the one in Listing 8-6. The reference to the vector that the `for` loop holds prevents simultaneous modification of the whole vector.

### Using an Enum to Store Multiple Types

Vectors can only store values of the same type. This can be inconvenient; there are definitely use cases for needing to store a list of items of different types. Fortunately, the variants of an enum are defined under the same enum type, so when we need one type to represent elements of different types, we can define and use an enum!

#### Example: Storing Different Types in a Vector

For example, say we want to get values from a row in a spreadsheet in which some of the columns in the row contain integers, some floating-point numbers, and some strings. We can define an enum whose variants will hold the different value types, and all the enum variants will be considered the same type: that of the enum. Then we can create a vector to hold that enum and so, ultimately, hold different types. We’ve demonstrated this in Listing 8-9.

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

<span class="caption">Listing 8-9: Defining an `enum` to store values of different types in one vector</span>

