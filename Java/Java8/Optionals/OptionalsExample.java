package Java.Java8.Optionals;

import java.util.Optional;

/**
 * Optional class, inspired by Haskell and Skala, encapsulates an optional value.
 * Checking is enforced by the type system. 
 * 
 * When a value is present, the Optional class wraps it. 
 * The absense of a value is modeled with an empty optional returned by method
 * Optional.empty(), which returns a special singleton instance of Optional class.
 * 
 * ---- Optional.empty() vs. Null Reference ----
 * Trying to dereference a null invariably causes NullPointerException, whereas
 * Optional.empty() is a valid, workable object of type Optional.
 * 
 * Declaring Optional<Object> instead of just Object signals that a missing value
 * is permitted there. 
 *  
 * Consistenly using Optional values creates a clear distinction
 * between a missing value that's planned for and a value that's absent only
 * because of a bug in the alogirthm or problem in data. 
 * 
 * A get method raises an exception when the optional is empty, so using it in
 * an ill-disciplined manner effectively re-creates all the maintenance problems
 * caused by using null. Instead look at ways of using optional values that 
 * avoids explicity tests, sinpired by similar operations on streams.
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
 * Extracting/Transforming Values from Optional
 * - map() - operation that takes in a function and applies it to the Optional
 * element and transforms it. If Optional is empty, nothing happens. 
 * 
 * -flatMap() - operation that takes a function as an argument and returns the
 * transformed value. This allows for chaining of Optional objects. Instead of
 * having a two-level or multi-level Optional, it flattens them into one. 
 */
public class OptionalsExample {
    // Creating Optional Objects

    /**
     * flatMap() operation allows the chaining of Optional objects.
     * @param person to extract Insurance Name from
     * @return the Name of Insurance
     */
    public String getInsuranceName(Optional<Person> person){
        /** Nested Optional Problem
         * p is of type Optional<Person> so fine to call map method, but getCar()
         * returns an object of type Optional<Car>, so result of operation is 
         * object of type Optional<Optional<Car>>, which does not support getInsurance()
         */                         
        // Optional<String> name = p.map(Person::getCar)       
        //                          .map(Car::getInsurance)     
        //                          .map(Insurance::getName);

        return person.flatMap(Person::getCar)       
                     .flatMap(Car::getInsurance)
                     .map(Insurance::getName)
                     .orElse("Unknown");
    }

    public static void main(String[] args){
        Person p = new Person();

    }
}
