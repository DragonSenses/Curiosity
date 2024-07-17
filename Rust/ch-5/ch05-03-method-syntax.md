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

