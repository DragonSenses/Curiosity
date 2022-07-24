package Java.Java8;

public class Apple {

    private int weight = 0;
    private String color = "";

    // Default Constructor of Apples, weight of 75 and Red
    public Apple() {
        this.weight = 75;
        this.color = "red";
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
