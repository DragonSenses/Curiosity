package Java.Math;

import java.util.stream.IntStream;

/** 
 * Prime numbers are evenly divisible only by itself and one (e.g., 2, 3, 5, 7, 11).
 * A prime number is a natural number greater than 1 that is not a product of two
 * smaller natural numbers. This property we call Primality. 
 * 
 * Prime numbers are of immense importance in cryptography, computational number theory, 
 * information science and computer science. There are several algorithms to test
 * if a number is prime. Some of them are fast, but no fast algorithm to factorize a number is known.
 * 
 * A primality test is deterministic if it outputs True when the number is a
 * prime and False when the input is composite with probability 1. Otherwise,
 * the primality test is probabilistic. A probabilistic primality test is often
 * called a pseudoprimality test.
 * 
 * So far, the primality tests discussed are either prohibitively slow (polynomial
 * in n instead of lgn, the number of digits n) or only probabilistic
 * (not guaranteed to be correct). This makes people back then to wander, whether the problem PRIMES,
 *  determining primality of a test, is actually solvable "quickly" enough (in polynomial 
 * time in number of digits) or not; that is, whether it is in complexity class PP or not.
 * 
 * In 1976, Gary Miller (the one who invented the Miller-Rabin primality test above, together
 * with Michael Robin) also wrote about "Miller test," a deterministic variant (actually 
 * the original version) of Miller-Rabin primality test. This test runs in polynomial time,
 * but its correctness depends on the so-far unsettled question of the generalized Riemann
 * hypothesis, and thus this test is unsatisfactory.
 * 
 * Tests of Primality
 * 1) Trial Division 
 *  This is one of the simplest deterministic primality tests, by naively checking
 * the condition of a number being prime. It uses the fact that a prime number
 * is not divisible by any other positive integer other than itself and 11, 
 * so we can turn it into its contrapositive: if a number is divisible by some
 * other positive integer besides itself and 11, it is composite.
 * 
 * However, it is not necessary to check all numbers from 2 to n-1. Suggest that
 * n is composite, so n = pq for 2 <= p, q <= n-1. We claim thtat at least
 * one of p,q is not greater than sqrt(n). If both are greater than sqrt(n), then
 * pq > sq(n) * sq(n) = n, a contradiction. Thus whenever n is composite, one of
 * its factors is not greater than sq(n), so we can modify the range endpoint
 * 
 * 2) Wilson's Theorem 
 *  A positive integer n > 1 is prime iff (n-1)! = -1 (mod n)
 * 3) Fermat Primality Test
 *  Let p be a prime number and a be an integer not divisible by p. Then 
 * 4) Miller-Rabin Primality Test (favorite)
 * 
 * 
 */
public class Prime {
    

    // The Following 2 methods is Trial Division

    /**
     * Given a candidate number, checks whether it is prime or not
     * @param candidate number to check Primality
     * @return true if number is prime, false otherwise
     */
    public boolean isPrimeStart(int candidate) {
        // Generate a range of natural numbers starting from and including 2,
        // up to but excluding the candidate
        return IntStream.range(2, candidate)
                        .noneMatch(i -> candidate % i == 0); 
    } // Returns true if candidate isn't divisible for any of the numbers in the stream

    /**
     * Given a candidate number, checks whether it is prime or not. This method 
     * has the simple optimization in that it tests only for factors less than 
     * or equal to the square root of the candidate.
     * 
     * @param candidate number to check Primality
     * @return true if number is prime, false otherwise
     */
    public boolean isPrime(int candidate) {
        int candidateRoot = (int) Math.sqrt((double) candidate);
        return IntStream.rangeClosed(2, candidateRoot)
                        .noneMatch(i -> candidate % i == 0);
    }

    public static void main(String[] args){

    }
}
