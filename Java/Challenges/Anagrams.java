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

import static java.util.stream.Collectors.groupingBy;

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
 * 
 * We have two streamAnagram() methods that showcase how overusing streams makes
 * programs hard to read and maintain. There is a golden mean in using streams
 * that solves and reads closer to the problem statement. In the good way, a 
 * helper method iseven more important for readability in stream pipelines than
 * in iterative code because pipelines lack explicit type information and 
 * named temporary variables. 
 * 
 * In the absence of explicity types, careful naming of lambda parameters is 
 * essential to the readability of stream pipelines. 
 */
public class Anagrams {

    /**
     * Alphabetizes a given String and returns it. A private utility method or 
     * helped method that increases readability, especially in stream pipelines
     * @param s String to alphabetize
     * @return the String sorted in alphabetical order, case-insensitive
     */
    private static String alphabetize(String s){
        char[] a = s.toLowerCase().toCharArray();   
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
     * uses streams to be more efficient.
     *
     * Here instead of using Streams to sort a word, we use the private utilty
     * method alphabetize instead to increase readability
     * 
     * --------------------------- Algorithm ---------------------------------
     * 1) Opens the dictionary file in a try-with-resources block, obtaining a
     * stream consisting of all lines in the file. Stream variable is named
     * words to suggest that each element in the stream is a word.
     * 2) The pipeline on this stream has no intermediate operations; its
     * terminal operation collects all the words into a map that groups the
     * words by their alphabetized form
     * 3) Then a new Stream<List<String>> is opened on the values() view of the
     * map. The elements in this stream are the anagram groups.
     * 4) Stream is filtered so that all groups whose size is less than 
     * minGroupSize are ignored
     * 5) Finally the remaining groups are printed by the terminal operation forEach
     * 
     * @param args - user arguments to run the program
     * @throws IOException 
     */
    private static void streamAnagrams(String[] args) throws IOException{
        Path dictionary = Paths.get(args[0]);
        int minGroupSize = Integer.parseInt(args[1]);

        /* Tasteful use of Streams enhances clarity and conciseness */
        try (Stream<String> words = Files.lines(dictionary)) {
            words.collect(groupingBy(word -> alphabetize(word)))   
                 .values().stream()                                  
                 .filter(group -> group.size() >= minGroupSize) 
                 .forEach(g -> System.out.println(g.size() + ": " + g));
        }
    }

    /** Although behaves the same way as above, overuses Streams making it hard
     * to read and maintain
     */
    private static void streamAnagramsBad(String[] args) throws IOException {
        Path dictionary = Paths.get(args[0]);
        int minGroupSize = Integer.parseInt(args[1]);
        
        /* Overuse of Streams */
        try (Stream<String> words = Files.lines(dictionary)) {
            words.collect(          // Reduce Stream of words 
                // Create a Map, with alphabetize Strings as keys
                groupingBy(word -> word.chars().sorted() // Sort alphabetical
                    .collect(StringBuilder::new, (sb,c) -> sb.append(c), // Creates a StringBuilder
                    StringBuilder::append).toString()))
                .values().stream()                                  
                    .filter(group -> group.size() >= minGroupSize) // Filter values by threshold
                    .map(group -> group.size() + ": " + group)
                    .forEach(System.out::println);
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
        streamAnagramsBad(args);
        streamAnagrams(args);
    } // end of Main

} // end of Class