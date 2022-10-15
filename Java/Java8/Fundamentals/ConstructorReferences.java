package Java.Java8.Fundamentals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * Syntax: ClassName::new
 * 
 * Can create a reference to an existing constructor using its name
 * and the keyword new
 */
public class ConstructorReferences {
    
    // Zero-Arg Constructor 
    // Supplier<Apple> c1 = () -> new Apple();
    Supplier<Apple> c1 = Apple::new;
    Apple a1 = c1.get();

    // One-Arg Constructor, fits signature of Function interface
    // Function<Integer, Apple> c2 = (weight) -> new Apple(weight);
    Function<Integer, Apple> c2 = Apple::new;
    Apple a2 = c2.apply(110);

    // Two-Arg Constructor, Apple (String color, Integer weight) fits
    // signature of BiFunction interface
    // BiFunction<String, Integer, Apple> c3 = (color, weight) -> new Apple(color, weight);
    BiFunction<String, Integer, Apple> c3 = Apple::new;
    Apple a3 = c3.apply("green", 110);

    // Another Two-Arg Constructor
    BiFunction<Integer, String, Apple> c4 = Apple::new;
    Apple a4 = c4.apply(125, "blue");

    // Passing a Constructor Reference to a Map Method
    // This results in a List of Apples with various weights
    public List<Apple> map(List<Integer> list, Function<Integer, Apple> f) {
        List<Apple> result = new ArrayList<>();
        for(Integer i: list) {
            result.add(f.apply(i)); // Function's apply method
        }
        return result;
    }
    List<Integer> weights = Arrays.asList(7, 3, 4, 10); // Various Weights
    List<Apple> apples = map(weights, Apple::new);  // Pass the Constructor to map method


    // Three-Argument Constructor needs a new functional interface to match signature
    public interface TriFunction<T, U, V, R> {
        R apply(T t, U u, V v);
    }

    TriFunction<Integer, Integer, Integer, Apple> appleFactory; // = Apple::new;
}
