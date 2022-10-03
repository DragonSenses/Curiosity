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
     * 
     */
    public static Optional<Integer> stringToInt(String s){

    }
}
