/* Sum the Properties */
/* There is a salaries object with arbitrary number of salaries.

Write the function sumSalaries(salaries) that returns the sum of all 
salaries using Object.values and the for..of loop.

If salaries is empty, then the result must be 0.

For instance: */
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

console.log( sumSalaries(salaries) ); // 650

/* Answer */
function sumSalaries(){
    let sum = 0;
    
    for(let salary of Object.values(salaries)){
        sum += salary;
    }
    
    return sum;
}

// Alternatively, get sum using Object.values and reduce
// reduce loops over array of salaries, adding them up, and returns result
// Take a salaries object, map it to its values, reduce to sum
function sumSalariesConcise(salaries){
    return Object.values(salaries).reduce((a,b) => a + b, 0);
}

console.log(sumSalariesConcise(salaries)); // 650

/* Count Properties */
/* Write a function count(obj) that returns the number of properties in the object: */
let user = {
    name: 'John',
    age: 30
};
  
console.log( count(user) ); // 2


/* Answer */
function count(obj){
    return Object.keys(obj).length;
}