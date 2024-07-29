## Defining an Enum

Where structs give you a way of grouping together related fields and data, like a `Rectangle` with its `width` and `height`, enums give you a way of saying a value is one of a possible set of values. For example, we may want to say that `Rectangle` is one of a set of possible shapes that also includes `Circle` and `Triangle`. To do this, Rust allows us to encode these possibilities as an enum.

Let's look at a situation we might want to express in code and see why enums are useful and more appropriate than structs in this case. Say we need to work with IP addresses. Currently, two major standards are used for IP addresses: version four and version six. Because these are the only possibilities for an IP address that our program will come across, we can *enumerate* all possible variants, which is where enumeration gets its name.

Any IP address can be either a version four or a version six address, but not both at the same time. That property of IP addresses makes the enum data structure appropriate because an enum value can only be one of its variants. Both version four and version six addresses are still fundamentally IP addresses, so they should be treated as the same type when the code is handling situations that apply to any kind of IP address.

We can express this concept in code by defining an `IpAddrKind` enumeration and listing the possible kinds an IP address can be, `V4` and `V6`. These are the variants of the enum:

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

`IpAddrKind` is now a custom data type that we can use elsewhere in our code.

### Defining an Enum | Overview

1. **Enum Basics:**
   - Enums allow you to group related values together.
   - While structs group fields and data, enums group values.
   - For example, you can define an enum called `IpAddrKind` to represent different types of IP addresses.

2. **IP Address Example:**
   - IP addresses can be either version four (IPv4) or version six (IPv6).
   - Since these are the only possibilities, we can enumerate them using an enum.
   - Enum variants for IP address kinds: `V4` (IPv4) and `V6` (IPv6).

3. **Using Enums:**
   - You can create instances of enum variants like this:
     ```rust
     let four = IpAddrKind::V4;
     let six = IpAddrKind::V6;
     ```
   - Enum variants are namespaced under the enum's identifier (e.g., `IpAddrKind::V4`).
   - Enums allow you to handle different IP address types in a unified way.

4. **Comparison with Structs:**
   - While you could use structs to store IP address data, enums are more appropriate.
   - Example using a struct:
     ```rust
     struct IpAddr {
         kind: IpAddrKind,
         address: String,
     }
     let home = IpAddr {
         kind: IpAddrKind::V4,
         address: String::from("127.0.0.1"),
     };
     let loopback = IpAddr {
         kind: IpAddrKind::V6,
         address: String::from("::1"),
     };
     ```
   - However, enums simplify the representation of IP address kinds without storing the actual address data.

### Enum Values

We can create instances of each of the two variants of `IpAddrKind` like this:

```rust
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
```

Note that the variants of the enum are namespaced under its identifier, and we use a double colon to separate the two. This is useful because now both values `IpAddrKind::V4` and `IpAddrKind::V6` are of the same type: `IpAddrKind`. We can then, for instance, define a function that takes any `IpAddrKind`:

```rust
fn route(ip_kind: IpAddrKind) {}
```

And we can call this function with either variant:

```rust
    route(IpAddrKind::V4);
    route(IpAddrKind::V6);
```

#### Storing data through `struct`

Using enums has even more advantages. Thinking more about our IP address type, at the moment we don't have a way to store the actual IP address *data*; we only know what *kind* it is. Given that you just learned about structs in Chapter 5, you might be tempted to tackle this problem with structs as shown in Listing 6-1.

```rust
    enum IpAddrKind {
        V4,
        V6,
    }

    struct IpAddr {
        kind: IpAddrKind,
        address: String,
    }

    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };

    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };
```

<span class="caption">Listing 6-1: Storing the data and `IpAddrKind` variant of an IP address using a `struct`</span>

Here, we've defined a struct `IpAddr` that has two fields: a `kind` field that is of type `IpAddrKind` (the enum we defined previously) and an `address` field of type `String`. We have two instances of this struct. The first is `home`, and it has the value `IpAddrKind::V4` as its `kind` with associated address data of `127.0.0.1`. The second instance is `loopback`. It has the other variant of `IpAddrKind` as its `kind` value, `V6`, and has address `::1` associated with it. We've used a struct to bundle the `kind` and `address` values together, so now the variant is associated with the value.

#### Storing data through enum

However, representing the same concept using just an enum is more concise: rather than an enum inside a struct, we can put data directly into each enum variant. This new definition of the `IpAddr` enum says that both `V4` and `V6` variants will have associated `String` values:

```rust
    enum IpAddr {
        V4(String),
        V6(String),
    }

    let home = IpAddr::V4(String::from("127.0.0.1"));

    let loopback = IpAddr::V6(String::from("::1"));
```

We attach data to each variant of the enum directly, so there is no need for an extra struct. Here, it's also easier to see another detail of how enums work: the name of each enum variant that we define also becomes a function that constructs an instance of the enum. That is, `IpAddr::V4()` is a function call that takes a `String` argument and returns an instance of the `IpAddr` type. We automatically get this constructor function defined as a result of defining the enum.

Key points:
   - In this enum-only representation, each variant (`V4` and `V6`) directly holds the associated `String` value.
   - The enum variants themselves act as constructor functions for creating instances of `IpAddr`.

##### Storing data through enum | Overview

1. **Enum Definition (`IpAddrKind`):**
   - We define an enum called `IpAddrKind`.
   - It has two variants: `V4` and `V6`.
   - These variants represent IPv4 and IPv6 address kinds, respectively.

2. **Struct Definition (`IpAddr`):**
   - We define a struct called `IpAddr`.
   - It has two fields:
     - `kind`: An instance of the `IpAddrKind` enum (either `V4` or `V6`).
     - `address`: A `String` containing the actual IP address value.

3. **Creating Instances (`home` and `loopback`):**
   - We create two instances of the `IpAddr` struct:
     - `home`:
       - `kind` is `IpAddrKind::V4`.
       - `address` is `"127.0.0.1"`.
     - `loopback`:
       - `kind` is `IpAddrKind::V6`.
       - `address` is `"::1"`.

4. **Comparison with Enum-Only Representation:**
   - The original code uses a struct to bundle the `kind` and `address` values together.
   - However, we can represent the same concept more concisely using just an enum:
     ```rust
     enum IpAddr {
         V4(String),
         V6(String),
     }
     let home = IpAddr::V4(String::from("127.0.0.1"));
     let loopback = IpAddr::V6(String::from("::1"));
     ```
   - In this enum-only representation, each variant (`V4` and `V6`) directly holds the associated `String` value.
   - The enum variants themselves act as constructor functions for creating instances of `IpAddr`.

#### Flexible data representation with enum variants

There's another advantage to using an enum rather than a struct: **each variant can have different types and amounts of associated data**. Version four IP addresses will always have four numeric components that will have values between 0 and 255. If we wanted to store `V4` addresses as four `u8` values but still express `V6` addresses as one `String` value, we wouldn't be able to with a struct. Enums handle this case with ease:

```rust
    enum IpAddr {
        V4(u8, u8, u8, u8),
        V6(String),
    }

    let home = IpAddr::V4(127, 0, 0, 1);

    let loopback = IpAddr::V6(String::from("::1"));
```

We've shown several different ways to define data structures to store version four and version six IP addresses. However, as it turns out, wanting to store IP addresses and encode which kind they are is so common that [the standard library has a definition we can use!](https://doc.rust-lang.org/std/net/enum.IpAddr.html) Let's look at how the standard library defines `IpAddr`: it has the exact enum and variants that we've defined and used, but it embeds the address data inside the variants in the form of two different structs, which are defined differently for each variant:

```rust
struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```

This code illustrates that you can put any kind of data inside an enum variant: strings, numeric types, or structs, for example. You can even include another enum! Also, standard library types are often not much more complicated than what you might come up with.

Note that even though the standard library contains a definition for `IpAddr`, we can still create and use our own definition without conflict because we haven't brought the standard library's definition into our scope. We'll talk more about bringing types into scope in Chapter 7.

Let's look at another example of an enum in Listing 6-2: this one has a wide variety of types embedded in its variants.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

<span class="caption">Listing 6-2: A `Message` enum whose variants each store different amounts and types of values</span>

This enum has four variants with different types:

* `Quit` has no data associated with it at all.
* `Move` has named fields, like a struct does.
* `Write` includes a single `String`.
* `ChangeColor` includes three `i32` values.

Defining an enum with variants such as the ones in Listing 6-2 is similar to defining different kinds of struct definitions, except the enum doesn't use the `struct` keyword and all the variants are grouped together under the `Message` type. The following structs could hold the same data that the preceding enum variants hold:

```rust
struct QuitMessage; // unit struct
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // tuple struct
struct ChangeColorMessage(i32, i32, i32); // tuple struct
```

But if we used the different structs, each of which has its own type, we couldn't as easily define a function to take any of these kinds of messages as we could with the `Message` enum defined in Listing 6-2, which is a single type.