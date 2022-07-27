package Java.Java8;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import static java.util.Comparator.comparing;

public class SortApples {
    
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
        Comparator<Apple> c = Comparator.comparing((Apple a) -> a.getWeight());
        inventory.sort(comparing(apple -> apple.getWeight()));

        // Method Reference
        inventory.sort(comparing(Apple::getWeight));

        // Composing Comparators
        // Reverse the order to sort by decreasing weight
        inventory.sort(comparing(Apple::getWeight).reversed());
    }
}
