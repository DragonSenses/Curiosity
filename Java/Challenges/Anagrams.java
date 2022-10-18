package Java.Challenges;

import java.io.IOException;

// import data structures
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Class that prints all the anagram groups whose size meets a user-specified
 * minimum. Two words are anagrams if they consist of the same letters in a 
 * different order. 
 */
public class Anagrams {
    // pseudo code 
    // use data structure to store anagrams --> Map
    // read from collection of strings
    // make anagrams 
    private static String getAnagram(String s){

    }

    // Later will update to read words from a file 
    public static void main(String[] args) throws IOException {
        // Create string words from the source
        String[] source = new String[12]; 

        // Store anagrams in data structure, in this case a Map
        // Key are the String words, Value is the Set of anagrams formed 
        // since each combination is unique
        Map<String, Set<String>> groups = new HashMap(); 
    }
}