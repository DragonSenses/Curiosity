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
 * This stand-alone interface has two abstract methods: 
 * -setRotationAngle()
 * -getRotationAngle()
 * 
 * And a default method
 * -rotateBy() - that is implemented by using the two abstract methods
 * 
 * Any class that implements Rotatable will need to provide an implementation
 * for the two abstract methods, but will inherit the default implementation
 * of rotateBy() for  free.
 */
public interface Rotatable {
    void setRotationAngle(int angleInDegrees);
    int getRotationAngle();

    // A default implementation for rotateBy() 
    default void rotateBy(int angleInDegrees){
        setRotationAngle((getRotationAngle () + angleInDegrees) % 360);
    }
}
