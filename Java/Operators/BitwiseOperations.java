package Java.Operators;

/**
 * Bitwise operators are used to performing the manipulation of individual
 * bits of a number.
 */
public class BitwiseOperations {
    
    /**
     * Private utility function that pads the passed in binary number, to
     * a specified length. 
     * 
     * Bitwise logic: Let n = 1, length = 4, the result of toBinaryString()
     * is just 1. To get the padded zeros to the left, we manipulate it by:
     * 
     * 1) Shift the binary value of 1 to the left to the length wanted (length times)
     * This provides the padded left zeros.
     *      Result = 10000
     * 2) Bitwise OR it with the target integer (n = 1) to get close to the value we need
     *      Result = 10001
     * 3) Substring the result as we only want the significant bits and the padded zeros, up
     * to the length that we want. So an operation of substring(1) would yield
     *      Result =  0001
     * 
     * Special Cases:
     * 1) Negative Numbers
     * 2) When number in binaryString exceeds the length 
     *    ex. n = 16, but length = 4, binary representation of 16 is 10000, a length of 5
     * 
     * @param n The number to convert to binary and pad to the left
     * @param length the length of the binary string to pad to
     * @return The padded binary number to a specified length
     */
    public static String paddedBinaryString(int n, int length){
        return Integer.toBinaryString ((1 << length) | n).substring(1);
    }

    // Performance-wise fastest way to find if a number is even
    public static boolean isEvenBitAnd(int i) {
        return (i & 1) == 0;
    }   

    public static boolean isEvenXOR(int i) {
        return (i^1) == i+1;
    }

    public static boolean isEvenOR(int i) {
        return (i | 1) > i;
    }

    public static boolean isEvenShift(int i){
        return (i << 31) == 0;
    }

    public static boolean isEvenShift2(int i) {
        return (i >> 1) << 1 == i;
    }

    // Has extra instructions to check for when i < 0
    public static boolean isEvenMod(int i) {
        return i % 2 == 0;
    }

    public static void main(String[] args){
        System.out.println(Integer.toBinaryString(16));
        System.out.println(paddedBinaryString(1,4));
    }
}
