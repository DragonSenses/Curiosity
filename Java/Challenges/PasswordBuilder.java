package Java.Challenges;

// Cryptographically secure random number generator
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Builds a password with finer control. Can choose how many minimum characters 
 * of each of the set of policies: uppercase, lowercase, numbers, or 
 * symbols/punctuation one would want in their password. e.g., if one wants to
 * build a password with 3 uppercase, 2 lowercase, 2 digits, and 0 symbols
 * one can build a password with those minimum characters as parameters.
 * 
 * Example usage: ... put later ...
 * 
 * Ensures password policies are maintained by guaranteeing that it contains: 
 * uppercase/lowercase/numbers/symbols depending on what the user inputs. 
 * Using the Builder pattern allows the user to customize their password by 
 * setting a minimum count of characters of each category. More flexibility and
 * choice.
 * 
 * Algorithm:
 * 1. Builds the password by a certain amount of characters randomly by a set
 * minimum length (still leaves enough space for available characters, if any).
 * 2. Complete password building with the any available characters with
 * the remaining space (if any)
 * 3. Can use a custom String to build password with using custom() method. 
 * Builder will take random parts of the String passed into custom method and 
 * also how many characters to use from it. 
 * 
 * To Do: Put custom(string) within inner class
 * To Do: Options Flags Rules
 */
public class PasswordBuilder {
    // private enum Rule {
    //     LOWER, UPPER, DIGITS, PUNCTUATION;

    //     private final String text;
    //     private final int minimumCount;

    //     private Rule(String text, int minimumCount) {
    //         this.text = text;
    //         this.minimumCount = minimumCount;
    //     }
    // }

    private PasswordBuilder(){ 
        throw new UnsupportedOperationException("Empty constructor is not supported.");
    }

    private PasswordBuilder(Builder builder) {
        public static class Builder {
            private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
            private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            private static final String DIGITS = "0123456789";
            private static final String PUNCTUATION = "!@#$%&*+-";
        }

        public PasswordBuilder build() {
            return new PasswordGenerator(this);
        }
    }
}
