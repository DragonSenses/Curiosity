# Generic Types, Traits, and Lifetimes

#### Introduction to Generics

Every programming language has tools for effectively handling the duplication of concepts. In Rust, one such tool is *generics*: abstract stand-ins for concrete types or other properties. Generics allow us to express behavior or relationships without knowing the specific types involved at compile time.

#### Using Generics in Functions

Functions can take parameters of some generic type, instead of a concrete type like `i32` or `String`. This is similar to how functions take parameters with unknown values to run the same code on multiple concrete values. We’ve already used generics in:
- Chapter 6 with `Option<T>`
- Chapter 8 with `Vec<T>` and `HashMap<K, V>`
- Chapter 9 with `Result<T, E>`

In this chapter, you’ll explore how to define your own types, functions, and methods with generics.

#### Reducing Code Duplication

First, we’ll review how to extract a function to reduce code duplication. We’ll then use the same technique to create a generic function from two functions that differ only in the types of their parameters. We’ll also explain how to use generic types in struct and enum definitions.

#### Defining Behavior with Traits

Next, you’ll learn how to use *traits* to define behavior in a generic way. Traits allow you to specify that a generic type must implement certain behavior. This constrains a generic type to accept only those types that have a particular behavior, rather than just any type.

#### Understanding Lifetimes

Finally, we’ll discuss *lifetimes*: a variety of generics that give the compiler information about how references relate to each other. Lifetimes allow us to provide the compiler with enough information about borrowed values to ensure references remain valid in more situations than it could without our help.


