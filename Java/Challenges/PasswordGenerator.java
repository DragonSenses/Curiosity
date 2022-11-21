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
 * ================================= Methods ==================================
 * generateStream() - generates a random String between ASCII [33,122]
 * generateStreamSB() - generates a random StringBuilder between ASCII [33,122]
 * Note: The issue with stream methods above is that they may contain illegal
 * symbols such as quotation marks or colons.
 */
public class PasswordGenerator {
    enum Flag {
        LowerCase, UpperCase, Numbers, Symbols;

        public static final EnumSet<Flag> ALL_OPTIONS = EnumSet.allOf(Flag.class);
    }

    public static void execute(EnumSet<Flag> flags){
        if(flags.contains(Flag.LowerCase)) {
            System.out.println("One");
        }
        if(flags.contains(Flag.UpperCase)) {
            System.out.println("Two");
        }
        if(flags.contains(Flag.Numbers)) {
            System.out.println("Three");
        }
        if(flags.contains(Flag.Symbols)) {
            System.out.println("Four");
        }
    }

    /**
     * Ensures that the any length passed in is greater than the minimum 
     * length for a password, which is 7. Otherwise, return length.
     * @param length the length to check if greater than minimum
     * @return 8 if length is less than minimum, otherwise return length
     */
    private static int validateLength(int length){
        return (length < 7) ? 8 : length;
    }

    /**
     * Generate a String from a random Stream that contains characters
     * from the ASCII range of 33 to 122 - ['!','z']. 
     * @param n length of the String to generate
     * @return random String of length n with ASCII range that contains
     * special symbols, digits, upper and lowercases.
     */
    public static String generateStream(int n){
        n = validateLength(n);
        return new SecureRandom().ints(n, '!', '{')
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
    public static StringBuilder generateStreamSB(int n){
        n = validateLength(n);
        return new SecureRandom().ints(n, '!', '{')
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, 
                    StringBuilder::append);
        
    }

    public static String generatePassword(int n) {
        n = validateLength(n); // Minimum length of 8

        //Use cryptographically secure random number generator
        SecureRandom sr = new SecureRandom();

        StringBuilder password = new StringBuilder(n); // Password to build

        final char[] uppercase = "ABCDEFGJKLMNPRSTUVWXYZ".toCharArray();
        final char[] lowercase = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        final char[] numbers = "0123456789".toCharArray();
        final char[] symbols = "^$?!@#%&".toCharArray();
        final char[] allOptions = 
            "abcdefghijklmnopqrstuvwxyzABCDEFGJKLMNPRSTUVWXYZ0123456789^$?!@#%&".toCharArray();
    
        for (int i = 0; i < n-4; i++) { // Save 4 spots to ensure password policy
            password.append(allOptions[sr.nextInt(allOptions.length)]);
        }
    
        /*  Guarantee pass will contain the required combination of upper/lower/number/symbols
        by inserting required random chars in random positions within the password
        four times. */
        password.insert(sr.nextInt(password.length()), uppercase[sr.nextInt(uppercase.length)]);
        password.insert(sr.nextInt(password.length()), lowercase[sr.nextInt(lowercase.length)]);
        password.insert(sr.nextInt(password.length()), numbers[sr.nextInt(numbers.length)]);
        password.insert(sr.nextInt(password.length()), symbols[sr.nextInt(symbols.length)]);
        
        return password.toString(); 
    }
        
    
    

    public static void main(String[] args) {
        // EnumSet<Flag> allOptions = EnumSet.allOf(Flag.class); 
        // execute(allOptions);

        String password = generatePassword(10);
        System.out.printf("%s with length %d\n",password,password.length());

        password = generateStream(14);
        System.out.printf("%s with length %d\n",password,password.length());
    }
}
