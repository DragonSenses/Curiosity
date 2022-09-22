package Java.Java8.Collections;

import java.util.ArrayList;
import java.util.List;

/**
 * Java 9 introduced a few convenient ways to create small collection objects
 */
public class CollectionFactories {
    
    public List<String> makeFriends(){
        // One way to create a small collection of objects, manually
        List<String> friends = new ArrayList<>();
        friends.add("Ellen");
        friends.add("Daedalus");
        friends.add("Olivia");
        
        return friends;
    }

    public static void main(String[] args){

    }
}
