package Java.Java8.Lambdas;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Prefer Lambdas to Anonymous Classes. 
 * 
 * The Comparator interface represents an abstract strategy for sorting; 
 * the anonymous class above is a concrete strategy for sorting strings.
 * The verbosity of anonymous classes, however, made functional programming
 * in Java an unappealing prospect.
 * 
 * In Java 8, the language formalized the notion that interfaces with a single
 * abstract method are special and deserve special treatment. These interfaces
 * are now known as functional interfaces, and the language allows you to create
 * instances of these interfaces using lambda expressions, or lambdas for short.
 * 
 * Lambdas are similar in function to anonymous classes, far more concise. 
 */
public class LambdasOverAnonymous {
    
    private LambdasOverAnonymous() {} // prevent instantiation

    /* Sort a list of Strings in order of length */

    /**
     * Sort a list of Strings in order of length, using Anonymous Class.
     * @param words list of Strings to sort
     */
    public static void sortWithAnonymousClass(List<String> words){
        // Anonymous class instance as a function object - obsolete!
        Collections.sort(words, new Comparator<String>() {
            public int compare(String s1, String s2) {
                return Integer.compare(s1.length(), s2.length());
            }
        });
    } 

    /**
     * Sort a list of Strings in order of length, using a Lambda Expression.
     * @param words list of Strings to sort
     */
    public static void sortWithLambda(List<String> words){
        // Lambda expression as function object (replaces anonymous class)
        Collections.sort(words,
                (s1, s2) -> Integer.compare(s1.length(), s2.length()));
    } 
    
    public static void main(String[] args){
        List<String> list = List.of("1234567", "12345", "123", "1234");
    }   
}
