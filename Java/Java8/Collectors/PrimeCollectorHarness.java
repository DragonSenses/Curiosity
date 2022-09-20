package Java.Java8.Collectors;

import java.util.function.Consumer;

/**
 * Class that tests the performance of Partitioning Prime Number Collector 
 * compared to using collector created with partitioningBy() factory 
 * method. 
 * 
 * A more scientific benchmarking approach would be to use Java Microbenchmark
 * Harness (JMH) but for this case the results provided by this small 
 * benchmarking class are accurate enough. 
 * 
 * This class partitions the first million natural numbers into primes and 
 * nonprimes, invoking the method using the collector created with 
 * partitioningBy() factory method 10 times and registering the fastest 
 * execution. 
 * 
 * Then we replace partitionPrimes with partitionPrimesWithCustomCollector
 * in the harness, in order to test the performances of the custom collector
 * developed.
 */
public class PrimeCollectorHarness {
    
    /**
     * Tests a partitioning by primes collector by running 10 tests,
     * partitioning the first million natural numbers into primes and nonprimes,
     * and checks which is the fastest execution time out of those 10 tests.
     * @param primePartitioner The collector to test
     * @return the fastest execution time using this collector
     */
    private static long execute(Consumer<Integer> primePartitioner) {
        long fastest = Long.MAX_VALUE;
        
        for (int i = 0; i < 10; i++) { // Run the test 10 times
          long start = System.nanoTime();
          // Partition the first million natural numbers into primes and nonprimes
          primePartitioner.accept(1_000_000);
          long duration = (System.nanoTime() - start) / 1_000_000;
          // Check if current execution is the fastest one
          if (duration < fastest) {
            fastest = duration;
          }
          System.out.println("done in " + duration); // Prints times of each test
        }
        return fastest; // Return the fastest execution time
    }

    public static void main(String[] args){
        
      System.out.println("======== [Benchmark]: partitioning prime numbers by "
        + "predefined collector from partitioningBy() factory method ========\n");

      System.out.println("Partitioning done in: "
         + execute(PartitionPrimeNumbers::partitionPrimes) + " msecs");

      System.out.println("\n======== [Benchmark]: partitioning prime numbers by "
             + "Custom Collector ========\n");

      System.out.println("Partitioning done in: "
         + execute(PartitionPrimeNumbers::partitionPrimesWithCustomCollector) + " msecs");
    }
}
