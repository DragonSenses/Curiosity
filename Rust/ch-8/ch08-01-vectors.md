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
