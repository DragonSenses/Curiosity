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

/* Solution One: use if or ? operator, before accessing its property, e.g., */
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