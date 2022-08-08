package Java.String;

import java.util.function.Consumer;

/**
 * Collection of tips and tricks regarding String processing.
 * 
 * Useful Methods and Applications:
 * 
 * 1. toCharArray() - Reference to charArray is return with String contents as characters,
 *    Application: String objects are immutable, in order to do String processing and avoid
 *  heavy memory usage when dealing with string manipulation operations, is to convert it 
 *  to charArray first, then perform manipulation operations and then convert it back to a
 *  String object
 * 
 * To convert char array back to String, can use String.valueOf(ch), new String(ch)
 * 
 * 2. indexOf(int str, int fromIndex) - returns first occurrence of substring, 
 *                                      0 if empty string, or -1 if no such occurence. 
 *    Application: Iterate over all the lines of a page or text or code, invoke indexOf()
 *  with target string, and multtiple occures of target string in same line, start from
 *  where last found substring ends.
 * 
 * 3. charAt(int index) - returns char value from String at index
 *   Application: Can iterate through the string and count frequency of a character. Or 
 *  use to extract the character values 
 * 
 * 4. replace()
 * 5. concat() 
 * 6. substring()
 * 7. split()
 * 8. compareTo()
 * 9. strip()
 * 10. valueOf()
 * 11. equals()
 * 12. toLowerCase()/toUpperCase()
 * 13. startsWith()/ endsWith()
 * 14. contains()
 * 15. reapat, indent, join
 * 
 */
public class StringProcess {

    
    public static void rename(String s, String toReplace){
        if(s.contains(toReplace)){
            s.replace(toReplace, "");
        }
    }

    public static void lowercase(String s) {
        s.toLowerCase();
    }

    public static void uppercase(String s) {
        s.toUpperCase();
    }

    /**
     * Bitwise operation that toggles the target character from
     * lowercase to uppercase, or uppercase to lowercase.
     * @param c target character to toggle case
     * @return the character in the opposite case
     */
    private static char toggleCase(char c) {
        if((c >= 65) && (c <= 90)) {
            return c ^= 32; 
        } else if( (c >= 97) && (c <= 122)) {
            return c ^= 32; 
        } else {
            return c;
        }
    }// Need to limit the incoming character to be used only with the alphabet 
    // ASCII: 65-90, 97-122

    /**
     * Make a string more irritating by capitalizing every 
     * other character. Best used with cliches. 
     * @param s target string to goad
     * @return the target String with every other character capitalized
     */
    public static String exasperate(String s){
        char[] word = s.toLowerCase().toCharArray();
        for(int i = 0; i < word.length; i++){
            if((i & 1) == 0) { 
                word[i] = toggleCase(word[i]); // Character.toUpperCase() has the right behavior
            }
        }
        return String.valueOf(word);
    }

    /**
     * Private utility function that pads the passed in binary number, to
     * a specified length. 
     * 
     * Special Cases: 1) Negative Numbers 2) When binaryString exceeds the length 
     * 
     * @param n The number to convert to binary and pad to the left
     * @param length the length of the binary string to pad to
     * @return The padded binary number to a specified length
     */
    public static String paddedBinaryString(int n, int length){
        return Integer.toBinaryString ((1 << length) | n).substring(1);
    }

    /**
     * Covers the special cases for the method above. For now if the incoming parameter
     * length is too small it will return the BinaryString of the value, without padding
     *  - Could also just return value or throw an exception (since it could be user error)
     * 
     * @param val the number to pad to the left as a binary string
     * @param len the specified length to pad to
     * @return the value as a binary number padded to the specified length
     */
    public static String padBinaryString(int val, int len) {
        // For now specified behavior is to just return the value
        int valLength = Integer.toBinaryString(val).length();
        if(valLength > len) { return Integer.toBinaryString(val); } 

        // Covers the case when binary digit is negative
        return Integer.toBinaryString((1<<len) | 
            ((val) & ((1<<len) -1)) ).substring(1);
    }

    // Another way to pad Binary String to the left with 0's
    public static String padLeftBinaryString(int n, int len){
        return String.format("%" + len + "s", Integer.toBinaryString(n))
            .replace(' ', '0');
    }

    /**
     * Extracts and Prints out every word split by space within a
     * String s
     * @param s the String to extract from
     * @return string array containing every word split by space within s
     */
    public String[] extractWordsSplitBySpace(String s){
        String[] result = s.split(" ");
        for(int i = 0; i!=s.length(); i++) {
            System.out.println(result[i]);
        }
        return result;
    }

    public static void main(String[] args){
        String s = "Overlord";
        rename(s,"Over");
        System.out.println(s);
        System.out.println(s.replace("Over",""));
        System.out.println(s);

        String st = "       Overlord        ";
        System.out.println(st);
        System.out.println(st.trim());

        System.out.println("\nConsuming\n");
        Consumer<String> printThreeTimes = value -> {
            System.out.println(value);
            System.out.println(value);
            System.out.println(value);
        };

        printThreeTimes.accept("Overlord");

        System.out.println("\n" + exasperate("To be honest"));
    }
}
