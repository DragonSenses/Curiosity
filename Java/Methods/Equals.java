package Java.Methods;

/**
 * Equals() method
 *  Override if  A class has a notion of logical equality that differs from
 *  mere object identity, and a superclass has not already overridden equals
 *  to implement the desired behavior.
 * 
 * Equals implements an "equivalence relation"
 *
 * Reflexive: x.equals(x)==true
 * Symmetric: x.equals(y)==y.equals(x)
 * Transitive: x.equals(y)==y.equals(z)==z.equals(x)
 * Consistent: x.equals(y)==x.equals(y)==x.equals(y)==...
 * Non-nullity: x.equals(null)->false
 * 
 * ============ The Recipe ============
 * 1. Use the == operator to check if the argument is a reference to this object
 * (for performance)
 * 2. Use the instanceof operator to check if the argument has the correct type
 * 3. Cast the argument to the correct type
 * 4. For each "significant" field in the class, check if that field of the
 * argument matches the corresponding field of this object
 * 5. When you are finished writing your equals method, ask yourself three
 * questions: Is it Symmetric? Is it Transitive? Is it Consistent? 
 * 
 * Never Forget
 * - Do not substitute another type for Object in the equals declaration
 * - Override hashCode when you override equals
 */
public class Equals {
    private int data;
    private double number;
    private String name;

    private Equals() {} // prevent instantiation

    //Sample Equals Method
    @Override
	public boolean equals (Object o){
		if(o == this)
			return true;

		if (!(o instanceof Equals))
			return false;

            Equals eq = (Equals)o;
		return eq.data == data
			&& eq.number == number
			&& eq.name.equals(name);
	}

    // My Singly Linked List Example
     /**
     * Higher level notion of equivalence where we define two SinglyLinkedLists as equivalent if:
     * I)   They have the same Length
     * II)  The contents that are element-by-element are equivalent
     * 
     * The equivalence relation:
     * 1. Null - For any nonnull reference X, the call x.equals(null) should return false
     * 2. Reflexivity - For any nonnull reference variable x, the call x.equals(x) should
     * return true (that is, an object should equal itself)
     * 3. Symmetry - For any nonnull reference variables x and y, the calls x.equals(y) and
     * y.equals(x) should return the same value.
     * 4. Transitivity - For any nonull reference variables x, y, and z, if both calls 
     * x.equals(y) and y.equals(z) returns true, then call x.equals(z) must return true as well
     * 
     * @param o - The SinglyLinkedList object parameter to compare with the caller
     * @return True, if both lists are the same size and the contents are element-by-element equivalent,
     * otherwise false
     */
    // @Override
    // public boolean equals(Object o){
    //     //1. Null Treatment
    //     if(o == null) { return false; } 
    //     /*2. Class Equivalence - getClass() vs. instanceof
    //      * getClass() only returns true if object is actually an instance of the specified class but
    //      * instanceof operator returns true even if the object is a subclass of a specified class or
    //      * interface in Java; allows implementation of equality between super and sub classes but does
    //      * not satisfy symmetry: x.equals(y) is true then y.equals(x) is also true, but if you swap x
    //      * with a subclass then x instanceof y is true but y instanceof x will be false, hence equals 
    //      * is false. We do not consider a SinglyLinkedList to be equivalent to DoublyLinkedList with 
    //      * with the same contents, a more stable approach 
    //      */
    //     if(this.getClass() != o.getClass()) { return false; }
    //     //Although declared formal type parameter <E> cannot detect at runtime whether other list has
    //     //a matching type. Type erasure, maps richer types at one level to less rich types at lower level
    //     // Typecast and use nonparameterized type; EDIT: Usage of wildcard ? is Unknown Type in Generics
    //     SinglyLinkedList<?> other = (SinglyLinkedList<?>) o; 
    //     //3. Size Check
    //     if(this.size != other.size) { return false; }
    //     Node<?> ptrA = this.first;  // Traverses through the primary list
    //     Node<?> ptrB = other.first; // Traverse through the secondary list
    //     while(ptrA != null){ //For every node within each list, check if element is equal
    //         if(!ptrA.getData().equals(ptrB.getData())) { return false; }
    //         ptrA = ptrA.getNext(); 
    //         ptrB = ptrB.getNext();
    //     }
    //     return true; // When reached, every element matched successfuly
    // }
}
