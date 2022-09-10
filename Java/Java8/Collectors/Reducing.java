package Java.Java8.Collectors;
// Import Static Factory Methods of Collectors class
import static java.util.stream.Collectors.*;

import static Java.Java8.Collectors.Dish.menu; // Use the Menu from Dish.java

/**
 * Collectors are parameters to the stream method collect(), and are used when
 * it's necesssary to reorganize the stream's items into a collection. But it 
 * can be used to combine all the items in the stream into a single result. 
 * 
 * 1. Count the Number of Dishes in the Menu, using counting()
 * 2. Find Maximum in a Stream of Values
 * 3. Find Minimum in a Stream of Values
 */
public class Reducing {
    

    // Counts the number of dishes in thhe menu
    private static long countDishes(){
        long dishCount = menu.stream().collect(Collectors.counting());
    }

    public static void main(String... args) {

    }


}
