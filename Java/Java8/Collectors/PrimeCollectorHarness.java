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
 * developed. Then calculate the performance increase and output the results.
 * 
 */
public class PrimeCollectorHarness {
    
    /**
     * Calculates the performance increase of the custom collector over the 
     * predefined collector and outputs it.
     * @param bench1 the slower benchmark, predefined collector
     * @param bench2 the faster benchmark, custom collector
     */
    private static void measurePerformance(long bench1, long bench2){
        double val = 1.0 - ((double)bench2)/ ((double)bench1); 
        double percent =  Math.round(val*100.0);   
        System.out.println("Performance Increase: ~ " + percent + " %!");
    }

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
        long bench1, bench2;
        
        System.out.println("======== [Benchmark]: partitioning prime numbers by "
            + "predefined collector from partitioningBy() factory method ========");

        bench1 = execute(PartitionPrimeNumbers::partitionPrimes);

        System.out.println("Partitioning done in: " +  bench1 + " msecs");

         System.out.println("\n======== [Benchmark]: partitioning prime numbers by "
             + "Custom Collector ========");

        bench2 = + execute(PartitionPrimeNumbers::partitionPrimesWithCustomCollector);
        System.out.println("Partitioning done in: " + bench2 + " msecs\n");

        System.out.println("[Summary]\nPredefined Collector:\t" 
            + bench1 + " msecs\nCustom Collector:\t"
            + bench2 + " msecs");
        measurePerformance(bench1,bench2);
    } 
}
