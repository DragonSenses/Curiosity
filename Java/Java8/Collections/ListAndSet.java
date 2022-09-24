package Java.Java8.Collections;


import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Iterator;

import java.util.function.Predicate;

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
    // A Predicate that checks if the String name starts with A
    private static Predicate<String> nameStartsWithA =  s -> s.charAt(0) == 'A';

    // Build the List of Strings
    public static List<String> build(){
        List<String> list = new ArrayList<>();
        list.add("Ami");
        list.add("Ouka");
        list.add("Akane");
        list.add("Riho");
        list.add("Shiragiku");
        return list;
    }

    /**
     * Consider a List of family names. We can remove members from the list
     * if their names start with the letter A.  removeIf() takes a predicate
     * indicating which elements to remove.
     * 
     * Cannot remove using a for each loop as it uses an Iterator object and
     * the Collection object itself, which is removing the element by calling
     * remove(). Iterator is no longer synced with the state of the collection,
     * so must use Iterator object explicitly to call its remove() method. This
     * is the substitution to this fairly verbose way of removing elements 
     * within collection and without getting a ConcurrentModificationException.
     */
    public static void removeIf(){
        List<String> family = build();
        System.out.println("\n------- Before Removal -------");
        family.stream().forEach(System.out::println);

        System.out.println("------- After Removal with removeIf() -------");
        family.removeIf(member -> member.charAt(0) == 'A');
        family.stream().forEach(System.out::println);
    }

    /**
     * Two separate objects manage the collection. 
     * 1) The Iterator object, which is querying the source by using next()
     * and hasNext(), and the 
     * 2) The Collection object itself, which is removing the element by
     * calling remove()
     * As a result, Iterator object is no longer synced with state of collection
     * such that a ConcurrentModificationException is thrown. 
     */
    public static void removeIfWithForEach(){
        List<String> family = build();
        System.out.println("\n------- Before Removal -------");
        family.stream().forEach(System.out::println);
        
        for(String member: family){
            if(nameStartsWithA.test(member)) {
                family.remove(member);  // Problem we are iterating and modifying
            }                           // The collection through two separate objects
        }

        System.out.println("------- After Removal with Collection -------");
        family.stream().forEach(System.out::println);
    }

    /**
     * The solution to the removeIf with enhanced for loop is to use the
     * Iterator object explicitly and call its remove() method. 
     */
    public static void removeIfWithIterator(){
        List<String> family = build();
        System.out.println("\n------- Before Removal -------");
        family.stream().forEach(System.out::println);

        for(Iterator<String> iterator = family.iterator(); iterator.hasNext();){
            String member = iterator.next();
            if(nameStartsWithA.test(member)) {
                iterator.remove();
            }
        }

        System.out.println("------- After Removal with Iterator -------");
        family.stream().forEach(System.out::println);
    }

    /**
     * replaceAll() method on List interface lets you replace each element in a
     * list with a new one. It allows one to update the existing collection. 
     * 
     * The old way is to use the Iterator.set() method, but using Iterator objects
     * in conjunction with collection objects can be error-prone by mixing 
     * iteration and modification of collection.
     */
    public static void replaceAllNames(){
        List<String> family = build();
        System.out.println("------- Before Replacing -------");
        family.stream().forEach(System.out::println);
        
        family.replaceAll(name -> Character.toLowerCase(name.charAt(0))
            + name.substring(1));

        System.out.println("------- After Replacing All Names -------");
        family.stream().forEach(System.out::println);
    }

    public static void main(String[] args){
        System.out.println("======= Working with Lists =======");
        removeIf(); 

        try{ 
            removeIfWithForEach(); 
        } catch(ConcurrentModificationException e) {
            // e.printStackTrace();
            System.out.println("------- After Removal with Collection -------");
            System.out.println("Threw ConcurrentModificationException!");
        } 

        removeIfWithIterator();

        System.out.println("\n======= Replacing with Lists =======");
        replaceAllNames();
    }

}
