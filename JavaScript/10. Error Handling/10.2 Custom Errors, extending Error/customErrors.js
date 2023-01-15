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

/* When we develop something, we often need our own error classes to reflect 
specific things that may go wrong in our tasks. For errors in network 
operations we may need HttpError, for database operations DbError, for 
searching operations NotFoundError and so on.

Our errors should support basic error properties like message, name and, 
preferably, stack. But they also may have other properties of their own, 
e.g. HttpError objects may have a statusCode property with a value like 404 
or 403 or 500.

JavaScript allows to use throw with any argument, so technically our custom 
error classes don’t need to inherit from Error. But if we inherit, then it 
becomes possible to use obj instanceof Error to identify error objects. So 
it’s better to inherit from it.

As the application grows, our own errors naturally form a hierarchy. For 
instance, HttpTimeoutError may inherit from HttpError, and so on. */

/* Extending Error */
/* As an example, let’s consider a function readUser(json) that should read 
JSON with user data.

Here’s an example of how a valid json may look: */
let json = `{ "name": "Luna", "age": 20 }`;
console.log(json);

/* Internally, we’ll use JSON.parse. If it receives malformed json, then it 
throws SyntaxError. But even if json is syntactically correct, that doesn’t 
mean that it’s a valid user, right? It may miss the necessary data. For 
instance, it may not have name and age properties that are essential for our 
users.

Our function readUser(json) will not only read JSON, but check (“validate”) 
the data. If there are no required fields, or the format is wrong, then that’s 
an error. And that’s not a SyntaxError, because the data is syntactically 
correct, but another kind of error. We’ll call it ValidationError and create 
a class for it. An error of that kind should also carry the information about 
the offending field.

Our ValidationError class should inherit from the Error class. */