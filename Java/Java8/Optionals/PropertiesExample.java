package Java.Java8.Optionals;

//junit test imports
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;
import java.util.Properties;

/**
 * Suppose you have some Properties that are passed as configuration arguments
 * to your program. Also suppose that your program needs to read a value from 
 * these Properties and interpret as a duration in seconds. A duration has to
 * be a positive number (>0).
 * 
 * ========================== Properties Class ================================
 * - Represents a persistent set of properties
 * - Can be saved to a stream or loaded from a stream
 * - From java.util package
 * - Properties define the following instance variable, the variable holds a 
 * default property list asscoiated with Properties object
 * - Properties defaults: this variable holds a default property list associated
 * with a Properties object
 * 
 * - Subclass of HashTable, but does not inherit concept of a load factor
 * - It is used to maintain a list of values in which the key is a string and the
 * value is also a string i.e; it can be used to store and retrieve string type
 * data from the properties file.
 * - Properties class can specify other properties list as it’s the default. If a 
 * particular key property is not present in the original Properties list, the 
 * default properties will be searched.
 * - Properties object does not require external synchronization and Multiple
 * threads can share a single Properties object.
 * - Can be used to retrieve the properties of the system
 * 
 * ================================ Advantages ================================
 * -In the event that any data is changed from the properties record, you don’t 
 * have to recompile the java class. It is utilized to store data that is to be
 * changed habitually.
 */
public class PropertiesExample {
    
    /**
     * Imperative way to check a value of a given property is a String
     * representing a positive integer, returning that integer. 
     * @return the String represented as a positive integer, 0 in all other cases
     */
    public int readDurationImperatively(Properties props, String name) {
        // 1. Make sure that a property exists with the required name
        String value = props.getProperty(name);
        if(value != null) {
            // 2. Try to convert the String Property to a number
            try{
                int i = Integer.parseInt(value); 
                // 3. Check whether the resulting number is positive
                if(i > 0) { return i; } 
            } catch (NumberFormatException nfe) { }
        }
        return 0; // Return 0 if any of the conditions fails
    }

    /**
     * A value of a given property is a String representing a positive integer,
     * the method returns that integer, but it returns zero in all other cases. 
     * In other words, in checks if the Properties has a mapping entry of the
     * String name parameter, and check if its value is a positive integer. 
     * 
     * @param props Properties that are passed as configuration arguments
     * @param name the String to interpret as a positive integer
     * @return the String represented as a positive integer, 0 in all other cases
     */
    public int readDuration(Properties props, String name) {
        /**  Using Optional class, the method can be done in a single statement
         * 
         * 1. Because the value returned by Properties.getProperty(String) method
         * is null when the property doesn't exist, it's convenient to turn this
         * value intot an optional with factory method ofNullable().
         * 
         * 2. Then can convert the Optional<String> to an Optional<Integer>, 
         * passing to its flatMap() method a reference to 
         * OptionalUtility.stringToInt()
         * 
         * 3. Finally, can easily filter away the negative number. 
         * 
         * 4. If any of these operations returns an empty optional, the method 
         * returns a 0 that's passed as the default value to the orElse(),
         * otherwise it returns the positive integer contained in the optional
         */
        return Optional.ofNullable(props.getProperty(name))
                       .flatMap(OptionalUtility::stringToInt)
                       .filter(i -> i > 0)
                       .orElse(0);
    }

    
    @Test
    public void readDurationTest(){
        Properties props = new Properties();
        props.setProperty("a", "5");
        props.setProperty("b", "true");
        props.setProperty("c", "-3");

        Properties param = props; 

        assertEquals(5, readDuration(param, "a")); // returns 5, a pos. num
        assertEquals(0, readDuration(param, "b")); // returns true, not a pos. num
        assertEquals(0, readDuration(param, "c")); // returns -3, a neg. num
        assertEquals(0, readDuration(param, "d")); // property with "d" does not exist
    }

    @Test
    public void readDurationZero(){
        Properties props = new Properties();
        props.setProperty("x", "5");
        props.setProperty("y", "0");

        Properties param = props; 

        assertEquals(5, readDuration(param, "x")); // returns 5, a pos. num
        assertEquals(0, readDuration(param, "y")); // returns 0, nonpositive
    }

    public static void main(String[] args){
        
    }
}
