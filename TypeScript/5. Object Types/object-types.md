# Object Types

In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through *object types*.

As we’ve seen, they can be anonymous:

```ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

or they can be named by using either an interface:

```ts
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

or a type alias:

```ts
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

In all three examples above, we’ve written functions that take objects that contain the property `name` (which must be a `string`) and `age` (which must be a `number`).

## Quick Reference

We have cheat-sheets available for both [type and interface](https://www.typescriptlang.org/cheatsheets), if you want a quick look at the important every-day syntax at a glance.

## Property Modifiers

Each property in an object type can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.

### Optional Properties

Much of the time, we’ll find ourselves dealing with objects that might have a property set. In those cases, we can mark those properties as optional by adding a question mark (?) to the end of their names.

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
 
function paintShape(opts: PaintOptions) {
  // ...
}
 
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

In this example, both `xPos` and `yPos` are considered optional. We can choose to provide either of them, so every call above to paintShape is valid. All optionality really says is that if the property is set, it better have a specific type.

We can also read from those properties - but when we do under `strictNullChecks`, TypeScript will tell us they’re potentially `undefined`.

```ts
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
                   
(property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos;
                   
(property) PaintOptions.yPos?: number | undefined
  // ...
}
```