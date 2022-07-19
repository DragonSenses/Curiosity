package Java.DesignPatterns;

/**
 * The Singleton pattern is a design pattern that restricts the
 * instantiation of a class to one object. Simplest of design
 * patterns, when only one instance of our class is needed. 
 * 
 * 
 * 
 * When to Use? For instance a single Database connection thats
 * shared by multiple objects as creating a separate Database 
 * connection for every object may be costly. Or a single
 * configuration manager or error manager in an application that 
 * handles all problems instead of creating multiple managers.
 */
public class Singleton {
    private static Singleton obj;

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
    private Singleton() {}

    public static Singleton getInstance() {
        if (obj == null) {
            obj = new Singleton();
        }
        return obj;
    }
}
