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