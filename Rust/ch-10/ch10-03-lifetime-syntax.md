## Validating References with Lifetimes

### Overview
Lifetimes are a kind of generic we've been using. Unlike ensuring a type has the desired behavior, lifetimes ensure references are valid for as long as needed.

#### References and Borrowing
Every reference in Rust has a *lifetime*, defining the scope for which the reference is valid. This concept was touched on in Chapter 4's ["References and Borrowing"](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#references-and-borrowing) section.

#### Implicit and Inferred Lifetimes
Most of the time, lifetimes are implicit and inferred, similar to how types are inferred. Annotation is required only when multiple types or lifetimes could be related in different ways.

#### Annotating Lifetimes
Rust requires annotation of relationships using generic lifetime parameters to ensure the actual references used at runtime will be valid.

#### Unfamiliar Concept
Annotating lifetimes is unfamiliar to most programming languages. While this chapter won't cover lifetimes in their entirety, common lifetime syntax will be discussed to get comfortable with the concept.

#### Conclusion
Understanding and using lifetimes ensures the safety and validity of references in Rust, helping prevent issues at runtime.
