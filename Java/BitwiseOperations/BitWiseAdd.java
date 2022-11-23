package Java.BitwiseOperations;

/**
 * Adds two numbers using bitwise operations. 
 * Time Complexity is O(log y).
 * The iteration runs y = carry << 1. So it shifts the required amount of
 * times.
 */
public class BitWiseAdd{


    /**
     * Algorithm. We calculate the carry by AND both x and y. Then XOR x and y
     * to get set bits. Then assign to y the carry shifted left by 1. Repeat 
     * till y = 0. 
     * Let x = 3, y = 4. 
     * x = 0011
     * y = 0100
     * 
     * 1. Calculate the carry (or common set bits i.e. bits set to 1)
     * 0011 
     * 0100 &
     * 0111
     * 2. Sum of bits x and y where at least one of the bits is not set
     * 0011 
     * 0100 ^ 
     * 0110          Then assign the result of (x ^ y) to x = 0110.
     *       
     * 3. Assign to y the carry shifted left by 1 (0111 << 1)
     * x = 0110
     * y = 1110
     * 
     * 4. Iterate and repeat steps 1-3.
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