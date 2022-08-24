package Java.Java8.Streams;

import static java.util.stream.Collectors.toList;   // for collect(toList())

import java.util.Arrays;
import java.util.List;

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

    public static void showMenu(){
        List<String> dishNames = menu.stream()
            .map(Dish::getName)
            .collect(toList());
        System.out.print("menu: ");
        System.out.println(dishNames);
    }
    
    public static void main(String[] args){
        showMenu();
        System.out.println("======== Finding at least one element that matches ========");
        if(menu.stream().anyMatch(Dish::isVegetarian)){
            System.out.println("The menu has a vegetarian dish.");
        }

        System.out.println("\n======== Check if all elements of a stream match"
            + "a given predicate========");
        boolean isHealthful = menu.stream() 
                                  .allMatch(dish -> dish.getCalories() < 1000);
        System.out.println("Is every dish less than 1000 calories? " + isHealthful);

        
    }
}
