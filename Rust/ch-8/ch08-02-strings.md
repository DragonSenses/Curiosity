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

