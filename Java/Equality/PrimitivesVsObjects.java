package Java.Equality;

/**
 * Primitives vs. Objects
 * Java has 8 primitive types: boolean, byte, char, short, int, long, float, double
 * - Primitives are literals, fixed values in memory and can be tested for equality
 * with "==" with exceptions (float and double)
 * - Objects compared with "==" are comping the object reference type, where two
 * values are only equal if they point ot the same object in memory. 
 * - Primitives always have a default value, cannot be uninitialized or null
 * 
 * Primitive    |   Default Value
 * ==============================
 * boolean      |   false
 * byte         |   0
 * char         |   '\u0000'
 * short        |   0
 * int          |   0
 * long         |   0l
 * float        |   0.0f
 * double       |   0.0d
 * 
 * - Every primitive data type has corresponding wrapper class in java.lang, 
 * encapsulating the value in a Java object
 * 
 * Primitive    |   Wrapper     |  Superclass
 * ============================================
 * boolean      |   Boolean     |   Object
 * byte         |   Byte        |   Number
 * char         |   Character   |   Object
 * short        |   Short       |   Number
 * int          |   Integer     |   Number
 * long         |   Long        |   Number
 * float        |   Float       |   Number
 * double       |   Double      |   Number
 * 
 * Object Benefits:
 *  - Generic Types (i.e. List<Integer>, ArrayList<Double>)
 *  - Ability to be null
 * 
 * Object Drawbacks:
 *  - Bigger Memory Footprint
 *  - Performance Impact
 *  - NullPointerException
 * 
 * Note: java.util.Integer and java.util.Long actually cache values for specific
 * ranges (-128 to 127)
 */
public class PrimitivesVsObjects {
    

    public static void main(String[] args){
        System.out.println("============ Using \"==\" with Strings ============");
        // Objects are only equal if they point to the same object in memory
        String a = "a";
        String b = "b";
        String ab = "ab";

        System.out.println(a == "a");       // true
        System.out.println(ab == "ab");     // true
        System.out.println(a + b == "ab");  // false
        // Compiler and JVM might optimize string constants so the 2nd is true
        // The 3rd is false because the operation 'a + b' creates a new object in memory

        System.out.println("\n============ Using \"==\" with Integers ============");
        // Integer and Long cache values between -128 to 127, so A and B are the same
        // object but not C and D
        Integer A = 127;
        Integer B = 127;
        Integer C = 128;
        Integer D = 128;
        boolean equal      = (A == B); // true
        boolean notEqual   = (C == D); // false
        boolean equalAgain = (Integer.valueOf(128) == 128); // true, due to unboxing

        System.out.println("Integer A = " + A + ", Integer B = " + B);
        System.out.println("A == B?\t" + equal);
        System.out.println("Integer C = " + C + ", Integer D = " + D);
        System.out.println("C == D?\t" + notEqual);
        System.out.println("Integer.valueOf(128) == " + 128 + "\t" + equalAgain);

        // Testing out the negative values now
        Integer E = -128;
        Integer F = -128; 
        Integer G = -129;
        Integer H = -129; 

        equal = (E == F);       // true
        notEqual = (G == H);    // false
        equalAgain = (Integer.valueOf(-129) == -129);   // true

        System.out.println("\nInteger E = " + E + ", Integer F = " + F);
        System.out.println("E == F?\t" + equal);
        System.out.println("Integer G = " + G + ", Integer H = " + H);
        System.out.println("G == H?\t" + notEqual);
        System.out.println("Integer.valueOf(-129) == " + -129 + "\t" + equalAgain);
    }   
} 