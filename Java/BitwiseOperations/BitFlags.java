package Java.BitwiseOperations;

import java.util.Arrays;

/**
 * Bit Flags, or bit fields, are efficient ways of storing boolean values in a
 * primitive type. A integer would be able to provide 31 flags (the most
 * significant bit is reserved for signed value +/- sign). 
 * 
 * 
 * Another way to represent this is EnumSets which have the efficiency of bit 
 * flags but without the loss of safety the type system provides. 
 */
public class BitFlags {
    // Each bit flag represents a power of 2 in binary
    public static final int UPPERCASE = 1;      // 0001
    public static final int REVERSE = 2;        // 0010
    public static final int PREFIX = 4;         // 0100
    public static final int SUFFIX = 8;         // 1000

    // A binary repunit will represent multiple/all options selected
    public static final int ALL_OPTIONS = 15;   // 1111

    private static final String prefix = "The ";
    private static final String suffix = " ====";

    public static String format(String val, int flags){
        if((flags & UPPERCASE) == UPPERCASE) val = val.toUpperCase();

        if((flags & REVERSE) == REVERSE) {
            val = new StringBuffer(val).reverse().toString();
        }

        if((flags & PREFIX) == PREFIX) { 
            val = prefix.concat(val);
        }

        if((flags & SUFFIX) == SUFFIX) { 
            val = val.concat(suffix);
        }

        return val;
    }

    // Applies each bit flag to the String value and returns an array of Strings
    public static String[] apply(String val){
        String[] arr = new String[6]; 
        arr[0] = val;
        arr[1] = format(val, UPPERCASE);
        arr[2] = format(val, REVERSE);
        arr[3] = format(val, PREFIX);
        arr[4] = format(val, SUFFIX);
        arr[5] = format(val, ALL_OPTIONS);
        return arr;
    }

    // Prints all values of a string array for more cleaner output
    public static void print(String[] arr){
        Arrays.stream(arr).forEach(System.out::println);
        System.out.println();
    }

    public static void main(String[] args){
        String index = "Index Librorum Prohibitorum";
        String codeName = "Dedicatus545";

        String[] indexes = apply(index);
        String[] codeNames = apply(codeName);

        print(indexes);
        print(codeNames);
    }
}
