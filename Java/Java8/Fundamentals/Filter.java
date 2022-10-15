package Java.Java8.Fundamentals;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Previously, the filterApples(List<Apple> l, Predicate<Apple> p) only
 * worked with filtering a list of apples. But we can take one more step
 * to abstraction by going beyong the problem domain, we can abstract 
 * over the list type so filter can take on a List of bananas, oranges, 
 * Integers, or Strings
 */
public class Filter {
    public interface Predicate<T> {
        boolean test(T t);
    }

    /**
     * Abstraction of the List Type to filter a list of objects of type
     * T with the incoming predicate.
     * @param <T>
     * @param list
     * @param p
     * @return
     */
    public static <T> List<T> filter(List<T> list, Predicate<T> p) {
        List<T> result = new ArrayList<>();
        for (T e : list) {
            if (p.test(e)) {
                result.add(e);
            }
        }
        return result;
    }

    public static void main(String[] args){
        // Here is an example of using filter() by using lambda expressions
        // Our inventory holds a bunch of apples
        List<Apple> inventory = Arrays.asList(
            new Apple(80, "green"),
            new Apple(155, "green"),
            new Apple(120, "red"));

        List<Apple> redApples =
            filter(inventory, (Apple apple) -> "red".equals(apple.getColor()));
        System.out.println(redApples);
        

        // Sorting out even numbers
        List<Integer> numbers = new ArrayList<Integer> (
            Arrays.asList(0,1,2,3,4,5,6,7,8,9));

        List<Integer> evenNumbers =
            filter(numbers, (Integer i) -> i % 2 == 0);
        System.out.println(evenNumbers);
    }
}
