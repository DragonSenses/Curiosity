/* Error handling with promises */
/* Summary
  - .catch handles errors in promises of all kinds: be it a reject() call, or 
  an error thrown in a handler.
  
  -.then also catches errors in the same manner, if given the second argument 
  (which is the error handler).

  - We should place .catch exactly in places where we want to handle errors 
  and know how to handle them. The handler should analyze errors (custom error 
    classes help) and rethrow unknown ones (maybe they are programming mistakes).

  - It’s ok not to use .catch at all, if there’s no way to recover from an error.

  - In any case we should have the unhandledrejection event handler (for 
    browsers, and analogs for other environments) to track unhandled errors 
    and inform the user (and probably our server) about them, so that our 
    app never “just dies”. 
    
*/