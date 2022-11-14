"use strict"; 
// code works the modern way

/**
 * Modern Mode, "use strict"
 * - For backwards compatibility, "use strict" explicitly enables modifications 
 * that added new features to the language (and modified some existing ones) 
 * - When ES5 (ECMAScript 5) appeared in 2009, most modifications are off by 
 * default and must be enabled with a special directive "use strict"
 * 
 * - The directive looks like a string "use strict" or 'use strict' and is 
 * located at the top of a script, making the whole script work in the 
 * "modern" way.
 * 
 * - Ensure that "use strict" is at the top of the file, only comments may appear
 * above it. 
 * 
 * - There is no way to cancel this directive, once we enter strict mode, there's
 * no going back (reverting the engine to old behavior).
 * 
 * Modern JavaScript supports classes and modules that enable "use strict"
 * automatically, so need to add the directive. 
 * 
 * So for now "use strict" can be used for most of your scripts until code is 
 * in classes and modules where it can omitted.
 * 
 * Note: when using a developer console to run code, it does not "use strict" by
 * default. Press Shift + Enter to input multiple lines, e.g.,
 
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>

or in Older Browsers, put it in this kind of wrapper:
(function() {
  'use strict';

  // ...your code here...
})()

 */
