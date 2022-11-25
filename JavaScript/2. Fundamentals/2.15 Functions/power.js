/* The function pow(x,n) returns x raise to the power of n,
without using exponentiation operator "**" */     
function pow(x, n) {
  let result = x;

  for(let i = 1; i < n; i++){
    result *= x;
  }

  return result;
}


let x = prompt("x?", "");
let n = prompt("n?", "");

// Supports only natural values of n: integers up from 1
if (n < 1) {
  alert(`Power ${n} is not supported, use a positive integer`);
} else {
  alert(`${x}^${n} is ` + pow(x, n));
}

