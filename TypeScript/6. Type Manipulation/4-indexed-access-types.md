# Indexed Access Types

We can use an *indexed access type* to look up a specific property on another type:

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
     // type Age = number
```

The indexing type is itself a type, so we can use unions, `keyof`, or other types entirely:

```ts
type I1 = Person["age" | "name"];
     // type I1 = string | number
 
type I2 = Person[keyof Person];
     // type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
     // type I3 = string | boolean
```

You’ll even see an error if you try to index a property that doesn’t exist:

```ts
type I1 = Person["alve"];
// Property 'alve' does not exist on type 'Person'.
```