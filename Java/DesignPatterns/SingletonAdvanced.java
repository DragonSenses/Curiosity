package Java.DesignPatterns;

/**
 * Showcase more implementations of the Singleton class
 */
public class SingletonAdvanced {

    /** Double Checked Locking method 
     * After object is created, synchronization is no longer useful because
     * obj will not be null and any sequence of operations will lead to 
     * consistent results. So we will only acquire lock on the getInstance()
     * once, when obj is null This way we only synchronize the first way through.
     * 
     * Keyword "volatile" ensures that multiple threads offer the
     * obj variable correctly when it is being initialized to Singleton
     * Advanced instance. It tells the compiler that thhe value of a variable
     * must never be cached as its value may change outside of the scope of the
     * program itself. 
     * 
     * Volatile vs Synchronized
     * 1. Mutual Exclusion : Only one thread or process can execute a block of 
     * code (critical section) at a time
     * 2. Visibility: Changes made by one thread to shared data are visible to
     * other threads
     * 
     * Synchronized keyword guarantees both mutual exclusion and visibility. 
     * 
     * Volatile variables have the visibility features of synchronized but not the
     * atomicity features. The values of the volatile variable will never be cached
     * and all reads/writes will be done to and from main memory. 
     * 
     * In synchronized, blocks of threads that modify the value of the shared variable
     * synchronized only one thread can enter the block and changes made by itt will be
     * reflected in the main memory. All other threads trying to enter the block at the
     * same time will be blocked and put to sleep.
     */
    private static volatile SingletonAdvanced obj = null;

    private SingletonAdvanced() {}


    public static SingletonAdvanced getInstance() {
        if (obj == null) {
            synchronized (SingletonAdvanced.class) {
                if (obj == null){
                    obj = new SingletonAdvanced();
                }
            }
        }
        return obj;
    }

     /** Below are Further Implementations of getInstance() */

    // private static SingletonAdvanced obj;

    // private SingletonAdvanced() {}

    /**
     * A synchronized version of getInstance() where only
     * one thread can execute this at a time as defined by
     * keyword synchronized. Disadvantage: using synchronized
     * every time while calling this method is expensive and 
     * may decrease the performance of your program. Use when 
     * performance of getInstance() is not critical to the
     * application.
     * @return instance of SingletonAdvanced
     */
    public static synchronized SingletonAdvanced getInstance2(){
        if(obj == null) { 
            obj = new SingletonAdvanced(); 
        }
        return obj;
    }


    /** Another Implementation of getInstance() - Static Initializer  **/
    // private static SingletonAdvanced obj = new Singleton());
    // private SingletonAdvanced();

    //JVM executes static intializer when the class is loaded, so guaranteed
    // to be thread safe. Use this method when singleton class is light and
    // is used throughout the execution of the program
    public static SingletonAdvanced getInstance3() {
        return obj;
    }
}
