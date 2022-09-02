package Java.ControlFlow;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * What is the difference between for-each loop and iterators?
 * 
 * For-Each loop is syntactic sugar for using iterators, as they both 
 * traverse items in a collection and offer sequential access. A for-each 
 * loop internally creates an iterator to iterate over the collection. 
 * But it cannot modify the collection (as it throws a 
 * ConcurrentModificationException).
 * 
 * An iterator on the other hand, can modify the collection (using Iterator
 * methods such as remove()).  
 * 
 * In short, iterators can modify the collection, enhanced for-each loops 
 * cannot; but they both iterate over the collection. 
 */
public class ForEachAndIterators {
    private static ArrayList<String> list = new ArrayList<>();

    // Populate the list with Strings
    private static void fill(){
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");
    }

    public static void main(String[] args){
        fill();
        
        // Approach 1: For-Each Loop
        for (String s : list) {
            System.out.println(s);
            list.remove(s); // throws exception
        } 
        
        // Approach 2: Iterator
        Iterator<String> it = list.iterator();
        while (it.hasNext()){
            System.out.println(it.next());
            it.remove(); // valid here
        }

        // Approach 3: Lambda Expression
        list.forEach( s -> System.out.println(s) );
    }
}
