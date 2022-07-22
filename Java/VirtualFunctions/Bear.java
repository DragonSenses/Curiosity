package Java.VirtualFunctions;

/**
 * This class will showcase 
 */
public class Bear extends Animal {
    
    /**
     * Since speak() is a method already defined in superclass
     * Animal, this is a virtual method. This method is invoked
     * and therefore overrides it.
     */
    public void speak(){
        System.out.println("I am a Bear");
    }

    public static void main (String[] args){
        // A Superclass reference to a subclass holds a subclass method
        Animal a = new Bear();
        // Instead of its reference, we call the method according to its
        // object. AS the speak() that is invoked is the on in Bear class
        a.speak();
    }
}
