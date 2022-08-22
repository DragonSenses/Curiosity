package Java.Java8.Streams;

import static java.util.stream.Collectors.toList;   // for collect(toList())

import java.util.Arrays;
import java.util.List;

/**
 * Demonstrate ways to Map a stream. 
 * Mapping is selecting information from certain objects.
 * Mapping is similar to "transforming" with the nuance of creating a new
 * version of rather than modifying.  
 * 
 * Methods: map(), flatMap()
 */
public class MappingStreams {
    public static final List<Dish> menu = Arrays.asList(
        new Dish("pork", false, 800, Dish.Type.MEAT),
        new Dish("beef", false, 700, Dish.Type.MEAT),
        new Dish("chicken", false, 400, Dish.Type.MEAT),
        new Dish("french fries", true, 530, Dish.Type.OTHER),
        new Dish("rice", true, 350, Dish.Type.OTHER),
        new Dish("season fruit", true, 120, Dish.Type.OTHER),
        new Dish("pizza", true, 550, Dish.Type.OTHER),
        new Dish("prawns", false, 400, Dish.Type.FISH),
        new Dish("salmon", false, 450, Dish.Type.FISH)
    );
    
    public static void main(String[] args){
        System.out.println("======== Mapping by Name ========");
        // Note map() has return type of Stream<string>
        List<String> dishNames = menu.stream()
            .map(Dish::getName)
            .collect(toList());
        System.out.println(dishNames);

        System.out.println("======== Chaining Map methods ========");
        System.out.println("Length of each dishes names are: ");
        List<Integer> dishNamesLengths = menu.stream()
            .map(Dish::getName)     // return type Stream<String>
            .map(String::length)    // return type Stream<Integer>
            .collect(toList());     // Turn Stream elements into List<Integer>
        System.out.println(dishNamesLengths);

        System.out.println("======== Problem: Return a list of unique characters for a list of words ========");
        List<String> words = Arrays.asList("Hello", "World");   // List of words
        List<String> uniqueCharacters; // the result we want
        // Attempt 1:
        // Problem: Type Mismatch cannot convert from List<String[]> to List<String>
        // uniqueCharacters = words.stream()
        //                         .map(word -> word.split(""))
        //                         .distinct()
        //                         .collect(toList());

        // Attempt 2: Using Map and Arrays.Stream()
        // Problem: Type Mismatch cannot convert from List<Stream<String>> to List<String>
        // uniqueCharacters = words.stream() 
        //                         .map(word -> word.split("")) // convert each word into array of its individual letters
        //                         .map(Arrays::stream) // Makes each array in a separate stream
        //                         .distinct()
        //                         .collect(toList());

        // Using flatMap(), maps each array not with a stream but with the
        // contents of that stream. Replace each value of a stream with
        // another stream and then concatenates all the generated streams
        // into a single stream 
        uniqueCharacters = words.stream() 
                                .map(word -> word.split("")) // each word into array of individual letters
                                .flatMap(Arrays::stream) // Flattens each generated stream into a single stream
                                .distinct() 
                                .collect(toList());

        System.out.println(uniqueCharacters);
    } // end of Main
} // end of Class
