# Classes

TypeScript offers full support for the `class` keyword introduced in ES2015.

As with other JavaScript language features, TypeScript adds type annotations and other syntax to allow you to express relationships between classes and other types.

[Background Reading - Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Class Members

Here’s the most basic class - an empty one:

```ts
class Point {}
```

This class isn’t very useful yet, so let’s start adding some members.

### Fields

A field declaration creates a public writeable property on a class:

```ts
class Point {
  x: number;
  y: number;
}
 
const pt = new Point();
pt.x = 0;
pt.y = 0;
```

As with other locations, the type annotation is optional, but will be an implicit `any` if not specified.

Fields can also have *initializers*; these will run automatically when the class is instantiated:

```ts
class Point {
  x = 0;
  y = 0;
}
 
const pt = new Point();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);
```

Just like with `const`, `let`, and `var`, the initializer of a class property will be used to infer its type:

```ts
const pt = new Point();
pt.x = "0";
// Type 'string' is not assignable to type 'number'.
```

### **--strictPropertyInitialization**

The [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization) setting controls whether class fields need to be initialized in the constructor.

```ts
class BadGreeter {
  name: string;
// Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```

```ts
class GoodGreeter {
  name: string;
 
  constructor() {
    this.name = "hello";
  }
}
```

Note that the field needs to be initialized *in the constructor itself*. TypeScript does not analyze methods you invoke from the constructor to detect initializations, because a derived class might override those methods and fail to initialize the members.

If you intend to definitely initialize a field through means other than the constructor (for example, maybe an external library is filling in part of your class for you), you can use the ***definite assignment assertion operator***, `!`:

```ts
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}
```

### `readonly`

Fields may be prefixed with the `readonly` modifier. This prevents assignments to the field outside of the constructor.

```ts
class Greeter {
  readonly name: string = "world";
 
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
 
  err() {
    this.name = "not ok";
// Cannot assign to 'name' because it is a read-only property.
  }
}
const g = new Greeter();
g.name = "also not ok";
// Cannot assign to 'name' because it is a read-only property.
```

### Constructors

[Constructor (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)

Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads:

```ts
class Point {
  x: number;
  y: number;
 
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

```ts
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```

There are just a few differences between class constructor signatures and function signatures:

- Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later

- Constructors can’t have return type annotations - the class instance type is always what’s returned

### **Super Calls**

Just as in JavaScript, if you have a base class, you’ll need to call `super();` in your constructor body before using any `this.` members:

```ts
class Base {
  k = 4;
}
 
class Derived extends Base {
  constructor() {
    // Prints a wrong value in ES5; throws exception in ES6
    console.log(this.k);
// 'super' must be called before accessing 'this' in the constructor of a derived class.
    super();
  }
}
```

Forgetting to call `super` is an easy mistake to make in JavaScript, but TypeScript will tell you when it’s necessary.

### Methods