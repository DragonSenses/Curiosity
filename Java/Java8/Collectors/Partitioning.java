package Java.Java8.Collectors;

import java.util.List;

import static java.util.stream.Collectors.toList;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java

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
 * 3. 
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

    
    public static void main(String[] args) {
        showMenu();
        System.out.println("\n======== Grouping Dishes in the Menu ========");
        // System.out.println("[Dishes grouped by type]\n " + groupDishesByType());
  
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
