package Java.Java8.Collectors;

/**
 * Collectors provide specific factory method for summing, which accepts a 
 * function that maps an object into the int that has to be summed and returns
 * a collector that, when passed to collect method, performs the requested 
 * summarization. 
 * 
 * For Instance, we can:
 * 1. Find Total Number of Calories in the Menu
 * 2. Find Average Number of Calories in the Menu
 * 3. Find count, sum, minimum, average, and maximum all in one operation
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.summingInt() - accepts a function that maps an object into the
 * int that has to be summed and returns the collector that performs the 
 * requested summarization (when passed to the usual collect() method)
 * 
 * -Collectors.summingLong - long variant
 * -Collectors.summingDouble - double variant
 * 
 * -Collectors.averagingInt - calculates the average of the same set of numeric
 * values
 * 
 * -Collectors.averagingDouble - double variant of average
 * -Collectors.averagingLong - long variant of average
 * 
 * - 
 * 
 */
public class Summarizing {
    
    public static void main(String[] args) {

    }
}
