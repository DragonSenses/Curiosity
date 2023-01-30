/* Browser environment, specs */
/* Summary 

DOM specification
  - Describes the document structure, manipulations, and events
  see https://dom.spec.whatwg.org

CSSOM specification
  - Describes stylesheets and style rules, manipulations with them, and their 
  binding to documents, see https://www.w3.org/TR/cssom-1/

HTML specification
  - Describes the HTML language (e.g. tags) and also the 
  BOM (browser object model) – various browser functions: setTimeout, alert, 
  location and so on, see https://html.spec.whatwg.org 
  It takes the DOM specification and extends it with many additional properties and methods.


Additionally, some classes are described separately at https://spec.whatwg.org/.

Please note these links, as there’s so much to learn that it’s impossible to cover 
everything and remember it all.

When you’d like to read about a property or a method, the Mozilla manual at 
https://developer.mozilla.org/en-US/ is also a nice resource, but the corresponding 
spec may be better: it’s more complex and longer to read, but will make your 
fundamental knowledge sound and complete.

To find something, it’s often convenient to use an internet search 
“WHATWG [term]” or “MDN [term]”, e.g https://google.com?q=whatwg+localstorage, 
https://google.com?q=mdn+localstorage.

Now, we’ll get down to learning the DOM, because the document plays the 
central role in the UI.
*/