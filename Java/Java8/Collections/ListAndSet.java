package Java.Java8.Collections;

import Java.Java8.Collectors.GroupingTransactions;
import static Java.Java8.Collectors.GroupingTransactions.transactions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Java 8 introduced new methods into the List and Set interfaces.
 * 
 * All these methods mutate the collections on which they're invoked. They 
 * change the collection itself, unlike stream operations, which produce a new
 * (copied) result. Since modifying collections can be error-prone and verbose, 
 * these methods were added.
 * 
 * ================================= Methods =================================
 * -removeIf() -  removes element matching a predicate. Available on all 
 * classes that implement List or Set (inherited from Collection interface)
 * 
 * -replaceAll() - replaces elements using a (UnaryOperator) function. 
 * Available on List.
 * 
 * -sort() - sorts the list itself, available on list. 
 */
public class ListAndSet {
    
    /**
     * Consider a Map of family names and age. 
     */
    public static void useRemoveIf(){
        Map<String, Integer> family = Map.of("Ami", 18, "Ouka", 19, "Akane", 19,
            "Riho", 21, "Shiragiku", 21);
        
        ArrayList<Map.Entry<String, Integer>> list = new ArrayList<>();

        for(Map.Entry<String, Integer> member: family){
            list.add(member);
        }
    }

    public static void main(String[] args){
        System.out.println("------ Working with Lists ------");
        
    }

}
