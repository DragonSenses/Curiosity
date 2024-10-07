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

#### Task Overview

We've been tasked with finding the largest number in two different lists of numbers. One approach is to duplicate the code from Listing 10-1 and use the same logic in two different places in the program, as shown in Listing 10-2.

#### Example Program

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

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {largest}");
}
```

<span class="caption">Listing 10-2: Code to find the largest number in *two* lists of numbers</span>

#### Issues with Code Duplication

Although this code works, duplicating code is tedious and error-prone. We also have to remember to update the code in multiple places whenever we want to make changes. This increases the risk of inconsistencies and bugs.

#### Creating an Abstraction

To eliminate this duplication, we'll create an abstraction by defining a function that operates on any list of integers passed as a parameter. This solution makes our code clearer and allows us to express the concept of finding the largest number in a list more abstractly.

By defining a function, we can reuse the logic for finding the largest number without duplicating code. This approach not only reduces redundancy but also makes our code easier to maintain and understand.

#### Introduction

In Listing 10-3, we extract the code that finds the largest number into a function named `largest`. This allows us to call the function to find the largest number in the two lists from Listing 10-2. We can also use the function on any other list of `i32` values in the future.

#### Example Program

<span class="filename">Filename: src/main.rs</span>

```rust
fn largest(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {result}");

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let result = largest(&number_list);
    println!("The largest number is {result}");
}
```

<span class="caption">Listing 10-3: Abstracted code to find the largest number in two lists</span>

#### Explanation of the `largest` Function

- **Parameter**: The `largest` function has a parameter called `list`, which represents any concrete slice of `i32` values we might pass into the function.
- **Function Logic**: The function iterates through the list, updating the `largest` variable whenever it finds a larger value.
- **Return Value**: The function returns a reference to the largest value found in the list.

#### Steps to Refactor the Code

1. **Identify Duplicate Code**: Recognize the repeated logic in the original code.
2. **Extract the Function**: Move the duplicated code into a function, specifying the inputs and return values in the function signature.
3. **Update Calls**: Replace the duplicated code with calls to the new function.

#### Moving Forward with Generics

Next, we’ll use these same steps with generics to reduce code duplication further. Just as the function body can operate on an abstract `list` instead of specific values, generics allow code to operate on abstract types.

For example, if we had two functions—one that finds the largest item in a slice of `i32` values and one that finds the largest item in a slice of `char` values—we could eliminate that duplication using generics. Let’s explore how to achieve this!