package Java.Java8.Collectors;

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
 * Breakdown: public interface Collector<T, A, R> 
 * T - the generic type of the items in the Stream to be collected
 * A - the type of Accumulator, the object on which the partial result will be
 *     accumulated during the collection process
 * R - the type of Object (typically, but not always, the Collection) resulting
 *     from the collect operation
 */
public interface Collector<T, A, R> {
    Supplier<A> supplier();
    BiConsumer<A, T> accumulator();
    Function<A, R> finisher();
    BinaryOperator<A> combiner();
    Set<Characteristics> characteristics();
}
