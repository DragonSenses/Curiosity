package Java.AutoBoxing; // Primitive Specializations

import java.util.List;
import java.util.ArrayList;
import java.util.function.Predicate;
import java.util.function.IntPredicate;


/**
 * Every Java type is either a reference type or a primitive type. But
 * generic parameters can be bound only to reference types, due to how
 * generics are internally implemented. As a result, in Java there are
 * these mechanisms:
 * 1. Boxing mechanism converts a primitive type into a corresponding
 *    reference type (Example: int gets boxed to an Integer)
 * 2. Unboxing mechanism converts a reference type into a corresponding
 *    primitive type.
 * 3. Autoboxing in Java facilitates the task for programmers by having
 *    boxing and unboxing operations done automatically.
 * 
 * HOWEVER, Autoboxing comes with a performance cost. Boxed values are a
 * wrapper around primitive types and are stored on the heap. Therefore,
 * boxed values use more memory and require additional memory lookups to
 * fetch the wrapped primitive value. 
 * 
 * Java 8 added specialized versions of the functional interfaces in 
 * order to avoid autoboxing operations. when the inputs or outputes
 * are primitives. We will explore how to do this here. 
 */
public class AutoBoxing {
    
    // The following is Functional Interface is provided by 
    // java.util.function.IntPredicate

    // @FunctionalInterface
    // public interface IntPredicate {
    //     boolean test(int t);
    // }

    public static void main(String[] args){

        /** Autoboxing mechanism in Action, an int gets boxed to an Integer **/
        // Create a list of objects that have the type Integer 
        List<Integer> list = new ArrayList<>(); 
        for(int i = 1510; i < 1610; i++){
            list.add(i); // Here int i gets boxed into Integer
        }

        // Unboxing
        // Even though we use operators & and + which aren't available to object
        // type Integer, code compiles because compiler unboxes the wrapper type
        int sum = 0;
        for (Integer n: list){
            // is n even? Check its least significant bit if 0
            if((n & 1) == 0 ) {     // n looks more like i.intValue() when unboxing
                sum += n;   // add to the sum if n is even
            }
        }
        System.out.println("Sum of even numbers within list is: " + sum);

        // Using a Predicate<Integer> would box the argument 1024 to an Integer object
        Predicate<Integer> oddNumbers = (Integer i) -> (i & 1) == 1; // False (Boxing)
        oddNumbers.test(1024);
        IntPredicate evenNumbers = (int i) -> (i & 1) == 0; // True (No Boxing)
        evenNumbers.test(1024);

        System.out.println("Is 1024 Odd? -> " + oddNumbers.test(1024));
        System.out.println("Is 1024 Even? -> " + evenNumbers.test(1024));

        // To summarize, we can use the appropriate functional interfaces that have a 
        // specialization for the input type parameter. For example, DoublePredicate,
        // IntConsumer, IntFunction, LongBinaryOperator, and so on. This way we can
        // avoid autoboxing and increase performance for our programs
    }
}
