package Java.Java8;

import java.util.Arrays;
// import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

import static java.util.Comparator.comparing;

import java.util.ArrayList;

public class SortApples {
    
    
    /**
     * Instead we write filter in a way that takes in a predicate so that it can
     * adapt to the specifications needed.
     * 
     * @param inventory - The list of apples to select from
     * @param p - The predicate that models the selection criteria that returns a boolean
     * @return A list of Apples that pass the criterion provided by predicate p
     */
    public static List<Apple> filterApples(List<Apple> inventory, Predicate<Apple> p) {
        List<Apple> result = new ArrayList<>();
        for (Apple apple : inventory) {
        if (p.test(apple)) {
            result.add(apple);
        }
        }
        return result;
    }

    // Java 8 API includes sort method on List
    // void sort (Comparator<? super E> c){
        
    // }

    public static void main(String[] args){
        List<Apple> inventory = Arrays.asList(
            new Apple(80, "green"),
            new Apple(155, "green"),
            new Apple(120, "red"));

        
        // inventory.sort((a1,a2) -> a1.getWeight().compareTo(a2.getWeight()));    

        // Comparator includes static helper method comparing() that takes a Function
        // extracting a Comparable key and produces a Comparator object
        // Comparator<Apple> c = Comparator.comparing((Apple a) -> a.getWeight());
        inventory.sort(comparing(apple -> apple.getWeight()));

        // Method Reference
        inventory.sort(comparing(Apple::getWeight));

        // Composing Comparators
        // Reverse the order to sort by decreasing weight
        inventory.sort(comparing(Apple::getWeight).reversed());

        // Chaining Comparators
        inventory.sort(comparing(Apple::getWeight)
                 .reversed()
                 .thenComparing(Apple::getColor)); 
        // If two objects are considered equal with initial Comparator, a second
        // Comparator can further refine the comparison 


        // Composing Predicates
        Predicate<Apple> redApple = (Apple a) -> (a.getColor().equals("red"));
        Predicate<Apple> notRedApple = redApple.negate(); // Negation of existing Predicate
        // Chaining Two Predicates to produce another Predicate object
        Predicate<Apple> notRedAndHeavyApple =
            notRedApple.and(apple -> apple.getWeight() > 150);

        List<Apple> basket =
            filterApples(inventory, notRedAndHeavyApple);
        for(Apple a: basket){
            System.out.println(a);
        }
    }
}
