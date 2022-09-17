package Java.Java8.Collectors;

import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector.Characteristics;

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
 * Signature Breakdown: "public interface Collector<T, A, R>" 
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
 * 
 * ======= Making sense of the Methods declared by Collector interface =======
 * 
 * - Notice how the first four methods returns a function that will be invoked 
 * by the collect() method
 * - The fifth method, characteristics, provides a set of characteristics 
 * that's a list of hints used by the collect() method itself to know which 
 * optimizations(i.e. parallelization) it's allowed to employ while performing
 * the reduction operation.
 * - The first three methods are enough to execute a sequential reduction of
 * the stream. The implementation details are a bit more difficult in practice
 * due to both the lazy nature of the stream and which could require a pipeline 
 * of other intermediate operations to execute before the collect() operation,
 * and possibility - in theory - of performing the reduction in parallel
 * 
 * 1) supplier()
 * 2) accumulator()
 * 3) finisher()
 * 4) combiner()
 * 5) characteristics()
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
     * One can also pass a constructor reference.
     * 
     * @return a Supplier of an empty accumulator
     */
    Supplier<A> supplier();
    
    /**
     * 2. Adding an Element to a Result Container: The Accumulator Method
     * Returns the function that performs the reduction operation. While 
     * traversing the nth element in the stream, this function is applied
     * with two arguments:
     * 1) the accumulator being the result of the reduction 
     * (after having collected the first n-1 items of the stream) 
     * 2) and the nth element itself. 
     * 
     * The function returns void because the accumulator is modified in place,
     * meaning that its internal state is changed by the function application 
     * to reflect the effect of the traversed element. 
     * 
     * For ToListCollector, this function merely has to add the current item to
     * the list containg the already traversed ones. 
     * @return the function that performs the reduction operation
     */
    BiConsumer<A, T> accumulator();

    /**
     * 3. Applying the Final Transformation to the Result Container: The Finisher Method
     * Has to return a function that's invoked at the end of accumulation process,
     * after having completely traversed the stream, in order to transform the 
     * accumulator object into the final result of the whole collection operation. 
     * 
     * In ToListCollector, often as in this case, the accumulator object already
     * coincides with the final expected result. As a consequence, there's no need
     * to perform a transformation, so the finisher method has to return the 
     * identity function 
     * @return returns a function that's invoked at the end of the accumulation
     * process, aftering having completely traversed the stream, in order to 
     * transform the accumulator object into the final result of the whole 
     * collection operation; often just returns identity function
     */
    Function<A, R> finisher();

    /**
     * 4. Merging Two Result Containers: The Combiner Method
     * Returns a function used by the reduction operation, defines how accumulators
     * resulting from the reduction of different subparts of the stream are 
     * combined when the subparts are processed in parallel. 
     * 
     * In toList case, the implementation is simple: add the list containing
     * the items gathered from the second subpart of the stream to the end of 
     * the list obtained when traversing the first subpart
     * 
     * This fourth method allows a parallel reduction of the stream, as it uses
     * the fork/join framework introduced in Java 7 and Spliterator abstraction.
     * 
     * @return a function used by the reduction operation, defines how accumulators
     * resulting from the reduction of different subparts of the stream are
     * combined when the subparts are processed in parallel. 
     */
    BinaryOperator<A> combiner();
    
    /**
     * 5) The Characteristics Method
     * Returns an immutable set of Characteristics, defining the behavior of the
     * collector—in particular providing hints about whether the stream can be
     *  reduced in parallel and which optimizations are valid when doing so.
     * 
     * Characteristics is an enumeration containing three items: 
     * I) UNORDERED — The result of the reduction isn’t affected by the order in
     *    which the items in the stream are traversed and accumulated.
     * II) CONCURRENT — The accumulator function can be called concurrently from
     * multiple threads, and then this collector can perform a parallel reduction
     * of the stream. If the collector isn’t also flagged as UNORDERED, it can
     * perform a parallel reduction only when it’s applied to an unordered data source.
     * III) IDENTITY_FINISH — This indicates the function returned by the finisher
     *  method is the identity one, and its application can be omitted. In this case,
     * the accumulator object is directly used as the final result of the reduction process.
     *  This also implies that it’s safe to do an unchecked cast from the
     *  accumulator A to the result R. 
     * 
     * @return an immutable set of Characteristics, defining the bahvior of the
     * collector - in particular hints about whether the stream can be reduced 
     * in parallel and which optimizations are valid when doing so
     */
    Set<Characteristics> characteristics();
}
