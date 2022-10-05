package Java.Java8.DateAndTime;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.ChronoField;

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
 * - parse() - creates date object by parsing a String
 *  ----------------------- LocalTime Methods ---------------------------------
 * -LocalTime.of() - static factory method that produces a LocalTime object 
 * with hour, minute, second as parameters
 * - getHour(), getMinute(), getSecond() - field getters
 * - parse() - creates date object by parsing a String
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

        System.out.println("Local Date:\t\t" + date);
        System.out.println("Year:\t\t\t" + year);
        System.out.println("Month:\t\t\t" + month);
        System.out.println("Day:\t\t\t" + day);
        System.out.println("Day of the Week:\t" + dow);
        System.out.println("Length of the Month:\t" + len);
        System.out.println("Is Leap Year?\t\t" + leap);
    }

    /**
     * Reading LocalDate values by using a TemporalField
     */
    public static void readLocalDate(){
        LocalDate date = LocalDate.of(2017, 9, 21);
        int year = date.get(ChronoField.YEAR);
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        int day = date.get(ChronoField.DAY_OF_MONTH);

        System.out.println("Local Date:\t" + date);
        System.out.println("Year:\t" + year);
        System.out.println("Month:\t" + month);
        System.out.println("Day:\t" + day);
    }

    /**
     * Creating a LocalTime and reading its values. 
     */
    public static void makeLocalTime(){
        LocalTime time = LocalTime.of(13, 45, 20);  // 13:45:20
        int hour = time.getHour();                  // 13
        int minute = time.getMinute();              // 45
        int second = time.getSecond();              // 20

        System.out.println("Local Time:\t" + time);
        System.out.println("Hour:\t" + hour);
        System.out.println("Minute:\t" + minute);
        System.out.println("Second:\t" + second);
    }

    /**
     * Can create both LocalDate and LocalTime by parsing a String representing
     * them. Note: Possible to pass DateTimeFormatter to parse method. 
     * @throws DateTimeParseException when String argument can't be parsed as 
     * valid LocalDate or LocalTime
     */
    public static void makeLocalDateAndTimeWithString(){
        LocalDate date = LocalDate.parse("2017-09-21");
        LocalTime time = LocalTime.parse("13:45:20");

        System.out.println("Local Date:\t" + date);
        System.out.println("Local Time:\t" + time);
    }

    public static void main(String[] args) {
        System.out.println("======== Working with LocalDate ========");
        makeLocalDate();
        System.out.println("\n---- Reading LocalDate values via TemporalField ----");
        readLocalDate();

        System.out.println("\n======== Working with LocalTime ========");
        makeLocalTime();
        System.out.println("\n== Create LocalDate & LocalTime with String ==");
        makeLocalDateAndTimeWithString();
    }
}
