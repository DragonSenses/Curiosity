/* eslint-disable no-undef */
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

/* Examples: */
/* An errorless example: shows alert (1) and (2): */
try {

  alert('Start of try runs');  // (1) <--

  // ...no errors here

  alert('End of try runs');   // (2) <--

} catch (err) {

  alert('Catch is ignored, because there are no errors'); // (3)

}

/* An example with an error: shows (1) and (3): */
try {

  alert('Start of try runs');  // (1) <--

  lalala; // error, variable is not defined!

  alert('End of try (never reached)');  // (2)

} catch (err) {

  alert(`Error has occurred!`); // (3) <--

}


/* try...catch only works for runtime errors */
/* For try...catch to work, the code must be runnable. 
In other words, it should be valid JavaScript.

It won’t work if the code is syntactically wrong, for instance it has 
unmatched curly braces: 

try {
  {{{{{{{{{{{{
} catch (err) {
  alert("The engine can't understand this code, it's invalid");
}

The JavaScript engine first reads the code, and then runs it. 
The errors that occur on the reading phase are called “parse-time” errors 
and are unrecoverable (from inside that code). That’s because the engine 
can’t understand the code.

So, try...catch can only handle errors that occur in valid code. 
Such errors are called “runtime errors” or, sometimes, “exceptions”.
*/

/* try...catch works synchronously */
/* If an exception happens in “scheduled” code, like in setTimeout, 
then try...catch won’t catch it: */
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  alert( "won't work" );
}

/* That’s because the function itself is executed later, when the engine 
has already left the try...catch construct. 

To catch an exception inside a scheduled function, try...catch must 
be inside that function:
*/
setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    alert( "error is caught here!" );
  }
}, 1000);


/* Error object */
/* When an error occurs, JavaScript generates an object containing the 
details about it. The object is then passed as an argument to catch: */
try {
  // ...
} catch (err) { // <-- the "error object", could use another word instead of err
  // ...
}

/* For all built-in errors, the error object has two main properties: 
name - Error name. For instance, for an undefined variable that’s "ReferenceError".

message - Textual message about error details.

  There are other non-standard properties available in most environments. One of 
most widely used and supported is:

stack - Current call stack: a string with information about the sequence of 
nested calls that led to the error. Used for debugging purposes. 

For instance: */
try {
  lalala; // error, variable is not defined!
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}


/* Optional “catch” binding */
/* If we don’t need error details, catch may omit it: */
try {
  // ...
} catch { // <-- without (err)
  // ...
}


/* Using “try…catch” */
/* Let’s explore a real-life use case of try...catch.

As we already know, JavaScript supports the JSON.parse(str) method to 
read JSON-encoded values.

Usually it’s used to decode data received over the network, from the 
server or another source.

We receive it and call JSON.parse like this: */
{
  let json = '{"name":"Luna", "age": 20}'; // data from the server

  let user = JSON.parse(json); // convert the text representation to JS object

  // now user is an object with properties from the string
  alert( user.name ); // Luna
  alert( user.age );  // 20
}
/* If json is malformed, JSON.parse generates an error, so the script “dies”.

Should we be satisfied with that? Of course not!

This way, if something’s wrong with the data, the visitor will never know 
that (unless they open the developer console). And people really don’t like 
when something “just dies” without any error message.

Let’s use try...catch to handle the error: */
{
  let json = "{ bad json }";

  try {

    let user = JSON.parse(json); // <-- when an error occurs...
    alert( user.name ); // doesn't work

  } catch (err) {
    // ...the execution jumps here
    alert( "Our apologies, the data has errors, we'll try to request it one more time." );
    alert( err.name );
    alert( err.message );
  }
}

/* Here we use the catch block only to show the message, but we can 
do much more: send a new network request, suggest an alternative to the 
visitor, send information about the error to a logging facility, … . 

All much better than just dying. */


/* Throwing our own errors */
/* What if json is syntactically correct, but doesn’t have a required 
name property?

Like this: */
{
  let json = '{ "age": 30 }'; // incomplete data

  try {

    let user = JSON.parse(json); // <-- no errors
    alert( user.name ); // no name!

  } catch (err) {
    alert( "doesn't execute" );
  }
}
/* Here JSON.parse runs normally, but the absence of name is actually an error for us.

To unify error handling, we’ll use the throw operator. */


/* “Throw” operator */
/* The throw operator generates an error.

The syntax is: 
    throw <error object>

Technically, we can use anything as an error object. That may be even a 
primitive, like a number or a string, but it’s better to use objects, preferably 
with name and message properties (to stay somewhat compatible with built-in errors).

JavaScript has many built-in constructors for standard errors: Error, 
SyntaxError, ReferenceError, TypeError and others. We can use them to 
create error objects as well. 

Their syntax is: 

let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...

For built-in errors (not for any objects, just for errors), the name property 
is exactly the name of the constructor. And message is taken from the argument.

For instance:
*/
{
  let error = new Error("Things happen o_O");

  alert(error.name); // Error
  alert(error.message); // Things happen o_O
}