package Java.String;

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
 * 2. indexOf(int str, int fromIndex) - first occurrence of substring, 0 if empty string,
 *  or -1 if no such occurence. 
 *    Application: Iterate over all the lines of a page or text or code, invoke indexOf()
 *  with target string, and multtiple occures of target string in same line, start from
 *  where last found substring ends.
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
    }
}
