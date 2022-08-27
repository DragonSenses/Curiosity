package Java.Java8.Streams;

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
 * - Arrays.stream()
 * - Files.lines
 * - Stream.iterate()
 * - Stream.generate()
 */
public class BuildingStreams {
    public static void main(String[] args) {
        System.out.println("\n======== Streams from Values ========");

        Stream<String> stream = Stream.of("Give", "Me", "Liberty", "Or Give me Death!");
        stream.map(String::toUpperCase).forEach(System.out::println);

        System.out.println("\n======== Empty Stream ========");
        // Empty Stream
        Stream<String> emptyStream = Stream.empty();

        // Displaying elements in Stream
        try{
            emptyStream.forEach(System.out::println);    // No Output
        } catch(Exception e){   // IllegalStateException 
            System.err.println("Stream has no Output");
        }

        System.out.println("\n======== Stream.ofNullable() ========");
        // System.getProperty() returns null if there is no property with the 
        // given key 

        String homeValue = System.getProperty("home");

    }
}
