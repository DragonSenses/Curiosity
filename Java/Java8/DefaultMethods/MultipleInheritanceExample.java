package Java.Java8.DefaultMethods;

/**
 * Default methods enable something elegant that wasn't possible before:
 * Multiple Inheritance of Behavior, which is the ability of a class to
 * reuse code from multiple places.
 * 
 * Classes in Java can inherit from only one other class, but classes have
 * always been allowed to implement multiple interfaces. Take a look at the
 * ArrayList method signature. 
 */
public class MultipleInheritanceExample {
    
    /**
     * ArrayList is extending one class and directly implementing four 
     * interfaces. ArrayList is a direct Subtype of Seven Types: 
     * -AbstractList, List, RandomAccess, Cloneable, Serializable, 
     * Iterable, and Collection. Already have Multiple Inheritance of Types.
     * 
     * Classes can inherit behavior (implementation code) from multiple 
     * interfaces because interface methods can have implementations in Java 8.
     * 
     * Keeping interfaces minimal and orthogonal lets you achieve great reuse
     * and composition of behavior inside your code base. 
     */
    // public class ArrayList<E> extends AbstractList<E>
    //     implements List<E>, RandomAccess, Cloneable,
    //     Serializable { }
}
