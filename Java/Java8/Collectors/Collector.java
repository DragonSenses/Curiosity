package Java.Java8.Collectors;

import java.util.function.Supplier;

/**
 * Collector interface consists of a set of methods that provide a blueprint
 * for how to implement specific reduction operations (Collectors).
 * 
 * Examples that implement the Collector interface are:
 * -toList()
 * -groupingBy()
 * 
 * This implies that you're free to create customized reduction operations by
 * providing your own implementation of the Collector interface. 
 * 
 * Signature Breakdown: 
 * 
 * public interface Collector<T, A, R> 
 * 
 * T - the generic type of the items in the Stream to be collected
 * A - the type of Accumulator, the object on which the partial result will be
 *     accumulated during the collection process
 * R - the type of Object (typically, but not always, the Collection) resulting
 *     from the collect operation
 * 
 * For instance, ToListCollector<T> class that gathers all elements of a 
 * Stream<T> into a List<T> have the following signature:
 * 
 * public class ToListCollector<T> implements Collector<T, List<T>, List<T>>
 * 
 * ================================= Methods =================================
 * - Notice how the first four methods returns a function that will be invoked 
 * by the collect() method
 * - The fifth method, characteristics, provides a set of characteristics 
 * that's a list of hints used by the collect() method itself to know which 
 * optimizations(i.e. parallelization) it's allowed to employ while performing
 * the reduction operation.
 * 
 */
// public interface Collector<T, A, R> {
//     Supplier<A> supplier();
//     BiConsumer<A, T> accumulator();
//     Function<A, R> finisher();
//     BinaryOperator<A> combiner();
//     Set<Characteristics> characteristics();
// }
public interface Collector<T, A, R> {
    /**
     * 1) Making a New Result Container: The Supplier Method
     * Returns a supplier of an empty accumulator - a parameterless function
     * that when invoked creates an instance of an empty accumulator used 
     * during the collection process. 
     * 
     * For a collector returning the accumulator itself as a result, like 
     * ToListCollector this empty accumulator will also represent the 
     * result of the collection process when performed on an empty stream. 
     * 
     * In ToListCollector, thhe supplier will return an empty List.
     * 
     * @return a Supplier of an empty accumulator
     */
    Supplier<A> supplier();
    
    BiConsumer<A, T> accumulator();
    Function<A, R> finisher();
    BinaryOperator<A> combiner();
    Set<Characteristics> characteristics();
}
