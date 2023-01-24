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