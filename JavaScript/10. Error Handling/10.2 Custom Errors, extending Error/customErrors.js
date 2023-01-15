/* Custom errors, extending Error */
/* Summary
  - We can inherit from Error and other built-in error classes normally. 
  We just need to take care of the name property and don’t forget to call super.
  - We can use instanceof to check for particular errors. It also works with 
  inheritance. But sometimes we have an error object coming from a 3rd-party 
  library and there’s no easy way to get its class. Then name property can be 
  used for such checks.
  - Wrapping exceptions is a widespread technique: a function handles low-level 
  exceptions and creates higher-level errors instead of various low-level ones. 
  Low-level exceptions sometimes become properties of that object like err.cause 
  in the examples above, but that’s not strictly required. 
*/