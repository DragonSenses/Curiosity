package Java.Challenges;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

// import data structures
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Stream;

/**
 * Class that prints all the anagram groups whose size meets a user-specified
 * minimum. Two words are anagrams if they consist of the same letters in a 
 * different order. 
 * 
 * Program reads words from a file and places the words into a Map. 
 * The Map key is the word with its letters alphabetized. 
 * Example: key for "staple" is "aelpst" and key for "petals" is also "aelpst",
 * the two words are anagrams, and all anagrams share the same alphabetized
 * form (aka alphagram). 
 */
public class Anagrams {
    /**
     * Alphabetizes a given String and returns it. 
     * @param s String to alphabetize
     * @return the String sorted in alphabetical order
     */
    private static String alphabetize(String s){
        char[] a = s.toCharArray();
        Arrays.sort(a);
        return new String(a);
    }

    /**
     * Iterates through the map's values and prints each lsit whose size meets
     * the user specified threshold
     * @param groups the Map that contains the Set of Strings of Anagrams
     * @param threshold the specified threshold for anagram groups 
     */
    private static void print(Map<String, Set<String>> groups, int threshold){
        for(Set<String> group: groups.values()){
            if(group.size() >= threshold){
                System.out.println(group.size() + ": " + group);
            }
        }
    }

    /**
     * Creates Anagrams from a source and prints them, a Java 8 way that
     * uses streams to be more efficient. Essentially the same algorithm.  
     * @param args
     * @throws IOException
     */
    private static void streamAnagrams(String[] args) throws IOException{
        // attempt here TO DO
        Path dictionary = Paths.get(args[0]);
        int minGroupSize = Integer.parseInt(args[1]);

        try (Stream<String> words = Files.lines(dictionary)) {
            
        }
        
    }

    // Prints all large anagram groups in a dictionary iteratively
    public static void main(String[] args) throws IOException {
        // Gather Strings from the source, and extract the minimum group size
        File dictionary = new File(args[0]);            // source 
        int minGroupSize = Integer.parseInt(args[1]);

        // Store anagrams in data structure, in this case a Map
        // Key are the String words, Value is the Set of anagrams formed 
        // since each combination is unique
        Map<String, Set<String>> groups = new HashMap<>(); 

        /**
         * computeIfAbsent looks up a key in Map, if present, the method 
         * returns the value associated with it. If not, the method computes, 
         * the value by applying the given function object to the key, 
         * associates this value with the key, and returns the computed value
         */
        try(Scanner s = new Scanner(dictionary)) {
            while(s.hasNext()){
                String word = s.next();
                groups.computeIfAbsent(alphabetize(word),
                    (unused) -> new TreeSet<>()).add(word);
            }
        }

        print(groups, minGroupSize); 

        System.out.println("--- Angrams using Streams --- ");
        streamAnagrams(args);
    } // end of Main

} // end of Class