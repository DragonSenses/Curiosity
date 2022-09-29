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

    public class Car {
        private Optional<Insurance> insurance;  // A car may not be insured
        public Optional<Insurance> getInsurance() { return insurance; }
    }

    public class Insurance {
        private String name;    // An Insurance company must have a name
        public String getName() { return name; }
    }
}
