## References and Borrowing

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let s1 = String::from("hello");

    let (s2, len) = calculate_length(s1);

    println!("The length of '{s2}' is {len}.");
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() returns the length of a String

    (s, length)
}
```

<span class="caption">Listing 4-5: Returning ownership of parameters</span>

The issue with the tuple code in Listing 4-5 is that we have to return the `String` to the calling function so we can still use the `String` after the call to `calculate_length`, because the `String` was moved into `calculate_length`. Instead, we can provide a reference to the `String` value. A *reference* is like a pointer in that it’s an address we can follow to access the data stored at that address; that data is owned by some other variable. Unlike a pointer, a reference is guaranteed to point to a valid value of a particular type for the life of that reference.

Here is how you would define and use a `calculate_length` function that has a reference to an object as a parameter instead of taking ownership of the value:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{s1}' is {len}.");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

1. **Code Summary:**
   - The code calculates the length of a `String` without transferring ownership.

2. **Details:**
   - `main()` function:
     - Creates a `String` named `s1` with the value "hello".
     - Calls the `calculate_length(&s1)` function, passing a reference to `s1`.
     - Prints the length of `s1`.
   - `calculate_length(s: &String) -> usize` function:
     - Accepts a reference to a `String`.
     - Returns the length of the referenced `String`.

3. **References and Borrowing:**
   - The use of `&s1` in `calculate_length` allows borrowing the `String` without taking ownership.
   - References ensure memory safety and prevent dangling references.

First, notice that all the tuple code in the variable declaration and the function return value is gone. Second, note that we pass `&s1` into `calculate_length` and, in its definition, we take `&String` rather than `String`. These ampersands represent *references*, and they allow you to refer to some value without taking ownership of it. Figure 4-5 depicts this concept.

<img alt="Three tables: the table for s contains only a pointer to the table for s1. The table for s1 contains the stack data for s1 and points to the string data on the heap." src="../img/trpl04-05.svg" class="center" />

<span class="caption">Figure 4-5: A diagram of `&String s` pointing at `String
s1`</span>

> Note: The opposite of referencing by using `&` is *dereferencing*, which is accomplished with the dereference operator, `*`. We’ll see some uses of the dereference operator in Chapter 8 and discuss details of dereferencing in Chapter 15.

Let’s take a closer look at the function call here:

```rust
    let s1 = String::from("hello");

    let len = calculate_length(&s1);
```

The `&s1` syntax lets us create a reference that *refers* to the value of `s1` but does not own it. Because it does not own it, the value it points to will not be dropped when the reference stops being used.

Likewise, the signature of the function uses `&` to indicate that the type of the parameter `s` is a reference. Let’s add some explanatory annotations:

```rust
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership of what
  // it refers to, it is not dropped.
```
