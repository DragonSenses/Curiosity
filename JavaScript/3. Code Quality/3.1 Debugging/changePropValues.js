/**
 * Script will be used for debugging practice. 
 * Will check if an object's properties get modified properly.
 * 
 */

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
function multiplyNumeric(obj) {
    for (let prop in obj) {
        // Check the Property Value if its type is a 'number'
        if (typeof obj[prop] == 'number') {
            obj[prop] *= 2;
        }
    }
}