package Java.Java8.Collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.partitioningBy;

/**
 * Partitioning is a special case of grouping: having a predicate called a
 * partitioning function as a classfication function.
 * 
 * Here we use partitioningBy() from the Collectors class, and partition
 * the first n natural numbers into prime and nonprime.
 * 
 * 1. Create a Predicate that determines whether a given number is prime or not
 * 2. Partition the first n natural numbers between prime and nonprime
 * 3. Optimization that tests only if the candidate number is divisible by
 *    prime numbers.
 * 4. Combine optimizations, to use trial division on the candidate
 * number only divisble by prime numbers and tests only with primes smaller
 * than the square root of the candidate number.
 * 5. Use a Custom Collector to partition the first n natural numbers between
 * prime and nonprime numbers. Also using the above optimizations.
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
     * 1) A Predicate that determines if a given candidate number is prime or not.
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

    /**
     * 2) Partition a stream of the first n natural numbers between
     * prime and nonprime. 
     * @param n the first n natural numbers to partition by
     * @return a Map containing the partitioned n numbers by prime or nonprime
     */
    public static Map<Boolean, List<Integer>> partitionPrimes(int n) {
        return IntStream.rangeClosed(2, n).boxed()
            .collect(partitioningBy(candidate -> isPrime(candidate)));
    }

    // One Optimization is test only if the candiate number is divisble by prime numbers
    // Pointless to test against a divisor that's not itself prime!
    // Problem with predefined collectors, during the collection process, you don't have
    // access to the partial result; don't have access to the list of other prime
    // numbers found so far

    /**
     * 3) Optimization that tests only if the candidate number is divisible by
     * prime numbers.
     * @param primes    List of Prime Numbers found so far
     * @param candidate Candidate number to test primality
     * @return true if candidate number is prime, false otherwise
     */
    public static boolean isPrimeTest(List<Integer> primes, int candidate) {
        return primes.stream().noneMatch(i -> candidate % i == 0);
    }

    /**
     * 4) Optimization that tests only if the candidate number is divisible by
     * prime numbers. Also the optimization that tests only with primes smaller
     * than the square root of the candidate number. Stops testing whether the 
     * candidate is divisible by a prime as soon as the next prime is greater 
     * than the candidate's root. Stream's takeWhile() method will be used. 
     * 
     * @param primes    List of Prime Numbers found so far
     * @param candidate Candidate number to test primality
     * @return true if candidate number is prime, false otherwise
     */
    public static boolean isPrime(List<Integer> primes, int candidate) {
        int candidateRoot = (int) Math.sqrt((double) candidate);
        return primes.stream()
                     .takeWhile(i -> i <= candidateRoot)   // next prime greater than root
                     .noneMatch(i -> candidate % i == 0);  // Tests only from list of found primes
    }

    /**
     * 5. Use a Custom Collector to partition the first n natural numbers between
     * prime and nonprime numbers. Also using the above optimizations.
     * 
     * @param n the first n natural natures to partition by prime and nonprime
     * @return a Map containing prime and nonprime numbers, true and false key respectively
     */
    public Map<Boolean, List<Integer>> partitionPrimesWithCustomCollector(int n) {
        return IntStream.rangeClosed(2, n).boxed()
                        .collect(new PrimeNumbersCollector());
    }

    public static void main(String[] args) {
        int n = 100;
        System.out.print("======== Partition first ");
        System.out.print(n + " numbers into prime and nonprime ========\n");
        System.out.println("\n[Numbers partitioned in prime and non-prime]\n\n " + partitionPrimes(n));

        // Test here for collector performance
    }
}
