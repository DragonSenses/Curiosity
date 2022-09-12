package Java.Java8.Collectors;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java
import static Java.Java8.Collectors.Dish.dishTags;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.groupingBy;

/**
 * Grouping is a common databse operation where items in a set are grouped
 * based on one or more properties. 
 * 
 * For Instance, we can:
 * 1. Group the dishes in the menu according to their type 
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.groupingBy() - a factory method that takes in a Function, and
 * returns a Map having as map key the value returned by classification 
 * function and corresponding map value a list of all items in the stream
 * that have thhat classified value. 
 * (Ex. Menu-Classification: {Key = Dish.Type, Value = List of Dishes of that Type})
 */
public class Grouping {
    
    /**
     * 1. We pass in a classification Function (a method reference) which 
     * extracts the Dish.Type for each Dish in the Stream. This returns a
     * map whose keys are Dish.Type and values are List of all dishes of
     * that Type
     */
    private static Map<Dish.Type, List<Dish>> groupDishesByType() {
        return menu.stream().collect(groupingBy(Dish::getType));
    }

    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Group Dishes based on Type ========");
        System.out.println("[Dishes grouped by type]\n" + groupDishesByType());
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
