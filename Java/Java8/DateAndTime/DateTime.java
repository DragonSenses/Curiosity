package Java.Java8.DateAndTime;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;

/**
 * Experimenting with the new Date and Time API. 
 * ================================= Summary =================================
 * 1. Creating a LocalDate object
 * 2. Creating a LocalTime object
 * ================================= Methods =================================
 * ----------------------- LocalDate Methods ---------------------------------
 * -LocalDate.of() - static factory method that produces a LocalDate object 
 * with year, month, day as parameters
 * - getYear(), getMonth(), getDayOfMonth(), getDayOfWeek() - field getters
 * - lengthOfMonth() - returns number of days within that month
 * - isLeapYear() - true if leap year, false otherwise
 * 
 */
public class DateTime {

    public static void makeLocalDate(){
        LocalDate date = LocalDate.of(2017, 9, 21);
        int year = date.getYear();
        Month month = date.getMonth();
        int day = date.getDayOfMonth();
        DayOfWeek dow = date.getDayOfWeek();
        int len = date.lengthOfMonth();
        boolean leap = date.isLeapYear();
    }

    public static void main(String[] args) {
        System.out.println("======== Working with LocalDate and LocalTime ========");
    }
}
