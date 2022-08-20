package Java.Math;

/**
 * A Mersenne number is of the form Mn = 2^n - 1, where n is an integer.
 * - The first few Mersenne numbers are 1, 3, 7, 15, 31, 63, 127, 255
 * - Binary Repunits: consists of all 1's in base-2
 *  
 * Mersenne Prime number is where 2^(n) - 1 = (a prime number).
 * - NOTE not all 2^(n) -1 = a prime number, examples: n = {1,4,6,8,9,10,11,...}
 * 
 * - For Mersenne number to be a prime number, then n must be prime, so
 * should be denoted as Mp = 2^p - 1. Or in other words, 
 * - If n is prime, then 2^n-1 is prime (p -> q) p implies q is false. 
 * - BUT the CONVERSE is True (p->q) turns into (q->p)
 * - If 2^(n) -1 is prime, then n is prime (true)
 *
 * - Mersennes primes is one of the most computationally intensive
 * 
 * - The first few Mersenne primes are 3, 7, 31, 127, 8191, 131071,
 *   524287, 2147483647
 * 
 * Perfect Number is a number where it equals the sum of its proper factors.
 * 
 *  Examples: 
 * 6 = 1 + 2 + 3
 * 28 = 1 + 2 + 4 + 7 + 14
 * 496 = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 126 + 248
 * 8128 = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 127 + 254 + 508 + 1016 + 2032 + 4064 
 * 
 * NOTICE: How for every perfect number there is exactly one mersenne prime 
 * 6 = 1 + 2 + [3]
 * 28 = 1 + 2 + 4 + [7] + 14
 * 496 = 1 + 2 + 4 + 8 + 16 + [31] + 62 + 126 + 248
 * 8128 = 1 + 2 + 4 + 8 + 16 + 32 + 64 + [127] + 254 + 508 + 1016 + 2032 + 4064 
 * 
 * - Every Mersenne prime corresponds to exactly one perfect number! 
 * 
 * Awesome! Also notice how each divisor is simply a doubling of the previous
 * number until you reach the mersenne prime, then you double from there.
 * 
 * Disclaimer: By perfect number we mean Even Perfect Numbers, as of date, no
 * odd perfect number is found nor was it proven that odd perfect numbers do 
 * not exist. If odd perfect number was found, then it would not have mersenne
 * prime as a factor. 
 * 
 * Further Reading: https://mathworld.wolfram.com/MersenneNumber.html
 * 
 * To Do: 
 * - Make an array of mersenne
 * - Stream of Number of digits of mersenne number
 * - sequence of numbers representing the of digits of each mersenne 
 * - Make table of n, 2^(n)-1, 2^(n-1), and Perfect Number
 * {2,3,5,7,13}
 * 
 *              2^(n)-1     *   2^(n-1)     =   perfect number              
 * 
 *      n   |   2^(n)-1     |   2^(n-1)     |   perfect number
 * ========================================================
 *      2   |       3       |       2       |       6
 *      3   |       7       |       4       |       28
 *      5   |       31      |       16      |       496
 *      7   |       127     |       64      |       8128
 *      13  |       8191    |       
 */
public class Mersenne {
    /**
     * Checkings if the incoming number n is a power of two, to do so
     * it uses the binary representation of n bitwise and n-1 and check
     * if this becomes 0. Example n = 8, n-1 = 7, so binary representation
     *   1000 & 0111 = 0000. Takes advantage of the properties of a 
     * Mersenne Number Mn = 2^(n) -1 which consist of all 1s in base-2,
     * and are called binary repunits. A number that is a power of two will
     * only have one bit set to "1". 
     * Note: Two mersennes number will also result in a value of 0, take
     * example 7 and 31 , 111 & 11111 = 0
     * @param n the number to check if is a power of two
     * @return true if n is power of two, false otherwise
     */
    public static boolean isPowerOfTwo(int n){
        return (n & n-1) == 0;
    }

    /**
     * Using the formula, a Mersenne number can be derived from incoming 
     * parameter n when Mn = 2^n -1, then Mn + 1 = 2^n. 
     * We add 1 to the prospective number and check if the sum is an
     * exponent of 2.
     * @param n
     * @return
     */
    public static boolean isMersenne(int n) {
        return(isPowerOfTwo(n+1));
    }

    /** Work in Progress
     * Note Mersenne number consists of all 1's in base-2, adding 1 will
     * cause it to have only 1 bit as a set bit and a power of two
     * @param n
     * @return
     */
    static long isMersenneBetter(long x) {
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        x |= x >> 32;
        return x;
    }

    public static void main(String[] args){

    }
}
