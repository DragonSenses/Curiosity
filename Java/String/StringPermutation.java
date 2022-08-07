package Java.String;

import java.util.Arrays;

/**
 * With permutations we care about the order of the elements, 
 * whereas with combinations we don’t.
 * 
 * Permutations = n!/(n-k)! 
 * Combinations = n!/k!(n-k)!
 * 
 * Problem Statement: A string contain N characters can be have any
 * of the characters lowercase or uppercase. For a four letter word,
 * find every possible permutation (lower/uppercase) of that word. 
 * A permutation does not change the order the characters were in,
 * but rather whether each character is capitalized or not. 
 * 
 * Example: sky can be written 9 different ways as sky, SKY, SKy, Sky ...
 */
public class StringPermutation {
    
    // Recursive Function starting at index 0 we take input string
    public static void combinations(String input, StringBuilder output) { 
        combinations(input,0, output); 
    }

    /** Work-In-Progress - prints out too many combinations
     * Finds every possible combination of the passed in String s
     * @param s - String to find combinations from
     * @param k - Starting index to begin with
     */
    public static void combinations(String input, int k, StringBuilder output){
        // 1. Iterate through input string
        for (int i = k; i < input.length(); i++){
            // 2. Append letter to output string
            output.append(input.charAt(i));
            System.out.println(output);
            if (i < input.length()) { // current letter isn't last letter
                combinations(input, k+1, output);   // recur
                output.setLength(output.length()-1); // limit the output length 
            }
        } // Find remaining combinations starting with next position of iteration
    }

    /**
     * Finds every possible case where each character can
     * be capitalized or lowercase, and prints out every 
     * possible combination.
     * @param word The word to find all permutations of
     */
    public static void printPermutations(String word){
        // Create a array of Strings that contain all the possibilities
        int possibilities = word.length() * word.length(); // n^2 possible permutations
        String[] words = new String[possibilities];
        int permutations = 0; // Keeps track of how many permutations
        // 1. Convert to char array
        char[] arr = word.toCharArray();

        // 2. Start with all lower case
        // words[0] = word.toLowerCase();
        // 3. Then all uppercase
        // words[1] = word.toUpperCase();
        permutations += 2;

        // 4. Iterate through the number of possible combinations
        // for(int i = 0; i < arr.length; i++){
        //     arr[i] = Character.toUpperCase(arr[i]);
        //     for(int k = 0; k < arr.length; k++){
        //         if( k != i) {
        //             arr[k] = Character.toLowerCase(arr[k]);
        //         }
        //         words[i] = String.valueOf(arr);
        //     }
        // }
        permute(arr,words,possibilities);
        System.out.println("Number of possible permutations:\t" + permutations);
        // Finally print out all permutations within String array words
        System.out.println(Arrays.toString(words));
    }

    public static void permute(char[] word, String[] words, int n){
        for(int i=0; i < n; i++){
            word[i] = Character.toUpperCase(word[i]);
            for(int k = 0; k < word.length; k++){
                if( k != i) {
                    word[k] = Character.toLowerCase(word[k]);
                }
                words[i] = String.valueOf(word);
            }
        }
    }

    public static void main(String[] args){
        // StringBuilder sb = new StringBuilder();
        printPermutations("ping");
    }
}
