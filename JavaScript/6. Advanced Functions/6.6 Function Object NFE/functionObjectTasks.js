/* Set and decrease for counter */
/* Modify the code of makeCounter() so that the counter can also decrease and 
set the number: 
 - counter() should return the next number (as before).
 - counter.set(value) should set the counter to value.
 - counter.decrease() should decrease the counter by 1.
 
P.S. You can use either a closure or the function property to keep the current 
count. Or write both variants. */

/* Answer: Use count as the local variable, but additional methods are written
right into the counter. They share the same outer lexical environment and also
can access the current count. */
function makeCounter() {
    let count = 0;

    function counter() {
      return count++;
    }
  
    counter.set = (value) => count = value;

    counter.decrease = () => count--;

    return counter;
}


let c = makeCounter();       // output
console.log( c() );          // 0       count = 1
console.log( c() );          // 1       count = 2
console.log( c.set(64) );    // 64      count = 64
console.log( c() );          // 64      count = 65
console.log( c() );          // 65      count = 66
console.log( c.decrease() ); // 66      count = 65
console.log( c.decrease() ); // 65      count = 64

// Note: count is different from the output because of post-increment (i.e., count++)

/* Sum with an arbitrary amount of brackets */
