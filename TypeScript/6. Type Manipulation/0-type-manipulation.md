# Creating Types from Types

TypeScript’s type system is very powerful because it allows expressing types in terms of other types.

The simplest form of this idea is generics. Additionally, we have a wide variety of type operators available to use. It’s also possible to express types in terms of values that we already have.

By combining various type operators, we can express complex operations and values in a succinct, maintainable way. In this section we’ll cover ways to express a new type in terms of an existing type or value.

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) - Types which take parameters

- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) - Using the `keyof` operator to create new types

- [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) - Using the `typeof` operator to create new types

- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) - Using `Type['a'] ` syntax to access a subset of a type

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) - Types which act like if statements in the type system

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) - Creating types by mapping each property in an existing type

- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) - Mapped types which change properties via template literal strings