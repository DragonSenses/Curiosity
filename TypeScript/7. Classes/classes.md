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

[Method definitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)

A function property on a class is called a *method*. Methods can use all the same type annotations as functions and constructors:

```ts
class Point {
  x = 10;
  y = 10;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

Other than the standard type annotations, TypeScript doesn’t add anything else new to methods.

Note that inside a method body, it is still mandatory to access fields and other methods via `this.`. An unqualified name in a method body will always refer to something in the enclosing scope:

```ts
let x: number = 0;
 
class C {
  x: string = "hello";
 
  m() {
    // This is trying to modify 'x' from line 1, not the class property
    x = "world";
// Type 'string' is not assignable to type 'number'.
  }
}
```

### Getters / Setters

Classes can also have accessors:

```ts
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

> Note that a field-backed get/set pair with no extra logic is very rarely useful in JavaScript. It’s fine to expose public fields if you don’t need to add additional logic during the get/set operations.

TypeScript has some special inference rules for accessors:

- If `get` exists but no `set`, the property is automatically `readonly`

- If the type of the setter parameter is not specified, it is inferred from the return type of the getter

- Getters and setters must have the same [Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

Since [TypeScript 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/), it is possible to have accessors with different types for getting and setting.

```ts
class Thing {
  _size = 0;
 
  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
 
    // Don't allow NaN, Infinity, etc
 
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}
```

### Index Signatures

Classes can declare index signatures; these work the same as [Index Signatures for other object types](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures):

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
```

Because the index signature type needs to also capture the types of methods, it’s not easy to usefully use these types. Generally it’s better to store indexed data in another place instead of on the class instance itself.

## Class Heritage

Like other languages with object-oriented features, classes in JavaScript can inherit from base classes.

### `implements` Clauses

You can use an `implements` clause to check that a class satisfies a particular `interface`. An error will be issued if a class fails to correctly implement it:

```ts
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
 
class Ball implements Pingable {
// Class 'Ball' incorrectly implements interface 'Pingable'.
  Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  pong() {
    console.log("pong!");
  }
}
```

Classes may also implement multiple interfaces, e.g. `class C implements A, B {`.

### **Cautions**

It’s important to understand that an `implements` clause is only a check that the class can be treated as the interface type. It doesn’t change the type of the class or its methods at all. A common source of error is to assume that an `implements` clause will change the class type - it doesn’t!

```ts
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {
  check(s) {
// Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowerCase() === "ok";
                 
any
  }
}
```

In this example, we perhaps expected that `s`’s type would be influenced by the `name: string` parameter of `check`. It is not - `implements` clauses don’t change how the class body is checked or its type inferred.

Similarly, implementing an interface with an optional property doesn’t create that property:

```ts
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;
// Property 'y' does not exist on type 'C'.
```

### `extends` Clauses

[`extends` keyword (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

Classes may `extend` from a base class. A derived class has all the properties and methods of its base class, and can also define additional members.

```ts
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
```

### **Overriding Methods**

[`super` keyword (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

A derived class can also override a base class field or property. You can use the `super`. syntax to access base class methods. Note that because JavaScript classes are a simple lookup object, there is no notion of a “super field”.

TypeScript enforces that a derived class is always a subtype of its base class.

For example, here’s a legal way to override a method:

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");
```

It’s important that a derived class follow its base class contract. Remember that it’s very common (and always legal!) to refer to a derived class instance through a base class reference:

```ts
// Alias the derived instance through a base class reference
const b: Base = d;
// No problem
b.greet();
```

What if `Derived` didn’t follow `Base`’s contract?

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // Make this parameter required
  greet(name: string) {
// Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
  Type '(name: string) => void' is not assignable to type '() => void'.
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

If we compiled this code despite the error, this sample would then crash:

```ts
const b: Base = new Derived();
// Crashes because "name" will be undefined
b.greet();
```

### **Type-only Field Declarations**

When `target >= ES2022` or [useDefineForClassFields](https://www.typescriptlang.org/tsconfig#useDefineForClassFields) is `true`, class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class. This can be a problem when you only want to re-declare a more accurate type for an inherited field. To handle these cases, you can write `declare` to indicate to TypeScript that there should be no runtime effect for this field declaration.

```ts
interface Animal {
  dateOfBirth: any;
}
 
interface Dog extends Animal {
  breed: any;
}
 
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
 
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
```

### **Initialization Order**

The order that JavaScript classes initialize can be surprising in some cases. Let’s consider this code:

```ts
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class Derived extends Base {
  name = "derived";
}
 
// Prints "base", not "derived"
const d = new Derived();
```

What happened here?

The order of class initialization, as defined by JavaScript, is:

- The base class fields are initialized
- The base class constructor runs
- The derived class fields are initialized
- The derived class constructor runs

This means that the base class constructor saw its own value for name during its own constructor, because the derived class field initializations hadn’t run yet.

### **Inheriting Built-in Types**

> Note: If you don’t plan to inherit from built-in types like `Array`, `Error`, `Map`, etc. or your compilation target is explicitly set to `ES6/ES2015` or above, you may skip this section

In ES2015, constructors which return an object implicitly substitute the value of `this` for any callers of `super(...)`. It is necessary for generated constructor code to capture any potential return value of `super(...)` and replace it with `this`.

As a result, subclassing `Error`, `Array`, and others may no longer work as expected. This is due to the fact that constructor functions for `Error`, `Array`, and the like use ECMAScript 6’s `new.target` to adjust the prototype chain; however, there is no way to ensure a value for `new.target` when invoking a constructor in ECMAScript 5. Other downlevel compilers generally have the same limitation by default.

For a subclass like the following:

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);
  }
  sayHello() {
    return "hello " + this.message;
  }
}
```

you may find that:

- methods may be `undefined` on objects returned by constructing these subclasses, so calling `sayHello` will result in an error.

- `instanceof` will be broken between instances of the subclass and their instances, so `(new MsgError()) instanceof MsgError` will return `false`.

As a recommendation, you can manually adjust the prototype immediately after any `super(...)` calls.

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);
 
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }
 
  sayHello() {
    return "hello " + this.message;
  }
}
```

However, any subclass of `MsgError` will have to manually set the prototype as well. For runtimes that don’t support [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf), you may instead be able to use [__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto).

Unfortunately, [these workarounds will not work on Internet Explorer 10 and prior](https://msdn.microsoft.com/en-us/library/s4esdbwz(v=vs.94).aspx). One can manually copy methods from the prototype onto the instance itself (i.e. `MsgError.prototype` onto `this`), but the prototype chain itself cannot be fixed.

