package Java.Java8.Collectors;

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
 * 
 */
public class PrimeCollectorHarness {
    
}
