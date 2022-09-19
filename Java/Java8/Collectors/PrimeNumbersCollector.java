package Java.Java8.Collectors;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

/**
 * Custom Collector that partitions a present count of numbers between primes
 * and non primes; implements the Collector interface. Will create Collector
 * class step-by-step.
 * 
 * 1) Defining the Collector Class Signature
 * public interface Collector<T, A, R>
 * 
 * T - Type of Elements in the Stream                    -> Streams of Integers
 * A - Type of Object used to Accumulate Partial results -> Map<Boolean, List<Integer>>
 * R - Type of the final result of the collect operation -> Map<Boolean, List<Integer>>
 * 
 * 2) Implementing the Reduction Process
 * Implemnting the five methods declared in Collector interface. 
 */
public class PrimeNumbersCollector 
    implements Collector<Integer, Map<Boolean, List<Integer>>, Map<Boolean, List<Integer>>>  {
     
    /**
     * The Supplier Method: Making a New Result Container
     * 
     * Has to return a function that when invoked creates the accumulator.
     * 
     * @return a Supplier of an empty accumulator
     */
    @Override
    public Supplier<Map<Boolean, List<Integer>>> supplier(){
        // Creates the collection operation starting point 
        // A HashMap<Boolean,List<Integer>> is our accumulator
        return () -> new HashMap<Boolean, List<Integer>>() {{
               
        }};     
    }

    /**
     * The Accumulator Method: Adding an Element to a Result Container
     * @return the function that performs the reduction operation
     */
    @Override
    public BiConsumer<List<T>, T> accumulator(){
         // Accumulates the traversed item, modifying accumulator in place
        return List::add;  
    }
    
    /**
     * The Finisher Method: Applying the Final Transformation to the Result Container
     * @return returns a function that's invoked at the end of the accumulation
     * process, after having completely traversed the stream, in order to 
     * transform the accumulator object into the final result of the whole 
     * collection operation; often just returns identity function
     */
    @Override
    public Function<List<T>, List<T>> finisher(){
        return Function.identity(); // Identifies Function
    }
    
    /**
     * The Combiner Method:  Merging Two Result Containers 
     * @return a function used by the reduction operation, defines how accumulators
     * resulting from the reduction of different subparts of the stream are
     * combined when the subparts are processed in parallel. 
     */
    @Override
    public BinaryOperator<List<T>> combiner(){
        return(list1, list2) -> { // Modifies the first accumulator
            list1.addAll(list2);  // combining it with the content of the second one
            return list1;         // returns the modified first accumulator
        };
    }
    
    /**
     * The Characteristics Method
     * Returns an immutable set of Characteristics, defining the behavior of the
     * collector—in particular providing hints about whether the stream can be
     * reduced in parallel and which optimizations are valid when doing so.
     * 
     * Characteristics is an enumeration containing three items:
     * I) UNORDERED
     * II) CONCURRENT
     * III) IDENTITY_FINISH
     */
    @Override
    public Set<Characteristics> characteristics(){
        // Flags the collector as IDENTITY_FINISH and CONCURRENT
        return Collections.unmodifiableSet(EnumSet.of(IDENTITY_FINISH, CONCURRENT)); 
    }
}
