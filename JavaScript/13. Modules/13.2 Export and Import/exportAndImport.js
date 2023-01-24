/* Export and Import */
/* Summary 
  Here are all types of export that we covered.

- Before declaration of a class/function/…:
  - export [default] class/function/variable ...

- Standalone export:
  - export {x [as y], ...}.

- Re-export:
  - export {x [as y], ...} from "module"
  - export * from "module" (doesn’t re-export default).
  - export {default [as y]} from "module" (re-export default).

Import:

- Importing named exports:
  - import {x [as y], ...} from "module"

- Importing the default export:
  - import x from "module"
  - import {default as x} from "module"

- Import all:
  - import * as obj from "module"
  
- Import the module (its code runs), but do not assign any of its exports to variables:
  - import "module"

We can put import/export statements at the top or at the bottom of a script, 
  that doesn’t matter.

So, technically this code is fine:

  sayHi();

  // ...

  import {sayHi} from './say.js'; // import at the end of the file


In practice imports are usually at the start of the file, but that’s only 
  for more convenience.

Please note that import/export statements don’t work if inside {...}.

A conditional import, like this, won’t work:

if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}

…But what if we really need to import something conditionally? Or at the 
right time? Like, load a module upon request, when it’s really needed?

We’ll see dynamic imports in the next article.
*/