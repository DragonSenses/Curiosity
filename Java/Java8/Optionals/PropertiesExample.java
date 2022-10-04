package Java.Java8.Optionals;

//junit test imports
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Properties;

/**
 * Suppose you have some Properties that are passed as configuration arguments
 * to your program. Also suppose that your program needs to read a value from 
 * these Properties and interpret as a duration in seconds. A. duration
 * has to be a positive number (>0).
 */
public class PropertiesExample {
    
    public int readDurationImperatively(Properties props, String name) {
        return 0;
    }

    /**
     * A value of a given property is a String representing a positive integer,
     * the method returns that integer, but it returns zero in all other cases. 
     * @param props
     * @param name
     * @return
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
