package Java.Java8.Collectors;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java

import java.util.Comparator;
import java.util.IntSummaryStatistics;
import java.util.function.BinaryOperator;

import java.util.List;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.averagingInt;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.reducing;
import static java.util.stream.Collectors.summarizingInt;
import static java.util.stream.Collectors.summingInt;

/**
 * Collectors provide specific factory method for summing, which accepts a 
 * function that maps an object into the int that has to be summed and returns
 * a collector that, when passed to collect method, performs the requested 
 * summarization. 
 * 
 * For Instance, we can:
 * 1. Find Total Number of Calories in the Menu
 * 2. Find Average Number of Calories in the Menu
 * 3. Find count, sum, minimum, average, and maximum all in one operation
 * 
 * ================================= Methods =================================
 * -collect() - a terminal stream operation that combines all elements of a 
 * stream into a List, a reduction operation that takes an argumenty various
 * recipes for accumulating the elements of a stream into a summary result
 * 
 * -Collectors.summingInt() - accepts a function that maps an object into the
 * int that has to be summed and returns the collector that performs the 
 * requested summarization (when passed to the usual collect() method)
 * 
 * -Collectors.averagingInt() - calculates the average of the same set of numeric
 * values
 * 
 * -Collectors.summarizingInt() - computes information based on the numeric 
 * property of the elements, collecting count, sum, min, avg, and max all in
 * one operation
 * 
 * Each method has their respective Double and Long variants:
 * 
 * -Collectors.summingDouble()
 * -Collectors.summingLong()
 * -Collectors.averagingDouble()
 * -Collectors.averagingLong()
 * -Collectors.summaryingDouble()
 * -Collectors.summarizingLong()
 */
public class Summarizing {
    
    // 1. Calculates Total Calories using summingInt()
    private static int calculateTotalCalories() {
        // int totalCalories = menu.stream.collect(summingInt(Dish::getCalories));
        return menu.stream().collect(summingInt(Dish::getCalories));
    }

    // 2. Calculate the Average Number of Calories within the Menu
    private static Double calculateAverageCalories() {
        // double avgCalories = menu.stream().collect(averaginingInt(Dish::getCalories));
        return menu.stream().collect(averagingInt(Dish::getCalories));
    }

    /** 3. Retrieve count, sum, min, average, and max all in one operation
     * 
     * This collector gathers all this information in a class called 
     * IntSummaryStatistics that provides convenient getter methods to access
     * results. Printing the object produces the following output: 
     * IntSummaryStatistics{count=9, sum=4300, min=120, average=477.777778, max=800}
     * @return IntSummaryStatistics object
     */
    private static IntSummaryStatistics calculateMenuStatistics() {
        // IntSummaryStatistics menuStatistics = 
        //     menu.stream().collect(summarizingInt(Dish::getCalories));
        return menu.stream().collect(summarizingInt(Dish::getCalories));
    }

    public static void main(String[] args) {
        showMenu();
        System.out.println("======== Menu Summary & Statistics ========");
        System.out.println("Number of dishes: " + howManyDishes());
        System.out.println("The most caloric dish is: " + findMostCaloricDish());
        System.out.println("The most caloric dish is: " + findMostCaloricDishUsingComparator());
        System.out.println("\n======== Total Number of Calories in a Menu ========");
        System.out.println("Total calories in menu: " + calculateTotalCalories());
        System.out.println("\n======== Average Number of Calories in a Menu ========");
        System.out.println("Average calories in menu: " + calculateAverageCalories());
        System.out.println("\n======== IntSummaryStatistics ========");
        System.out.println("Menu statistics: " + calculateMenuStatistics());
    }

    // Reduction Operations
    // counting(), reducing(), and maxBy()
    
    // Count the Total Number of Dishes
    private static long howManyDishes() {
        return menu.stream().collect(counting());
    }
    
    // Finds most caloric dish using Collectors.reducing()
    // Lambda Expression returns an Optional Object
    private static Dish findMostCaloricDish() {
        return menu.stream()
            .collect(reducing((d1, d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2)).get();
    }

    // Finds most caloric dish using Comparator
    private static Dish findMostCaloricDishUsingComparator() {
        Comparator<Dish> dishCaloriesComparator = Comparator.comparingInt(Dish::getCalories);
        BinaryOperator<Dish> moreCaloricOf = BinaryOperator.maxBy(dishCaloriesComparator);
        return menu.stream().collect(reducing(moreCaloricOf)).get();
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
