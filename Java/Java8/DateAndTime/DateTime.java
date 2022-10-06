package Java.Java8.DateAndTime;

// Import java.time package
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.ChronoField;

// import data structures
import java.util.EnumSet;
import java.util.List;

/**
 * Experimenting with the new Java 8's Date and Time API. 
 * 
 * [Human Time]
 * LocalDate, LocalTime
 * LocalDateTime is a composite class that pairs a LocalDate and a LocalTime,
 * representing both a date and a time without a time zone. 
 * 
 * [Machine Time]
 * From machine point of view, most natural format to model time is a single
 * large number representing a point on a continuous timeline. 
 * java.time.Instant class, represents the number of seconds passed since the
 * Unix epoch time, set by convention to midnight of January 1, 1970. 
 * 
 * Instant class suports nanosecond precision. 
 * ================================= Summary =================================
 * 1. Working with LocalDate
 * 2. Working with LocalTime
 * 3. Working with LocalDateTime 
 * 4. Working with Instant
 * ================================= Methods =================================
 * 
 * ----------------------- LocalDate Methods ---------------------------------
 * -LocalDate.of() - static factory method that produces a LocalDate object 
 * with (year, month, day) as parameters
 * -LocalDate.now() - obtains the current date from the system clock 
 * - getYear(), getMonth(), getDayOfMonth(), getDayOfWeek() - field getters
 * - lengthOfMonth() - returns number of days within that month
 * - isLeapYear() - true if leap year, false otherwise
 * - parse() - creates date object by parsing a String
 * 
 *  ----------------------- LocalTime Methods ---------------------------------
 * -LocalTime.of() - static factory method that produces a LocalTime object 
 * with (hour, minute, second) as parameters
 * -LocalTime.now() - obtains the current time from the system clock 
 * - getHour(), getMinute(), getSecond() - field getters
 * - parse() - creates date object by parsing a String
 * 
 *  ------------------- LocalDateTime Methods ---------------------------------
 *  -LocalDate.of() - static factory method that produces a LocalDateTime
 * object with (year, month, day, hour, minute, second) as parameters
 * - atTime(LocalTime) - passing a time to LocalDate creates a LocalDateTime
 * - atDate(LocalDate) - passing a Date to LocalTime creates a LocalDateTime
 * - toLocalDate() - extracts LocalDate component of LocalDateTime
 * - toLocalTime() - extracts LocalTime component of LocalDateTime
 * 
 *  ------------------------- Instant Methods ---------------------------------
 * -ofEpochSecond() - static factory method that creates an instance of Instant
 * by passing number of seconds as a parameter
 * 
 */
public class DateTime {
    // EnumSet instead of bit flag, determines which objects to output in main
    public enum Flag { 
        // From Summary
        LOCAL_DATE, LOCAL_TIME, LOCAL_DATE_TIME, INSTANT;

        // Must defined EnumSet<> consisting of all constants in Flag type
        public static final EnumSet<Flag> ALL_OPTIONS = EnumSet.allOf(Flag.class);
    }

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
     * now() factory method obtains the current date from the system clock
     */ 
    public static void currentDate(){
        System.out.println("\n--- Current Date using now() ---");
        LocalDate today = LocalDate.now();
        System.out.println("Today is\t" + today);
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
     * now() factory method obtains the current time from the system clock
     */ 
    public static void currentTime(){
        System.out.println("\n--- Current Time using now() ---");
        LocalTime today = LocalTime.now();
        System.out.println("Today's time is\t" + today);
    }

    /**
     * Can create both LocalDate and LocalTime by parsing a String representing
     * them. Note: Possible to pass DateTimeFormatter to parse method. 
     * @throws DateTimeParseException when String argument can't be parsed as 
     * valid LocalDate or LocalTime
     */
    public static void makeLocalDateOrTimeWithString(){
        LocalDate date = LocalDate.parse("2017-09-21");
        LocalTime time = LocalTime.parse("13:45:20");

        System.out.println("Local Date:\t" + date);
        System.out.println("Local Time:\t" + time);
    }
    
    /**
     * Showcase the various ways in creating a LocalDateTime object, creating
     * it directly or by combing a date and time. 
     */
    public static void makeLocalDateTime(){
        LocalDate date = LocalDate.parse("2017-09-21");
        LocalTime time = LocalTime.parse("13:45:20");
        // 2017-09-21T13:45:20
        LocalDateTime dt1 = LocalDateTime.of(2017, Month.SEPTEMBER, 21, 13, 45, 20);
        LocalDateTime dt2 = LocalDateTime.of(date, time);
        LocalDateTime dt3 = date.atTime(13, 45, 20);
        LocalDateTime dt4 = date.atTime(time);
        LocalDateTime dt5 = time.atDate(date);

        List<LocalDateTime> list = List.of(dt1, dt2, dt3, dt4, dt5);
        list.stream().forEach(System.out::println);
    }

    /**
     * Showcase how to extract the LocalDate or LocalTime component from a 
     * LocalDateTime. 
     */
    public static void extractLocalDateTime(){
        System.out.println("\n--- Extracting Date and Time from LocalDateTime ---");
        LocalDateTime dt = LocalDateTime.of(2017, Month.SEPTEMBER, 21, 13, 45, 20);
        LocalDate date = dt.toLocalDate(); // 2017-09-21
        LocalTime time = dt.toLocalTime(); // 13:45:20

        System.out.println("Local DateTime:\t" + dt);
        System.out.println("Local Date:\t" + date);
        System.out.println("Local Time:\t" + time);
    }

    /**
     * 
     */
    public static void makeInstant(){

    }

    public static void execute(EnumSet<Flag> flags){
        // * 1. Working with LocalDate
        // * 2. Working with LocalTime
        // * 3. Working with LocalDateTime 
        // * 4. Working with Instant

        // 1. LocalDate
        if(flags.contains(Flag.LOCAL_DATE)) {
            System.out.println("======== Working with LocalDate ========");
            makeLocalDate();
            currentDate();
            System.out.println("\n---- Reading LocalDate values via TemporalField ----");
            readLocalDate();
        }

        // 2. LocalTime
        if(flags.contains(Flag.LOCAL_TIME)) {
            System.out.println("\n======== Working with LocalTime ========");
            makeLocalTime();
            currentTime();
            System.out.println("\n-- Create LocalDate & LocalTime with String --");
            makeLocalDateOrTimeWithString();
        }

        // 3. LocalDateTime
        if(flags.contains(Flag.LOCAL_DATE_TIME)) {
            System.out.println("\n--- Combining Date and Time: LocalDateTime ---");
            makeLocalDateTime();
            extractLocalDateTime();
        }

        // 4. Instant
        if(flags.contains(Flag.INSTANT)) {
            System.out.println("\n======== Working with Instant ========");
            makeInstant();
        }
    }

    public static void main(String[] args) {
        EnumSet<Flag> allOptions = EnumSet.allOf(Flag.class); 
        EnumSet<Flag> onlyInstant = EnumSet.of(Flag.INSTANT);


        // execute(allOptions);
        execute(onlyInstant);
    }
}
