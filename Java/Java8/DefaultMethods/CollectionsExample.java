package Java.Java8.DefaultMethods;

/**
 * Default Methods in a Nutshell
 * An interface can contain method signatures for which an implementing class 
 * doesn't provide an implementation. The missing method bodies are given as 
 * part of the interface (hence, default implementations) rather than in the 
 * implementing class. 
 * 
 * To recognize a default method it starts with a default modifier and contains
 * a body like a method declared in a class. 
 * 
 * A functional interface contains only one abstract method; default methods are
 * nonabstract methods. 
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
 * ================================= Methods ================================== 
 */
public interface CollectionsExample {
    int size();
    
    default boolean isEmpty() {  // A default method
        return size() == 0;
    }

    /** (1)
     * Removes every element that fulfills the condition within the Collection
     * @return true when an element that fulfills the condition is removed,
     * false otherwise
     */
    default boolean removeIf(boolean test){

    }
}
