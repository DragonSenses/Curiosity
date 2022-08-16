package Java.Equality;

/**
 * Primitives vs. Objects
 * Java has 8 primitive types: boolean, byte, char, short, int, long, float, double
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
 */
public class PrimitivesVsObjects {
    

    public static void main(String[] args){

    }
} 