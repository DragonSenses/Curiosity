# Using Structs to Structure Related Data

A *struct*, or *structure*, is a custom data type that lets you package together and name multiple related values that make up a meaningful group. If you're familiar with an object-oriented language, a *struct* is like an object's data attributes. In this chapter, we'll compare and contrast tuples with structs to build on what you already know and demonstrate when structs are a better way to group data.

We'll demonstrate how to define and instantiate structs. We'll discuss how to define associated functions, especially the kind of associated functions called *methods*, to specify behavior associated with a struct type. Structs and enums (discussed in Chapter 6) are the building blocks for creating new types in your program's domain to take full advantage of Rust's compile-time type checking.

### Overview

1. **Structs Overview:**
   - A struct (or structure) is a custom data type that groups related values together.
   - It allows you to name and package multiple values into a meaningful unit.
   - If you're familiar with object-oriented languages, think of a struct as similar to an object's data attributes.

2. **Comparison with Tuples:**
   - Structs are compared and contrasted with tuples.
   - Structs provide a better way to organize and group related data.

3. **Defining and Instantiating Structs:**
   - You'll learn how to define and create instances of structs.
   - Structs allow you to encapsulate data and behavior.

4. **Associated Functions and Methods:**
   - Associated functions (methods) can be defined for structs.
   - These functions specify behavior related to a specific struct type.

5. **Building Blocks for New Types:**
   - Structs, along with enums, serve as the foundation for creating new types in Rust.
   - Compile-time type checking ensures safety and correctness.
