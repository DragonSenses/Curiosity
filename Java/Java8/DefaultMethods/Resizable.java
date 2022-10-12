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
 * This stand-alone interface has five abstract methods: 
 * -getWidth(), getHeight()
 * -setWidth(), setHeight()
 * -setAbsoluteSize()
 * 
 * And one default method, that is implemented by using abstract methods:
 * -setRelativeSize() 
 * 
 * Any class that implements Resizable will need to provide an implementation
 * for the five abstract methods, but will inherit the default implementation
 * of setRelativeSize() for free.
 */
public interface Resizable {
    int getWidth();
    int getHeight();
    void setWidth(int width);
    void setHeight(int height);
    void setAbsoluteSize(int width, int height);

    default void setRelativeSize(int wFactor, int hFactor){
        setAbsoluteSize(getWidth() / wFactor, getHeight() / hFactor);
    }
}
