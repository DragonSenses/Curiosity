package Java.Java8.Collectors;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java
import static Java.Java8.Collectors.Dish.dishTags;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.filtering;

/**
 * Grouping is a common databse operation where items in a set are grouped
 * based on one or more properties. 
 * 
 * For Instance, we can:
 * 1. Group the dishes in the menu according to their type 
 * 2. Classify dishes based on caloric levels
 * 3. Manipulate elements in each resulting group, such as filtering only
 * caloric dishes
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
 * 
 * -Collectors class overloads the groupingBy() method with one
 * variant that accepts a classfication function and a Collector as a 2nd argument
 * 
 * -Collectors.filtering() - Results in a Collector with the filtered elements
 * using a filtering predicate
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

    // Create a set of enumerated values that will mark a dish as Diet, Normal,
    // or Fat based on its number of Calories
    public enum CaloricLevel{ DIET, NORMAL, FAT }

    /**
     * 2. Classify dishes with something more complex than a simple property
     * accessor. Here we classify dishes based on CaloricLevel, where
     * -Diet = 400 Calories or Fewer
     * -Normal = 400-700 Calories
     * -Fat = 700 Calories or more
     * @return a Map with CaloricLevel as Key and List of all dishes as values
     */
    private static Map<CaloricLevel, List<Dish>> groupDishesByCaloricLevel() {
        return menu.stream().collect(
            groupingBy(dish -> {    // Classification Function with Lambda Expression
              if (dish.getCalories() <= 400) {
                return CaloricLevel.DIET;
              }
              else if (dish.getCalories() <= 700) {
                return CaloricLevel.NORMAL;
              }
              else {
                return CaloricLevel.FAT;
              }
            })
        );
    }

    /**
     * 3. Manipulate Elements in a Resulting Group, filtering out by Calories
     * 
     * One solution applies filter() to the stream itself, but the drawback is 
     * that if there is no Dish.Type that satisfies the predicate the key
     * will disappear from the mapping. For instance, there is no Dish.Type FISH
     * that is greater than 500 calories. 
     * 
     * Instead, to keep the entry for FISH type and map to an empty list, use
     * a Collector made from filtering() as a 2nd argument to overloaded method
     * of groupingBy(). 
     * @return a Map of Caloric Dishes greather than 500 calroies, grouped by Type
     */
    private static Map<Dish.Type, List<Dish>> groupCaloricDishesByType() {
        //return menu.stream().filter(dish -> dish.getCalories() > 500).collect(groupingBy(Dish::getType));
        return menu.stream().collect(
            groupingBy(Dish::getType,
                filtering(dish -> dish.getCalories() > 500, toList())));
    }

    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Grouping Dishes in the Menu ========");
        System.out.println("[Dishes grouped by type]\n " + groupDishesByType());
        System.out.println("\n[Dishes grouped by caloric level]\n " + groupDishesByCaloricLevel());
        System.out.println("\n[Caloric dishes (>500 Cal) grouped by type]\n " + groupCaloricDishesByType());
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
