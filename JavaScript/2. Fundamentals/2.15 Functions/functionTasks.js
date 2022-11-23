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
condition is fasly (i.e. age <= 18)
*/