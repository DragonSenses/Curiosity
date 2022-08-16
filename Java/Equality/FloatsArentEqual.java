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

        System.out.println("val = " + val.add(bd1));
        System.out.println("val = " + val.add(bd2));
        System.out.println("val = " + val.add(bd3));
        
    }
}
