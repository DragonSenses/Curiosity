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
  alert(`${x}^${n} is ` + power(x, n));
}


/* 
A recursive function that employs a Divide-and-Conquer to get the
result x^n. Run time should be O(log n) as it halves n. A slightly
better way to  

Bug Fixed: the statement ( n & 1 == 0) produces an infinite loop, because of
Operator Precedence. 
    - Bitwise & has a precedence of 4, yet equality "==" has a precedence of 8.

    So this always evaluates to (n & (1 == 0)) -> (n & 0) -> (0) any number 
    n & 0 will always produce since 0 has no set bits, and ANDING 
    with 0 will result in 0. So condition is always falsy. 
*/
function power(x,n){
    let result;

    // Base Case
    if ( n == 0) { return 1; }

    // Recursive calls halves n by 2
    result = power(x, n/2);

    // Is exponent n even? Check least-significant bit. 
    return ( (n & 1) == 0) ? (result * result) : (x * result * result);

    /*
    if( (n & 1) == 0){
        return result * result;
    } else {  
        return x * result * result; 
    }
    */
}