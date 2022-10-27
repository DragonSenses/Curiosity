package Java.String;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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

    /**
     * Take a filename and convert the contents into a String
     * @param filename - name of file
     * @return contents of the file as a String
     * @throws IOException 
     */
    public static String readFileAsString(String filename) throws IOException {
       // Java 11's use of Files.readString()
        try {
            // read file into string
            String contents = Files.readString(Path.of(filename));
        
            // print string
            System.out.println(contents);
        
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    // Java 8 way using Streams to read file as String
    // public static String streamFileAsString(String filename) throws IOException {
    //     try (Stream<String> stream = Files.lines(Paths.get("input.txt"))){

    //         // convert stream into a string
    //         String contents = stream.collect(Collectors.joining(System.lineSeparator()));
        
    //         // print string
    //         System.out.println(contents);
        
    //     } catch (IOException ex) {
    //         ex.printStackTrace();
    //     }
    // }

    /* Quick Solution - To be Reviewed */
    public static String replaceNewlines(String filename) throws IOException {
        String text = readFileAsString(filename);
        return text.replace("\n", "").replace("\r", "");
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