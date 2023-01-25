/* Dynamic imports */
/* Export and import statements that we covered in previous chapters 
are called “static”. The syntax is very simple and strict.

First, we can’t dynamically generate any parameters of import.

The module path must be a primitive string, can’t be a function call. 
This won’t work: 

import ... from getModuleName(); // Error, only from "string" is allowed

Second, we can’t import conditionally or at run-time:

if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}


That’s because import/export aim to provide a backbone for the code structure. 
That’s a good thing, as code structure can be analyzed, modules can be gathered 
and bundled into one file by special tools, unused exports can be removed 
(“tree-shaken”). That’s possible only because the structure of imports/exports 
is simple and fixed.

But how can we import a module dynamically, on-demand?
*/