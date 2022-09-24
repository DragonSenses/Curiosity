package Java.Java8.Collections;

import java.util.Map;

/**
 * Java 8 introduced several default methods supported by the Map interface. 
 * The purpose of these new operations is to help you write more concise code
 * by using a readily available idiomatic pattern instead of implementing it 
 * yourself. 
 * 
 * ================================= Methods =================================
 * -forEach - Map interface supports forEach() method which accepts a 
 * BiConsumer, taking the key and value as arguments
 * 
 * Sorting
 * -replaceAll() - replaces elements using a (UnaryOperator) function. 
 * Available on List.
 * 
 * -sort() - sorts the list itself, available on list. 
 */
public class WorkingWithMap {
    
    /**
     * Map factory method: Map.of() creates a small map of up to 10 keys and values
     * 
     * @return an immutable Map out of a list of up to 10 elements
     */
    public static Map<String, Integer> build(){
        return Map.of("Ami", 18, "Ouka", 19, "Akane", 19,
             "Riho", 21, "Shiragiku", 21);
    }

    /**
     * Iterating over the keys and values of a Map, using the forEach method
     * makes the code more concise rather than iterating over entrySet.
     */
    public static void forEach(){
        Map<String, Integer> familyMap = build();

        familyMap.forEach((friend, age) -> System.out.println(friend + " is " +
            age + " years old"));
    }

    public static void main(String[] args){
        System.out.println("======= Working with Maps =======");
        forEach();
    }
}
