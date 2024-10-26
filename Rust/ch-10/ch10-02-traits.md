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
