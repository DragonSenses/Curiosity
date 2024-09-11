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

After these two lines, `s` will contain `foobar`. The `push_str` method takes a string slice because we don't necessarily want to take ownership of the parameter. For example, in the code in Listing 8-16, we want to be able to use `s2` after appending its contents to `s1`.

```rust
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {s2}");
```

<span class="caption">Listing 8-16: Using a string slice after appending its contents to a `String`</span>

If the `push_str` method took ownership of `s2`, we wouldn't be able to print its value on the last line. However, this code works as we'd expect!

The `push` method takes a single character as a parameter and adds it to the `String`. Listing 8-17 adds the letter *l* to a `String` using the `push` method.

```rust
let mut s = String::from("lo");
s.push('l');
```

<span class="caption">Listing 8-17: Adding one character to a `String` value using `push`</span>

As a result, `s` will contain `lol`.

### Concatenation with the `+` Operator | Summary

#### Basic Usage

- You can combine two strings using the `+` operator.
- Example:
  ```rust
  let s1 = String::from("Hello, ");
  let s2 = String::from("world!");
  let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
  ```
- Result: `s3` will contain `Hello, world!`.

#### Method Signature

- The `+` operator uses the `add` method with the signature:
  ```rust,ignore
  fn add(self, s: &str) -> String {
  ```
- `s2` is passed as a reference (`&s2`) because the `add` method takes a `&str`.

#### Ownership and Deref Coercion

- `s1` is moved and can no longer be used after the addition.
- The compiler coerces `&String` to `&str` using deref coercion.

### Concatenating Multiple Strings

#### Using the `+` Operator

- Concatenating multiple strings with `+` can be unwieldy:
  ```rust
  let s1 = String::from("tic");
  let s2 = String::from("tac");
  let s3 = String::from("toe");

  let s = s1 + "-" + &s2 + "-" + &s3;
  ```
- Result: `s` will be `tic-tac-toe`.

#### Using the `format!` Macro

- For more complex concatenations, use the `format!` macro:
  ```rust
  let s1 = String::from("tic");
  let s2 = String::from("tac");
  let s3 = String::from("toe");

  let s = format!("{s1}-{s2}-{s3}");
  ```
- Result: `s` will be `tic-tac-toe`.
- The `format!` macro is easier to read and does not take ownership of its parameters.

### Concatenation with the `+` Operator or the `format!` Macro

Often, you'll want to combine two existing strings. One way to do so is to use the `+` operator, as shown in Listing 8-18.

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
```

<span class="caption">Listing 8-18: Using the `+` operator to combine two `String` values into a new `String` value</span>

The string `s3` will contain `Hello, world!`. The reason `s1` is no longer valid after the addition, and the reason we used a reference to `s2`, has to do with the signature of the method that's called when we use the `+` operator. The `+` operator uses the `add` method, whose signature looks something like this:

```rust,ignore
fn add(self, s: &str) -> String {
```

In the standard library, you'll see `add` defined using generics and associated types. Here, we've substituted in concrete types, which is what happens when we call this method with `String` values. We'll discuss generics in Chapter 10. This signature gives us the clues we need in order to understand the tricky bits of the `+` operator.

First, `s2` has an `&`, meaning that we're adding a *reference* of the second string to the first string. This is because of the `s` parameter in the `add` function: we can only add a `&str` to a `String`; we can't add two `String` values together. But wait—the type of `&s2` is `&String`, not `&str`, as specified in the second parameter to `add`. So why does Listing 8-18 compile?

The reason we're able to use `&s2` in the call to `add` is that the compiler can *coerce* the `&String` argument into a `&str`. When we call the `add` method, Rust uses a *deref coercion*, which here turns `&s2` into `&s2[..]`. We'll discuss deref coercion in more depth in Chapter 15. Because `add` does not take ownership of the `s` parameter, `s2` will still be a valid `String` after this operation.

Second, we can see in the signature that `add` takes ownership of `self` because `self` does *not* have an `&`. This means `s1` in Listing 8-18 will be moved into the `add` call and will no longer be valid after that. So, although `let s3 = s1 + &s2;` looks like it will copy both strings and create a new one, this statement actually takes ownership of `s1`, appends a copy of the contents of `s2`, and then returns ownership of the result. In other words, it looks like it's making a lot of copies, but it isn't; the implementation is more efficient than copying.

### Concatenating Multiple Strings

If we need to concatenate multiple strings, the behavior of the `+` operator gets unwieldy:

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;
```

At this point, `s` will be `tic-tac-toe`. With all of the `+` and `"` characters, it's difficult to see what's going on. For combining strings in more complicated ways, we can instead use the `format!` macro:

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{s1}-{s2}-{s3}");
```

This code also sets `s` to `tic-tac-toe`. The `format!` macro works like `println!`, but instead of printing the output to the screen, it returns a `String` with the contents. The version of the code using `format!` is much easier to read, and the code generated by the `format!` macro uses references so that this call doesn't take ownership of any of its parameters.

### Indexing into Strings

In many other programming languages, accessing individual characters in a string by referencing them by index is a valid and common operation. However, if you try to access parts of a `String` using indexing syntax in Rust, you'll get an error. Consider the invalid code in Listing 8-19.

```rust,ignore,does_not_compile
let s1 = String::from("hello");
let h = s1[0];
```

<span class="caption">Listing 8-19: Attempting to use indexing syntax with a String</span>

This code will result in the following error:

```sh
$ cargo run
   Compiling collections v0.1.0 (file:///projects/collections)
error[E0277]: the type `str` cannot be indexed by `{integer}`
 --> src/main.rs:3:16
  |
3 |     let h = s1[0];
  |                ^ string indices are ranges of `usize`
  |
  = help: the trait `SliceIndex<str>` is not implemented for `{integer}`, which is required by `String: Index<_>`
  = note: you can use `.chars().nth()` or `.bytes().nth()`
          for more information, see chapter 8 in The Book: <https://doc.rust-lang.org/book/ch08-02-strings.html#indexing-into-strings>
  = help: the trait `SliceIndex<[_]>` is implemented for `usize`
  = help: for that trait implementation, expected `[_]`, found `str`
  = note: required for `String` to implement `Index<{integer}>`

For more information about this error, try `rustc --explain E0277`.
error: could not compile `collections` (bin "collections") due to 1 previous error
```

The error and the note tell the story: Rust strings don't support indexing. But why not? To answer that question, we need to discuss how Rust stores strings in memory.

#### Indexing into Strings | Summary

- **Indexing in Rust**: Unlike many other languages, Rust does not allow accessing individual characters in a `String` using indexing syntax.
- **Example of Invalid Code**:
  ```rust,ignore,does_not_compile
  let s1 = String::from("hello");
  let h = s1[0];
  ```
- **Error Explanation**:
  - Rust strings don't support indexing by integer.
  - The error message indicates that `str` cannot be indexed by `{integer}`.
  - Suggested alternatives include using `.chars().nth()` or `.bytes().nth()`.
- **Reason**: To understand why Rust doesn't support string indexing, it's necessary to discuss how Rust stores strings in memory.

- **Quick Overview**
  - Rust does not support indexing into strings using integer indices.
  - Example of invalid code: `let h = s1[0];`
  - Error message explains that `str` cannot be indexed by `{integer}`.
  - Suggested alternatives: `.chars().nth()` or `.bytes().nth()`.
  - Reason: Rust's memory storage for strings requires a different approach.

### Internal Representation

#### UTF-8 Encoding

A `String` in Rust is a wrapper over a `Vec<u8>`. Let's look at some properly encoded UTF-8 example strings:

```rust
let hello = String::from("Hola");
```

In this case, `len` will be `4`, which means the vector storing the string `"Hola"` is 4 bytes long. Each of these letters takes one byte when encoded in UTF-8.

#### Unicode Scalar Values

Consider the following string (note that it begins with the capital Cyrillic letter *Ze*, not the number 3):

```rust
let hello = String::from("Здравствуйте");
```

If you were asked how long the string is, you might say 12. In fact, Rust's answer is 24: that's the number of bytes it takes to encode "Здравствуйте" in UTF-8, because each Unicode scalar value in that string takes 2 bytes of storage. Therefore, an index into the string's bytes will not always correlate to a valid Unicode scalar value.

#### Indexing and Invalid Code

To demonstrate, consider this invalid Rust code:

```rust,ignore,does_not_compile
let hello = "Здравствуйте";
let answer = &hello[0];
```

You already know that `answer` will not be `З`, the first letter. When encoded in UTF-8, the first byte of `З` is `208` and the second is `151`, so it would seem that `answer` should in fact be `208`, but `208` is not a valid character on its own. Returning `208` is likely not what a user would want if they asked for the first letter of this string; however, that's the only data that Rust has at byte index 0.

#### Preventing Bugs

Users generally don't want the byte value returned, even if the string contains only Latin letters: if `&"hello"[0]` were valid code that returned the byte value, it would return `104`, not `h`.

To avoid returning an unexpected value and causing bugs that might not be discovered immediately, Rust doesn't compile this code at all and prevents misunderstandings early in the development process.

### Bytes and Scalar Values and Grapheme Clusters! Oh My!

#### Different Perspectives on Strings

Another point about UTF-8 is that there are actually three relevant ways to look at strings from Rust's perspective: as bytes, scalar values, and grapheme clusters (the closest thing to what we would call *letters*).

#### Bytes Representation

If we look at the Hindi word “नमस्ते” written in the Devanagari script, it is stored as a vector of `u8` values that looks like this:

```text
[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]
```

That's 18 bytes and is how computers ultimately store this data.

#### Unicode Scalar Values

If we look at them as Unicode scalar values, which are what Rust's `char` type is, those bytes look like this:

```text
['न', 'म', 'स', '्', 'त', 'े']
```

There are six `char` values here, but the fourth and sixth are not letters: they're diacritics that don't make sense on their own.

#### Grapheme Clusters

Finally, if we look at them as grapheme clusters, we'd get what a person would call the four letters that make up the Hindi word:

```text
["न", "म", "स्", "ते"]
```

Rust provides different ways of interpreting the raw string data that computers store so that each program can choose the interpretation it needs, no matter what human language the data is in.

#### Indexing and Performance

A final reason Rust doesn't allow us to index into a `String` to get a character is that indexing operations are expected to always take constant time (O(1)). But it isn't possible to guarantee that performance with a `String`, because Rust would have to walk through the contents from the beginning to the index to determine how many valid characters there were.

### Slicing Strings

#### Indexing Considerations

Indexing into a string is often a bad idea because it's not clear what the return type of the string-indexing operation should be: a byte value, a character, a grapheme cluster, or a string slice. If you really need to use indices to create string slices, Rust asks you to be more specific.

#### Creating String Slices

Rather than indexing using `[]` with a single number, you can use `[]` with a range to create a string slice containing particular bytes:

```rust
let hello = "Здравствуйте";

let s = &hello[0..4];
```

Here, `s` will be a `&str` that contains the first four bytes of the string. Earlier, we mentioned that each of these characters was two bytes, which means `s` will be `Зд`.

#### Runtime Panics

If we were to try to slice only part of a character's bytes with something like `&hello[0..1]`, Rust would panic at runtime in the same way as if an invalid index were accessed in a vector:

```sh
$ cargo run
   Compiling collections v0.1.0 (file:///projects/collections)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/collections`
thread 'main' panicked at src/main.rs:4:19:
byte index 1 is not a char boundary; it is inside 'З' (bytes 0..2) of `Здравствуйте`
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

#### Caution with String Slices

You should use caution when creating string slices with ranges, because doing so can crash your program.

### Methods for Iterating Over Strings

#### Characters

The best way to operate on pieces of strings is to be explicit about whether you want characters or bytes. For individual Unicode scalar values, use the `chars` method. Calling `chars` on “Зд” separates out and returns two values of type `char`, and you can iterate over the result to access each element:

```rust
for c in "Зд".chars() {
    println!("{c}");
}
```

This code will print the following:

```text
З
д
```

#### Bytes

Alternatively, the `bytes` method returns each raw byte, which might be appropriate for your domain:

```rust
for b in "Зд".bytes() {
    println!("{b}");
}
```

This code will print the four bytes that make up this string:

```text
208
151
208
180
```

But be sure to remember that valid Unicode scalar values may be made up of more than one byte.

#### Grapheme Clusters

Getting grapheme clusters from strings, as with the Devanagari script, is complex, so this functionality is not provided by the standard library. Crates are available on [crates.io](https://crates.io/) if this is the functionality you need.

### Strings Are Not So Simple

#### Complexity of Strings

To summarize, strings are complicated. Different programming languages make different choices about how to present this complexity to the programmer. Rust has chosen to make the correct handling of `String` data the default behavior for all Rust programs, which means programmers have to put more thought into handling UTF-8 data up front. This trade-off exposes more of the complexity of strings than is apparent in other programming languages, but it prevents you from having to handle errors involving non-ASCII characters later in your development life cycle.

#### Standard Library Functionality

The good news is that the standard library offers a lot of functionality built off the `String` and `&str` types to help handle these complex situations correctly. Be sure to check out the documentation for useful methods like `contains` for searching in a string and `replace` for substituting parts of a string with another string.
