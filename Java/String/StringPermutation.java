package Java.String;

/**
 * Problem Statement: A string contain N characters can be have any
 * of the characters lowercase or uppercase. For a four letter word,
 * find every possible permutation (lower/uppercase) of that word. 
 * A permutation does not change the order the characters were in,
 * but rather whether each character is capitalized or not. 
 * 
 * Example: ping can be written as Ping or pinG. There are 16 
 * possible ways to permute the word.
 */
public class StringPermutation {
    
    /**
     * Finds every possible case where each character can
     * be capitalized or lowercase, and prints out every 
     * possible combination.
     * @param word The word to find all permutations of
     */
    public void printPermutations(String word){
        int permutations = 0;
        // 1. Convert to char array
        char[] arr = word.toCharArray();
        
        // Create a array of Strings that contain all the possibilities
        int possibilities = arr.length * arr.length; // n^2 possible permutations
        String[] words = new String[possibilities];
        // 2. Start with all lower case
        words[0] = word.toLowerCase();
        // 3. Then all uppercase
        words[1] = word.toLowerCase();
        // 4. Then first char uppercase
        

    }

    public static void main(String[] args){

    }
}
