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

#### Method naming

1. **Method Naming**:
   - You can choose to give a method the same name as one of the struct's fields.
   - For example, you can define a method on `Rectangle` that is also named `width`.

2. **Example**:

<span class="filename">Filename: src/main.rs</span>

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

Here, we’re choosing to make the `width` method return `true` if the value in the instance’s `width` field is greater than `0` and `false` if the value is `0`: we can use a field within a method of the same name for any purpose. In `main`, when we follow `rect1.width` with parentheses, Rust knows we mean the method `width`. When we don’t use parentheses, Rust knows we mean the field `width`.

3. **Getters**:
   - Methods like this, which return the value of a field, are called getters.
   - Rust does not automatically implement getters for struct fields.
   - Getters allow read-only access to a field while keeping it private.
   - You can control field visibility by making the field private and the method public.

Often, but not always, when we give a method the same name as a field we want it to only return the value in the field and do nothing else. Methods like this are called *getters*, and Rust does not implement them automatically for struct fields as some other languages do. Getters are useful because you can make the field private but the method public, and thus enable read-only access to that field as part of the type’s public API. We will discuss what public and private are and how to designate a field or method as public or private in [Chapter 7](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html#exposing-paths-with-the-pub-keyword).

### Where's the -> Operator?

In C and C++, two different operators are used for calling methods: you use `.` if you’re calling a method on the object directly and `->` if you’re calling the method on a pointer to the object and need to dereference the pointer first. In other words, if `object` is a pointer, `object->something()` is similar to `(*object).something()`.

Rust doesn’t have an equivalent to the `->` operator; instead, Rust has a feature called ***automatic referencing and dereferencing***. Calling methods is one of the few places in Rust that has this behavior.

Here’s how it works: when you call a method with `object.something()`, Rust automatically adds in `&`, `&mut`, or `*` so `object` matches the signature of the method. In other words, the following are the same:

```rust
p1.distance(&p2);
(&p1).distance(&p2);
```

The first one looks much cleaner. This automatic referencing behavior works because methods have a clear receiver—the type of `self`. Given the receiver and name of a method, Rust can figure out definitively whether the method is reading (`&self`), mutating (`&mut self`), or consuming (`self`). The fact that Rust makes borrowing implicit for method receivers is a big part of making ownership ergonomic in practice.

Here's the full code for context:

```rust
[derive(Debug,Copy,Clone)]
struct Point {
     x: f64,
     y: f64,
}

impl Point {
 fn distance(&self, other: &Point) -> f64 {
     let x_squared = f64::powi(other.x - self.x, 2);
     let y_squared = f64::powi(other.y - self.y, 2);

     f64::sqrt(x_squared + y_squared)
 }
}
let p1 = Point { x: 0.0, y: 0.0 };
let p2 = Point { x: 5.0, y: 6.5 };

p1.distance(&p2);
(&p1).distance(&p2);
```

#### Automatic Referencing and Dereferencing in Rust - Recap

In C and C++, the `.` operator is used for calling methods directly on an object, while the `->` operator is used when calling methods on a pointer to an object (requiring dereferencing). However, Rust takes a different approach.

Rust doesn't have an equivalent to the `->` operator. Instead, it employs automatic referencing and dereferencing. When you call a method with `object.something()`, Rust automatically adds `&`, `&mut`, or `*` to match the method's signature with the receiver type (`self`). For example:

```rust
p1.distance(&p2);
(&p1).distance(&p2);
```

Both of these lines achieve the same result. Rust's implicit borrowing for method receivers contributes to ergonomic ownership management.

