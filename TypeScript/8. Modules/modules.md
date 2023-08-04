# Modules

JavaScript has a long history of different ways to handle modularizing code. Having been around since 2012, TypeScript has implemented support for a lot of these formats, but over time the community and the JavaScript specification has converged on a format called ES Modules (or ES6 modules). You might know it as the `import/export` syntax.

ES Modules was added to the JavaScript spec in 2015, and by 2020 had broad support in most web browsers and JavaScript runtimes.

For focus, the handbook will cover both ES Modules and its popular pre-cursor CommonJS `module.exports =` syntax, and you can find information about the other module patterns in the reference section under [Modules](https://www.typescriptlang.org/docs/handbook/modules.html).


## How JavaScript Modules are Defined

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

Modules are executed within their own scope, not in the global scope. This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

## Non-modules

Before we start, it's important to understand what TypeScript considers a module. The JavaScript specification declares that any JavaScript files without an `import` declaration, `export`, or top-level `await` should be considered a script and not a module.

Inside a script file variables and types are declared to be in the shared global scope, and it's assumed that you'll either use the outFile compiler option to join multiple input files into one [output](https://www.typescriptlang.org/tsconfig#outFile) file, or use multiple `<script>` tags in your HTML to load these files (in the correct order!).

If you have a file that doesn't currently have any `import`s or `export`s, but you want to be treated as a module, add the line:

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

### `import {old as new}`

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

#### `* as name`

You can take all of the exported objects and put them into a single namespace using `* as name`:

```ts
// @filename: app.ts
import * as math from "./maths.js";
 
console.log(math.pi);
const positivePhi = math.absolute(math.phi);
          // const positivePhi: number
```

#### `import "./file"`

You can import a file and not include any variables into your current module via `import "./file"`:

```ts
// @filename: app.ts
import "./maths.js";
 
console.log("3.14");
```

In this case, the `import` does nothing. However, all of the code in `maths.ts` was evaluated, which could trigger side-effects which affect other objects.

## **TypeScript Specific ES Module Syntax**

Types can be exported and imported using the same syntax as JavaScript values:

```ts
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
 
// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```

TypeScript has extended the `import` syntax with two concepts for declaring an import of a type:

### `import type`

Which is an import statement which can ***only*** import types:

```ts
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
// 'createCatName' cannot be used as a value because it was imported using 'import type'.
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
 
// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;
 
// @filename: app.ts
import type { createCatName } from "./animal.js";
const name = createCatName();
```

### `Inline type imports`

TypeScript 4.5 also allows for individual imports to be prefixed with `type` to indicate that the imported reference is a type:

```ts
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
```

Together these allow a non-TypeScript transpiler like Babel, swc or esbuild to know what imports can be safely removed.

## ES Module Syntax with CommonJS Behavior

TypeScript has ES Module syntax which *directly* correlates to a CommonJS and AMD `require`. Imports using ES Module are for most cases the same as the `require` from those environments, but this syntax ensures you have a 1 to 1 match in your TypeScript file with the CommonJS output:

```ts
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```

You can learn more about this syntax in the [modules reference page](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require).

## CommonJS Syntax

CommonJS is the format which most modules on npm are delivered in. Even if you are writing using the ES Modules syntax above, having a brief understanding of how CommonJS syntax works will help you debug easier.

### **Exporting**

Identifiers are exported via setting the `exports` property on a global called `module`.

```ts
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
 
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

Then these files can be imported via a `require` statement:

```ts
const maths = require("./maths");
maths.pi;
      // any
```

Or you can simplify a bit using the destructuring feature in JavaScript:

```ts
const { squareTwo } = require("./maths");
squareTwo;
   // const squareTwo: any
```

### CommonJS and ES Modules interop

There is a mis-match in features between CommonJS and ES Modules regarding the distinction between a default import and a module namespace object import. TypeScript has a compiler flag to reduce the friction between the two different sets of constraints with [esModuleInterop](https://www.typescriptlang.org/tsconfig#esModuleInterop).


## TypeScript's Module Resolution Options

Module resolution is the process of taking a string from the `import` or `require` statement, and determining what file that string refers to.

TypeScript includes two resolution strategies: Classic and Node. Classic, the default when the compiler option [module](https://www.typescriptlang.org/tsconfig#module) is not `commonjs`, is included for backwards compatibility. The Node strategy replicates how Node.js works in CommonJS mode, with additional checks for `.ts` and `.d.ts`.

There are many TSConfig flags which influence the module strategy within TypeScript: [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution), [baseUrl](https://www.typescriptlang.org/tsconfig#baseUrl), [paths](https://www.typescriptlang.org/tsconfig#paths), [rootDirs](https://www.typescriptlang.org/tsconfig#rootDirs).

For the full details on how these strategies work, you can consult the [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

## TypeScript's Module Output Options


There are two options which affect the emitted JavaScript output:

- [`target`](https://www.typescriptlang.org/tsconfig#target) which determines which JS features are downleveled (converted to run in older JavaScript runtimes) and which are left intact

- [`module`](https://www.typescriptlang.org/docs/handbook/2/modules.html#typescripts-module-output-options:~:text=There%20are%20two,with%20each%20other) which determines what code is used for modules to interact with each other

Which [`target`](https://www.typescriptlang.org/tsconfig#target) you use is determined by the features available in the JavaScript runtime you expect to run the TypeScript code in. That could be: the oldest web browser you support, the lowest version of Node.js you expect to run on or could come from unique constraints from your runtime - like Electron for example.

All communication between modules happens via a module loader, the compiler option [`module`](https://www.typescriptlang.org/docs/handbook/2/modules.html#typescripts-module-output-options:~:text=There%20are%20two,with%20each%20other) determines which one is used. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.

For example, here is a TypeScript file using ES Modules syntax, showcasing a few different options for [module](https://www.typescriptlang.org/tsconfig#module):

```ts
import { valueOfPi } from "./constants.js";
 
export const twoPi = valueOfPi * 2;
```

### **ES2020**

```ts
import { valueOfPi } from "./constants.js";
export const twoPi = valueOfPi * 2;
```

### **CommonJS**

```ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoPi = void 0;
const constants_js_1 = require("./constants.js");
exports.twoPi = constants_js_1.valueOfPi * 2;
```

### **UMD**

```ts
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.twoPi = void 0;
    const constants_js_1 = require("./constants.js");
    exports.twoPi = constants_js_1.valueOfPi * 2;
});
```

> Note that ES2020 is effectively the same as the original `index.ts`.

You can see all of the available options and what their emitted JavaScript code looks like in the [TSConfig Reference for module](https://www.typescriptlang.org/tsconfig#module).

# TypeScript namespaces

TypeScript has its own module format called `namespaces` which pre-dates the ES Modules standard. This syntax has a lot of useful features for creating complex definition files, and still sees active use in [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). While not deprecated, the majority of the features in namespaces exist in ES Modules and we recommend you use that to align with JavaScript's direction. You can learn more about namespaces in the [namespaces reference page](https://www.typescriptlang.org/docs/handbook/namespaces.html).

