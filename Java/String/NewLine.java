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
 * (1) Reading File as a String
 * (2) Replacing Newlines from a String
 * 
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
            
            return contents; 

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return "";  
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

    /**
     * Explore various ways to replace newlines from a String
     */
    public static String replaceNewLines(String text){
        /* 1. Simply Removes all newline characters */
        // But does not cope with Windows or Mac line terminations
        text = text.replace("\n", "");

        /* 2. Removes all line terminators for the current platform */
        // Does not cope with the case where you are trying to process 
        // (for example) a UNIX file on Windows, or vice versa
        text = text.replace(System.getProperty("line.separator"), "");

        /* 3. Removes all Windows, Unix, or Mac Line Terminators */
        // However if the input file is text, this will concatenate words
        text = text.replaceAll("\\r|\\n", "");

        /* 4. Replaces all Line Terminators with a space  */
        // Notice how the sequence "\r\n" represents a single Windows line terminator 
        // so need to be cautious on not replacing it with two spaces. 
        // Subtle difference from 3, as \r\n will be counted as two spaces
        text = text.replaceAll("\\r\\n|\\r|\\n", " ");
    
        /* 5. Replaces all Line Terminators with a space - Java 8 Way */
        text = text.replaceAll("\\R", " ");

        /* 6. Replaces multiple Line Terminator with One Space */
        text = text.replaceAll("\\R+", " ");

        return text;
    }

    /**
     * Create a paragraph using two lines of text, line2 should appear in a
     * newline after line1
     */
    public static void exploreCRLF(){
        String line1 = "Humpty Dumpty sat on a wall.";
        String line2 = "Humpty Dumpty had a great fall.";
        
        System.out.println("\nLine 1 - \t" + line1 + "\nLine 2 - \t" + line2 + "\n");

        // For a Unix/Linux/New Mac-based OS, we can use "\n"
        String rhyme = line1 + "\n" + line2;
        System.out.println("\t[Unix/Linux/Mac]\n");
        System.out.println(rhyme);

        // For a Windows-based OS, we can use "/r/n"
        rhyme = line1 + "\r\n" + line2;
        System.out.println("\n\t[Windows]\n");
        System.out.println(rhyme);

        // For an old Mac-based OS, we can use "\r"
        rhyme = line1 + "\r" + line2;
        System.out.println("\n\t[Old Mac]\n");
        System.out.println(rhyme);

        System.out.println("\n\t---- Platform Indepedent Line Separator ----");
        // Using a Platform Independent Line Separator
        rhyme = line1 + System.lineSeparator() + line2;
        System.out.println(rhyme);
        // or use
        rhyme = line1 + System.getProperty("line.separator") + line2;
        System.out.println(rhyme);
    }

    enum Flags {
        One, Two, Three, Four, Five, Six
    }

    public static void execute(String text, EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
            System.out.println(text.replace("\n", " "));
        }
        if(flags.contains(Flags.Two)) {
            System.out.println(text.replace(System.getProperty("line.separator"), " "));
        }
        if(flags.contains(Flags.Three)) {
            System.out.println(text.replaceAll("\\r|\\n", " "));
        }
        if(flags.contains(Flags.Four)) {
            System.out.println(text.replaceAll("\\r\\n|\\r|\\n", " "));
        }
        if(flags.contains(Flags.Five)) {
            System.out.println(text.replaceAll("\\R", " "));
        }
        if(flags.contains(Flags.Six)) {
            System.out.println(text.replaceAll("\\R+", " "));
        }
    }

    public static void main(String[] args) {
        String text = "Goodbye Cruel\r\nWorld";
        EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        execute(text, allOptions);

        exploreCRLF();
    }
}