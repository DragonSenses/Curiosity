package Java.Java8.Collectors;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java

import java.util.List;
import static java.util.stream.Collectors.toList;


/**
 * Grouping is a common databse operation where items in a set are grouped
 * based on one or more properties. 
 * 
 * For Instance, we can:
 * 1. Classify the dishes in the menu accordifing to their type 
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.
 */
public class Grouping {
    
    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Group Dishes based on Type ========");
    }

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
}
