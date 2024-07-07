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

The scope in which the variable `s` is valid is the same as any function parameter’s scope, but the value pointed to by the reference is not dropped when `s` stops being used, because `s` doesn’t have ownership. When functions have references as parameters instead of the actual values, we won’t need to return the values in order to give back ownership, because we never had ownership.

We call the action of creating a reference *borrowing*. As in real life, if a person owns something, you can borrow it from them. When you’re done, you have to give it back. You don’t own it.

So, what happens if we try to modify something we’re borrowing? Try the code in Listing 4-6. Spoiler alert: it doesn’t work!

<span class="filename">Filename: src/main.rs</span>

```rust,ignore,does_not_compile
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}
```

<span class="caption">Listing 4-6: Attempting to modify a borrowed value</span>

Here’s the error:

```sh
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0596]: cannot borrow `*some_string` as mutable, as it is behind a `&` reference
 --> src/main.rs:8:5
  |
8 |     some_string.push_str(", world");
  |     ^^^^^^^^^^^ `some_string` is a `&` reference, so the data it refers to cannot be borrowed as mutable
  |
help: consider changing this to be a mutable reference
  |
7 | fn change(some_string: &mut String) {
  |                         +++

For more information about this error, try `rustc --explain E0596`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error
```

Just as variables are immutable by default, so are references. We’re not allowed to modify something we have a reference to.

### References and Borrowing recap

1. **References and Borrowing:**
   - In Rust, references allow us to point to a resource (value) without owning it.
   - When we create a reference, we're borrowing the value rather than taking ownership.
   - The original owner of the resource remains the same.
   - References are useful when passing values to functions without transferring ownership.

2. **Reference and Dereference Operators:**
   - The `&` symbol creates a reference to a value (borrowing).
   - The `*` symbol is the dereference operator, used to access the value pointed to by a reference.

3. **Borrowing Analogy:**
   - Borrowing in Rust is similar to real-life borrowing.
   - If someone owns something, you can borrow it from them.
   - When you're done, you give it back; you don't own it.

4. **Modifying Borrowed Values:**
   - Rust treats references as immutable by default.
   - We cannot modify something we're borrowing.
   - Attempting to modify a borrowed value results in a compilation error.

5. **Example (Listing 4-6):**
   - The code snippet demonstrates an attempt to modify a borrowed value.
   - The error message indicates that we cannot mutate a borrowed value.

Remember, references ensure memory safety and prevent accidental modifications. Rust's strict rules guarantee that references always point to valid objects.
