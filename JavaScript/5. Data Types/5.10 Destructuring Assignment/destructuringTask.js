/* Destructuring assignment */
/* We have an object:

let user = {
  name: "John",
  years: 30
};

Write the destructuring assignment that reads:

 - name property into the variable name.
 - years property into the variable age.
 - isAdmin property into the variable isAdmin (false, if no such property)

Here’s an example of the values after your assignment:

let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

console.log( name ); // John
console.log( age ); // 30
console.log( isAdmin ); // false
*/
let user = { name: "Luna", years: 20 };

let {name, years: age, isAdmin = false} = user;

console.log( name );    // Luna
console.log( age );     // 20
console.log( isAdmin ); // false


/* The maximal salary */
/* There is a salaries object: 
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

Create the function topSalary(salaries) that returns the name of the top-paid person.

 - If salaries is empty, it should return null.
 - If there are multiple top-paid persons, return any of them.
 
P.S. Use Object.entries and destructuring to iterate over key/value pairs.

*/
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

/**
 * Tests whether an object is empty or not.
 * @param {object} obj object to test
 * @returns true if object is an empty object as well as
 * source: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object  
 */
function isEmpty(obj){
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return obj // 👈 null and undefined check
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype;

  // Note, though, that this creates an unnecessary array (the return value of keys).
}

function topSalary(salaries){
  if(isEmpty(salaries)){
    return null;
  }

}

topSalary();