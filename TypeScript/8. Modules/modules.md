# Modules

JavaScript has a long history of different ways to handle modularizing code. Having been around since 2012, TypeScript has implemented support for a lot of these formats, but over time the community and the JavaScript specification has converged on a format called ES Modules (or ES6 modules). You might know it as the `import/export` syntax.

ES Modules was added to the JavaScript spec in 2015, and by 2020 had broad support in most web browsers and JavaScript runtimes.

For focus, the handbook will cover both ES Modules and its popular pre-cursor CommonJS `module.exports =` syntax, and you can find information about the other module patterns in the reference section under [Modules](https://www.typescriptlang.org/docs/handbook/modules.html).


## How JavaScript Modules are Defined

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

Modules are executed within their own scope, not in the global scope. This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

## Non-modules

Before we start, it’s important to understand what TypeScript considers a module. The JavaScript specification declares that any JavaScript files without an `import` declaration, `export`, or top-level `await` should be considered a script and not a module.

Inside a script file variables and types are declared to be in the shared global scope, and it’s assumed that you’ll either use the outFile compiler option to join multiple input files into one [output](https://www.typescriptlang.org/tsconfig#outFile) file, or use multiple `<script>` tags in your HTML to load these files (in the correct order!).

If you have a file that doesn’t currently have any `import`s or `export`s, but you want to be treated as a module, add the line:

```ts
export {};
```

which will change the file to be a module exporting nothing. This syntax works regardless of your module target.

# Modules in TypeScript

#### Addtional Reading

[Impatient JS (Modules)](https://exploringjs.com/impatient-js/ch_modules.html#overview-syntax-of-ecmascript-modules)

[MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

There are three main things to consider when writing module-based code in TypeScript:

- **Syntax**: What syntax do I want to use to import and export things?

- **Module Resolution**: What is the relationship between module names (or paths) and files on disk?
- **Module Output Target**: What should my emitted JavaScript module look like?

## ES Module Syntax

A file can declare a main export via `export default`:

```ts
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
```

This is then imported via:

```ts
import helloWorld from "./hello.js";
helloWorld();
```

In addition to the default export, you can have more than one export of variables and functions via the `export` by omitting `default`:

```ts
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
```

These can be used in another file via the `import` syntax:

```ts
import { pi, phi, absolute } from "./maths.js";
 
console.log(pi);
const absPhi = absolute(phi);
        // const absPhi: number
```

### Additional Import Syntax

An import can be renamed using a format like `import {old as new}`:

```ts
import { pi as π } from "./maths.js";
 
console.log(π);
           // (alias) var π: number
           // import π
```

You can mix and match the above syntax into a single `import`:

```ts
// @filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}
 
// @filename: app.ts
import RandomNumberGenerator, { pi as π } from "./maths.js";
 
RandomNumberGenerator;
         // (alias) class RandomNumberGenerator// import RandomNumberGenerator
 
console.log(π);
           // (alias) const π: 3.14
           // import π
```