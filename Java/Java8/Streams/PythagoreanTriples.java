package Java.Java8.Streams;

import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * Pythagorean triples are numbers that satisfy the Pythagorean formula
 *  a^2 + b^2 = c^2
 * - Describes the side lengths of a right-angle triangle
 * - must be integer side lengths, for instance a=b=1 and c = sqrt(2) is
 * a right triangle but (1,1,sqrt(2)) does not form a pythagorean triple
 * - Commonly written as (a,b,c) with most known example as (3,4,5)
 * - primitive Pythagorean triple is one in which a, b, and c are coprime
 * that is they have no common divisor larger than 1 
 * - 1 and sqrt(2) do not have an integer common multiple because sqrt(2)
 * is irrational
 * 
 * ========== Application of Pythagorean Triple ==========
 * Proofs the sqrt(2) is irrational using Pythagorean triples
 * - if a, b, c are coprime positive integers such that a^2 + b^2 = c^2,
 * then c is never even (lemma)
 * - Two idential perfect squares can never be added to produce another
 * perfect square.
 * Proof by Contradiction
 * I) Suppose sqrt(2) is rational, therefore sqrt(2) = a/b
 * where a,b is set of positive integers, and gcd(a,b) = 1
 * II) Square both sides -> 2 = (a^2)/(b^2)
 * III) 2b^2 = a^2
 * IV)  b^2 + b^2 = a^2
 * V) (b,b,a) is a primitive Pythagorean triple, and from the lemma, a is never even.
 * However, this contradicts the equation III) 2b^2 = a^2 whhich implies that
 * a must be even. 
 * 
 * ==========   Algorithm to create a Stream of Pythagorean Triples ==========
 * 1. Represent a Pythagorean Triple by a int[] with 3 elements, a tuple
 * 2. Filter through a stream of integers 
 * 3. Assume a & b are given within (a,b,c) and we apply a test to each integer 
 * 4. Generate Tuples and transform each of these filtered elements into a int[]
 * 5. Generate a stream of b values
 * 6. Generate a stream of a values
 * 7. Limit the output
 */
public class PythagoreanTriples {
    
    public static void main(String[] args){
        // Build a Stream of int[] that represent Pythagorean Triples
        Stream<int[]> pythagoreanTriples;

        // The test: Square root of a^2 + b^2 = Whole Number
        // filter(b -> Math.sqrt(a*a + b*b) % 1 == 0)
        // filter selects only values for b that can form a Pythagorean triple with a

        // map/transform these filtered elements into a int[] = {a,b,c}
        // .map(b -> new int[]{a,b, (int)(Math.sqrt(a*a + b*b))})

        // Generate values from an int stream
        // IntStream.rangeClosed(1,100)
        //          .filter(b -> Math.sqrt(a*a + b*b) % 1 == 0)
        //          .boxed() // Generate a Stream<Integer> from IntStream
        //          .map(b -> new int[]{a,b, (int)(Math.sqrt(a*a + b*b))});

       // Generate a values
    //    IntStream.rangeClosed(1,100).boxed()
    //             .flatMap(a -> 
    //                IntStream.rangeClosed(a,100)    // Range of b to starts a, to avoid duplicates
    //                    .filter(b -> Math.sqrt(a*a + b*b) % 1 == 0)
    //                    .map(b -> new int[]{a,b, (int)(Math.sqrt(a*a + b*b))})
    //            );

        // map() from IntStream expects only another int to be returned for each
        // element of the stream, so we need to modify it to return an object-valued
        // stream
        //.mapToObj(b -> new int[]{a,b, (int)(Math.sqrt(a*a + b*b))})
        pythagoreanTriples =
            IntStream.rangeClosed(1,100).boxed()
                     .flatMap(a -> // Range of b starts  with a, to avoid duplicates
                         IntStream.rangeClosed(a,100)    
                                  .filter(b -> Math.sqrt(a*a + b*b) % 1 == 0)
                                  .mapToObj(b -> new int[]{a,b, (int)(Math.sqrt(a*a + b*b))})
        );
       
        System.out.println("\n======== Pythagorean Triples ========");
        // Now Consume the Stream and Limit the output
        pythagoreanTriples.limit(20).forEach(t -> System.out.println(t[0] + ", " + t[1] + ", " + t[2]));

        
        System.out.println("\n======== Pythagorean Triples filtering third element as whole number ========");
        // Improvement: Not optimal in that square root is calculated twice in
        // filter and map. First generate triples of form (a*a, b*b, a*a+b*b) and
        // filter ones where the third element is a whole number
        Stream<int[]> pythagoreanTriples2 = 
            IntStream.rangeClosed(1, 100).boxed()
                .flatMap(a -> IntStream.rangeClosed(a, 100)
                .mapToObj(b -> new double[]{a, b, Math.sqrt(a * a + b * b)})
                .filter(t -> t[2] % 1 == 0))
                .map(array -> Arrays.stream(array).mapToInt(a -> (int) a).toArray());
    pythagoreanTriples2.forEach(t -> System.out.println(t[0] + ", " + t[1] + ", " + t[2]));

    } // end of Main
} // end of Class
