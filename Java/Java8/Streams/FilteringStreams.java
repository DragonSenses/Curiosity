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
            .filter(Dish::isVegetarian)
            .collect(toList());
            
        vegetarianMenu.forEach(System.out::println);




        System.out.println("\n======== Filtering with a Predicate ========");
    } // end of main
} // end of Class
