package Java.Java8.DefaultMethods;

/**
 * Suppose one needs to define several shapes with different characteristics
 * for the game you're creating. Some shapes are resizable but not rotatable,
 * some should be rotatable and movable but not resizable. To achieve great
 * code reuse we create a minimal interface with orthogonal functionalities.
 * 
 * We use a technique that is somewhat related to Template Design Pattern, in 
 * which a skeleton algorithm is defined in terms of other methods that need
 * to be implemented. 
 * 
 * This stand-alone interface has four abstract methods: 
 * -getX(), getY()
 * -setX(), setY()
 * 
 * And two default methods, that is implemented by using two abstract methods:
 * -moveHorizontally() 
 * -moveVertically() 
 * 
 * Any class that implements Moveable will need to provide an implementation
 * for the four abstract methods, but will inherit the default implementation
 * of moveHorizontally()  & moveVertically() for free.
 */
public interface Moveable {
    int getX();
    int getY();
    void setX(int x);
    void setY(int y);

    default void moveHorizontally(int distance){
        setX(getX() + distance);
    }

    default void moveVertically(int distance){
        setY(getY() + distance);
    }
}