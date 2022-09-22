package Java.Java8.Collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

/**
 * Java 9 introduced a few convenient ways to create small collection objects
 */
public class CollectionFactories {
    /**
     * One way to create a small collection of objects, manually
     */
    public static List<String> makeFriends(){
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
    public static List<String> makeFriendsBetter(){
        List<String> friends =  Arrays.asList("Harriet", "Ellen", "Reinhardt");
        
        return friends;
    }

    /**
     * Make a small Set of objects. Using HashSet constructor which accepts a
     * List.
     */
    public static Set<String> makeSetFriends(){
        Set<String> friends 
            =  new HashSet<>(Arrays.asList("Harriet", "Ellen", "Olivia"));
        return friends;
    }

    public static void main(String[] args){
        List<String> friends = makeFriendsBetter();
        friends.set(2, "Olivia");   // Updating via set() is allowed
        friends.add("Aria");    // throws an UnsupportedOperationException
    }
}
