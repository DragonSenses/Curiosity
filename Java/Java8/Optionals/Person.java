package Java.Java8.Optionals;

import java.util.List;
import java.util.Optional;

/**
 * Model a Person that may have a Car and may have Car Insurance.
 * Showcase using Optionals instead of nulls, as it clearly signals
 * that a missing value is permitted there. 
 */
public class Person {     
    // Member Fields      
    private Optional<Car> car; // A person may not own a car

    // Changed getter method to return an Optional<Car>
    public Optional<Car> getCar() {
        return car;
    }

    // public class Car {
    //     private Optional<Insurance> insurance;  // A car may not be insured
    //     public Optional<Insurance> getInsurance() { return insurance; }
    // }

    // public class Insurance {
    //     private String name;    // An Insurance company must have a name
    //     public String getName() { return name; }
    // }


    /**
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

    // Problem: Take a List<Person> and return a Set<String> containing all the
    // distinct names of the insurance companies used by people in that list

    /**
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
    
    // Combining Two Optionals: Suppose you are given a Person and Car, queries
    // some external services and implements some complex business logic to 
    // find insurance company that offers the cheapest policy for that combo
    public Insurance findCheapestInsurance(Person person, Car car){
        Insurance cheapestCompany = new Insurance("Costco");
        // queries services provided by different insurance companies
        // compare all those data
        return cheapestCompany;
    }

    // Null-Safe version Attempt 1: Too close to null checks
    public Optional<Insurance> nullSafeFindCheapestInsurance(
                    Optional<Person> person, Optional<Car> car) {
        if (person.isPresent() && car.isPresent()) {
            return Optional.of(findCheapestInsurance(person.get(), car.get()));
        } else {
            return Optional.empty();
        }
    }

    /**
     * Better way to combine two optionals without unwrapping them; Null-Safe version.
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
}
