/* JavaScript program that adds two numbers together through BitWise Operations */

/** In order to get the sum of two integers, we use an interesting property of
 * the XOR (^) operator. 
 * 
 * An interesting relation is:
 * a ^ b = a+b - 2*(a & b)
 * a + b = a^b + 2*(a & b)
 * 
 * Algorithm: Let x = a, and y = b. We have x^y and (x&y) << 1.
 * 
 * 1. Create carry variable that stores the (x & y) expression
 * 2. Assign x to store the x^y expression
 * 3. Assign y to store the (x&y) << 1 or (carry) << 1 expression
 * 4. Repeat steps 1-3 until y == 0, where there is no carry (i.e. the x&y
 * or x AND y expression yields 0 where no more bits are set)
 * 
 * Example: x = 3, y = 4. sum(3,4) will go through this process:
 * x = 0011 = 3
 * y = 0100 = 4
 * x = 0111 = x^y
 * y = 0000 = x&y << 1 
 * Condition( y != 0 ) is false, returns x;
 * x = 0111 = 7
 * 
 * @return the sum through bitwise operations.
 */
function sum(x,y){
let carry;
    // Iterate until there is no carry
    while(y != 0){
        
        // carry contains common set bits of x and y
        carry = x & y;

        // Assign x the sum of bits of x and y where at least one of the bits 
        // are not set. XOR returns 1 when neither are the same bit, 0 if same bit.
        x = x ^ y;

        // Assign to y the carry (set bits shared in common between x and y) 
        // shifted by one. Then adding it to x gives the required sum.
        y = carry << 1;

    }
    return x;
}

console.log(sum(3,4));