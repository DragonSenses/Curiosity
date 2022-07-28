package Java.PassByValue;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Java Always follows Pass by Value
 * 
 * Data is shared between functions by passing parameters. 
 * 
 * 1. Pass By Value: The pass by value method copies the value of actual
 *  parameters. The called function creates its own copy of argument
 *  values and then uses them. Since the work is done on a copy, the 
 *  original parameter does not see the changes.
 * 
 * 2. Pass By Reference: The pass by reference method passes the parameters
 *  as a reference(address) of the original variable. The called function 
 *  does not create its own copy, rather, it refers to the original values 
 *  only. Hence, the changes made in the called function will be reflected 
 *  in the original parameter as well.
 * 
 * Java rules in storing variables:
 * 1. Local variables (ex. primitives, object references) are created on
 *    Stack Memory
 * 2. Objects are created on Heap Memory
 * 
 * Note: Autoboxing mechanism where boxed values come at a performance 
 * cost, as boxed values are a wrapper around primitive types and are stored
 * on the heap. Therefore, boxed values use more memory and require additional
 * memory lookups to fetch the wrapped primitive value.
 * 
 * Here we take a look at what happens as we pass a reference type to a method
 */
public class ObjectPassing {
    
    /**
     * Creates a new list and adds a Banana to the basket
     * @param fruitsReference a list of fruits
     */
    private static void process(List<String> fruitsReference) {
        fruitsReference = new ArrayList<>(fruitsReference);
        fruitsReference.add("Banana");
    }

    public static void main(String[] args) {
        // Create a List of Fruits containing Apple, Orange, and Magno
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Orange", "Mango"));
        System.out.println("Data before calling process() method:\t"
            + Arrays.toString(fruits.toArray()));
        process(fruits);
        System.out.println("Data after calling process() method: \t"
            + Arrays.toString(fruits.toArray()));
    }
}
