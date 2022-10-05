package Java.Java8.DateAndTime;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;

/**
 * Experimenting with the new Java 8's Date and Time API. 
 * 
 * ================================= Summary =================================
 * 1. Creating a LocalDate object
 * 2. Creating a LocalTime object
 * ================================= Methods =================================
 * 
 * ----------------------- LocalDate Methods ---------------------------------
 * -LocalDate.of() - static factory method that produces a LocalDate object 
 * with year, month, day as parameters
 * - getYear(), getMonth(), getDayOfMonth(), getDayOfWeek() - field getters
 * - lengthOfMonth() - returns number of days within that month
 * - isLeapYear() - true if leap year, false otherwise
 * 
 */
public class DateTime {

    /**
     * Creating a LocalDate and reading its values. 
     */
    public static void makeLocalDate(){
        // Represent -> 2017-09-21
        LocalDate date = LocalDate.of(2017, 9, 21);
        int year = date.getYear();           // 2017  
        Month month = date.getMonth();       // SEPTEMBER
        int day = date.getDayOfMonth();      // 21
        DayOfWeek dow = date.getDayOfWeek(); // THURSDAY
        int len = date.lengthOfMonth();      // 30
        boolean leap = date.isLeapYear();    // false (not a leap year)

        System.out.println("Local Date:\t" + date);
        System.out.println("Year:\t" + year);
        System.out.println("Month:\t" + month);
        System.out.println("Day:\t" + day);
        System.out.println("Day of the Week:\t" + dow);
        System.out.println("Length of the Month:\t" + len);
        System.out.println("Is Leap Year?\t" + leap);
    }

    public static void main(String[] args) {
        System.out.println("======== Working with LocalDate and LocalTime ========");
        makeLocalDate();
    }
}
