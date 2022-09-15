package Java.Java8.Collectors;
// Use file Dish.java within same package
import static Java.Java8.Collectors.Dish.menu; 

// Import Data Structures
import java.util.List;
import java.util.Map;
import java.util.Optional;

// Import java.util.stream.Collector static methods
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.partitioningBy;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.maxBy;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.Comparator.comparingInt;

/**
 * Partitioning is a special case of grouping: having a predicate called a
 * partitioning function as a classfication function.
 * 
 * Partitioning function returns a boolean and the resulting grouping Map will
 * have a Boolean as a key type, therefore, there can be at most two different
 * groups - True or False. 
 * 
 * Advantages of Partitioning
 * - Keeps both lists of stream elements, for which application of the 
 * partitioning function returns true or false
 * - Internal Map implementation returned by partitioningBy() is more compact 
 * and efficient as it is only needs to contain two keys: true or false
 * 
 * Examples:
 * 1. Partition the menu into vegetarian and nonvegetarian dishes 
 * 2. Using the partitioned map use the predicate and its negation to retrieve
 * nonvegetarian dishes
 * 3. Using overloaded partioningBy() method, pass a second collector to also
 * group vegetarian and nonvegetarian dishes by type, producing a two-level Map
 * 4. Reuse earlier code that finds most caloric dish, and find the most 
 * caloric dish between vegetarian and nonvegetarian dishes
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -partitioningBy(f) - takes a partitioning function and splits the elements
 * into a Map with two different groups, True or False as keys
 * 
 * -partioningBy(f,collector) - overloaded method that takes partitioning 
 * function and a second collector to produce a multi-leveled Map. 
 */
public class Partitioning {

    /**
     * 1. Partition the menu by Vegetarian and Non-Vegetarian dishes
     * 
     * @return Map with keys True and False, and Values as dishes that
     * are vegetarian and nonvegetarian
     */
    private static Map<Boolean, List<Dish>> partitionByVegetarian() {
        return menu.stream().collect(partitioningBy(Dish::isVegetarian));
    }

    /**
     * 2. Use the predicates negation to retrieve nonvegetarian dishes
     * 
     * @return Map with dishes as nonvegetarian
     */
    private static List<Dish> partitionByNonVegetarian(){
        Map<Boolean, List<Dish>> partitionedMenu 
            = menu.stream().collect(partitioningBy(Dish::isVegetarian));

        return partitionedMenu.get(false);
    }

    /**
     * 3. Using overloaded partioningBy() method, pass a second collector to also
     * group vegetarian and nonvegetarian dishes by type, producing a two-level Map
     * 
     * @return a Two-Level Map that partitions the menu by vegetarian or not, and 
     * grouped by Dish Type
     */
    private static Map<Boolean, Map<Dish.Type, List<Dish>>> vegetarianDishesByType() {
        return menu.stream().collect(partitioningBy(Dish::isVegetarian, groupingBy(Dish::getType)));
    }

    /**
     * 4. Reuse earlier code that finds most caloric dish, and find the most 
     * caloric dish between vegetarian and nonvegetarian dishes
     * 
     * @return Finds the most caloric dish between vegetarian and nonvegetarian dishes
     */
    private static Map<Boolean,Dish> mostCaloricPartitionedByVegetarian() {
        return menu.stream().collect(
            partitioningBy(Dish::isVegetarian,
                collectingAndThen(
                    maxBy(comparingInt(Dish::getCalories)),
                    Optional::get)));
    }

    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Partition Menu by Vegetarian Dishes ========");
        System.out.println("[Dishes partitioned by vegetarian]\n " + partitionByVegetarian());

        System.out.println("\n======== Retrieve Non-Vegetarian Dishes ========");
        System.out.println("[Dishes partitioned by nonvegetarian]\n " + partitionByNonVegetarian());

        System.out.println("\n======== Partition by Predicate and Group by Type ========");
        System.out.println("[Vegetarian Dishes by type]\n " + vegetarianDishesByType()); // Two-Level Map
  
        System.out.println("\n======== Find most Caloric Dish between Partitioned Menu ========");
        System.out.println("[Most caloric dishes by vegetarian]\n " + mostCaloricPartitionedByVegetarian());
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
