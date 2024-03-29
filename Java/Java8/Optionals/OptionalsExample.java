package Java.Java8.Optionals;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toSet;    

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
 * NOTE: Optionals in your domain model to mark with a specific type the values
 * that are allowed to be missing or remain undefined. The designers of the 
 * Optional class, however, developed it based on different assumptions and 
 * with a different use case in mind. In particular, Java language architect
 *  Brian Goetz clearly stated that the purpose of Optional is to support the 
 * optional return idiom only. Because the Optional class wasn’t intended for
 *  use as a field type, it doesn’t implement the Serializable interface.
 * 
 * ================================= Summary =================================
 * 1. Chaining Optional Objects
 * 2. Manipulate a stream of optionals: take a list of persons and find 
 * distinct insurance company names
 * 3. Combining Two Optionals
 * 4. Rejecting certain values with filter
 * 5. Filtering an Optional
 * 6. Wrapping a Potentially Null value in an Optional
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
public class OptionalsExample {
    /** (1) Chaining Optional Objects
     * Given an Optional<Person>, extract the Insurance name.
     * flatMap() operation allows the chaining of Optional objects.
     * @param person to extract Insurance Name from
     * @return the Name of Insurance
     */
    public String getCarInsuranceName(Optional<Person> person){
        /** Nested Optional Problem
         * p is of type Optional<Person> so fine to call map method, but getCar()
         * returns an object of type Optional<Car>, so result of operation is 
         * object of type Optional<Optional<Car>>, which does not support getInsurance()
         */                         
        // Optional<String> name = p.map(Person::getCar)       
        //                          .map(Car::getInsurance)     
        //                          .map(Insurance::getName);

        /**
         * First, you begin with the optional that wraps the Person and invokes
         * -flatMap(Person::getCar), think of this invocation as two steps
         * 1) a Function is applied to the PErson inside the optional to transform it
         * Function is expressed with a method reference invoking the method getCar()
         * on Person. It retursn an Optional<Car>, the Person inside the optional is
         * transformed into an instance of that type, resulting in a two-level optional
         * that's flattened as part of the flatMap operation
         * 
         * From a theoretical point of view, you can think of this flattening operation
         * as the operation that combines two nested optionals, resulting in an
         * empty optional if at least one of them is empty.
         * 
         * In reality, if you invoked flatMap on an empty optional, nothing is changed,
         * and the empty optional is returned as is. 
         * 
         * Conversely, if the optional wraps a Person, the Function passed to the 
         * flatMap() is applied to that Person. Because the value produced by that
         * Function application is already an optional, the flatMap() method can
         * return as is.
         * 
         * 2) Similarly, transforming the Optional<Car> into an Optional<Insurance>.
         * 
         * Step 3) turns the Optional<Insurance> into an Optional<String>: because the 
         * Insurance.getName() method returns a String. In this case, a flatMap isn't
         * necessary.  
         * 
         * At this point the resulting optional will be empty if any of the
         * methods in this invocation chain returns an empty optional or otherwise 
         * contains the desired insurance company name. 
         * 
         * Step 4) Since it returns an Optional<String>, which may or may not contain
         * the insurance company name, so orElse() method is called which provides
         * a default value in case the optional is empty. 
         * 
         * Many methods provide a default actions or unwrap an optional. 
         */
        return person.flatMap(Person::getCar)       
                     .flatMap(Car::getInsurance)
                     .map(Insurance::getName)
                     .orElse("Unknown");
    }

    /** (2) Manipulate a stream of optionals: take a list of persons and find 
     * distinct insurance company names
     * Take a list of persons and return a Set of Strings that contain all the
     * distinct names of the insurance companies used by people in that list
     * @param persons List of persons to extract insurance company names
     * @return a Set of distinct names of Insurance companies from list of persons
     */
    public Set<String> getCarInsuranceNames(List<Person> persons) {
        // 1. After First Map transformation, obtain a Stream<Optional<Car>>
        // 2. Subsequent maps transform each Optional<Car> into Optional<Insurance>
        // then Optional<String>, then a flatMap returns a Stream<Optional<String>> 
        // when a Optional may be empty when either person doesn't own car or isn't insured

        // 4. Now need to filter out empty Optionals, but can do this by using stream() of
        // Optional class converting into Stream with 0 or 1 elements, depending 
        // on when Optional is empty (in line flatMap(Optional::stream))
        return persons.stream() 
                      .map(Person::getCar)                           // Extract Car Owners
                      .map(car -> car.flatMap(Car::getInsurance))    // Extract Cars with Insurance
                      .map(insur -> insur.map(Insurance::getName))   // Extract Insurance Name
                      .flatMap(Optional::stream)                     // Convert to Optional Stream
                      .collect(toSet());    // Collect results into a Set
    }   
   
    /** (3) Combining Two Optionals 
     * Suppose you are given a Person and Car, queries some external services
     * and implements some complex business logic to find insurance company 
     * that offers the cheapest policy for that combo
     * @return an insurance company given the combination of person and car
     */
    public Insurance findCheapestInsurance(Person person, Car car){
        Insurance cheapestCompany = new Insurance("Costco");
        // queries services provided by different insurance companies
        // compare all those data
        return cheapestCompany;
    }

    // (3.1) Null-Safe version 1: Too close to null checks
    public Optional<Insurance> nullSafeFindCheapestInsuranceV1(
                    Optional<Person> person, Optional<Car> car) {
        if (person.isPresent() && car.isPresent()) {
            return Optional.of(findCheapestInsurance(person.get(), car.get()));
        } else {
            return Optional.empty();
        }
    }

    /** (3.2) Better way to combine two optionals without unwrapping them. 
     * Here we use a combination of map() and flatMap(). 
     * 1) Invoke flatMap() on first optional, so if this optional is empty, then lambda
     * expression passed to it won't be executed, and this invocation will return an 
     * empty optional
     * 2) If the person is present, flatMap() uses it as the input to a Function returning
     * an Optional<Insurance> as required by flatMap() method
     * 3) Body of this function invokes a map on the second optional, so if it doesn't
     * contain any Car, the Function returns an empty Optional, and so does the whole 
     * findCheapestInsurance() method. 
     * 4) Finally, if both the Person and Car are present, the lambda expression passed as
     * an argument to the map() method can safely invoke the original findCheapestInsurance
     * method within them
     * @param person Optional Person 
     * @param car Optional Car
     * @return return the cheapest Insurance based on the combination of person and car
     */
    public Optional<Insurance> nullSafeFindCheapestInsurance(Optional<Person> person, Optional<Car> car){
        return person.flatMap(p -> car.map(c -> findCheapestInsurance(p,c)));
    }

    /** (4) Rejecting certain values with filter, often needed to call a method
     * on an object to check some property.
     * Optional.filter() - takes predicate as argument, if a value is present
     * in the Optional object, and that value matches the predicate, the filter
     * method returns that value; otherwise, it returns an empty Optional object.
     * If optional is already empty, it doesn't have any effect; otherwise, it
     * applies the predicate to the value contained in the optional. If application 
     * returns true, the optional returns unchanged; otherwise, the value is 
     * filtered away, leaving the otpional empty. 
     */
    public void checkInsuranceName(Optional<Insurance> insurance){
        // OLD WAY: Null Check Pattern to check an object for some property
        // if(insurance != null && "CambridgeInsurance".equals(insurance.getName())){
        //     System.out.println("ok");
        // }
        
        // NEW WAY: Null-Safe Pattern using filter() on Optional object
        insurance.filter(i -> "CostcoInsurance".equals(i.getName()))
                 .ifPresent(x -> System.out.println("ok"));
    }

    /** (5) Filtering an optional 
     * Returns the insurance company name only if the person has an age greater
     * than or equal to the minAge requirement. 
     * @param person to extract insurance name from
     * @param minAge minimum age requirement to filter by
     * @return name of insurance company if predicate is true
     */
    public String getCarInsuranceName(Optional<Person> person, int minAge){
        return person.filter(p -> p.getAge() >= minAge)     // Filter Optional person by minimum age
                     .flatMap(Person::getCar)    // Map Person to Car
                     .flatMap(Car::getInsurance) // Map Car to Insurance
                     .map(Insurance::getName)    // Map Insurance to Name
                     .orElse("Unknown");  // Return Unknown if any empty
    }

    /**
     * 6. Wrapping a Potentially Null value in an Optional
     * get() method of Map returns null as its value if it contains no mapping
     * for the requested key. Using Map<String,Object>, a map.get("key") will
     * return null if no value associated to key: "key". 
     * @return value wrapped in an optional
     */
    public Optional<Object> getValueWrappedInOptional(Map<String,Object> map){
        // Safely transforms a value that could be null into an optional
        return Optional.ofNullable(map.get("key")); 
    }

    public static void main(String[] args){
        System.out.println("======== Creating Optional Objects ========");
        System.out.println("Turning 7 into Optional -> " + Optional.of(7));
        System.out.println("--------- Using Optional.ofNullable() ---------");
        // If specified value is null, returns an empty instance of Optional class
        System.out.print("Turning null into Optional -> " + Optional.ofNullable(null));
    }
}
