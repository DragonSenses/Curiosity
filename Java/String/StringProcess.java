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
    }
}
