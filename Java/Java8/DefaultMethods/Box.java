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
    private int x;
    private int y;
    private int w;
    private int h;
    private int rotationAngle; 

    // Moveable Methods
    public int getX(){ return this.x; }

    public int getY(){ return this.y; }

    public void setX(int x) { this.x = x; }

    public void setY(int y) { this.y = y; }
    
    // Resizable methods
    public int getWidth(){ return this.w;}
    public int getHeight() { return this.h; }
    public void setWidth(int width) { this.w = width; }
    public void setHeight(int height) { this.h = height; }
    public void setAbsoluteSize(int width, int height){
        this.w = width;
        this.h = height; 
    }

    // Rotatable Methods
    public void setRotationAngle(int angleInDegrees) {
        this.rotationAngle = angleInDegrees;
    }
    public int getRotationAngle() { return rotationAngle; }
}
