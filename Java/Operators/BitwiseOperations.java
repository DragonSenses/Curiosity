package Java.Operators;

/**
 * Bitwise operators are used to performing the manipulation of individual
 * bits of a number.
 * 
 * One of my favorites is XOR, you can have one or the other but can't have both
 * The truth table: 
 * a b c
 * 0 0 0
 * 0 1 1
 * 1 0 1
 * 1 1 0 
 * 
 * An interesting relation is:
 * a + b = a^b + 2*(a & b)
 * a ^ b = a+b - 2*(a & b)
 * when (a&b) = 0, you get a+b = a^b, in other words XOR of two numbers
 * will lead to a summation. 
 * But when (a&b) != 0, then you get a difference. 
 * 
 * Just keep in mind that XOR is not always SUM or Difference, look at
 *  6 = 110
 *  3 = 011
 * XOR  101 = 5
 * SUM = 9
 * DIF = 3 
 */
public class BitwiseOperations {
    
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

    /**
     * 
     * @param arr
     * @return
     */
    public static int findSingleNumber(int[] arr){

    }

    /**
     * Returns the number of bits set to 1 (set bits) of
     * an integer. Ex. If we pass in 125 the first iteration
     * yields n = 62, the next pass yields n = 31, and so on.
     * @return returns the number of bits set to 1
     */
    public static int countSetBits(int n){
        int setBits = 0;
        while(n > 0) {  // Until n = 0
            n &= (n-1); // Divide by 2 each time
            setBits++;  // Increment setBits
        }
        return setBits;
    }

    /**
     * Bitwise operation that toggles the target character from
     * lowercase to uppercase, or uppercase to lowercase. Only applies
     * the operation to the ASCII {65-90} and {97-122}, the English
     * alphabet. Otherwise, returns the character and applies no change.
     * @param c target character to toggle case
     * @return the character in the opposite case if it is in the English
     * alphabet, otherwise returns the character
     */
    public static char toggleCase(char c) {
        if((c >= 65) && (c <= 90)) {
            return c ^= 32; 
        } else if( (c >= 97) && (c <= 122)) {
            return c ^= 32; 
        } else {
            return c;
        }
    }

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

    /**
     * Covers the special cases for the method above. For now if the incoming parameter
     * length is too small it will return the BinaryString of the value, without padding
     *  - Could also just return value or throw an exception (since it could be user error)
     * 
     * @param val the number to pad to the left as a binary string
     * @param len the specified length to pad to
     * @return the value as a binary number padded to the specified length
     */
    public static String padBinaryString(int val, int len) {
        // For now specified behavior is to just return the value
        int valLength = Integer.toBinaryString(val).length();
        if(valLength > len) { return Integer.toBinaryString(val); } 

        // Covers the case when binary digit is negative
        return Integer.toBinaryString((1<<len) | 
            ((val) & ((1<<len) -1)) ).substring(1);
    }

    public static void main(String[] args){
        System.out.println(Integer.toBinaryString(16));
        System.out.println(paddedBinaryString(1,4));

        int n = 125;
        System.out.print("The Binary Representation of " + n + " is: ");
        System.out.println(Integer.toBinaryString(n));
        System.out.println("Number of Set Bits: " + countSetBits(n));
    }
}
