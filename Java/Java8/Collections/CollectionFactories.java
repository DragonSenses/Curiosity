package Java.Java8.Collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.HashSet;

/**
 * Java 9 introduced a few convenient ways to create small collection objects
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

    
    public static List<String> makeFriends3(){
        return List.of("Harriet", "Ellen", "Olivia");
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
