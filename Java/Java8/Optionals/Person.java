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
}
