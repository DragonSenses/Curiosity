package Java.BitwiseOperations;

/**
 * Adds two numbers using bitwise operations. 
 * Time Complexity is O(log y).
 * 
 * In order to get the sum of two integers, we use an interesting property of
 * the XOR (^) operator. 
 * 
 * An interesting relation is:
 * a + b = a^b + 2*(a & b)
 * a ^ b = a+b - 2*(a & b)
 * when (a&b) = 0, you get a+b = a^b, in other words XOR of two numbers
 * will lead to a summation. 
 * But when (a&b) != 0, then you get a difference. 
 * 
 * Algorithm: 
 *      To get a + b, we must have a^b added to 2*(a&b)
 *      a + b = a^b + (a&b) << 1;
 * 
 *  a^b - returns a 1 in each bit position for which the corresponding bits of
 * either but not both operands are 1s. 
 *  a&b - Common set bits (a bit where both a and b have 1 as the bit in that 
 * position). This value is shifted by 1, or multipled by 2. 
 * 
 * Just keep in mind that XOR is not always SUM or Difference, look at
 *  6 = 110
 *  3 = 011
 * XOR  101 = 5
 * SUM = 9
 * DIF = 3 
 */
public class BitWiseAdd{


    /** Recall that: a + b = a^b + 2*(a & b)
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
    public static int sum(int x, int y){
        int carry; 

        // Until there is no carry
        while (y != 0){
            // carry contains common set bits of x and y
            carry = x & y;

            // Sum of bits of x and y where at least one of the bits is not set
             x ^= y;     // x = x ^ y  (x = x XOR y)

            // Carry is shifted by one so adding it to x gives the sum
            y = carry << 1;
        }
        return x; 
    }

    // Recursive version above
    public static int add(int x, int y){
        if (y == 0) {
            return x;
        }
        return add(x^y, (x & y) << 1); 
    }

    // Improved Recursive version above
    // Need to test, but change to if condition removes one extra recursive call
    public static int adding(int x, int y){
        if ((x & y) == 0) {
            return (x ^ y);
        }
        return adding(x^y, (x & y) << 1); 
    }

    public static void main(String[] args){
        System.out.println(sum(3,4));
    }
}