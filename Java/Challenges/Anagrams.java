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
 * 
 * Program reads words from a file and places the words into a Map. 
 * The Map key is the word with its letters alphabetized. 
 * Example: key for "staple" is "aelpst" and key for "petals" is also "aelpst",
 * the two words are anagrams, and all anagrams share the same alphabetized
 * form (aka alphagram). 
 */
public class Anagrams {
    // pseudo code 
    // use data structure to store anagrams --> Map
    // read from collection of strings
    // make anagrams 
    private static String getAnagram(String s){

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

    // Later will update to read words from a file 
    public static void main(String[] args) throws IOException {
        // Create string words from the source
        String[] source = new String[12]; 
        int minGroupSize = 4; 

        // Store anagrams in data structure, in this case a Map
        // Key are the String words, Value is the Set of anagrams formed 
        // since each combination is unique
        Map<String, Set<String>> groups = new HashMap<>(); 

        print(groups, minGroupSize); 
    }
}