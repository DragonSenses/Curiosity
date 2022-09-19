package Java.Java8.Collectors;

/**
 * Custom Collector that implements the Collector interface. 
 * 
 * public interface Collector<T, A, R>
 * 
 * T - Type of Elements in the Stream                    -> Streams of Integers
 * A - Type of Object used to Accumulate Partial results -> Map<Boolean, List<Integer>>
 * R - Type of the final result of the collect operation -> Map<Boolean, List<Integer>>
 */
public class PrimeNumbersCollector 
    implements Collector<Integer, Map<Boolean, List<Integer>>, Map<Boolean, List<Integer>>>  {
    
}
