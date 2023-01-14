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