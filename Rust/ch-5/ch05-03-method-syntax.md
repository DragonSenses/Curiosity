## Method Syntax

*Methods* are similar to functions: we declare them with the `fn` keyword and a name, they can have parameters and a return value, and they contain some code that’s run when the method is called from somewhere else. Unlike functions, methods are defined within the context of a struct (or an enum or a trait object, which we cover in [Chapter 6](https://doc.rust-lang.org/book/ch06-00-enums.html) and [Chapter 17](https://doc.rust-lang.org/book/ch17-02-trait-objects.html), respectively), and their first parameter is always `self`, which represents the instance of the struct the method is being called on.

### Method Syntax Overview

1. **Methods vs. Functions**:
   - Methods are similar to functions but have some differences:
     - They are declared with the `fn` keyword and a name.
     - They operate within the context of a struct (or an enum or a trait object).
     - Their first parameter is always `self`, representing the instance of the struct they're called on.
     - Unlike functions, methods are associated with specific types.

2. **Defining Methods**:
   - To define a method, we use the `impl` (implementation) block for a specific type (e.g., a struct).
   - The method is defined within the curly brackets of the `impl` block.
   - The first parameter of the method is `self`, which can be borrowed immutably (`&self`) or mutably (`&mut self`).
   - Example:
     ```rust
     #[derive(Debug)]
     struct Rectangle {
         width: u32,
         height: u32,
     }

     impl Rectangle {
         fn area(&self) -> u32 {
             self.width * self.height
         }
     }

     fn main() {
         let rect1 = Rectangle { width: 30, height: 50 };
         println!("The area of the rectangle is {} square pixels.", rect1.area());
     }
     ```
     In this example, `area()` is a method defined on the `Rectangle` struct, and we call it using method syntax on an instance of `Rectangle`.

3. **Method Syntax**:
   - To call a method, use the instance followed by a dot (`.`), the method name, and any arguments.
   - The `&self` parameter allows reading data from the struct without taking ownership.
   - If you need to modify the instance, use `&mut self` as the first parameter.

### Defining Methods

Let’s change the `area` function that has a `Rectangle` instance as a parameter and instead make an `area` method defined on the `Rectangle` struct, as shown in Listing 5-13.

<span class="filename">Filename: src/main.rs</span>

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

<span class="caption">Listing 5-13: Defining an `area` method on the
`Rectangle` struct</span>

To define the function within the context of `Rectangle`, we start an `impl` (implementation) block for `Rectangle`. Everything within this `impl` block will be associated with the `Rectangle` type. Then we move the `area` function within the `impl` curly brackets and change the first (and in this case, only) parameter to be `self` in the signature and everywhere within the body. In `main`, where we called the `area` function and passed `rect1` as an argument, we can instead use *method syntax* to call the `area` method on our `Rectangle` instance. The method syntax goes after an instance: we add a dot followed by the method name, parentheses, and any arguments.

In the signature for `area`, we use `&self` instead of `rectangle: &Rectangle`. The `&self` is actually short for `self: &Self`. Within an `impl` block, the type `Self` is an alias for the type that the `impl` block is for. Methods must have a parameter named `self` of type `Self` for their first parameter, so Rust lets you abbreviate this with only the name `self` in the first parameter spot. Note that we still need to use the `&` in front of the `self` shorthand to indicate that this method borrows the `Self` instance, just as we did in `rectangle: &Rectangle`. Methods can take ownership of `self`, borrow `self` immutably, as we’ve done here, or borrow `self` mutably, just as they can any other parameter.

We chose `&self` here for the same reason we used `&Rectangle` in the function version: we don’t want to take ownership, and we just want to read the data in the struct, not write to it. If we wanted to change the instance that we’ve called the method on as part of what the method does, we’d use `&mut self` as the first parameter. Having a method that takes ownership of the instance by using just `self` as the first parameter is rare; this technique is usually used when the method transforms `self` into something else and you want to prevent the caller from using the original instance after the transformation.

The main reason for using methods instead of functions, in addition to providing method syntax and not having to repeat the type of `self` in every method’s signature, is for organization. We’ve put all the things we can do with an instance of a type in one `impl` block rather than making future users of our code search for capabilities of `Rectangle` in various places in the library we provide.

