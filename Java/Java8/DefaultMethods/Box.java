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

    // Moveable Methods
    public int getX(){ return this.x; }

    public int getY(){ return this.y; }

    public void setX(int x) {

    }

    public void setY(int y) {

    }
    
    // Resizable methods
    public int getWidth(){

    }

    public int getHeight() {

    }

    public void setWidth(int width) {

    }
    public void setHeight(int height) {

    }
    public void setAbsoluteSize(int width, int height){

    }

    // Rotatable Methods
    public void setRotationAngle(int angleInDegrees) {

    }
    public int getRotationAngle() {

    }
}
