package Java.Java8.Collectors;

import java.util.*;
import java.util.function.*;
import java.util.stream.Collector;
import static java.util.stream.Collector.Characteristics.*;

/**
 * Developing a ToListCollector. 
 */
public class ToListCollector<T> implements Collector<T, List<T>, List<T>>{
    
    @Override
    Supplier<A> supplier();

    @Override
    BiConsumer<A, T> accumulator();
    
    @Override
    Function<A, R> finisher();
    
    @Override
    BinaryOperator<A> combiner();
    
    @Override
    Set<Characteristics> characteristics();
}
