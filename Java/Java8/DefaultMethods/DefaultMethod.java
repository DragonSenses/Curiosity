package Java.Java8.DefaultMethods;

import java.util.Arrays;
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
 * ================================= Summary =================================
 * (1) 
 * (2) 
 * (3) 
 * (4) 
 * ================================= Methods ==================================
 * - 
 */
public class DefaultMethod {

    // Example of default method in List interface: 
    // default void sort(Comparator<? super E> c){
    //     Collections.sort(this, c);
    // }

    public static void sortingList(List<Integer> numbers){
        System.out.println(numbers);
        numbers.sort(Comparator.naturalOrder());    
        System.out.println(numbers);
    }

    enum Flags {
        One, Two, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
            System.out.println("One");
        }
        if(flags.contains(Flags.Two)) {
            System.out.println("Two");
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
