package Java.Java8;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static java.util.stream.Collectors.toList;
import java.util.function.Predicate;

/**
 * Predicate: (in Math) something function-like that takes a value for an argument
 * and returns true or false; more standard and efficient as it avoids boxing a 
 * boolean into a Boolean 
 */

/**
 * This class showcases how we can filter data based on a criterion,
 * we can pass around a method during runtime. This enables us to 
 * separate the logic of iterating the collection to filter and the 
 * behavior to apply on each element of that collection
 */
public class FilteringApples {

  /**
   * pre-Java 8 way of filtering out Green Apples
   * 
   * @param inventory Holds a List of Apples
   * @return
   */
  public static List<Apple> filterGreenApples(List<Apple> inventory) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if ("green".equals(apple.getColor())) {
        result.add(apple);
      }
    }
    return result;
  }

  /**
   * pre-Java 8 way of filtering Apples that exceed a weight threshold
   * 
   * @param inventory
   * @return
   */
  public static List<Apple> filterHeavyApples(List<Apple> inventory) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (apple.getWeight() > 150) {
        result.add(apple);
      }
    }
    return result;
  }

  /**
   * Java 8 way is to pass code of the condition as an argument,
   * this one checks for Green Apples
   * 
   * @param apple
   * @return
   */
  public static boolean isGreenApple(Apple apple) {
    return "green".equals(apple.getColor());
  }

  public static boolean isHeavyApple(Apple apple) {
    return apple.getWeight() > 150;
  }

  /**
   * Instead we write filter in a way that takes in a predicate so that it can
   * adapt to the specifications needed.
   * 
   * @param inventory - The list of apples to select from
   * @param p - The predicate that models the selection criteria that returns a boolean
   * @return A list of Apples that pass the criterion provided by predicate p
   */
  public static List<Apple> filterApples(List<Apple> inventory, Predicate<Apple> p) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (p.test(apple)) {
        result.add(apple);
      }
    }
    return result;
  }


  /**
   * A Predicate (a function that returns a boolean) allows us to model the selection 
   * criteria, returning a boolean based on some attributes of Apple. This allows a 
   * better way to cope with changing specs and requirements.
   * 
   * Behavior parameterization where filterApples() method depends on the code you pass
   * to it via tthe ApplePredicate object. Althoughh we wrap the code inside an 
   * ApplePredicate object, still similar to passing code inline, because you're passing
   * a boolean expression through an object that implements the test method. You can
   * pass things directly by using lambdas.
   */
  public interface ApplePredicate {
    public boolean test (Apple a);
  }

  static class AppleWeightPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getWeight() > 150;
    }
  }

  static class AppleGreenColorPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getColor() == "green";
    }
  }

  static class AppleRedAndHeavyPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getColor() == "red" && apple.getWeight() > 150;
    }
  }

  public interface AppleFormater {
    public String print (Apple a);
  }



  /**
   * Takes a List of Apples that can be parameterized with multiple ways
   * to generate a String output from an apple. For instance, to print
   * only the weight of each apple. In addition, can print each apple 
   * individually and mention whether it's heavy or light.
   * @param inventory
   */
  public static void prettyPrintApple(List<Apple> inventory, Predicate<Apple> p) {
    for(Apple apple: inventory) {
    String output = p.print(apple);
    System.out.println(output);
    }
  }

  public static void main(String... args) {
    List<Apple> inventory = Arrays.asList(
        new Apple(80, "green"),
        new Apple(155, "green"),
        new Apple(120, "red"));

    /**
     * Here we use the new Java8 way to filterApples() by passing in a predicate
     * (method reference)
     * 
     * filterApples(inventory, Apple::isGreenApple)
     * or
     * filterApples(inventory, Apple::isHeavyApple)
     */

    /** Method References **/

    // [Apple{color='green', weight=80}, Apple{color='green', weight=155}]
    List<Apple> greenApples = filterApples(inventory, FilteringApples::isGreenApple);
    System.out.println(greenApples);

    // [Apple{color='green', weight=155}]
    List<Apple> heavyApples = filterApples(inventory, FilteringApples::isHeavyApple);
    System.out.println(heavyApples);

    /** Lambda Expressions **/

    // [Apple{color='green', weight=80}, Apple{color='green', weight=155}]
    List<Apple> greenApples2 = filterApples(inventory, (Apple a) -> "green".equals(a.getColor()));
    System.out.println(greenApples2);

    // [Apple{color='green', weight=155}]
    List<Apple> heavyApples2 = filterApples(inventory, (Apple a) -> a.getWeight() > 150);
    System.out.println(heavyApples2);

    // []
    List<Apple> weirdApples = filterApples(inventory, (Apple a) -> a.getWeight() < 80 || "brown".equals(a.getColor()));
    System.out.println(weirdApples);

    List<Apple> redApples = filterApples(inventory, (Apple apple) -> "red".equals(apple.getColor()));
    System.out.println(redApples);

    /** Using Streams to process "parallelism almost for free" */

    // Example of sequential processing:
    List<Apple> heavyApples3 = inventory.stream().filter((Apple a) -> a.getWeight() > 150)
        .collect(toList());
    System.out.println(heavyApples3);

    //Example of parallel processing:
    List<Apple> heavyApples4 =
        inventory.parallelStream().filter((Apple a) -> a.getWeight() > 150)
        .collect(toList());
    System.out.println(heavyApples4);
  } // end of Main

}
