/* The function pow(x,n) returns x raise to the power of n,
without using exponentiation operator "**". It uses a for loop running n-1
times. So run time is O(n). */     
function pow(x, n) {
  let result = x;

  for(let i = 1; i < n; i++){
    result *= x;
  }

  return result;
}

/* Prompts the user for input values x, and n, then returns x^n */
let x = prompt("x?", "");
let n = prompt("n?", "");

// Supports only natural values of n: integers up from 1
if (n < 1) {
  alert(`Power ${n} is not supported, use a positive integer`);
} else {
  alert(`${x}^${n} is ` + pow(x, n));
}


/* A recursive function that employs a Divide-and-Conquer to get the
result x^n. Run time should be O(log n) as it halves n. A slightly
better way to  */
function power(x,n){
    let result;

    // Base Case
    if ( n == 0) {
        return 1;
    }

    // Recursive calls halves n by 2, store result
    result = power(x, n/2);

    // is n even? Check least-significant bit. 
    if( n & 1 == 0){
        // Even then return 
        return result * result;
    } else { 
        return x * result * result; 
    }

}