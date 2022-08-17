package Java.Java8.Streams;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

// Java 8 Imports
import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

/**
 * Demonstrate a new way to Make and Process collections. 
 * 
 * Usually database-like operations such as grouping a list, finding a certain item.
 * 
 * - A Stream is a sequence of elements from a source that supports data-processing 
 * operations.
 * - Streams make use of internal iteration: the iteratio nis abstracted away throgh
 * operations such as filter, map, and sorted
 * - Two types of Stream Operations: Intermediate and Terminal Operations
 * - Intermediate operations (such as filter and map) return a stream and can be 
 * chained together. They're used to set up a pipeline of operations but don't 
 * produce any result
 * - Terminal Operations such as forEach and count return a non-stream value and 
 * process a stream pipeline to return a result
 * - Elements of a stream are computed on demand ("lazily")
 * 
 */
public class DishStream {

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

    public static void main(String[] args) {
        System.out.println("\n======== Extracting the names of certain elements ========");
        // Java 7 way
        // 1. Filter the elements Using an Accumulator
        List<Dish> lowCaloricDishes = new ArrayList<>();
        for (Dish dish : menu) {
            if (dish.getCalories() < 400) {
                lowCaloricDishes.add(dish);
            }
        }

        // 2. Sort the dishes with an anonymous class
        Collections.sort(lowCaloricDishes, new Comparator<Dish>() {
            public int compare(Dish dish1, Dish dish2) {
            return Integer.compare(dish1.getCalories(), dish2.getCalories());
            }
        }); 

        // 3. Process the sorted list to select the names of dishes
        List<String> lowCaloricDishesName = new ArrayList<>();
        for(Dish dish: lowCaloricDishes) {
            lowCaloricDishesName.add(dish.getName());
        }
        System.out.println("Dishes Less than 400 Calories:");
        System.out.println("List:\t" + lowCaloricDishesName);

        // Java 8 way
        lowCaloricDishesName = 
                        menu.stream()   
                        .filter(d -> d.getCalories() < 400)     // Select dishes below 400 calories
                        .sorted(comparing(Dish::getCalories))   // Sorts by calories
                        .map(Dish::getName)     // Extracts the names of these dishes
                        .collect(toList());     // Stores all the names in a List

        // Java 8, exploit multicore architecture and execute code in parallel
        // change stream() to parallelStream()
        lowCaloricDishesName = 
                        menu.parallelStream()                   // Change to parallelStream()  
                        .filter(d -> d.getCalories() < 400)     // Select dishes below 400 calories
                        .sorted(comparing(Dish::getCalories))   // Sorts by calories
                        .map(Dish::getName)     // Extracts the names of these dishes
                        .collect(toList());     // Stores all the names in a List
        
        
        System.out.println("Stream:\t" + lowCaloricDishesName);

        System.out.println("\n======== Operations merged into the same pass ========");
        List<String> names =
            menu.stream()
                .filter(dish -> {
                                    System.out.println("filtering:" + dish.getName());
                                    return dish.getCalories() > 300;
                                }) // Print Dishes as they are filtered
                .map(dish -> {
                                    System.out.println("mapping:" + dish.getName());
                                    return dish.getName();
                                }) // Print dishes as you extract their names
                .limit(3) // Only first three are selected, technique: short-circuiting
                .collect(toList());
        // Notice how filter and map are two separate operations, but merged into the same pass
        // This called loop fusion by compiler experts
        System.out.println("\nResult of filter(calories > 300), map(name), limit(3), collect(toList())");
        System.out.println(names);
        
        System.out.println("\n======== Method Reference for Vegetarian Dishes ========");
        List<Dish> vegetarianMenu = menu.stream()
                                        .filter(Dish::isVegetarian)
                                        .collect(toList());
        for(Dish d: vegetarianMenu) {
            System.out.println(d);
        }

        System.out.println("\n======== Streams, printing out every Element ========");
        menu.stream().forEach(System.out::println);
    } // end of main
} // end of class
