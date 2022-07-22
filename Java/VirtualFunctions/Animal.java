package Java.VirtualFunctions;

/**
 * In object-oriented programming, a virtual function or virtual method
 * is an inheritable and overridable function/method for which dynamic
 * dispatch is facilitated. 
 * 
 * Dynamic Dispatch is the process of selecting which implementation of
 * a polymorphic operation (function/method) to call at run time. This 
 * a prime characteristic of OOP languages.
 * 
 * In JavaScript or Python they treat all methods as virtual by
 * default, and do not provide a modifier to change this behavior. 
 * Some languages provide modifiers to prevent methods from being 
 * overidden by derived classes (such as using final keyword in Java).
 * 
 * In Java, all methods other than private and static methods, are by
 * default virtual methods. 
 * 
 * Virtual methods is any method which is defined again in the derived
 * class. 
 */
public class Animal {

    /** Virtual Method which will be defined again in derived class
     * of Animal.
     */
    public void speak(){
        System.out.println("I am an Animal");
    }

}

