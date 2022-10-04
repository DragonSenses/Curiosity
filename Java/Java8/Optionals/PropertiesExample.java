package Java.Java8.Optionals;

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

    // @Test
    // public void testReadDuration(){
    //     assertEquals(5, readDuration(param, "a"));
    //     assertEquals(0, readDuration(param, "b"));
    //     assertEquals(0, readDuration(param, "c"));
    //     assertEquals(0, readDuration(param, "d"));
    // }

    public static void main(String[] args){
        
    }
}
