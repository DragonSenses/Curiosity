# Common Collections

Rust's standard library includes a number of very useful data structures called *collections*. Most other data types represent one specific value, but collections can contain multiple values. Unlike the built-in array and tuple types, the data these collections point to is stored on the heap, which means the amount of data does not need to be known at compile time and can grow or shrink as the program runs. Each kind of collection has different capabilities and costs, and choosing an appropriate one for your current situation is a skill you'll develop over time. In this chapter, we'll discuss three collections that are used very often in Rust programs:

* A *vector* allows you to store a variable number of values next to each other.
* A *string* is a collection of characters. We've mentioned the `String` type
  previously, but in this chapter we'll talk about it in depth.
* A *hash map* allows you to associate a value with a specific key. It's a
  particular implementation of the more general data structure called a *map*.

To learn about the other kinds of collections provided by the standard library,
see [the documentation](https://doc.rust-lang.org/std/collections/index.html).

We'll discuss how to create and update vectors, strings, and hash maps, as well as what makes each special.

## Overview

Rust's standard library provides several common collections that are essential for managing and manipulating data efficiently. Here's a detailed look at the three primary collections:

### 1. Vectors (`Vec<T>`)

Vectors are dynamic arrays that can grow or shrink in size. They store elements contiguously in memory, which allows for efficient indexing and iteration. Here are some key points about vectors:
- **Creation**: You can create a new vector using `Vec::new()` or the `vec!` macro.
- **Adding Elements**: Use the `push` method to add elements to the end of the vector.
- **Accessing Elements**: You can access elements using indexing (`vec[index]`) or the `get` method, which returns an `Option`.
- **Removing Elements**: Use the `pop` method to remove the last element or `remove` to remove an element at a specific index.

Example:
```rust
let mut v = Vec::new();
v.push(1);
v.push(2);
v.push(3);
println!("{:?}", v); // Output: [1, 2, 3]
```

### 2. Strings (`String`)

Strings in Rust are collections of UTF-8 encoded characters. The `String` type is a growable, heap-allocated data structure. Here are some important aspects:
- **Creation**: You can create a new string using `String::new()` or the `to_string` method.
- **Appending**: Use the `push` method to add a single character or `push_str` to add a string slice.
- **Concatenation**: You can concatenate strings using the `+` operator or the `format!` macro.
- **Indexing**: Strings cannot be indexed directly because they are UTF-8 encoded. Use methods like `chars` or `bytes` to iterate over the characters or bytes.

Example:
```rust
let mut s = String::from("Hello");
s.push(',');
s.push_str(" world!");
println!("{}", s); // Output: Hello, world!
```

### 3. Hash Maps (`HashMap<K, V>`)
Hash maps are collections that store key-value pairs. They allow for efficient retrieval of values based on their keys. Key points include:
- **Creation**: Use `HashMap::new()` to create a new hash map.
- **Inserting Elements**: Use the `insert` method to add key-value pairs.
- **Accessing Elements**: Use the `get` method to retrieve a value based on its key, which returns an `Option`.
- **Removing Elements**: Use the `remove` method to remove a key-value pair.

Example:
```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert("key1", "value1");
map.insert("key2", "value2");
println!("{:?}", map.get("key1")); // Output: Some("value1")
```

### Other Collections

Rust's standard library also includes other collections like `VecDeque`, `LinkedList`, `BTreeMap`, `BTreeSet`, `HashSet`, and `BinaryHeap`, each with its own use cases and performance characteristics.
