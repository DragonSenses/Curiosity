package Java.Java8.Collectors;
import Java.Java8.Collectors.PartitioningPrimeNumbers;
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
    
    public static void main(String[] args){
        long fastest = Long.MAX_VALUE;

        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            partitionPrimes(1_000_000);
            long duration = (System.nanoTime() - start) / 1_000_000;
            if (duration < fastest) fastest = duration;
        }

        System.out.println(
            "Fastest execution done in " + fastest + " msecs");
    }
}
