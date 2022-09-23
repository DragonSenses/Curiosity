package Java.Java8.Collections;

// import Java.Java8.Collectors.GroupingTransactions;
// import static Java.Java8.Collectors.GroupingTransactions.transactions;

// import java.util.ArrayList;
// import java.util.Arrays;

// import java.util.Map;
// import java.util.stream.Collectors;

import java.util.List;
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
     * Consider a List of family names. We can remove members from the list
     * if their names start with the letter A. 
     */
    public static void useRemoveIf(){
        List<String> family = 
            List.of("Ami", "Ouka", "Akane", "Riho", "Shiragiku");
        family.stream().forEach(System.out::println);

        System.out.println("After Removal");
        family.removeIf(member -> member.charAt(0) == 'A');
        family.stream().forEach(System.out::println);
    }

    public static void main(String[] args){
        System.out.println("------ Working with Lists ------");
        useRemoveIf();
    }

}
