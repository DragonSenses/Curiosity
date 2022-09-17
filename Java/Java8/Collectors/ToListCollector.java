package Java.Java8.Collectors;

import java.util.*;
import java.util.function.*;


/**
 * Developing a ToListCollector. 
 */
public class ToListCollector<T> implements Collector<T, List<T>, List<T>>{
    Supplier<A> supplier();
    BiConsumer<A, T> accumulator();
    Function<A, R> finisher();
    BinaryOperator<A> combiner();
    Set<Characteristics> characteristics();
}
