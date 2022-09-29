package Java.Java8.Optionals;

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

    public class Car {
        private Optional<Insurance> insurance;  // A car may not be insured
        public Optional<Insurance> getInsurance() { return insurance; }
    }

    public class Insurance {
        private String name;    // An Insurance company must have a name
        public String getName() { return name; }
    }


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
         * as the operation that combines two nested optionals, resultinging in an
         * empty optional if at least one of them is empty.
         * 
         * In reality, if you invoked flatMap on an empty optional, nothing is changed,
         * and the empty optional is returned as is. 
         * 
         * Conversely, if the optional wraps a Person, the Function passed to the 
         * flatMap() is applied to that Person. Because the value produced by that
         * Function application is already an optional, the flatMap() method can
         * return as is.
         */
        return person.flatMap(Person::getCar)       
                     .flatMap(Car::getInsurance)
                     .map(Insurance::getName)
                     .orElse("Unknown");
    }
}
