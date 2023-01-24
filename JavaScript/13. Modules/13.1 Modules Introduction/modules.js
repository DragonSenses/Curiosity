/* Modules, introduction */
/* Summary
To summarize, the core concepts are:

1. A module is a file. To make import/export work, browsers need 
<script type="module">. Modules have several differences:
  - Deferred by default.
  - Async works on inline scripts.
  - To load external scripts from another origin (domain/protocol/port), 
  CORS headers are needed.
  - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality 
via import/export.
3. Modules always use strict.
4. Module code is executed only once. Exports are created once and shared 
between importers.

When we use modules, each module implements the functionality and exports it. 
Then we use import to directly import it where it’s needed. The browser loads 
and evaluates the scripts automatically.

In production, people often use bundlers such as Webpack to bundle modules 
together for performance and other reasons.
*/

/* As our application grows bigger, we want to split it into multiple files, 
so called “modules”. A module may contain a class or a library of functions 
for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. 
That wasn’t a problem, because initially scripts were small and simple, so 
there was no need.

But eventually scripts became more and more complex, so the community 
invented a variety of ways to organize code into modules, special libraries 
to load modules on demand.

To name some (for historical reasons): 
  - AMD – one of the most ancient module systems, initially implemented by the 
  library require.js.
  - CommonJS – the module system created for Node.js server.
  - UMD – one more module system, suggested as a universal one, compatible with
  AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually 
evolved since then, and is now supported by all major browsers and in Node.js. 
So we’ll study the modern JavaScript modules from now on.
*/


/* What is a module? */
/* A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives export and import 
to interchange functionality, call functions of one module from another one:

  - "export" keyword labels variables and functions that should be accessible 
  from outside the current module.
  - "import" allows the import of functionality from other modules. 
  
For instance, if we have a file sayHi.js exporting a function: 

// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

…Then another file may import and use it:

// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!



The import directive loads the module by path ./sayHi.js relative to the 
current file, and assigns exported function sayHi to the corresponding variable.

Let’s run the example in-browser.

As modules support special keywords and features, we must tell the browser 
that a script should be treated as a module, by using the attribute 
<script type="module">.

Like this:

// In 📁 say.js
export function sayHi(user) {
  return `Hello, ${user}!`;
}

// In 📁 index.html
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>

The browser automatically fetches and evaluates the imported module (and its 
imports if needed), and then runs the script.
*/

/* Note: Modules work only via HTTP(s), not locally */
/* If you try to open a web-page locally, via file:// protocol, you’ll find 
that import/export directives don’t work. Use a local web-server, such as 
static-server or use the “live server” capability of your editor, such as 
VS Code Live Server Extension to test modules. */


/* Core module features */
/* What’s different in modules, compared to “regular” scripts?

There are core features, valid both for browser and server-side JavaScript. 

1. Always “use strict”

Modules always work in strict mode. E.g. assigning to an undeclared variable 
will give an error.

<script type="module">
  a = 5; // error
</script>



2. Module-level scope

Each module has its own top-level scope. In other words, top-level variables 
and functions from a module are not seen in other scripts.

In the example below, two scripts are imported, and hello.js tries to use user 
variable declared in user.js. It fails, because it’s a separate module (you’ll
see the error in the console):

// In 📁 hello.js
alert(user); // no such variable (each module has independent variables)

// In 📁 user.js
let user = "John";

// In 📁 index.html
<!doctype html>
<script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script>


Modules should export what they want to be accessible from outside and import 
what they need.
  - user.js should export the user variable.
  - hello.js should import it from user.js module.

In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

// In 📁 hello.js
import {user} from './user.js';

document.body.innerHTML = user; // John


// In 📁 user.js
export let user = "John";

// In 📁 index.html
<!doctype html>
<script type="module" src="hello.js"></script>
*/

/* In the browser, if we talk about HTML pages, independent top-level scope 
also exists for each <script type="module">.

Here are two scripts on the same page, both type="module". They don’t see each 
other’s top-level variables: 

<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script>

*/

/* Please note: */
/* In the browser, we can make a variable window-level global by explicitly 
assigning it to a window property, e.g. window.user = "John".

Then all scripts will see it, both with type="module" and without it.

That said, making such global variables is frowned upon. Please try to avoid them. */


/* A module code is evaluated only the first time when imported */
/* If the same module is imported into multiple other modules, its code is 
executed only once, upon the first import. Then its exports are given to all 
further importers.

The one-time evaluation has important consequences, that we should be aware of.

Let’s see a couple of examples.

First, if executing a module code brings side-effects, like showing a message, 
then importing it multiple times will trigger it only once – the first time: 

// 📁 alert.js
alert("Module is evaluated!");

// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)


The second import shows nothing, because the module has already been evaluated.

There’s a rule: top-level module code should be used for initialization, 
creation of module-specific internal data structures. If we need to make 
something callable multiple times – we should export it as a function, like 
we did with sayHi above.
*/

/* Now, let’s consider a deeper example. Let’s say, a module exports an object:

// 📁 admin.js
export let admin = {
  name: "John"
};

If this module is imported from multiple files, the module is only evaluated 
the first time, admin object is created, and then passed to all further importers.

All importers get exactly the one and only admin object:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js

As you can see, when 1.js changes the name property in the imported admin, 
then 2.js can see the new admin.name.

That’s exactly because the module is executed only once. Exports are generated, 
and then they are shared between importers, so if something changes the admin 
object, other importers will see that.
*/

/* Such behavior is actually very convenient, because it allows us to configure
modules. 

In other words, a module can provide a generic functionality that needs a setup. 
  E.g. authentication needs credentials. Then it can export a configuration 
  object expecting the outer code to assign to it.

Here’s the classical pattern: 
  1. A module exports some means of configuration, e.g. a configuration object.
  2. On the first import we initialize it, write to its properties. The 
  top-level application script may do that.
  3. Further imports use the module.

For instance, the admin.js module may provide certain functionality 
(e.g. authentication), but expect the credentials to come into the config 
object from outside: 

// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}

Here, admin.js exports the config object (initially empty, but may have 
  default properties too).

Then in init.js, the first script of our app, we import config from it and 
set config.user:

// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";

…Now the module admin.js is configured.

Further importers can call it, and it correctly shows the current user:

// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, Pete!
*/