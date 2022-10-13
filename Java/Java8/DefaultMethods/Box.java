package Java.Java8.DefaultMethods;

/**
 * Composing Interfaces. This class showcases a concrete class that is Movable,
 * Resizeable, Rotatable. 
 * 
 * This class will automatically inherit the default methods from each 
 * interface. 
 * Inherited Default Methods: rotateBy(), moveHorizontally(), moveVertically(),
 * and setRelativeSize().
 */
public class Box implements Moveable, Resizable, Rotatable {
    // Moveable Methods
    int getX();
    int getY();
    void setX(int x);
    void setY(int y);
    
    // Resizable methods
    int getWidth();
    int getHeight();
    void setWidth(int width);
    void setHeight(int height);
    void setAbsoluteSize(int width, int height);

    // Rotatable Methods
    void setRotationAngle(int angleInDegrees);
    int getRotationAngle();
}
