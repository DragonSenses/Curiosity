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
    private int width;
    private int height;
    private int rotationAngle; 

    // Moveable Methods
    public int getX(){ return this.x; }

    public int getY(){ return this.y; }

    public void setX(int x) { this.x = x; }

    public void setY(int y) { this.y = y; }
    
    // Resizable methods
    public int getWidth(){ return this.width;}
    public int getHeight() { return this.height; }
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public void setAbsoluteSize(int width, int height){
        this.width = width;
        this.height = height; 
    }

    // Rotatable Methods
    public void setRotationAngle(int angleInDegrees) {
        this.rotationAngle = angleInDegrees;
    }
    public int getRotationAngle() { return rotationAngle; }

    public static void main(String[] args){
        // Constructor internally sets the coordinates, height, width, and default angle
        Box b = new Box();
        b.rotateBy(180);
        b.moveVertically(10); 
    }
}
