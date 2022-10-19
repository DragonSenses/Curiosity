package Java.Java8.Streams;

import java.util.Arrays;

/**
 * Alphabetizes, or sorts, a String. Experiments ways to do so and how it 
 * is affected by Java's lack of support for primitive char streams.  
 */
public class Alphabetize {
    
    /**
     * Alphabetizes a given String and returns it. A private utility method or 
     * helped method that increases readability, especially in stream pipelines
     * @param s String to alphabetize
     * @return the String sorted in alphabetical order
     */
    private static String alphabetize(String s){
        char[] a = s.toCharArray();
        Arrays.sort(a);
        return new String(a);
    }

    public static void main(String[] args) {
        String s = "Listen"; // Anagram of Silent
        System.out.println();
    }
}
