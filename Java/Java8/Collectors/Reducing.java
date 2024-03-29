package Java.Java8.Collectors;

import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors; 
import static java.util.stream.Collectors.toList;

import java.util.Comparator;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java

/**
 * Collectors are parameters to the stream method collect(), and are used when
 * it's necesssary to reorganize the stream's items into a collection. But it 
 * can be used to combine all the items in the stream into a single result. 
 * 
 * 1. Count the Number of Dishes in the Menu, using counting()
 * 2. Find Maximum in a Stream of Values
 * 3. Find Minimum in a Stream of Values
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.counting() - counts the number of elements within the stream
 * 
 * -Colectors.maxBy() - takes in a Comparator as argument and finds the maximum
 * element within the stream
 * 
 * -Collectors.minBy() - takes in a Comparator as argument and finds the minimum
 * element within the stream
 */
public class Reducing {
    
    // Counts the number of dishes in the menu, using Collectors.counting()
    // Can be rewritten as
    // long dishCount = menu.stream().count(); 
    // but counting collector can be useful when used in combination with other collectors
    private static long countDishes(){
        long dishCount = menu.stream().collect(Collectors.counting());
        return dishCount;
    }

    // Finds the Most Caloric dish within the menu
    private static void findMaxCalorie(){
        // 1. Create the Comparator to compare elements in the Stream
        Comparator<Dish> dishCaloriesComparator = 
            Comparator.comparingInt(Dish::getCalories);
        // 2. Pass in the Comparator to the method Collectors.maxBy()
        Optional<Dish> mostCalorieDish = 
            menu.stream().collect(Collectors.maxBy(dishCaloriesComparator));

        // 3. Output the Result
        System.out.println("Dish with the most Calories is: " 
            + mostCalorieDish.get().getName() + " with " 
            + mostCalorieDish.get().getCalories() + " Calories");
    }

    // Finds the Least Caloric dish within the menu
    private static void findMinCalorie(){
        // 1. Create the Comparator to compare elements in the Stream
        Comparator<Dish> dishCaloriesComparator = 
            Comparator.comparingInt(Dish::getCalories);
        // 2. Pass in the Comparator to the method Collectors.maxBy()
        Optional<Dish> minCalorieDish = 
            menu.stream().collect(Collectors.minBy(dishCaloriesComparator));

        // 3. Output the Result
        System.out.println("Dish with the least Calories is: " 
          + minCalorieDish.get().getName() + " with " 
          + minCalorieDish.get().getCalories() + " Calories");
    }

    public static void main(String... args) {
        showMenu();
        System.out.println("\n===== Counting Number of Dishes in the menu =====");
        System.out.println(" Number of dishes is " + countDishes());
        System.out.println("\n===== Finding the Maximum within the menu =====");
        findMaxCalorie();
        System.out.println("\n===== Finding the Minimum within the menu =====");
        findMinCalorie();
    }

    // Displays the available menu and respective calories
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
