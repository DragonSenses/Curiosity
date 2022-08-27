package Java.Java8.Streams;

import java.util.stream.Stream;

/**
 * Demonstrate ways to Build Streams
 * 
 * ================================= Methods ================================= 
 * - Stream.of() - static method that takes any number of parameters and creates
 * a stream with explicit values
 * 
 * - Stream.empty()
 * - Stream.ofNullable()
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

        System.out.println("\n======== Filtering Unique Elements ========");
    }
}
