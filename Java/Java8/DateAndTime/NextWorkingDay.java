package Java.Java8.DateAndTime;

import java.time.temporal.TemporalAdjuster;

/**
 * A Custom TemporalAdjuster, that moves a date forward by one day but skips
 * Saturdays and Sundays.
 */
public class NextWorkingDay implements TemporalAdjuster {
    @Override

    // Defines how to convert a Temporal object to another Temporal
    // @FunctionalInterface
    // public interface TemporalAdjuster {
    //     Temporal adjustInto(Temporal temporal);
    // }
}
