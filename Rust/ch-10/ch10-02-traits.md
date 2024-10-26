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

