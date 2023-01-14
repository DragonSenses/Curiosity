/* Error handling - try...catch */
/* Summary
The try...catch construct allows to handle runtime errors. 
It literally allows to "try" running the code and “catch” errors that 
may occur in it.

The syntax is:

try {
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}

There may be no catch section or no finally, so shorter constructs 
try...catch and try...finally are also valid.

Error objects have following properties:
  - message – the human-readable error message.
  - name – the string with error name (error constructor name).
  - stack (non-standard, but well-supported) – the stack at the moment of error creation.

If an error object is not needed, we can omit it by using 
catch { instead of catch (err) {.

We can also generate our own errors using the throw operator. 
Technically, the argument of throw can be anything, but usually it’s an error 
object inheriting from the built-in Error class. More on extending errors in 
the next chapter.

Rethrowing is a very important pattern of error handling: a catch block 
usually expects and knows how to handle the particular error type, so it 
should rethrow errors it doesn’t know.

Even if we don’t have try...catch, most environments allow us to setup a 
“global” error handler to catch errors that “fall out”. 

In-browser, that’s window.onerror.
*/

/* No matter how great we are at programming, sometimes our scripts have errors. 
They may occur because of our mistakes, an unexpected user input, an 
erroneous server response, and for a thousand other reasons.

Usually, a script “dies” (immediately stops) in case of an error, printing 
it to console.

But there’s a syntax construct try...catch that allows us to “catch” errors 
so the script can, instead of dying, do something more reasonable. */

/* The “try…catch” syntax */
/* The try...catch construct has two main blocks: try, and then catch: */
try {

  // code...

} catch (err) {

  // error handling

}

/* It works like this: 
  1. First, the code in try {...} is executed.

  2. If there were no errors, then catch (err) is ignored: the execution 
  reaches the end of try and goes on, skipping catch.

  3. If an error occurs, then the try execution is stopped, and control flows 
  to the beginning of catch (err). The err variable (we can use any name for 
  it) will contain an error object with details about what happened.

So, an error inside the try {...} block does not kill the script – we have a 
chance to handle it in catch. */