package Java.Java8.Collectors;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashMap;
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
     * Tests only if the candidate number is divisible by prime numbers. 
     * Also tests only with primes smaller than the square root of the candidate
     * number. Stops testing whether the candidate is divisible by a prime as
     * soon as the next prime is greater than the candidate's root. 
     * Stream's takeWhile() method will be used. 
     * 
     * @param primes    List of Prime Numbers found so far
     * @param candidate Candidate number to test primality
     * @return true if candidate number is prime, false otherwise
     */
    public static boolean isPrime(List<Integer> primes, int candidate){
        int candidateRoot = (int) Math.sqrt((double) candidate); 
        // Testing only the candidate prime against only the primes that aren't
        // greather than its square root
        return primes.stream()
                     .takeWhile(i -> i <= candidateRoot)    
                     .noneMatch(p -> candidate % p == 0);
    }

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
            // Instantiate both List of primes and nonprimes
               put(true, new ArrayList<Integer>());
               put(false, new ArrayList<Integer>());
        }};     
    }

    /**
     * The Accumulator Method: Adding an Element to a Result Container
     * 
     * Most important method of collector as it contains the logic defining how
     * the elements of the stream have to be collected. In this case, it's also 
     * the key to implementing the optimization: at any given iteration you can
     * now access the partial result of the collection process, which is the 
     * accumulator containing the prime numbers found so far. 
     * 
     * @return the function that performs the reduction operation
     */
    @Override
    public BiConsumer<Map<Boolean, List<Integer>>, Integer> accumulator(){
         // Accumulates the traversed item, modifying accumulator in place
        return (Map<Boolean, List<Integer>> acc, Integer candidate) -> { 
            // Access the primes found so far: partial result of collection process
                acc.get(isPrime(acc.get(true), candidate)) // get list of prime or nonprime numbers
                   .add(candidate); // add the candidate number at this iteration to the accumulator 
        };  
    }
    
    /**
     * The Finisher Method: Applying the Final Transformation to the Result Container
     * @return returns a function that's invoked at the end of the accumulation
     * process, after having completely traversed the stream, in order to 
     * transform the accumulator object into the final result of the whole 
     * collection operation; often just returns identity function
     */
    @Override
    public Function< Map<Boolean, List<Integer>>,  Map<Boolean, List<Integer>>> finisher(){
        return Function.identity(); // Identifies Function
    }
    
    /**
     * The Combiner Method:  Merging Two Result Containers 
     * In this case, merge two Maps by adding all the numbers in the prime and
     * nonprime lists of the second Map to the corresponding lists in the first
     * Map
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
