package Java.Math;

import java.util.stream.IntStream;

/**
 * Prime numbers are evenly divisible only by itself and one (e.g., 2, 3, 5, 7, 11).
 * A prime number is a natural number greater than 1 that is not a product of two
 * smaller natural numbers.
 * 
 * Primality. 
 */
public class Prime {
    
    /**
     * Given a candidate number, checks whether it is prime or not
     * @param candidate number to check Primality
     * @return true if number is prime, false otherwise
     */
    public boolean isPrime(int candidate) {
        // Generate a range of natural numbers starting from and including 2,
        // up to but excluding the candidate
        return IntStream.range(2, candidate)
                        .noneMatch(i -> candidate % i == 0); 
    } // Returns true if candidate isn't divisible for any of the numbers in the stream

    public static void main(String[] args){

    }
}
