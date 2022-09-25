package Java.Java8.Collections;

import java.util.Map;
import java.util.Map.Entry;

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
 * -Entry.comparingByValue() - sorts the entire map by Values
 * -Entry.comparingByKey() - sorts the entire map by Keys
 * 
 * -getOrDefault() - takes the key to look up as the first argument and a
 * default value  (to be used when the key is absent from the Map) as the
 * second argument
 * 
 * Compute Patterns
 * -computeIfAbsent() - If there’s no specified value for the given key 
 * (it’s absent or its value is null), calculate a new value by using the key
 * and add it to the Map.
 * 
 * -computeIfPresent() - If the specified key is present, calculate a new 
 * value for it and add it to the Map.
 * 
 * -compute() - This operation calculates a new value for a given key and
 * stores it in the Map.
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

    // Sorting Map by Entries
    // Entry.comparingByKey() sorts the Map by its Keys
    public static void sortByKey(Map<String, Integer> familyMap){
        familyMap.entrySet().stream().sorted(Entry.comparingByKey())
                 .forEachOrdered(System.out::println);
    }

    // Entry comparingByValue() sorts the Map by its Values
    public static void sortByValue(Map<String, Integer> familyMap){
        familyMap.entrySet().stream().sorted(Entry.comparingByValue())
                 .forEachOrdered(System.out::println);
    }

    /**
     * getOrDefault() method is used when the key you're looking up isn't 
     * present you get a default value instead of a null reference, the
     * first argument is the key to get and the second argument is the default
     * value used when the key is absent from the Map.
     * 
     * Note: if key existed in the Map but was accidentally associated with a 
     * null value, getOrDefault() can still return null. The expression you 
     * pass as a fallback is always evaluated, whether the key exists or not. 
     */
    public static void getOrDefault(){
        Map<String, Integer> familyMap = build();
        System.out.println("Looking up Riho's age within the Map ....");
        System.out.println(familyMap.getOrDefault("Riho", 0));
        System.out.println("Looking up Hayato's age within the Map ....");
        System.out.println(familyMap.getOrDefault("Hayato", 0));
    }

    /**
     * Compute Patterns - when you want to perform an operation conditionally
     * and store its result depending on whether a key is present or absent in
     * a Map. You may want to cace the result of an expensive operation given a
     * key. If the key is present, there's no need to recalculate the result. 
     * 
     * One use of computeIfAbsent() is caching information. Suppose that you 
     * parse each line of a set of files and calculate their SHA-256 
     * representation. If you processed the data previously, there's no need
     * to recalculate it. 
     * 
     * Suppose you implement a cache by using a Map, and you use an instance
     * of MessageDigest to calculate SHA-256 hases. 
     */

    public static void main(String[] args){
        System.out.println("Map:\n----");
        Map<String, Integer> familyMap = build();
        familyMap.forEach((member,age) -> System.out.println(member + ", " + age));

        System.out.println("======= Working with Maps =======");
        forEach();

        System.out.println("------- Sorting Entries by Key: [Name] ------- ");
        sortByKey(familyMap);
        System.out.println("------- Sorting Entries by Value: [Age] ------- ");
        sortByValue(familyMap);

        System.out.println("------- Looking up a Key within the Map ------- ");
        getOrDefault();
    }
}
