package Java.Operators;

/**
 * Bitwise operators are used to performing the manipulation of individual
 * bits of a number.
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
}
