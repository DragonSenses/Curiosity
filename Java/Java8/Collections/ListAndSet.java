package Java.Java8.Collections;

import Java.Java8.Collectors.GroupingTransactions;
import static Java.Java8.Collectors.GroupingTransactions.transactions;

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
    

    public static void useRemoveIf(){
        transactions.removeIf(transaction 
            -> Character.isDigit(transaction.getReferenceCode().charAt(0)));
    }

    public static void main(String[] args){
        System.out.println("------ Working with Lists ------");
        System.out.println("--> Transforming list items with a Stream");
        List<String> referenceCodes = Arrays.asList("a12", "C14", "b13");
        referenceCodes.stream()
            .map(code -> Character.toUpperCase(code.charAt(0)) + code.substring(1))
            .collect(Collectors.toList())
            .forEach(System.out::println);
        System.out.println("... but the original List remains unchanged: " + referenceCodes);
    }

}
