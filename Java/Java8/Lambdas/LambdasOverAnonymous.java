package Java.Java8.Lambdas;

import java.util.ArrayList;
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
 * 
 * Omit the types of all lambda parameters unless their presence makes your
 * program clearer. If the compiler generates an error telling you it can’t infer
 * the type of a lambda parameter, then specify it. Sometimes you may have to cast
 * the return value or the entire lambda expression.
 */
public class LambdasOverAnonymous {
    
    public static List<String> makeList(){
        List<String> list = new ArrayList<>();
        list.add("abc");
        list.add("1234567");
        list.add("ab");
        list.add("1234");
        list.add("The secret of getting ahead is getting started. ~Mark Twain");
    }

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
     * 
     * Note that the types of the lambda (Comparator<String>), of its parameters
     * (s1 and s2, both String), and of its return value (int) are not present
     * in the code. The compiler deduces these types from context, using a
     * process known as type inference.
     * @param words list of Strings to sort
     */
    public static void sortWithLambda(List<String> words){
        // Lambda expression as function object (replaces anonymous class)
        Collections.sort(words,
                (s1, s2) -> Integer.compare(s1.length(), s2.length()));
    } 
    
    public static void main(String[] args){
        List<String> list = makeList();
        
    }   
}
