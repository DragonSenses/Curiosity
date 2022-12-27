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

{
    
let user = {};

console.log(isEmpty(user)); // true

user = {
    name: "Luna",
    age: 20,
};

console.log(isEmpty(user)); // false

}