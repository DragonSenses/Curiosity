package Java.Java8;

public class Apple {

    //By default all Apples are "red" with a weight of 75
    private String color = "red";
    private int weight = 75;

    // Default Constructor of Apples
    public Apple() {
        super();
    }
    public Apple(int weight) {
        this.weight = weight;
    }

    public Apple(String color) {
        this.color = color;
    }
    
    public Apple(String color, int weight) {
        this.color = color;
        this.weight = weight;
    }

    public Apple(int weight, String color) {
        this.weight = weight;
        this.color = color;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    // @SuppressWarnings("boxing")
    @Override
    public String toString() {
        return String.format("Apple{color='%s', weight=%d}", color, weight);
    }

}
