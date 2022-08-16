package Java.Equality;

import java.math.BigDecimal;

/**
 * Due to their storage method in memory, floats and doubles
 * cannot be reliably be check for equality using "==".
 * 
 * They aren't exact values.
 * 
 * Workarounds: 
 *  1) Use java.util.BigDecimal (exact)
 *  2) Use threshold-based comparisons
 * 
 * Notes on BigDecimal
 * - primitive data types such as double and float should not be used for
 * precise values such as currency
 * - BigDecimal is Immutable, arbitrary-precision signed decimal numbers
 * - Immutable in that any operation won't result in the original object
 * being modified. For example, adding a one BigDecimal Object to another
 * consecutively won't change its value after the first operation
 * - equals() is based on precision
 * 
 */
public class FloatsArentEqual {

    public static void main(String[] args){
        System.out.println("============ The issue with using \"==\" with floats ============");
        float value = 1.0f;
        value += 0.1f;      // 1.1f
        value += 0.1f;      // 1.2f
        value += 0.1f;      // 1.3000001f

        boolean isEqual = (value == 1.3f); // false
        System.out.println("Is value " + value + " == 1.3f?\n" + isEqual);

        System.out.println("============ Using threshold-based comparisons ============");
        value = 1.0f;
        value += 0.1f;      // 1.1f
        value += 0.1f;      // 1.2f
        value += 0.1f;      // 1.3000001f

        float THRESHOLD = 0.00001f;
        isEqual = Math.abs(value - 1.3f) < THRESHOLD;   // true
        System.out.println("Is value " + value + " == 1.3f?\n" + isEqual);
        
        System.out.println("============ Using BigDecimal ===========");
        BigDecimal val = new BigDecimal("1.0");
        // We create 3 different BigDecimal values since one cannot call addition
        // twice with the same BD objects as they are immutable
        BigDecimal bd1 = new BigDecimal("0.1");
        BigDecimal bd2 = new BigDecimal("0.2");
        BigDecimal bd3 = new BigDecimal("0.3");

        System.out.println("val = " + val);
        System.out.println("val.add(0.1) = " + val.add(bd1));
        System.out.println("val.add(0.2) = " + val.add(bd2));
        System.out.println("val.add(0.3) = " + val.add(bd3));

        System.out.println("============ BigDecimal equals() is based on Precision ===========");
        BigDecimal a = new BigDecimal("2.0");
        BigDecimal b = new BigDecimal("2.0");
        BigDecimal c = new BigDecimal("2.00");

        boolean equal = a.equals(b);    // true
        boolean notEqual = a.equals(c); // false
        int comparison = a.compareTo(c); // 0

        System.out.println("BigDecimal a = " + a);
        System.out.println("BigDecimal b = " + b);
        System.out.println("BigDecimal c = " + c);
        System.out.println("a.equals(b) is " + equal);
        System.out.println("a.equals(c) is " + notEqual);
        System.out.println("a.compareTo(c) is " + comparison);
        // A different way to compare BigDecimal is using compareTo 
    }
}
