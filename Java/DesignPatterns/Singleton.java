package Java.DesignPatterns;

/**
 * The Singleton pattern is a design pattern that restricts the
 * instantiation of a class to one object. This ensures that
 * there is access to control to resources, (examples: socket
 * or database connection). 
 * 
 * Simplest of design patterns, when only one instance of our 
 * class is needed. 
 * 
 * After trying to instantiate the Singleton class after the 
 * first time, the new variable also points to the first 
 * instance created. So whatever modifications we do to any 
 * variable inside the class through any instance, affects the
 * variable of the single instance created and is visible if
 * we access that variable through any variable of that class
 * type defined.
 * 
 * How to Make?
 * 1. Ensure only one instance of the class exists
 * 2. Provide global access to that instance by
 *  - Declaring all constructors of the class to be private
 *  - Providing a static method that returns a reference to 
 *    the instance (static factory method). Lazy Initialization
 *    concept is used to write the static methods
 *  - The instance is stored as a private static variable
 * 
 * Note: Lazy Innstantiation is when object creation is done 
 * according to requirement. Early Instantiation is when object
 * creation takes place at the load time.
 * 
 * When to Use? For instance a single Database connection thats
 * shared by multiple objects as creating a separate Database 
 * connection for every object may be costly. Or a single
 * configuration manager or error manager in an application that 
 * handles all problems instead of creating multiple managers. 
 * 
 * Can use this single object repeatedely as per requirements, this
 * the reason why multi-threaded and database applications mostly use
 * Singleton pattern in Java for caching, logging, thread pooling, 
 * configuration settings, etc.
 */
public class Singleton {
    // Instance is stored as a private static variable
    private static Singleton singly;

    public String name; 

    /**
     * Private Constructor forces the usage of 
     * getInstance() to create a Singleton object.
     * 
     * Declaring constructors private is inteded to 
     * prevent instantiation (barring reflection),
     * but also prevents subclassing as a side effect.
     * Using final keyword is more appropriate to
     * prevent subclassing as final classes
     * already has all its implementation complete so
     * none in the world should not be able to proivde
     * additional to original class, example is Java's
     * String class and System class (declared final).
     * 
     * This constructor can only be accessed from a
     * static factory method inside the class itself
     * Example we see here is Singleton class.
     * 
     * Another case to use a private constructor is
     * to make a utility class that only contains
     * static methods. 
     */
    // private Singleton() {}  // Easy Way
    private Singleton() {
        name = "Hello my name is singly, a string part of the Singleton class.";
    }
    
    /** 
     * A Static Factory methhod that returns a reference to
     * the sole instance of Singleton. This ensures that
     * only one instance of the class exists as it does this
     * only the first time it is called. Subsequent calls
     * will return the same object. Singleton obj is not
     * created until we need it and call getInstance() once,
     * this is lazy instantiation.
     * @return A static Singleton reference
     */
    public static Singleton getInstance() {
        if (singly == null) {
            singly = new Singleton();
        }
        return singly;
    }

  

    public static void main(String args[]){
        // Instantiating Singleton class with variable first
        Singleton first = Singleton.getInstance();

        // Instantiating Singleton class with variable second
        Singleton second = Singleton.getInstance();

        // Instantiating Singleton class with variable thhird
        Singleton third = Singleton.getInstance();

        //Print their hash codes to show they all point to the same object
        //in memory
        System.out.println("Hashcode of first is [" + 
            first.hashCode() + "]");
        System.out.println("Hashcode of second is [" + 
            second.hashCode() + "]"); 
        System.out.println("Hashcode of third is [" + 
            third.hashCode() + "]");
            
        String equal = "Points to the same memory location on the heap (they ARE the same object)";
        String notEqual = "DOES NOT point to the same memory location on the heap (different objects)";
        System.out.println((first == second && second == third) ? equal : notEqual);
        
        
    }
}
