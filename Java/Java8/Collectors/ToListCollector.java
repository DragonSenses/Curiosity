package Java.Java8.Collectors;

import java.util.ArrayList;

import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

import static java.util.stream.Collector.Characteristics.*;

/**
 * Developing a ToListCollector. 
 */
public class ToListCollector<T> implements Collector<T, List<T>, List<T>>{
    
    /**
     * The Supplier Method
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
