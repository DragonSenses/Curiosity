package Java.Equality;

/**
 * Due to their storage method in memory, floats and doubles
 * cannot be reliably be check for equality using "==".
 * 
 * They aren't exact values.
 * 
 * 
 * 
 */
public class FloatsArentEqual {

    public static void main(String[] args){
        float value = 1.0f;
        value += 0.1f;      // 1.1f
        value += 0.1f;      // 1.2f
        value += 0.1f;      // 1.3000001f

        boolean isEqual = (value == 1.3f); // false
        System.out.println("Is value " + value + " == 1.3f?\n" + isEqual);
    }
}
