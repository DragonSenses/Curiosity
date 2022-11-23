package Java.BitwiseOperations;

/** Work In Progress ... 
 * Explore bitwise operations to find the minimum of two integers or
 * maximum of two integers.
 * 
 * Using XOR and comparison operator. 
 * For C, C++
 * Minimum: y ^ ((x ^ y) & -(x < y))
 * Maximum: x ^ ((x ^ y) & -(x < y))
 * 
 * In Java, JavaScript
 * Minimum: y ^ ((x ^ y) & -(x << y))
 * Maximum: x ^ ((x ^ y) & -(x << y))
 * 
 * Another way using Subtraction and Shift,
 * Where INT_MIN <= (x-y) <= INT_MAX
 * Then Max is x - ((x - y) & ((x - y) >> (sizeof(int) * CHAR_BIT - 1)))
 *      Min is y + ((x - y) & ((x - y) >>(sizeof(int) * CHAR_BIT - 1)))
 *  CHAR_BIT = 4, INT_BIT = 8
 * Minimum: y + ((x - y) & ((x - y) >> (INT_BIT * CHAR_BIT - 1)))
 * Maximum: x - ((x - y) & ((x - y) >> (INT_BIT * CHAR_BIT - 1)))   
 * 
 * 
 * Recall
 * There are 2 cases for what XOR yields a result
 *      - (a^0 = a), XOR of Zero and Some Bit returns that bit
 *      - (a^a = 0), XOR of the same two bits returns 0
 * 
 * Analysis: Looking at the minimum expression, lets isolate an expression:
 * 
 *  if x >= y then      -(x < y) will be 0 
 *  if x < y then      -(x < y) will be -1  (i.e. an int with all bits set)
 * 
 * Note: (num & -1) == num          e.g.    (7 & -1) = 7
 *       (num & 0)  == 0                    (7 & 0 ) = 0
 * Therefore, the context of the next level subexpression 
 * ((x^y) & -(x < y))
 * will be reduced to 
 *      ((x ^ y) & 0)   or  ((x ^ y) & -1) 
 * 
 * Performing bitwise AND with 0 results in all bits of the result being 0,
 * so the first expression will be 0. 
 * The value -1, assuming two's complement representation, has all bits set 
 * to 1. SO performing a bitwise AND with -1 will result in the value of the
 * other operand. 
 * 
 * Max() function is reduced to 2 states:
 *      x ^ (0)         // x is larger or equal
 *      x ^ (x ^ y)     // y is larger      
 * 
 * In first case, performing XOR with 0 results in the value of the other operand
 * so the final result is x.
 * In second case, ^ is associate so you can look at is as (x ^ x) ^ y where 
 * XORing a number with itself results in 0, and XORing 0 with y gives you y.
 *   
 * Min() function looks similarly, with y in place of x for first operand
 *      y ^ (0)        // x is larger or equal
 *      y ^ (x ^ y)    // y is larger
 * 
 * If x < y, we get y ^ x ^ y, where y cancels out and x is the result.
 * Otherwise we get y ^ 0, which is y. 
 * 
 * In short we get x if (x < y), otherwise y which is a min function.
 * 
 * Methods:
 * - max(x,y)
 * - min(x,y)
 */
public class BitwiseMinMax {


    public static int min(int x, int y){
        return y ^ ((x ^ y) & -(x << y));
    }

    public static int max(int x, int y){
        return x ^ ((x ^ y) & -(x << y));
    }

    public static void main(String[] args){
        int x = 1;
        int y = 2;

        System.out.printf("\tx = %d, y = %d\n",x,y);
        System.out.println("Minimum:\t" + min(x, y));
        System.out.println("Maximum:\t" + max(x, y));

        System.out.println("-1 in binary is: " + Integer.toBinaryString(-1));
        System.out.println("(7 & -1) in binary is: " + Integer.toBinaryString(7 & -1));
        System.out.println("(7 & 0) in binary is: " + Integer.toBinaryString(7 & 0));

    }

}