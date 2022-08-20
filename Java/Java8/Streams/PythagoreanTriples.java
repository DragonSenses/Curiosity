package Java.Java8.Streams;

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
 */
public class PythagoreanTriples {
    
}
