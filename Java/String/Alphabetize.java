package Java.String;

import java.util.Arrays;

/**
 * Alphabetizes, or sorts, a String. Experiments ways to do so and how it 
 * is affected by Java's lack of support for primitive char streams. 
 * 
 * We showcase how alphabetize a String should not be reimplemented to use
 * streams as it would have been less clear, more difficult to write correctly,
 * and probably slower. 
 */
public class Alphabetize {
    
    /**
     * Alphabetizes a given String and returns it. A private utility method or 
     * helped method that increases readability, especially in stream pipelines
     * @param s String to alphabetize
     * @return the String sorted in alphabetical order
     */
    private static String alphabetize(String s){
        char[] a = s.toLowerCase().toCharArray();
        Arrays.sort(a);
        return new String(a);
    }

    /* Alphabetize a String through Streams  */
    private static String alphabetizeStream(String s){
        return s.toLowerCase().chars().sorted()
                .collect(StringBuilder::new, (sb,c) -> sb.append(c),
                         StringBuilder::append).toString();
    }

    /**
     * Demonstrates the hazards of processing char values with streams.
     * 
     * Expected to print Hellow world! but instead prints 721011081081113211911111410810033
     * This happens because the elements of the stream returned by "Hello world!".chars()
     * are not char values but int values, so the int overloading of print is invoked. 
     * Confusing that a method named chars returns a stream of int values. 
     */
    private static void example(){
        "Hello world!".chars().forEach(System.out::print);
    }

    /**
     * Fixes the example above of processing char values with Streams. 
     * The program usies a cast to force the invocation of the correct overloading.
     * Ideally, you should refrain from using streams to process chhar values. 
     */
    private static void example2(){
        "Hello world!".chars().forEach(x -> System.out.print((char) x));
    }

    public static void main(String[] args) {
        String s1 = "Listen";
        String s2 = "Silent";
        System.out.println("------- Alphabetize: Traditional -------");
        System.out.printf("%s -> %s\n", s1, alphabetize(s1));
        System.out.printf("%s -> %s\n", s2, alphabetize(s2));

        System.out.println("\n------- Alphabetize: Streams -------");
        System.out.printf("%s -> %s\n", s1, alphabetizeStream(s1));
        System.out.printf("%s -> %s\n", s2, alphabetizeStream(s2));

        System.out.println("\n------- Processing Char Values with Streams -------");
        example();
        System.out.println();
        example2();
        System.out.println();
    }
}
