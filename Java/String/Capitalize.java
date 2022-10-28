package Java.String;

/**
 * Goal: Process a String so that the first character of each word
 * is Capitalized.
 */
public class Capitalize {

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
            } else if (Character.isWhitespace(chars[i]) || chars[i] == '.' || chars[i] == '\'') { // Can add other
                                                                                                  // chars here
                previousCharIsLetter = false;
            }
        }
        return String.valueOf(chars);
    }

    public static void main(String[] args) {
        String s = "demon prince goes to academy";

    }
}