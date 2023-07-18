# Everyday Types

## The primitives: `string`, `number`, and `boolean`

JavaScript has three very commonly used [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive): `string`, `number`, and `boolean`. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript `typeof` operator on a value of those types:

- `string` represents string values like `"Hello, world"`
- `number` is for numbers like `42`. JavaScript does not have a special runtime value for integers, so there’s no equivalent to `int` or `float` - everything is simply number
- `boolean` is for the two values `true` and `false`

> The type names `String`, `Number`, and `Boolean` (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. Always use string, number, or boolean for types.

## Arrays

To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]`; this syntax works for any type (e.g. `string[]` is an array of strings, and so on). You may also see this written as `Array<number>`, which means the same thing. We’ll learn more about the syntax `T<U>` when we cover generics.

> Note that [number] is a different thing; refer to the section on [Tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types).

## `any`

TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause typechecking errors.

When a value is of type `any`, you can access any properties of it (which will in turn be of type `any`), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed 
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

The `any` type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

### `noImplicitAny`

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because `any` isn’t type-checked. Use the compiler flag [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit `any` as an error.

## Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable

```ts
let myName: string = "Alice";
```

> TypeScript doesn’t use “types on the left”-style declarations like `int x = 0;` Type annotations will always go after the thing being typed.

In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically *infer* the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

For the most part you don’t need to explicitly learn the rules of inference. If you’re starting out, try using fewer type annotations than you think - you might be surprised how few you need for TypeScript to fully understand what’s going on.

## Functions

