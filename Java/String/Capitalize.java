package Java.String;

import static java.util.stream.Collectors.toList;

import java.util.Arrays;
import java.util.List;

/**
 * Goal: Process a String so that the first character of each word
 * is Capitalized.
 * 
 * Goal: Process through a String, delimit each word by spaces or special char,
 * and lowercase certain words except if its the first, such as "the" or "and"
 * ================================= Summary =================================
 * (1) Process a String so that the first character of each word is Capitalized
 * (2) 
 */
public class Capitalize {

    /**
     * Filters the String by lowercasing certain words. 
     */
    public static void lowercaseCertainWords(){
        List<String> words = Arrays.asList("Demon Prince Goes To Academy");   // List of words
        List<String> result; // the result we want
        result = words.stream() 
                      .map(word -> word.split(" ")) // extract words split by spaces
                      .flatMap(Arrays::stream) // Flattens each generated stream into a single stream
                      .distinct() 
                      .collect(toList());

        System.out.println(result);
    }

    /**
     * Controls which special characters will be used to check against when
     * Capitalizing a letter. 
     * 
     * For example, my@email -> My@email since "@" is not a special character
     * we would like to check for. 
     * 
     * Special Characters List: Whitespace, ".", "\"
     * @param c character to check
     * @return True if it is a special character we would like to capitalize after, 
     * false otherwise
     */
    private static boolean isSpecialCharacter(char c){
        // Can add other chars here
        // else if (Character.isWhitespace(chars[i]) || chars[i] == '.' || chars[i] == '\'') 

        if(Character.isWhitespace(c)) { return true; }
        
        switch(c){
            case '.': return true;

            case '\'': return true;

            default: 
                return false;
        }
    }

    /**
     * Converts all the letters into upper/lowercase depending on their
     * position near a space or other special characters
     * 
     * @param s String to process
     * @return String with first character of every word capitalized
     */
    public static String capitalizeString(String s) {
        char[] chars = s.toLowerCase().toCharArray();
        boolean previousCharIsLetter = false;
        for (int i = 0; i < chars.length; i++) {
            if (!previousCharIsLetter && Character.isLetter(chars[i])) {
                chars[i] = Character.toUpperCase(chars[i]);
                previousCharIsLetter = true;
            } else if (isSpecialCharacter(chars[i])) { 
                previousCharIsLetter = false;
            }
        }
        return String.valueOf(chars);
    }

    public static void main(String[] args) {
        String s = "demon prince goes to academy";
        System.out.println(capitalizeString(s));
        System.out.println(capitalizeString("harriet de saint'owan"));
        System.out.println(capitalizeString("old mc.donald"));
        System.out.println(capitalizeString("my@email"));

        lowercaseCertainWords();
    }
}