package Java.Java8.DefaultMethods;

import java.util.Iterator;
import java.util.function.Predicate;

/**
 * Default Methods in a Nutshell
 * An interface can contain method signatures for which an implementing class 
 * doesn't provide an implementation. The missing method bodies are given as 
 * part of the interface (hence, default implementations) rather than in the 
 * implementing class. 
 * 
 * Default methods allow you to add implementations inside an interface in a
 * source-compatible way.
 * 
 * To recognize a default method it starts with a default modifier and contains
 * a body like a method declared in a class. 
 * 
 * A functional interface contains only one abstract method; default methods are
 * nonabstract methods. 
 * 
 * You may want to create interfaces with default methods for two use cases:
 * 1) Optional Methods
 * 2) Multiple Inheritance of Behavior
 * 
 * ----------------------------  Optional Methods  ----------------------------
 * Some classes that implement an interface but leave empty some method 
 * implementations. For instance, the Interator interface defines hasNext(),
 * next(), but also remove(). Remove was ignored often, so was left with empty
 * implementations for most classes, which is unnecessary boilerplate code.
 * 
 * With default methods, you can provide a default implementation for methods, 
 * so concrete classes don't need to explicitly provide an empty implementation.
 * The Iterator interface in Java 8 provides a default implementation for remove.
 *  
 * This reduces boilerplate code, any class the implements Iterator interface
 * no longer needs to declare an empty remove method to ignore it because it 
 * now has a default implementation. 
 * 
 * ----------------------- Abstract Classes vs Interfaces ---------------------
 * Both abstract class and an interface can contain abstract methods and methods
 * with a body. 
 * - A class can extend only from one abstract class, but a class 
 * can implement multiple interfaces
 * - An abstract class can enforce a common state through instance variables
 * (fields). An interface can't have instance variables. 
 * 
 * ================================= Summary ==================================
 * (1) Implement removeIf() as a default method 
 * (2) Examine Iterator default implementation for remove (optional method)
 * ================================= Methods ================================== 
 */
public interface CollectionsExample <E> {
    int size();
    
    default boolean isEmpty() {  // A default method
        return size() == 0;
    }

    Iterator<E> iterator(); 

    /** (1)
     * Removes every element that fulfills the condition within the Collection
     * @return true when an element that fulfills the condition is removed,
     * false otherwise
     */
    default boolean removeIf(Predicate<? super E> test){
        boolean removed = false;
        Iterator<E> each = iterator();
        while(each.hasNext()) {
            if(test.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }

    /**
     * (2) Examine Iterator default implementation for remove (optional method)
     * hasNext() and next() both need implementations by implementing classes.
     * But remove() is an Optional Method, and no longer needs to be declared
     */
    interface Iterator<T> {
        boolean hasNext();
        T next();
        default void remove() { 
            throw new UnsupportedOperationException();
        }
    }
} // end of Class
