package Java.Java8.DefaultMethods;

public interface Rotatable {
    void setRotationAngle(int angleInDegrees);
    int getRotationAngle();

    // A default implementation for rotateBy() 
    default void rotateBy(int angleInDegrees){
        setRotationAngle((getRotationAngle () + angleInDegrees) % 360);
    }
}
