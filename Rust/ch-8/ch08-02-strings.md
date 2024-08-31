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
