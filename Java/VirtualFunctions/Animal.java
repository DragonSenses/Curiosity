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
 * In Java, all methods other than final, private, and static methods
 * are by default virtual methods. 
 * 
 * That is because by definition of of virtual methods, final methods
 * can never be overridden and private methods are never inherited. 
 * 
 * Static methods are accessible and therefore inherited, but it cannot
 * be overriden. If one were to make a new static method with the same 
 * signature in a subclass, the old static method is hidden, not overriden.
 * 
 * A key distinction is that the version of the overriden method gets 
 * invoked is the one in the subclass. The version of the hidden method 
 * that gets invoked depends on whether it is invoked from the superclass
 * or the subclass.
 * 
 * Virtual methods is any method which is defined again in the derived
 * class. So the prerequisities of a virtual function are Inheritance
 * and Polymorphism.
 * 
 * Runtime Polymorphism is a process in which a call to an overidden
 * method is resolved at runtime rather than compile time. 
 */
public class Animal {

    /** Virtual Method which will be defined again in derived class
     * of Animal.
     */
    public void speak(){
        System.out.println("I am an Animal");
    }

}

