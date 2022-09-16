package Java.Java8.Collectors;

import java.util.stream.Collector;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * Partitioning is a special case of grouping: having a predicate called a
 * partitioning function as a classfication function.
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -partitioningBy(f) - takes a partitioning function and splits the elements
 * into a Map with two different groups, True or False as keys
 */
public class PartitioningPrimeNumbers {
    
    /**
     * A Predicate that determines if a given candidate number is prime or not.
     * Contains the optimization that tests only for factors less than or 
     * equal to square of candidate. 
     * @param candidate number to check primality
     * @return true if number is prime, false otherwise
     */
    public static boolean isPrime(int candidate) {
        return IntStream.rangeClosed(2, candidate-1)
            .limit((long) Math.floor(Math.sqrt(candidate)) - 1)
            .noneMatch(i -> candidate % i == 0);
    }

    public static void main(String[] args) {
    
    }
}
