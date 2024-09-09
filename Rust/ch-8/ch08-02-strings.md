## Storing UTF-8 Encoded Text with Strings

### Introduction

In Chapter 4, we introduced strings. Now, we'll delve deeper into them. New Rustaceans often find strings challenging due to:

1. Rust's propensity to expose potential errors.
2. The complexity of strings as a data structure.
3. The intricacies of UTF-8 encoding.

### Strings as Collections

Strings are collections of bytes with methods to interpret these bytes as text. We'll explore common operations on `String`, such as creating, updating, and reading, and highlight how `String` differs from other collections.

### Key Points

- **Creating, Updating, and Reading**: Basic operations that all collections, including `String`, support.
- **Complexity of Indexing**: Indexing into a `String` is complicated due to the differences in how humans and computers interpret string data.

### What Is a String?

#### Definition

We'll first define what we mean by the term *string*. Rust has only one string type in the core language, which is the string slice `str` that is usually seen in its borrowed form `&str`.

#### String Slices

In Chapter 4, we talked about *string slices*, which are references to some UTF-8 encoded string data stored elsewhere. String literals, for example, are stored in the program's binary and are therefore string slices.

#### The `String` Type

The `String` type, provided by Rust's standard library rather than coded into the core language, is a growable, mutable, owned, UTF-8 encoded string type. 

#### Usage in Rust

When Rustaceans refer to "strings" in Rust, they might be referring to either the `String` or the string slice `&str` types, not just one of those types. Although this section is largely about `String`, both types are used heavily in Rust's standard library, and both `String` and string slices are UTF-8 encoded.

### Creating a New String

#### Introduction

Many of the same operations available with `Vec<T>` are available with `String` as well because `String` is actually implemented as a wrapper around a vector of bytes with some extra guarantees, restrictions, and capabilities.

#### Creating an Empty String

An example of a function that works the same way with `Vec<T>` and `String` is the `new` function to create an instance, shown in Listing 8-11.

```rust
let mut s = String::new();
```

<span class="caption">Listing 8-11: Creating a new, empty `String`</span>

This line creates a new, empty string called `s`, into which we can then load data.

#### Creating a String with Initial Data

Often, we'll have some initial data with which we want to start the string. For that, we use the `to_string` method, which is available on any type that implements the `Display` trait, as string literals do. Listing 8-12 shows two examples.

```rust
let data = "initial contents";

let s = data.to_string();

// the method also works on a literal directly:
let s = "initial contents".to_string();
```

<span class="caption">Listing 8-12: Using the `to_string` method to create a `String` from a string literal</span>

This code creates a string containing `initial contents`.

#### Using `String::from`

We can also use the function `String::from` to create a `String` from a string literal. The code in Listing 8-13 is equivalent to the code in Listing 8-12 that uses `to_string`.

```rust
let s = String::from("initial contents");
```

<span class="caption">Listing 8-13: Using the `String::from` function to create a `String` from a string literal</span>

#### Flexibility and Redundancy

Because strings are used for so many things, we can use many different generic APIs for strings, providing us with a lot of options. Some of them can seem redundant, but they all have their place! In this case, `String::from` and `to_string` do the same thing, so which one you choose is a matter of style and readability.

#### UTF-8 Encoding

Remember that strings are UTF-8 encoded, so we can include any properly encoded data in them, as shown in Listing 8-14.

```rust
let hello = String::from("السلام عليكم");
let hello = String::from("Dobrý den");
let hello = String::from("Hello");
let hello = String::from("שלום");
let hello = String::from("नमस्ते");
let hello = String::from("こんにちは");
let hello = String::from("안녕하세요");
let hello = String::from("你好");
let hello = String::from("Olá");
let hello = String::from("Здравствуйте");
let hello = String::from("Hola");
```

<span class="caption">Listing 8-14: Storing greetings in different languages in strings</span>

### Updating a String

A `String` can grow in size and its contents can change, just like the contents of a `Vec<T>`, if you push more data into it. In addition, you can conveniently use the `+` operator or the `format!` macro to concatenate `String` values.

- A `String` in Rust can grow in size and its contents can change.
- You can use the `+` operator or the `format!` macro to concatenate `String` values.

#### Appending to a String with `push_str` and `push` | Summary

- **`push_str` method**: Appends a string slice to a `String` without taking ownership of the slice.
  - Example: 
    ```rust
    let mut s = String::from("foo");
    s.push_str("bar"); // s now contains "foobar"
    ```
- **`push` method**: Adds a single character to a `String`.
  - Example:
    ```rust
    let mut s = String::from("lo");
    s.push('l'); // s now contains "lol"
    ```

These methods allow you to efficiently grow and modify `String` values in Rust.

#### Appending to a String with `push_str` and `push`

We can grow a `String` by using the `push_str` method to append a string slice, as shown in Listing 8-15.

```rust
let mut s = String::from("foo");
s.push_str("bar");
```

<span class="caption">Listing 8-15: Appending a string slice to a `String` using the `push_str` method</span>

