package Java.Methods;

/**
 * Override hashCode when you override equals()
 * 
 * Contract of hashCode
 * 1. Whenever hashCode is invoked in the same object it should return the
 *  same integer.
 * 2. If two objects are equals according to the equals, the should return the
 *  same integer calling hashCode.
 * 3. Is not required (but recommended) that two non equals objects return
 *  distinct hashCode. A good hash function tends tot produce unequal 
 *  hash codes for unequal instances.
 * 
 * The key provision that is violated is the second one : equal objects must
 * have equal hash codes. 
 * 
 * =========================== The Recipe ===========================
 * 1. Declare an int variable named result, and initialize it to the
 *  hash code c for the first significant field in your object
 * 2. For every remaining significant field f in your object, that 
 *  is used in equals() do the following:
 *  - Compute an int hash code c for the field
 *      i. If the field is of a primitive type, compute Type.hashCode(f),
 *  where Type is the boxed primitive class corresponding to f’s type.
 *     ii. If the field is an object reference and this class’s equals method
 *  compares the field by recursively invoking equals, recursively
 *  invoke hashCode on the field. If a more complex comparison is
 *  required, compute a “canonical representation” for this field and
 *  invoke hashCode on the canonical representation. If the value of the
 *  field is null, use 0 (or some other constant, but 0 is traditional).
 *    iii. If the field is an array, treat it as if each significant element
 *  were a separate field. That is, compute a hash code for each significant
 * element by applying these rules recursively, and combine the values
 * per step 2.b. If the array has no significant elements, use a constant,
 * preferably not 0. If all elements are significant, use Arrays.hashCode.
 *    iv. Combine the hash code c computed into result, then return result
 *          result = 31 * result + c
 * 
 */
public class hashCodeExample {
    // Fields Used in equals()
    short data;
    short num;
    short hash;

    // hashCode method with lazily initialized cached hash code
    private volatile int hashCode; // Automatically initialized to 0

    @Override public int hashCode() {
        int result = hashCode;
        if (result == 0) {
            result = Short.hashCode(data);
            result = 31 * result + Short.hashCode(num);
            result = 31 * result + Short.hashCode(hash);
            hashCode = result;
        }
        return result;
    }
}