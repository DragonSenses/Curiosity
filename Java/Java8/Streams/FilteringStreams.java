package Java.Java8.Streams;

import static java.util.stream.Collectors.toList;   // for collect(toList())

import java.util.Arrays;
import java.util.List;

/**
 * Demonstrate ways to Filter a Stream
 */
public class FilteringStreams {
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
        System.out.println("======== Filtering with a Predicate ========");
        List<Dish> vegetarianMenu = menu.stream()
            .filter(Dish::isVegetarian)     // Predicate
            .collect(toList());
            
        vegetarianMenu.forEach(System.out::println);

        System.out.println("\n======== Filtering Unique Elements ========");
        List<Integer> numbers = Arrays.asList(1, 2, 1, 3, 3, 2, 4);
        System.out.println("List of Numbers: " + numbers );

        numbers.stream()
            .filter(i -> i % 2 == 0)
            .distinct()             // Using distinct()
            .forEach(System.out::println);

        System.out.println("\n======== Slicing a Stream ========");
        // Sorted in ascending order of number of calories!
        List<Dish> specialMenu = Arrays.asList(
            new Dish("season fruit", true, 120, Dish.Type.OTHER),
            new Dish("prawns", false, 300, Dish.Type.FISH),
            new Dish("rice", true, 350, Dish.Type.OTHER),
            new Dish("chicken", false, 400, Dish.Type.MEAT),
            new Dish("french fries", true, 530, Dish.Type.OTHER));
        System.out.println("Filtered sorted menu:");
        List<Dish> filteredMenu = specialMenu.stream()
            .filter(dish -> dish.getCalories() < 320)   // Select elements until cal < 320
            .collect(toList());
        filteredMenu.forEach(System.out::println);
        // Downside to filter() is that it iterates through the whole stream and
        // have the predicate applied to each element 
        System.out.println("\n======== Slicing using takeWhile() ========");
        // Initial List is already sorted, so stop once you found an element that
        // satisfies the predicate
        // takeWhile() stops once it has found an element that fails to match
        List<Dish> slicedMenu1 = specialMenu.stream()
            .takeWhile(dish -> dish.getCalories() < 320)
            .collect(toList());
        slicedMenu1.forEach(System.out::println);

        System.out.println("\n======== Slicing using dropWhile() ========");
        // Complement of takeWhile(), throws away elements at the start where
        // predicate is false. Once predicate evaluates to true it stops and
        // returns all the remaining elements
        List<Dish> slicedMenu2 = specialMenu.stream()
            .dropWhile(dish -> dish.getCalories() < 320)    // keep dropping until this cal < 320
            .collect(toList());
        slicedMenu2.forEach(System.out::println);
        System.out.println("\n======== Limit or Truncating a Stream ========");
        // limit() returns another stream that's no longer than a given size
        // Requested size is passed in as argument to limit
        // If stream is ordered, first elements returned up to maximum of n
        // If unordered (for instance, if source is a Set) then should not 
        // assue any order on the result produced by limit
        List<Dish> dishesLimit3 = menu.stream()
            .filter(d -> d.getCalories() > 300)
            .limit(3)
            .collect(toList());
        System.out.println("Truncating a stream:");
        dishesLimit3.forEach(System.out::println);

        System.out.println("\n======== Skipping Elements of a Stream ========");
    } // end of main
} // end of Class
