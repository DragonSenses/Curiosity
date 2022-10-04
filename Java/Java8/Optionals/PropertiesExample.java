package Java.Java8.Optionals;

//junit test imports
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Properties;

/**
 * Suppose you have some Properties that are passed as configuration arguments
 * to your program. Also suppose that your program needs to read a value from 
 * these Properties and interpret as a duration in seconds. A. duration
 * has to be a positive number (>0).
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
    

    public int readDurationImperatively(Properties props, String name) {
        // 1. Make sure that a property exists with the required name
        String value = props.getProperty(name);
        if(value != null) {
            // 2. Try to convert the String Property to a number
            try{
                int i = Integer.parseInt(value); 
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
        return 0;
    }

    
    @Test
    public void testReadDuration(){
        Properties props = new Properties();
        props.setProperty("a", "5");
        props.setProperty("b", "true");
        props.setProperty("c", "-3");

        Properties param = props; 

        assertEquals(5, readDuration(param, "a")); // returns 5, a pos. num
        assertEquals(0, readDuration(param, "b")); // returns true, not a pos. num
        assertEquals(0, readDuration(param, "c")); // returns -3, a neg. num
        assertEquals(0, readDuration(param, "d")); // propert with "d" does not exist
    }

    public static void main(String[] args){
        
    }
}
