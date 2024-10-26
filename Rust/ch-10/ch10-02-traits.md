## Traits: Defining Shared Behavior

A *trait* defines the functionality a particular type has and can share with
other types. We can use traits to define shared behavior in an abstract way. We
can use *trait bounds* to specify that a generic type can be any type that has
certain behavior.

> Note: Traits are similar to a feature often called *interfaces* in other
> languages, although with some differences.

### Defining a Trait

#### Overview
A type's behavior consists of the methods we can call on that type. Different types share the same behavior if we can call the same methods on all of those types. Trait definitions group method signatures together to define a set of behaviors necessary to accomplish some purpose.

#### Example: Structs with Text
Let's say we have multiple structs that hold various kinds and amounts of text:
- `NewsArticle`: Holds a news story filed in a particular location.
- `Tweet`: Can have up to 280 characters, with metadata indicating whether it was new, a retweet, or a reply.

#### Use Case: Media Aggregator Library
We want to create a media aggregator library crate named `aggregator` that displays summaries of data stored in a `NewsArticle` or `Tweet` instance. To do this, we need a summary from each type, requested by calling a `summarize` method on an instance.

#### Trait Definition
```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```

<span class="caption">Listing 10-12: A `Summary` trait that consists of the behavior provided by a `summarize` method</span>

#### Explanation

- **Declare a Trait**: Using the `trait` keyword followed by the trait's name, `Summary` in this case.
- **Public Trait**: Declared as `pub` so that crates depending on this crate can use this trait.
- **Method Signatures**: Declared inside curly brackets, describing the behaviors of the types implementing this trait (`fn summarize(&self) -> String`).

Instead of providing an implementation within curly brackets, we use a semicolon. Each type implementing this trait must provide its own custom behavior for the body of the method. The compiler enforces that any type with the `Summary` trait will have the method `summarize` defined with this exact signature.

#### Multiple Methods
A trait can have multiple methods in its body. Method signatures are listed one per line, each ending in a semicolon.

### Implementing a Trait on a Type

#### Overview
Now that we've defined the desired signatures of the `Summary` trait's methods, we can implement it on the types in our media aggregator.

#### Implementation
Listing 10-13 shows an implementation of the `Summary` trait on the `NewsArticle` struct that uses the headline, the author, and the location to create the return value of `summarize`. For the `Tweet` struct, we define `summarize` as the username followed by the entire text of the tweet, assuming the tweet content is already limited to 280 characters.

**Filename**: src/lib.rs
```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

<span class="caption">Listing 10-13: Implementing the `Summary` trait on the `NewsArticle` and `Tweet` types</span>

#### Explanation
Implementing a trait on a type is similar to implementing regular methods. The difference is that after `impl`, we put the trait name we want to implement, then use the `for` keyword, and then specify the name of the type we want to implement the trait for. Within the `impl` block, we put the method signatures that the trait definition has defined. Instead of adding a semicolon after each signature, we use curly brackets and fill in the method body with the specific behavior that we want the methods of the trait to have for the particular type.

#### Usage
Now that the library has implemented the `Summary` trait on `NewsArticle` and `Tweet`, users of the crate can call the trait methods on instances of `NewsArticle` and `Tweet` in the same way we call regular methods. The only difference is that the user must bring the trait into scope as well as the types. Here's an example of how a binary crate could use our `aggregator` library crate:

```rust
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    };
    println!("1 new tweet: {}", tweet.summarize());
}
```

This code prints `1 new tweet: horse_ebooks: of course, as you probably already know, people`.

### Implementation in Other Crates
Other crates that depend on the `aggregator` crate can also bring the `Summary` trait into scope to implement `Summary` on their own types.

### Coherence and Orphan Rule
One restriction to note is that we can implement a trait on a type only if either the trait or the type, or both, are local to our crate. For example:
- We can implement standard library traits like `Display` on a custom type like `Tweet` as part of our `aggregator` crate functionality because the type `Tweet` is local to our `aggregator` crate.
- We can also implement `Summary` on `Vec<T>` in our `aggregator` crate because the trait `Summary` is local to our `aggregator` crate.

But we can't implement external traits on external types. For example:
- We can't implement the `Display` trait on `Vec<T>` within our `aggregator` crate because `Display` and `Vec<T>` are both defined in the standard library and aren't local to our `aggregator` crate.

This restriction is part of a property called *coherence*, and more specifically the *orphan rule*, so named because the parent type is not present. This rule ensures that other people's code can't break your code and vice versa. Without the rule, two crates could implement the same trait for the same type, and Rust wouldn't know which implementation to use.
