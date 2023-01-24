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

/* Export before declarations */
/* We can label any declaration as exported by placing export before it, 
be it a variable, function or a class.

For instance, here all exports are valid: */

// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}

/* No semicolons after export class/function */
/* Please note that export before a class or a function does not make it a 
function expression. It’s still a function declaration, albeit exported.

Most JavaScript style guides don’t recommend semicolons after function and 
class declarations.

That’s why there’s no need for a semicolon at the end of export class and 
export function: */

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // no ; at the end


/* Export apart from declarations */
/* Also, we can put export separately.

Here we first declare, and then export: */

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables

/* …Or, technically we could put export above functions as well. */


/* Import * 
Usually, we put a list of what to import in curly braces import {...}, like this: */

// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!

/* But if there’s a lot to import, we can import everything as an object 
using import * as <obj>, for instance: */

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');

/* At first sight, “import everything” seems such a cool thing, short to write,
why should we ever explicitly list what we need to import?

Well, there are few reasons.

1. Explicitly listing what to import gives shorter names: 
    - sayHi() instead of say.sayHi().

2. Explicit list of imports gives better overview of the code structure: 
what is used and where. It makes code support and refactoring easier. */

/* Don’t be afraid to import too much */
/* Modern build tools, such as webpack and others, bundle modules together and 
optimize them to speedup loading. They also removed unused imports.

For instance, if you import * as library from a huge code library, and then 
use only few methods, then unused ones will not be included into the optimzed
bundle. */

/* Import “as” */
/* We can also use as to import under different names.

For instance, let’s import sayHi into the local variable hi for brevity, and 
import sayBye as bye: */

// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!


/* Export “as” */
/* The similar syntax exists for export.

Let’s export functions as hi and bye: */

// 📁 say.js
// ...
export {sayHi as hi, sayBye as bye};

/* Now hi and bye are official names for outsiders, to be used in imports: */

// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!

