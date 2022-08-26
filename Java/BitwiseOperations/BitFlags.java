package Java.BitwiseOperations;

/**
 * Bit Flags, or bit fields, are efficient ways of storing boolean values in a
 * primitive type. A integer would be able to provide 31 flags (the most
 * significant bit is reserved for signed value +/- sign). 
 */
public class BitFlags {
    // Each bit flag represents a power of 2 in binary
    public static final int UPPERCASE = 1;      // 0001
    public static final int REVERSE = 2;        // 0010
    public static final int PREFIX = 4;         // 0100
    public static final int SUFFIX = 8;         // 1000

    // A binary repunit will represent multiple/all options selected
    public static final int ALL_OPTIONS = 15;   // 1111

    public static String format(String val, int flags){
        if((flags & UPPERCASE) == UPPERCASE) val = val.toUpperCase();

        if((flags & REVERSE) == REVERSE) {
            val = new StringBuffer(val).reverse().toString();
        }

        return val;
    }

    public static void main(String[] args){

    }
}
