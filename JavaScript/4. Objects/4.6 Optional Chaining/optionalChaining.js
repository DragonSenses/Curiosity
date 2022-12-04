"use strict";
/* Optional Chaining '?.' */
/* The optional chaining ?. is a safe way to access nested object properties, 
even if an intermediate property doesn't exist. 

Summary
 The optional chaining ?. syntax has three forms:
  1. obj?.prop – returns obj.prop if obj exists, otherwise undefined.
  2. obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
  3. obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.

* The ?. checks the left part for null/undefined and allows the 
evaluation to proceed if it’s not so. 

* A chain of ?. allows to safely access nested properties.

Still, we should apply ?. carefully, only where it’s acceptable, 
according to our code logic, that the left part doesn’t exist. 
So that it won’t hide programming errors from us, if they occur.
*/

/* The "Non-existing Property" Problem */
/* Common problem of accessing a non-existing property 
e.g., user objects hold information about users, and most users have addresses 
in user.address property, with the street user.address.street, but some did not provide them  
*/

let user = {}; // a user without "address" property
console.log(user.address.street); // Error!

// Expected result since user.address is undefined, an attempt to get 
// user.address.street fails with an error
// In many practical cases we'd prefer to get undefined instead of an error

/* Another Example: in Web Development, we can get an object that corresponds
to a web page element using a special method call, such as 
document.querySelector('.elem'), and it returns null when there's no such element 
*/
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null
console.log(html);

/* Once again, if the element doesn't exist, we'll get an error accessing 
.innerHTML property of null. And in some cases, when the absence of the element
is normal, we'd like to avoid the error and just accept html = null as result 
*/

/* Solution One: use if or ? ternary operator, before accessing its property, 
e.g., */
console.log(user.address ? user.address.street : undefined);
// Solution with document.querySelector:
html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;

// The more deeper the nested properties are, the more calls, here document.querySelector()
// is actually called twice.

// Accessing user.address.street.name
console.log(user.address ? user.address.street ? user.address.street.name : null : null);

/* Solution 2: Using && */
/* AND'ing the whole path to the property ensures that all components exist (if not, the
  evaluation stops), but also isn't ideal since property names are still duplicated in
  code.  */
console.log( user.address && user.address.street && user.address.street.name ); // undefined 

/* Latest Solution: Optional Chaining ?.  */
/* ?. Optional chaining operater stops evaluation if the value before ?. is 
undefined or null and returns undefined. 

Something "exists" if it is NOT null and NOT undefined

value?.prop:
 - works as value.prop, if value exists,
 - otherwise (when value is undefined/null) it returns undefined

 A safe way to access user.address.street using ?.
 console.log(user?.address?.street); // undefined (no error)

 Code is short, clean, no duplication. An example with document.querySelector:
 let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's no element

 Reading the address with user?.address works even if user object doesn’t exist:

user = null;

alert( user?.address ); // undefined 
alert( user?.address.street ); // undefined

Note: the ?. syntax makes optional the value before it, but not any further.

E.g. in user?.address.street.name the ?. allows user to safely be null/undefined 
(and returns undefined in that case), but that’s only for user. Further properties 
are accessed in a regular way. If we want some of them to be optional, then we'll 
need to replace more . with ?..

Don't overuse optional chaining, only use it where it's ok that something does
not exist. For example, if according to our code logic user object must exist, 
but address is optional, then we should write user.address?.street, 
but not user?.address?.street.

Then, if user happens to be undefined, we’ll see a programming error about it 
and fix it. Otherwise, if we overuse ?., coding errors can be silenced where 
not appropriate, and become more difficult to debug.
*/

/* Variable before ?. must be declared
If there's no variable user at all, then user?.anything triggers an error 
// ReferenceError: user is not defined
user?.address;
*/

/* Short-Circuiting */
/* The ?. immediately stops i.e. "short-circuits" the evaluation if the left
part doesn't exist. SO any further function calls to the right of ?. won't
be made. e.g., */
let dog = null;
let x = 0;

// no "user", so the execution doesn't reach sayHi call and x++
// dog?.sayHi(x++); 

alert(x); // 0, value not incremented
console.log(dog);


/* Other Variants: ?.() and ?.[] */
/* ?. is NOT an operator, but a Special Syntax Construct, that also works with
functions and square brackets. */