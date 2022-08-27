package Java.Java8.Streams;

import java.util.Arrays;
import java.util.stream.Stream;

/**
 * Demonstrate ways to Build Streams
 * 
 * ================================= Methods ================================= 
 * - Stream.of() - static method that takes any number of parameters and creates
 * a stream with explicit values
 * 
 * - Stream.empty() - returns an empty sequential Stream
 * 
 * - Stream.ofNullable() - create a stream form a nullable object; where extraction 
 * of an object that may be null and then needs to be converted into a stream; 
 * 
 * - Arrays.stream() - static method that takes array as parameter
 * 
 * - Files.lines - from java.nio.file.Files static method the returns a stream
 * lines as strings (each element is a line) from a given file
 * 
 * - Stream.iterate()
 * - Stream.generate()
 */
public class BuildingStreams {

    public static void HowToUseOfNullable(){
        // System.getProperty() returns null if there is no property with the 
        // given key ; so must check if value is null

        // Explicit Check
        String homeValue = System.getProperty("home");
        Stream<String> homeValueStream  
            = (homeValue == null) ? Stream.empty() : Stream.of(homeValue);

        homeValueStream.forEach(System.out::println); 

         // Java 9 way
         homeValueStream = Stream.ofNullable(System.getProperty("home"));
    }

    public static void main(String[] args) {
        System.out.println("======== Streams from Arrays ========");
        int[] numbers = { 2, 3, 5, 7, 11, 13 };
        System.out.println(Arrays.toString(numbers) +  "\nsum = " + Arrays.stream(numbers).sum());

        System.out.println("\n======== Streams from Values ========");

        Stream<String> stream = Stream.of("Give", "Me", "Liberty", "Or Give me Death!");
        stream.map(String::toUpperCase).forEach(System.out::println);

        System.out.println("\n======== Streams from Files ========");

        System.out.println("\n======== Empty Stream ========");
        // Empty Stream
        Stream<String> emptyStream = Stream.empty();

        // Displaying elements in Stream
        emptyStream.forEach(System.out::println);    // No Output

        System.out.println("\n======== Stream.ofNullable() ========");
        HowToUseOfNullable();



        

    }
}
