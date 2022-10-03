package Java.Java8.Optionals;

import static java.util.Optional.empty;
import static java.util.Optional.of;

import java.util.Optional;

/**
 * Class that experiments with the Optional Operations. 
 * 
 * ================================= Methods =================================
 * -get() - gets the value out of an optional; raise an exception when the 
 * optional is empty
 * 
 * Creating Optional Objects
 * -Optional.empty() - static factory method that returns a special singleton
 * instance of an empty optional object
 * 
 * -Optional.of() - static factory method creates an optional from a non-null
 * value 
 * 
 * -Optional.ofNullable() - can create an Optional object that may hold a null
 * value 
 * 
 * -filter() - takes predicate as argument, if a value is present in the Optional
 * object, and that value matches the predicate, the filter method returns that
 * value; otherwise, it returns an empty Optional object.
 * 
 * Extracting/Transforming Values from Optional
 * - map() - operation that takes in a function and applies it to the Optional
 * element and transforms it. If Optional is empty, nothing happens. 
 * 
 * -flatMap() - operation that takes a function as an argument and returns the
 * transformed value. This allows for chaining of Optional objects. Instead of
 * having a two-level or multi-level Optional, it flattens them into one. 
 * 
 * -orElse(other) - if the value is present, return the value, otherwise return
 * other
 * 
 * Stream of Optionals
 * -stream() - method from Optional class converts an Optional with a value to a 
 * Stream containing only that value or an empty Optional to an equally empty 
 * Stream. When you have a Stream of Optionals and need to transform it into 
 * another Stream containing only the values present in the nonempty Optional of 
 * the original Stream
 * 
 * Default Actions & Unwrapping an Optional
 * -get() - is the simplest but also the least safe of these methods. It returns
 * the wrapped value if one is present and throws a NoSuchElementException otherwise.
 * For this reason, using this method is almost always a bad idea unless you’re sure
 * that the optional contains a value. In addition, this method isn’t much of an
 * improvement on nested null checks.
 * 
 * -orElse(T other) - allows you to provide a default value when the optional 
 * doesn't contain a value 
 * 
 * -orElseGet() - lazy counterpart of orElse(), because the supplier is invoked
 * only if the optional contains no value. Use this method when the default 
 * value is time-consuming to create(to gain efficiency) or you want the supplier
 * to be invoked only if the optional is empty (when using orElseGet is vital)
 * 
 * -or() - similar to orElseGet(), but doesn't unwrap the value inside the 
 * Optional, if present. In practice, this method doesn't perform any action
 * returns the Optional as it is when it contains a value, but lazily provides
 * a different Optional when the original one is empty
 * 
 * -orElseThrow() - similar to get() in that it throws an exception when optional
 * is empty, but it allows you to choose the type of exception that you want to
 * throw
 * 
 * -ifPresent() - lets you execute the action given as argument if a value is 
 * present; otherwise, no action is taken
 * 
 * -ifPresentOrElse() - differs from ifPresent by taking a Runnable that gives
 * an empty-based action to be executed when the Optional is empty 
 */
public class OperationsWithOptional {

  /**
   * @return Returns the maximum Optional integer between two Optionals.
   */
  public static final Optional<Integer> max(Optional<Integer> i, Optional<Integer> j) {
    return i.flatMap(a -> j.map(b -> Math.max(a, b)));
  }

  public static void main(String... args) {
    System.out.println("======== Finding the Maximum ========");
    System.out.print("Max between " + of(3) +" and " + of(5) +":\t");
    System.out.println(max(of(3), of(5)));

    System.out.print("Max between " + empty() +" and " + of(5) +":\t");
    System.out.println(max(empty(), of(5)));

    System.out.println("\n======== Optionals.or() prints the value if present, but doesn't unwrap ========");
    Optional<Integer> opt1 = of(5);
    Optional<Integer> opt2 = opt1.or(() -> of(4));
    System.out.print("Optional[5] or Optional[4]:\t");
    System.out.println(opt2);

    System.out.println( empty() + " or " + of(4) + ":\t" +
        empty().or(() -> of(4)) );
  }

}
