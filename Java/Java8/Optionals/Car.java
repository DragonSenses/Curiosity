package Java.Java8.Optionals;

import java.util.Optional;

public class Car {
    private Optional<Insurance> insurance;  // A car may not be insured
    public Optional<Insurance> getInsurance() { return insurance; }
}