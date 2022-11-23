/* Is else required? Will function work differently if else is removed? */
function checkAge(age) {
    if (age > 18) {
      return true;
    } else {
        return confirm('Did parents allow you?');
    }
}

function checkAge(age) {
    if (age > 18) {
     return true;
    }

    return confirm('Did parents allow you?');
}

/* Answer: No difference, return confirm() will execute exactly when the
condition is falsy (i.e. age <= 18)
*/

/* Rewrite the functiton using '?' or '||' 
The function returns true if the parameter age is greater than 18.

Otherwise it asks for a confirmation and returns its result.
*/

function checkAge(age) {
    if (age > 18) {
      return true;
    } else {
      return confirm('Did parents allow you?');
    }
}

// First Variant using '?' operator
function checkAge(age){
    return (age > 18) ? true : confirm('Did parents allow you?');
}

// Second Variant using || operator
function checkAge(age){
    return (age > 18) || confirm('Did parents allow you?');
}


/* Write a Function min(a,b) which returns the least of two numbers a and b */
function min(a,b){
  return (a < b) ? a : b;
}