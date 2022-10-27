package Java.String;

import java.util.EnumSet;

/**
 * This class explores line breaks & newlines of Strings. 
 * 
 * Original Problem was replacing all line breaks in a String that is not 
 * OS-specific. Operating Systems have special characters denoting the start
 * of a new line. 
 * 
 * Newlines in each OS are denoted as:
 * Linux/Mac    -   "\n" called Line Feed
 * Windows      -   "\r\n" called Carriage Return and Line Feed (CRLF)
 * 
 * To get the newline String for any environment, use
 * System.getProperty("line.separator");
 * 
 * [Goal] Remove Line Breaks from a incoming file of text (String).
 * 
 * ================================= Summary =================================
 * (1) 
 * (2) 
 * (3) 
 * (4) 
 * ================================= Methods ==================================
 * - 
 */
public class NewLine {

    public static String readFileAsString(String filename) throws IOException {
        try {
            // read file into string
            String contents = Files.readString(Path.of("input.txt"));
        
            // print string
            System.out.println(contents);
        
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static String replaceNewlines(String filename){
        String text = readFileAsString(filename);

    }


    enum Flags {
        One, Two, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
            System.out.println("One");
        }
        if(flags.contains(Flags.Two)) {
            System.out.println("Two");
        }
        if(flags.contains(Flags.Three)) {
            System.out.println("Three");
        }
        if(flags.contains(Flags.Four)) {
            System.out.println("Four");
        }
    }

    public static void main(String[] args) {
        EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.Two);
        execute(currentOpt);
    }
}