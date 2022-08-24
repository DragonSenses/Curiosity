package Java.Java8.Streams;

import java.util.Arrays;
import java.util.List;

/**
 * Demonstrate ways to Reduce a Stream. This combines elements of a stream to
 * express more complicated queries; classified as reduction operations as a 
 * stream is reduced to a value. 
 * 
 * ================================= Methods =================================
 * - reduce() - takes two parameters 
 *  1) initial value
 *  2) The operation to combine all the elements of the list 
 *  (a lambda to combine two stream elements and produce a new value) 
 */
public class ReducingStreams {
    
    public static void main(String[] args){
        System.out.println("======== Summing the Elements ========");
        List<Integer> numbers = Arrays.asList(3, 4, 5, 1, 2);
        System.out.println("List: " + numbers);
        // For-Each loop        Uses two parameters
        int sum = 0;            // 1) Initial sum variable = 0
        for(int x: numbers) { 
            sum += x;           // 2) Operation to combine all the elements
        }
        System.out.println(sum + " after using for each loop");

        System.out.println("\n======== Filtering Unique Elements ========");
    }
}
