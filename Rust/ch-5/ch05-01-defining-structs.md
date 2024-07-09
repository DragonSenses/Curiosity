## Defining and Instantiating Structs

1. **Structs Overview:**
   - Structs hold multiple related values, similar to tuples.
   - Unlike tuples, structs allow naming each piece of data (fields).
   - Fields can have different types.
   - Structs provide flexibility by not relying on data order.

2. **Defining a Struct:**
   - Use the `struct` keyword followed by the struct name.
   - Inside curly brackets, define field names and their types.
   - Example: `struct User { active: bool, username: String, email: String, sign_in_count: u64 }`.

3. **Creating an Instance:**
   - Specify concrete values for each field.
   - Use curly brackets with key-value pairs.
   - Field order doesn't matter.
   - Example: `let user1 = User { active: true, username: String::from("someusername123"), email: String::from("someone@example.com"), sign_in_count: 1 }`.

4. **Accessing Values:**
   - Use dot notation to access specific fields (e.g., `user1.email`).
   - Mutable instances allow changing field values.

The entire instance must be mutable, and you can implicitly return a new instance as the last expression in a function body.

Structs are similar to tuples, discussed in [“The Tuple Type”](https://doc.rust-lang.org/book/ch03-02-data-types.html#the-tuple-type) section, in that both hold multiple related values. Like tuples, the pieces of a struct can be different types. Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean. Adding these names means that structs are more flexible than tuples: you don’t have to rely on the order of the data to specify or access the values of an instance.

### Defining a struct

To define a struct, we enter the keyword `struct` and name the entire struct. A struct’s name should describe the significance of the pieces of data being grouped together. Then, inside curly brackets, we define the names and types of the pieces of data, which we call *fields*. For example, Listing 5-1 shows a struct that stores information about a user account.

<span class="filename">Filename: src/main.rs</span>

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

<span class="caption">Listing 5-1: A `User` struct definition</span>

### Create an Instance of a struct

To use a struct after we’ve defined it, we create an *instance* of that struct by specifying concrete values for each of the fields. We create an instance by stating the name of the struct and then add curly brackets containing *key: value* pairs, where the keys are the names of the fields and the values are the data we want to store in those fields. We don’t have to specify the fields in the same order in which we declared them in the struct. In other words, the struct definition is like a general template for the type, and instances fill in that template with particular data to create values of the type. For example, we can declare a particular user as shown in Listing 5-2.

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

<span class="caption">Listing 5-2: Creating an instance of the `User` struct</span>

### Access values of a struct

To get a specific value from a struct, we use dot notation. For example, to access this user’s email address, we use `user1.email`. If the instance is mutable, we can change a value by using the dot notation and assigning into a particular field. Listing 5-3 shows how to change the value in the `email` field of a mutable `User` instance.

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

<span class="caption">Listing 5-3: Changing the value in the `email` field of a
`User` instance</span>

Note that the entire instance must be mutable; Rust doesn’t allow us to mark only certain fields as mutable. As with any expression, we can construct a new instance of the struct as the last expression in the function body to implicitly return that new instance.

### Construct a struct instance with a builder function

Listing 5-4 shows a `build_user` function that returns a `User` instance with the given email and username. The `active` field gets the value of `true`, and the `sign_in_count` gets a value of `1`.

<span class="filename">Filename: src/main.rs</span>

```rust
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,
        email: email,
        sign_in_count: 1,
    }
}
```

<span class="caption">Listing 5-4: A `build_user` function that takes an email and username and returns a `User` instance</span>

It makes sense to name the function parameters with the same name as the struct fields, but having to repeat the `email` and `username` field names and variables is a bit tedious. If the struct had more fields, repeating each name would get even more annoying. Luckily, there’s a convenient shorthand!