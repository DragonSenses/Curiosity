# Generic Types, Traits, and Lifetimes

#### Introduction to Generics

Every programming language has tools for effectively handling the duplication of concepts. In Rust, one such tool is *generics*: abstract stand-ins for concrete types or other properties. Generics allow us to express behavior or relationships without knowing the specific types involved at compile time.

#### Using Generics in Functions

Functions can take parameters of some generic type, instead of a concrete type like `i32` or `String`. This is similar to how functions take parameters with unknown values to run the same code on multiple concrete values. We've already used generics in:
- Chapter 6 with `Option<T>`
- Chapter 8 with `Vec<T>` and `HashMap<K, V>`
- Chapter 9 with `Result<T, E>`

In this chapter, you'll explore how to define your own types, functions, and methods with generics.

#### Reducing Code Duplication

First, we'll review how to extract a function to reduce code duplication. We'll then use the same technique to create a generic function from two functions that differ only in the types of their parameters. We'll also explain how to use generic types in struct and enum definitions.

#### Defining Behavior with Traits

Next, you'll learn how to use *traits* to define behavior in a generic way. Traits allow you to specify that a generic type must implement certain behavior. This constrains a generic type to accept only those types that have a particular behavior, rather than just any type.

#### Understanding Lifetimes

Finally, we'll discuss *lifetimes*: a variety of generics that give the compiler information about how references relate to each other. Lifetimes allow us to provide the compiler with enough information about borrowed values to ensure references remain valid in more situations than it could without our help.

## Removing Duplication by Extracting a Function

#### Introduction to Generics

Generics allow us to replace specific types with a placeholder that represents multiple types, helping to remove code duplication. Before diving into generics syntax, let's first look at how to remove duplication by extracting a function that replaces specific values with a placeholder representing multiple values. This technique will help you recognize duplicated code that can be simplified using generics.

#### Example Program

We'll begin with a short program that finds the largest number in a list.

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {largest}");
}
```

<span class="caption">Listing 10-1: Finding the largest number in a list of numbers</span>

#### Explanation of the Example

- **Storing the List**: We store a list of integers in the variable `number_list`.
- **Initializing `largest`**: We place a reference to the first number in the list in a variable named `largest`.
- **Iterating Through the List**: We iterate through all the numbers in the list. If the current number is greater than the number stored in `largest`, we replace the reference in that variable.
- **Comparison Logic**: If the current number is less than or equal to the largest number seen so far, the variable doesn't change, and the code moves on to the next number in the list.
- **Final Output**: After considering all the numbers in the list, `largest` should refer to the largest number, which in this case is 100.

By understanding this example, you can see how to identify duplicated code that can be extracted into a function. This sets the stage for applying the same technique to create a generic function, reducing code duplication and enhancing code reusability.