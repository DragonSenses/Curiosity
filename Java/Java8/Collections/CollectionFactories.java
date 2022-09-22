package Java.Java8.Collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.HashSet;

/**
 * Java 9 introduced a few convenient ways to create small collection objects.
 * 
 * Overloading vs varargs
 * Inspecting the List interface, one can see several overloaded variants of 
 * List.of:
 * static <E> List<E> of(E e1, E e2, E e3, E e4)
 * static <E> List<E> of(E e1, E e2, E e3, E e4, E e5)
 * 
 * Why did Java API not have one method that use varargs to accept an arbitrary
 * number of elements in the following style:
 * static <E> List<E> of(E... elements)
 * 
 * Internally, varargs version allocates an extra array, which is wrapped up 
 * inside a list. You pay the cost for allocating an array, initializing it, 
 * and having itt garbage-collected later.
 * 
 * By providing a fixed number of elements (up to ten) through an API, you don't
 * pay this cost. Note that you can still create List.of() using more than 10 
 * elements, but in thhat case the varargs signature is invoked. Same pattern is
 * seen with Set.of() and Map.of().
 */
public class CollectionFactories {
    /**
     * One way to create a small collection of objects, manually
     */
    public static List<String> makeFriends1(){
        List<String> friends = new ArrayList<>();
        friends.add("Ellen");
        friends.add("Daedalus");
        friends.add("Olivia");
        return friends;
    }

    /**
     * Convenient way to create a small collection of objects, use Arrays.asList()
     * method. Fixed-sized list that you can update, but cannot add elements to 
     * or remove elements from. 
     * Attempting to add elements throws an exception.
     * Updating via set() method is allowed. 
     */
    public static List<String> makeFriends2(){
        List<String> friends =  Arrays.asList("Harriet", "Ellen", "Reinhardt");
        
        return friends;
    }

    /**
     * Make a small Set of objects. Using HashSet constructor which accepts a
     * List. Alternatively, could use Streams API.
     * 
     * The Set returned is mutable.
     */
    public static Set<String> makeSet(){
        // HashSet constructor
        Set<String> friends 
            =  new HashSet<>(Arrays.asList("Harriet", "Ellen", "Olivia"));
        
        // Streams API
        friends = Stream.of("Ami", "Ouka", "Akane", "Riho", "Shiragiku")
                        .collect(Collectors.toSet());
        return friends;
    }

    // All Methods above are inelegant and involve unncessary object allocation

    // List Factory Methods - a better way
    /**
     * Factory method List.of creates an immutable list, that cannot be added 
     * to or modified with set() method. Protects from unwanted mutations of 
     * the collections.
     * 
     * Null elements are disallowed, to prevent bugs and enable more-compact 
     * internal representation.
     * Elements can be mutable themselves. 
     */
    public static List<String> makeFriends3(){
        return List.of("Harriet", "Ellen", "Olivia");
    }

    // Similarly can make a small set with Set.of() factory method
    public static Set<String> makeSetFamily(){
        return Set.of("Ami", "Ouka", "Akane", "Riho", "Shiragiku");
    }

    // Map.of() factory method
    public static Map<String> makeMapFamily(){
        return Map.of("Ami", "Ouka", "Akane", "Riho", "Shiragiku");
    }

    public static void main(String[] args){
        List<String> friends = makeFriends2();
        friends.set(2, "Olivia");   // Updating via set() is allowed
        // friends.add("Aria");    // throws an UnsupportedOperationException
        
        System.out.println("======== Friends ========");
        friends.stream().forEach(System.out::println);


        Set<String> family = makeSet();
        family.add("Hayato");   // Set returned is mutable, adding is allowed

        System.out.println("======== Family ========");
        family.stream().forEach(System.out::println);
    }
}
