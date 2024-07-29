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
