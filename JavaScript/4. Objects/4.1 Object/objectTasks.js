/* Object Creation 
Write the code, one line for each action:

1. Create an empty object user.
2. Add the property name with the value John.
3. Add the property surname with the value Smith.
4. Change the value of the name to Pete.
5. Remove the property name from the object. 

*/

// Answer:
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;


/* Check for emptiness 

Write the function isEmpty(obj) which returns true if the object has no 
properties, false otherwise.

A test to show how it works is given:
*/

function isEmpty(obj){
    for(let prop in obj){
        // If loop has started
        return false; // immediately if there is at least one property
    }
    return true; 
}

let schedule = {};

console.log(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

console.log(isEmpty(schedule)); // false


/* Sum Object Properties
Given an object storing salaries of our team, write the code to sum all
salaries and store in the variable sum. Should be 390 in the example.

If salaries is empty, then the result must be 0.
*/

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function sum(obj){
    let sum = 0;
    for(let key in obj){
        sum += obj[key];
    }
    return sum;
}

console.log(sum(salaries)); // 390

/* Mutliply numeric property values by 2 
Create a function multiplyNumeric(obj) that multiplies all numeric property 
values of obj by 2. Test is given to show how it works.

Please note that multiplyNumeric does not need to return anything. It should 
modify the object in-place.

P.S. Use typeof to check for a number here.
*/
// before the call
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
    width: 400,
    height: 600,
    title: "My menu"
};

/**
 * Checks for each numeric property value in an object and doubles them.
 * @param {*} obj - an object to multiply its numerics by
 */
function multiplyNumeric(obj){
    for(let prop in obj){
        // Check the Property Value if its type is a 'number'
        if(typeof obj[prop] == 'number'){
            obj[prop] *= 2; 
        }
    }
}