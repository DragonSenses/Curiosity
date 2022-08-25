package Java.Java8.Streams;

import static Java.Java8.Streams.Dish.menu;

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
        int max = numbers.stream().reduce(0, (a, b) -> Integer.max(a, b));
        System.out.println("max:\t" + max);
    
        Optional<Integer> min = numbers.stream().reduce(Integer::min);
        System.out.print("min:\t");
        min.ifPresent(System.out::println);

        System.out.println("\n===== Count number of dishes in a stream =====");
        // Map-Reduce pattern, can be easily parallelized. 
        int count = menu.stream()
                        .map(d -> 1)
                        .reduce(0, (a,b) -> a + b);
        System.out.println("The number of dishes in the menu is\n" + count);
    }
}
