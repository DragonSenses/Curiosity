package Java.Math;

import java.util.Random;

/**
 * Task: Generate random integers between zero and some upper bound, n [0,n)
 * 
 * Demonstrates a few flaws about java's pseudorandom number generator and 
 * a better library that produces finer random numbers with more speed.
 */
public class FinerRandomNumbers {
    
    // Standard, Common, but deeply flawed
    static Random rnd = new Random();

    /**
     * 3 Flaws. 1) if n is small power of two, sequence of random numbers will
     * repeat itself after a short period (pseudorandom number generator is 
     * periodic). 2) if n is not a power of two, some numbers will on average
     * be returned more frequently than others; the effect is more pronounced
     * when n is large. 3) on rare occasions, can fail catastrophically, 
     * returning a number outside the specified range. Because the method 
     * attempts to map the value returned by rnd.nextInt() to a non-negative int
     * by calling Math.abs. If nextInt() returns Integer.MIN_VALUE, Math.abs 
     * will also return Integer.MIN_VALUE, and remainder operator (%) will 
     * return a negative number, assuming n is not a power of two. 
     * @param n the exclusive upper bound to produce random number from 
     * @return a random number between the range of 0 and n
     */
    static int badRandom(int n) {
        return Math.abs(rnd.nextInt()) % n ;
    }

    /**
     * To demonstrate flaw #2, this method generates a million random numbers in a
     * 
     */
    static void displayBadRandom() {

    }

    public static void main(String[] args){

    }
}
