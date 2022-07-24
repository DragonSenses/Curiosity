package Java.Java8;

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

}
