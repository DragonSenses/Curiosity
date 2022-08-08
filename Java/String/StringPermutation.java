package Java.String;

import java.util.Arrays;

/**
 * Problem Statement: A string contain N characters can be have any
 * of the characters lowercase or uppercase. For a four letter word,
 * find every possible permutation (lower/uppercase) of that word. 
 * A permutation does not change the order the characters were in,
 * but rather whether each character is capitalized or not. 
 * 
 * Example: ping can be written 16 different ways as pinG, PinG, or PIng, etc.
 * 
 * - Diffuse Mode Thinking helped me arrived to the answer here
 * 
 * Solution: Abstractify the problem, where each place (each character at a 
 * certain index) can either be lowercase or uppercase. This can be represented
 * through bit manipulation. We can find all possible ways to represent the 
 * passed in string (position of each character must stay in place only lowercase
 * or uppercase should be the changing variable) as the length of the string 
 * squared (since each position can have two possible states: upper/lowercase). 
 * We can use each iteration integer in bit form to represent a possible state of
 * the string. 
 * 
 * Run Time
 * Worst Case O(n^3) - Algorithm uses two for loops. The first iterates based on the 
 * the length of the string squared, to account for every possibility that the passed
 * in String can be in. The inner for loop iterates based on the length of the string.
 * Therefore if the length of the string is n, then the outer for loop would run n^2 
 * times while nested for loop would run n times, resulting in n^2 * n = n^3. 
 * 
 * Notes: (Hastily named this file StringPermutation to best describe it, so needed a recap:)
 * Permutations: Order of the elements does matter    
 * Combinations: Order of the elements does not matter
 * 
 * Permutation/Combinations of the set of digits {1, 2, 3}
 * 
 * Permutations = {123, 132, 213, 231, 312, 321} // 3! = 3*2*1 = 6 possible permutations
 * Combinations = {123} // Order does not matter
 * 
 * Permutations = n!/(n-k)! 
 * Combinations = n!/k!(n-k)!
 * 
 * n - number of things to choose from
 * k - we choose k of them
 * 
 * 2 Types of Permutations: 
 *  1) Repetition is allowed (n x n x n) (where a number can be repeated)
 *  2) No Repetition (ex. 3 runners in a race, cannot be both first and second so 3 x 2 x 1) 
 */
public class StringPermutation {

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

        // 1. Convert to char array
        char[] arr = word.toCharArray();

        // 2. Iterate how many possibilities of the String can happen to have 
        for(int i = 0; i < possibilities; i++){
            // 3. Convert the iteration count to its bit representation
            String possibility = Integer.toBinaryString(i);
            for(int k = 0; k < arr.length; k++){

            }
        }
        words[i] = String.valueOf(arr);
        permute(arr,words,possibilities);
        System.out.println("Number of possible permutations:\t" + possibilities);
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
        printPermutations("ping");
    }
}
