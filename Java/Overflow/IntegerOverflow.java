package Java.Overflow;

/*
 * A study on the MAX INT value with 2^31 = 2147483648
 * 
 * Signed
 * byte  =   8 bits
 * short =   16 bits
 * int   =   32 bits
 * long  =   64 bits
 */
public class IntegerOverflow {

    /*
     * Side note : when looking for largest item in a sequence, do not
     * set initial value to 0 as it would fail to update if all values
     * in sequence are NEGATIVE; instead use MIN_VALUE as the initial
     * value for the variable
     * 
     * Likewise, when searching for the smallest item in the sequence,
     * set the MIN variable to MAX_VALUE
     * 
     */
    public static void main(String[] args) {

        System.out.println("Minimum value of int [-2^31]: " + Integer.MIN_VALUE); // -2,147,483,648
        System.out.println("Maximum value of int [2^31 - 1]: " + Integer.MAX_VALUE); // 2,147,483,647
        System.out.println("========= Overflow of Minimum and Maximum int ========");
        
        System.out.println("Minimum - 1 value is: " 
            + (Integer.MIN_VALUE - 1)); // 2,147,483,647 UNDERFLOW
        System.out.println("Maximum + 1 value is: " 
            + Integer.MAX_VALUE + 1); // -2,147,483,648 OVERFLOW
    }
}
