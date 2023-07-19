- Prior to TypeScript version 4.2, type alias names may appear in error messages, sometimes in place of the equivalent anonymous type (which may or may not be desirable). Interfaces will always be named in error messages.

```ts
// Compiler error messages will always use 
// the name of an interface:

interface Mammal {
    name: string
}

function echoMammal(m: Mammal) {
    console.log(m.name)
}

// e.g. The error below will always use the name Mammal 
// to refer to the type which is expected:
echoMammal({  name: 12343 })

// When a type hasn't gone through any form of manipulation
// then you still get the name as a reference:

type Lizard = {
    name: string
}

function echoLizard(l: Lizard) {
    console.log(l.name)
}

// So this still refers to Lizard
echoLizard({ name: 12345})

// But when a a type has been transformed, for example via this
// Omit then the error message will show the resulting type
// and not the name

type Arachnid = Omit<{ name: string, legs: 8 }, 'legs'> 

function echoSpider(l: Arachnid) {
    console.log(l.name)
}

echoSpider({ name: 12345, legs: 8})
```

Errors in code
```sh
Errors in code
Type 'number' is not assignable to type 'string'.
Type 'number' is not assignable to type 'string'.
Type 'number' is not assignable to type 'string'.
```

- Type aliases may not participate in declaration merging, but interfaces can.

```ts
// An interface can be re-opened
// and new values added:

interface Mammal {
    genus: string
}

interface Mammal {
    breed?: string
}

const animal: Mammal = {
    genus: "1234",
    // Fails because breed has to be a string
    breed: 1
}

type Reptile = {
    genus: string
}

// You cannot add new variables in the same way
type Reptile = {
    breed?: string
}
```

```sh
Errors in code
Type 'number' is not assignable to type 'string'.
Duplicate identifier 'Reptile'.
Duplicate identifier 'Reptile'.
```

- Interfaces may only be used to declare the shapes of objects, not rename primitives.

```ts
// Here's two examples of 
// using types and interfaces
// to describe an object 

interface AnObject1 {
    value: string
}

type AnObject2 = {
    value: string
}

// Using type we can create custom names
// for existing primitives:

type SanitizedString = string
type EvenNumber = number

// This isn't feasible with interfaces
interface X extends string {

}
```

```sh
Errors in code
An interface cannot extend a primitive type like 'string'; an interface can only extend named types and classes
'extends' clause of exported interface 'X' has or is using private name 'string'.
```

- Interface names will always appear in their original form in error messages, but only when they are used by name.

```ts
// Compiler error messages will always use 
// the name of an interface:

interface Mammal {
    name: string
}

function echoMammal(m: Mammal) {
    console.log(m.name)
}

// e.g. The error below will always use the name Mammal 
// to refer to the type which is expected:
echoMammal({ name: 12343 })

// The type of `m` here is the exact same as mammal,
// but as it's not been directly named, TypeScript
// won't mention it in the error messaging

function echoAnimal(m: { name: string }) {
    console.log(m.name)
}

echoAnimal({ name: 12345 })
```

```sh
Errors in code
Type 'number' is not assignable to type 'string'.
Type 'number' is not assignable to type 'string'.
```