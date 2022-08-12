package Java.DesignPatterns;

/**
 * Most preferred approach for the Singleton pattern as it is equivalent to a
 * public field, more concise, provides serialization machinery for free and
 * provides an ironclad guarantee against multiple instantiation, even in the 
 * face of a sophisticated serialization or reflection attacks. 
 * 
 * Enum, or enumerates, are by definition unique, fixed, constant and built
 * at compile time. Each value is unique and accessible in a static way.
 * 
 * Note: cannot use this approach if singleton must extend a superclass other
 * than Enum (can declare enum to implement interfaces)
 * 
 * Other Singleton Approaches:
 * 1. Singleton with public final field 
 *  - Although guarantees exactly one instance a privileged client can invoke
 * the private constructor reflectively with the aid of 
 * AccessibleObjectObject.setAccessible() method. To defend against this, modify
 * constructor to throw an exception if asked to create a second instance.
 * 
 * 2. Singleton with static factory method
 *  - One advantage is alllows flexibility to change whether class is singleton
 * without changing API. Factory method returns the sole instance, but can be 
 * modified to return a separate instance for each thread that invokes it. 
 * - Another advantage is that one can write a generic singleton factory if 
 * application requires it
 * - Final advantage is using a static factory is that a method reference can
 * be used as a supplier (Ex. User::instance is a Supplier<User>)
 * - Disadvantage: To maintain singleton guarantee, declare all instance fields 
 * transient and provide a readResolve() method, not just implements Serializable.
 * The issue is when every time serialized instance is deserialized, a new instance
 * will be created leading to surplus of Singletons.
 * 
 * Source: Bloch, Joshua. Effective Java. Boston, Addison-Wesley, 2018.
 */
public enum SingletonEnum {
    INSTANCE("Initial Class Data");

    private String data;
    
    private SingletonEnum(String data){
        this.data = data;
    }

    /** Static Factory Method **/
    public static SingletonEnum getInstance(){
        return INSTANCE;
    }

    /** Getters/Setters **/
    public String getData(){
        return this.data;
    }

    public void setData(String data){
        this.data = data;
    }
}
