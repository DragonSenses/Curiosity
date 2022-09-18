package Java.Java8.Collectors;

import java.util.List;
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
     * The Supplier Method: Making a New Result Container
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
    public Supplier<List<T>> supplier(){
        return ArrayList::new;  // Creates the collection operation starting point    
    }

    /**
     * The Accumulator Method: Adding an Element to a Result Container
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
    @Override
    public BiConsumer<List<T>, T> accumulator(){
         // Accumulates the traversed item, modifying accumulator in place
        return List::add;  
    }
    
    /**
     * The Finisher Method: Applying the Final Transformation to the Result Container
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
    @Override
    public Function<List<T>, List<T>> finisher(){
        return Function.identity(); // Identifies Function
    }
    
    /**
     * The Combiner Method:  Merging Two Result Containers 
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
    @Override
    public BinaryOperator<List<T>> combiner(){
        return(list1, list2) -> {
            list1.addAll(list2);
            return list1; 
        };
    }
    
    /**
     * The Characteristics Method
     * Returns an immutable set of Characteristics, defining the behavior of the
     * collector—in particular providing hints about whether the stream can be
     * reduced in parallel and which optimizations are valid when doing so.
     * 
     * Characteristics is an enumeration containing three items:
     * I) UNORDERED—The result of the reduction isn’t affected by the order in
     * which the items in the stream are traversed and accumulated.
     * 
     * II) CONCURRENT—The accumulator function can be called concurrently from 
     * multiple threads, and then this collector can perform a parallel reduction
     * of the stream. If the collector isn’t also flagged as UNORDERED, it can 
     * perform a parallel reduction only when it’s applied to an unordered data source.
     * 
     * III) IDENTITY_FINISH—This indicates the function returned by the finisher
     * method is the identity one, and its application can be omitted. In this case,
     * the accumulator object is directly used as the final result of the reduction
     * process. This also implies that it’s safe to do an unchecked cast from the
     * accumulator A to the result R.
     */
    @Override
    Set<Characteristics> characteristics();
}
