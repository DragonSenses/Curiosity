package Java.Java8.Streams;

import static java.util.stream.Collectors.toList;   // for collect(toList())

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Finding whether some elements in a set of data match a given property.
 * 
 * ================================= Methods =================================
 * -anyMatch() - checks if a predicate matches at least one element, a terminal
 * operation that returns a boolean
 * 
 * -allMatch() - check if all elements of a stream match a given predicate
 * 
 * -noneMatch() - ensures that no elements in the stream match the given predicate
 * 
 * -findAny() - returns an arbitrary element of the current stream
 * 
 * -findFirst() - finds the first element given a stream that has an encounter
 * order that specifies the order in which items logically appear in the stream
 */
public class FindingStreams {
    public static final List<Dish> menu = Arrays.asList(
        new Dish("pork", false, 800, Dish.Type.MEAT),
        new Dish("beef", false, 700, Dish.Type.MEAT),
        new Dish("chicken", false, 400, Dish.Type.MEAT),
        new Dish("french fries", true, 530, Dish.Type.OTHER),
        new Dish("rice", true, 350, Dish.Type.OTHER),
        new Dish("season fruit", true, 120, Dish.Type.OTHER),
        new Dish("pizza", true, 550, Dish.Type.OTHER),
        new Dish("prawns", false, 400, Dish.Type.FISH),
        new Dish("salmon", false, 450, Dish.Type.FISH)
    );

    // Prints the available menu and respective calories
    public static void showMenu(){
        List<String> dishNames = menu.stream()
            .map(Dish::getName)
            .collect(toList());
        System.out.print("menu: ");
        System.out.println(dishNames);
        List<Integer> dishCalories = menu.stream()
            .map(Dish::getCalories)
            .collect(toList());
        System.out.print("Cals: ");
        System.out.println(dishCalories);    
    }
    
    public static void main(String[] args){
        showMenu();
        System.out.println("======== Finding at least one element that matches ========");
        if(menu.stream().anyMatch(Dish::isVegetarian)){
            System.out.println("The menu has a vegetarian dish.");
        }

        System.out.println("\n======== Check if all elements of a stream match"
            + "a given predicate ========");
        boolean isHealthful = menu.stream() 
                                  .allMatch(dish -> dish.getCalories() < 1000);
        System.out.println("Is every dish less than 1000 calories? " + isHealthful);

        System.out.println("\n======== Ensure that no elements in the stream match"
            + "a given predicate ========");
        isHealthful = menu.stream() 
            .noneMatch(dish -> dish.getCalories() >= 1000);
        System.out.println("Is there any dish greater than 1000 calories? " + isHealthful);

        System.out.println("\n======== Finding any arbitrary element that matches ========");
        Optional<Dish> dish = menu.stream()
            .filter(Dish::isVegetarian)
            .findAny(); // Returns an Optional<Dish> 

        dish.ifPresent(d -> System.out.println(d.getName()));

        System.out.println("\n======== Optional<T> in a nutshell ========");
        /**
         * Optional is a container class to represent the existence or absence of a value.
         * If finyAny() does not find any element, it returns Optional<T> rather
         * than null (error-prone)
         * 
         * ============================== Methods =============================
         * 
         * -isPresent() - returns true if Optional contains a value, false otherwise
         * 
         * -isPresent(Consumer<T> block) - executes the given block if a value is 
         * present. A Consumer functional interface lets you pass a lambda that takes
         * an argument of type T and returns void
         * 
         * -T get() - returns the value if present; otherwise throws a NoSuchElementException.
         * 
         * -T orElse(T other) returns the value if present; otherwise it returns
         * a default value
         */
        System.out.println("Optional<Dish> dish is present?" + dish.isPresent());
        System.out.println("dish name?" + dish.get().getName());
        Optional<Dish> opt = menu.stream().filter(d -> d.getCalories() > 3000).findAny();
        System.out.println("Is there any dish greater than 3000 calories? " + opt.isPresent());

        System.out.println("Is there any dish greater than 3000 calories? " + opt.isPresent());


        System.out.println("\n======== Find the first element that matches ========");
        // Use findAny() over findFirst() as it is more constraining in parallel
    }
}
