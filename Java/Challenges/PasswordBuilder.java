package Java.Challenges;

// Cryptographically secure random number generator
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Builds a password with finer control. Can choose how many minimum characters
 * of each of the set of options: uppercase, lowercase, numbers, or symbols &
 * punctuation one would want in their password. e.g., if one wants to
 * build a password with 3 uppercase, 2 lowercase, 2 digits guaranteed then
 * one can build a password with those minimum characters as parameters.
 * 
 * Example usage: 
 * String password = new PasswordBuilder.Builder()
 *              .uppercase(3)
 *              .lowercase(2)
 *              .digits(2)
 *              .symbols()
 *              .buildPassword(16);  
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
 * 2. Continue password building with any available characters by filling up the
 * remaining space (if any)
 * 3. Can use a custom String to build password with using custom() method.
 * Builder will take random parts of the String passed into custom method and
 * also how many characters to use from it.
 * 
 */
public class PasswordBuilder {
    private final List<Option> options; // List of Options to build password
    private static final int minLength = 8;

    // Class Determines the Options to build Password
    private static class Option {
        private final String text; // Characters to choose from
        private final int minimumCount; // Minimum amount to choose from text

        public Option(String text, int minimumCount) {
            this.text = text;
            this.minimumCount = minimumCount;
        }
    }

    private PasswordBuilder() {
        throw new UnsupportedOperationException("Empty constructor is not supported.");
    }

    private PasswordBuilder(Builder builder) {
        this.options = builder.options;
    }

    /**
     * Ensures that the any length passed in is greater than the minimum
     * length for a password. Otherwise, return length.
     * 
     * @param length the length to check if greater than minimum
     * @return minLength if length is less than min-1, otherwise return length
     */
    private static int validateLength(int length) {
        return (length < minLength - 1) ? minLength : length;
    }

    public String buildPassword(int length) {
        length = validateLength(length); // Minimum length = 8

        // 0. Set-Up - Randomize Options by Shuffling
        List<Option> opts = new ArrayList<>(options);
        Collections.shuffle(opts);

        // 0. Set-Up - Cryptographically secure random number generator
        SecureRandom random = new SecureRandom();

        /* 1. Selection: Builds the password by a certain amount of characters randomly
        by a set minimum length by choosing characters identified by the Options set
        */
        List<Character> chosenChars = new ArrayList<>(chooseCharsByMinCount(random, opts));
                        
        /* 2. Continue password building with any available characters by filling up the
        remaining space (find remaining length, if any) */
        int remainingSpace = length - chosenChars.size();
        if (remainingSpace > 0) {
            chosenChars.addAll(chooseCharsByRemainingSpace(random, opts, remainingSpace));
        }

        /* 3. Randomize the results amongst the chosen characters */
        Collections.shuffle(chosenChars);

        /* 4. Finalize the Resulting Password */
        return chosenChars.stream().map(String::valueOf).collect(Collectors.joining());
    }

    /**
     * Choose random characters via Stream and filter based on their minimum 
     * count value within the Options
     *
     * @param random SecureRandom object to randomize results
     * @param opts List of Options to fine-tune Password Building
     * @return Randomly chosen characters tuned by minimum count
     */
    private List<Character> chooseCharsByMinCount(SecureRandom random, List<Option> opts) {
        return opts.stream()
                .filter(opt -> opt.minimumCount > 0)
                .flatMap(opt -> IntStream.range(0, opt.minimumCount)
                        .mapToObj(i -> opt.text.charAt(random.nextInt(opt.text.length()))))
                .collect(Collectors.toList());
    }

    /**
     * Choose random characters via Stream and filter based on Options to 
     * occupy the remaining space left in the password length. 
     * @param random SecureRandom object to randomize results
     * @param opts List of Options to fine-tune Password Building
     * @return randomly chosen characters tuned by remaining space
     */
    private List<Character> chooseCharsByRemainingSpace(SecureRandom random,
                List<Option> opts, int remainingSpace) {
        // List of Characters (surplus) to fill the remaining space in password 
        List<Character> surplus = opts.stream()
                .flatMap(opt -> opt.text.chars().mapToObj(c -> (char) c))
                .collect(Collectors.toList());
        
        Collections.shuffle(surplus); 

        return IntStream.range(0, remainingSpace)
                .mapToObj(i -> surplus.get(random.nextInt(surplus.size())))
                .collect(Collectors.toList());
    }

    public static class Builder {
        private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
        private static final String DIGITS = "0123456789";
        private static final String SYMBOLS = "!@#$%&*+-";

        private final List<Option> options = new ArrayList<>();

        public Builder uppercase() {
            return uppercase(0);
        }

        public Builder uppercase(int minimumCount) {
            return custom(UPPERCASE, minimumCount);
        }

        public Builder lowercase() {
            return lowercase(0);
        }

        public Builder lowercase(int minimumCount) {
            return custom(LOWER, minimumCount);
        }

        public Builder digits() {
            return digits(0);
        }

        public Builder digits(int minimumCount) {
            return custom(DIGITS, minimumCount);
        }

        public Builder symbols() {
            return symbols(0);
        }

        public Builder symbols(int minimumCount) {
            return custom(SYMBOLS, minimumCount);
        }

        // Allows Custom String to be incorporated into password
        public Builder custom(String text) {
            return custom(text, 0);
        }

        public Builder custom(String text, int minimumCount) {
            options.add(new Option(text, minimumCount));
            return this;
        }

        public PasswordBuilder build() {
            return new PasswordBuilder(this);
        }

        /**
         * Initiates the password generation process, up to a given length
         * 
         * @param length of password
         * @return password built with tuning options
         */
        public String buildPassword(int length) {
            return build().buildPassword(length);
        }
    } // end of Builder class


    public static void main(String[] args){
        String password = new PasswordBuilder.Builder()
                    .uppercase(3)
                    .lowercase(2)
                    .digits(2)
                    .symbols()
                    .buildPassword(16);

        System.out.println(password + " its length is " + password.length());


        /* Using the custom, I want to use 2 letters of "Purple" and
         * 4 numbers from the Phoenix Number: 142,857. While ensuring the
         * password is at minimum of 8 characters (inputting length of 6)
         * And with 2 symbols. 
         */
        String pass = new PasswordBuilder.Builder()
                    .custom("Purple", 2)
                    .custom("142857", 4)
                    .uppercase()
                    .symbols(2)
                    .buildPassword(6);

        System.out.println(pass + " its length is " + pass.length());
    }
}
