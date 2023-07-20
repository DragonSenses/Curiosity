# Narrowing

Imagine we have a function called `padLeft`.

```ts
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}
```

If `padding` is a `number`, it will treat that as the number of spaces we want to prepend to `input`. If `padding` is a `string`, it should just prepend `padding` to `input`. Let’s try to implement the logic for when `padLeft` is passed a `number` for `padding`.