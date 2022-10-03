package Java.Java8.Optionals;

import java.util.Map;
import java.util.Optional;

/**
 * Optionals allows us to rethink how we deal with potentially missing values
 * and also how to interact with native Java APIs. 
 * 
 * This class will showcase ways we can adapt null values and Optional with
 * existing Java API.
 * 
 * ================================= Summary =================================
 * 1. Wrapping a Potentially Null value in an Optional
 * 2. Throwing Exception as an alternative in Java API to returning null when
 * a value can't be provided
 * ================================= Methods =================================
 * -Optional.ofNullable()
 * -Optional.of()
 */
public class OptionalUtility {
    /**
     * 1. Wrapping a Potentially Null value in an Optional
     * get() method of Map returns null as its value if it contains no mapping
     * for the requested key. Using Map<String,Object>, a map.get("key") will
     * return null if no value associated to key: "key". 
     * @return value wrapped in an optional
     */
    public Optional<Object> getValueWrappedInOptional(Map<String,Object> map){
        // Safely transforms a value that could be null into an optional
        return Optional.ofNullable(map.get("key")); 
    }

    /**
     * Exceptions vs. Optional
     * 2. Throwing Exception as an alternative in Java API to returning null when
     * a value can't be provided. 
     * Example: Conversion of String into an int provided by Integer.parseInt(String)
     * static method. If String doesn't contain a parseable integer, this method
     * throws a NumberFormatException. The net effect is that the code signals an
     * invalid argument if a String doesn't represent an integer, only difference
     * is using a try/catch blokc instead of if to control whether a value isn't null.
     * @return An Optional containing the String converted to an Integer, if it cannot
     * be converted then returns an empty Optional
     */
    public static Optional<Integer> stringToInt(String s){
        try {
            // If String can be converted to an Integer, return an Optional containing it
            return Optional.of(Integer.parseInt(s)); 
        } catch (NumberFormatException e) {
            // Otherwise, return an empty Optional
            return Optional.empty();
        }
    }
}
