package Java.Java8.DefaultMethods;

import java.util.Arrays;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;

/**
 * In a nutshell, adding a method to an interface is the source of many problems;
 * existing classes implementing the interface need to be changed to provide 
 * an implementation for the method. Which is difficult when you're not in
 * control fo the interface and all its implementations. 
 * 
 * Java 8 interfaces can declare methods with implementation code in two ways.
 * 
 * 1. Java 8 allowed static methods inside interfaces.
 * 2. Java 8 introduced a new feature called default methods that allows you to
 * provide a default implementation for methods in an interface; interfaces 
 * can now provide concrete implementation for methods. All existing classes
 * implementing an interface automatically inherit the default implementations
 * if they don't provide one explicitly, which allows you to evolve interfaces
 * nonintrusively. 
 * 
 * Default methods are useful for library designers, but also can help
 * structure your programs by providing a flexible mechanism for multiple 
 * inheritance of behavior; a class can inherit default methods from multiple
 * interfaces. 
 * 
 * Adding a new method to an interface is binary compatible, which means that
 * existing class file implementations still run without the implementation 
 * of the new method if no attempt is made to recompile them.
 * 
 * Examples of default methods: List.sort(), Collection.stream() 
 * Examples of static methods: Comparator.naturalOrder() 
 * 
 * ----------------------- Static Methods & Interfaces ------------------------
 * A common pattern in Java is to define both an interface an a utility 
 * companion class defining many static methods for working with instances
 * of the interface. Collections is a companion class to deal with Collection 
 * objects, for example. Now that static methods can exist inside interfaces,
 * such utility classes in your code can go away, and their static methods 
 * can be moved inside an interface. These companion classes remain in the 
 * Java API to preserve backward compatibility.
 * 
 * ------------------- Different Types of Compatibilities --------------------
 * 1. Binary Compatibility - means that existing binaries running without 
 * errors continue to link (which involves verification, preparation, and 
 * resolution) without error after introducing a change. Adding a method to an
 * interface is binary compatible, for example, because if it's not called, 
 * existing methods of the interface can still run without problems. 
 * 
 * 2. Source Compatibility - means that an existing program will still compile 
 * after introducing a change. Adding a method to an interface isn’t source 
 * compatible; existing implementations won’t recompile because they need to
 * implement the new method.
 * 
 * 3. Behavioral Compatibility - means running a program after a change with
 * the same input results in the same behavior. Adding a method to an
 * interface is behavioral compatible because the method is never called in
 * the program (or gets overridden by an implementation).
 * 
 * ================================= Methods ==================================
 * - List.sort() - default method that sorts the List
 * - Comparator.naturalOrder() - static method of Comparator interface that 
 * returns a Comparator object to sort the elements in natural order (the 
 * standard alphanumerical sort)
 * -Collection.stream() - returns a Stream of the passed in Collection's elements
 */
public class DefaultMethod {

    /* Example of default method in List interface:  */
    // default void sort(Comparator<? super E> c){
    //     Collections.sort(this, c);
    // }

    /**
     * Collection.stream() default method calls the StreamSupport.stream
     * method to return a stream. The body of the stream method is calling
     * the method spliterator, which is also a default method of the 
     * Collection interface.
     */
    // default Stream<E> stream() {
    //     return StreamSupport.stream(spliterator(), false);
    // }

    /**
     * Sorts passed in List of numbers. Uses List.sort() default method, and
     * new static method in Comparator interface
     * @param numbers List of numbers
     */
    public static void sortingList(List<Integer> numbers){
        System.out.println("Before Sort:\t" + numbers);
        numbers.sort(Comparator.naturalOrder());    
        System.out.println("After Sort:\t" + numbers);
    }

    enum Flags {
        One, Two, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
            System.out.println("One");
        }
        if(flags.contains(Flags.Two)) {
            // System.out.println("Two");
        }
        if(flags.contains(Flags.Three)) {
            System.out.println("Three");
        }
        if(flags.contains(Flags.Four)) {
            System.out.println("Four");
        }
    }

    public static void main(String[] args) {
        // EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        // execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.Two);
        execute(currentOpt);

        List<Integer> numbers = Arrays.asList(3, 5, 1, 2, 6);
        sortingList (numbers);
      

    }
}
