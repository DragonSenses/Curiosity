package Java.Java8.Streams;

import static Java.Java8.Streams.Dish.menu; // a way to reuse the menu in Dish class
import static java.util.stream.Collectors.toList;   // for collect(toList())

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Demonstrate ways to Reduce a Stream. This combines elements of a stream to
 * express more complicated queries; classified as reduction operations as a 
 * stream is reduced to a value. 
 * 
 * ================================= Methods =================================
 * - reduce() - takes two parameters 
 *  1) initial value
 *  2) The operation to combine all the elements of the list 
 *  (a lambda to combine two stream elements and produce a new value) 
 */
public class ReducingStreams {
    
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

    public static int forEachSum(List<Integer> numbers){
        // For-Each loop        Uses two parameters
        int sum = 0;            // 1) Initial sum variable = 0
        for(int x: numbers) { 
            sum += x;           // 2) Operation to combine all the elements
        }
        return sum;
    }

    public static void main(String[] args){
        List<Integer> numbers = Arrays.asList(3, 4, 5, 1, 2);
        System.out.println("List: " + numbers);

        System.out.println("============= Summing the Elements =============");
        System.out.println("Sum after using for each loop\n" + forEachSum(numbers));

        System.out.println("\n===== Summing the Elements using Streams =====");
        // reduce() takes two arguments 
        // 1) initial value of 0
        // 2) A BinaryOperator<T> to combine two elements to produce a new value
        int sum = numbers.stream().reduce(0, (a,b) -> a +b);
        System.out.println("Sum after using reduce()\n" + sum);

        int sum2 = numbers.stream().reduce(0, Integer::sum);
        System.out.println("\nSum after using reduce() & Integer::sum\n" + sum2);

        System.out.println("\n===== Finding the Min/Max using Streams =====");
        System.out.println("List: " + numbers);
        // Note that this method returns type int max
        int max = numbers.stream().reduce(0, (a, b) -> Integer.max(a, b));
        System.out.println("max:\t" + max);
        
        // Note this returns type Optional<Integer>
        Optional<Integer> min = numbers.stream().reduce(Integer::min);
        System.out.print("min:\t");
        min.ifPresent(System.out::println);

        System.out.println("\n===== Count number of dishes in a stream =====");
        showMenu();
        // Map-Reduce pattern, can be easily parallelized. Count the number of 
        // elements in the stream by mapping each element into the number 1 
        // then summing them using reduce
        int count = menu.stream()
                        .map(d -> 1)    
                        .reduce(0, (a,b) -> a + b);
        System.out.println("\nThe number of dishes in the menu is: " + count);

        max = menu.stream()
                  .map(d -> d.getCalories())
                  .reduce(0, (a,b) -> Integer.max(a,b));
        System.out.println("The max calories is: " + max);
        min = menu.stream().map(Dish::getCalories).reduce(Integer::min);
        System.out.println("The min calories is: " + min.get());

        Optional<Integer> total = menu.stream().map(Dish::getCalories).reduce(Integer::sum);
        System.out.println("The total calories of the menu is: " + total.get());
    }
}
