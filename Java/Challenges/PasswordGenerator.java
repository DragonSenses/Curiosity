package Java.Challenges;

// Cryptographically secure random number generator
import java.security.SecureRandom;
import java.util.EnumSet;
import java.util.stream.Collectors;

/**
 * Generates a password with a given length. 
 * Customizable Options for the user:
 * - lowercase
 * - uppercase
 * - numbers
 * - punctuation/symbols
 */
public class PasswordGenerator {
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

    /**
     * Generate a String from a random Stream that contains characters
     * from the ASCII range of 33 to 122 - ['!','z']. 
     * @param n length of the String to generate
     * @return random String of length n with ASCII range that contains
     * special symbols, digits, upper and lowercases.
     */
    public String generateStream(int n){
        return new SecureRandom().ints(10, '!', '{')
                                 .mapToObj(i -> String.valueOf((char)i))
                                 .collect(Collectors.joining());
    }

    /**
     * Generate a StringBuilder from a random Stream that contains characters
     * from the ASCII range of 33 to 122 - ['!','z']. 
     * @param n length of the StringBuilder to generate
     * @return random StringBuilder of length n with ASCII range that contains
     * special symbols, digits, upper and lowercases.
     */
    public StringBuilder generateStreamSB(int n){
        return new SecureRandom().ints(10, '!', '{')
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, 
                    StringBuilder::append);
        
    }


    
        
    
    

    public static void main(String[] args) {
        EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.Two);
        execute(currentOpt);
    }
}
