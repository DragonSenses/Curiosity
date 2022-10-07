package Java.Java8.DateAndTime;

import java.time.DayOfWeek;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalAdjuster;

/**
 * A Custom TemporalAdjuster, that moves a date forward by one day but skips
 * Saturdays and Sundays.
 */
public class NextWorkingDay implements TemporalAdjuster {
    // Defines how to convert a Temporal object to another Temporal
    // @FunctionalInterface
    // public interface TemporalAdjuster {
    //     Temporal adjustInto(Temporal temporal);
    // }

    @Override
    public Temporal adjustInto(Temporal temporal) {
        DayOfWeek dow = 
            DayOfWeek.of(temporal.get(ChronoField.DAY_OF_WEEK)); // Read the current day
        int dayToAdd = 1; // Normally add one day
        if (dow == DayOfWeek.FRIDAY){  // but add 3 days if today is a Friday
            dayToAdd = 3; 
        } else if (dow == DayOfWeek.SATURDAY) { // add 2 days if today is Saturday
            dayToAdd = 2;
        } 
        // Return the modified date adding the right number of days
        return temporal.plus(dayToAdd, ChronoUnit.DAYS);
    }

    // Behavior can be passed in as a lambda expression
    // date = date.with(temporal -> {
    //     DayOfWeek dow =
    //     DayOfWeek.of(temporal.get(ChronoField.DAY_OF_WEEK));
    //     int dayToAdd = 1;
    //     if (dow == DayOfWeek.FRIDAY) dayToAdd = 3;
    //     else if (dow == DayOfWeek.SATURDAY) dayToAdd = 2;
    //     return temporal.plus(dayToAdd, ChronoUnit.DAYS);
    // });

    // If Using Lambda Expression, more preferrable to do so using
    // ofDateAdjuster static factory of TemporalAdjusters, which
    // accepts a UnaryOperator<LocalDate>. 

    // TemporalAdjuster nextWorkingDay = TemporalAdjusters.ofDateAdjuster(
    //     temporal -> {
    //         DayOfWeek dow =
    //             DayOfWeek.of(temporal.get(ChronoField.DAY_OF_WEEK));
    //         int dayToAdd = 1;
    //         if (dow == DayOfWeek.FRIDAY) dayToAdd = 3;
    //         else if (dow == DayOfWeek.SATURDAY) dayToAdd = 2;
    //         return temporal.plus(dayToAdd, ChronoUnit.DAYS);
    //     });
    // date = date.with(nextWorkingDay);
}
