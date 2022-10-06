package Java.Java8.DateAndTime;

// Import java.time package
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.Period;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;

// import data structures
import java.util.EnumSet;
import java.util.List;

/**
 * Experimenting with the new Java 8's Date and Time API. All classes here are
 * immutable, a great design choice to allow a more functional programming
 * style, ensure thready safety, and preserve the consistency of the domain 
 * model.
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
 * 
 * All the classes so far implement the Temporal interface, which defines how 
 * to read and manipulate values of an object modeling a generic point in time.
 * The next step is tot create a duration between two temporal objects. 
 * ================================= Summary =================================
 * 1. Working with LocalDate
 * 2. Working with LocalTime
 * 3. Working with LocalDateTime 
 * 4. Working with Instant
 * 5. Create a Duration between two Temporal Objects
 * 6. Create a Period between two LocalDates 
 * ================================= Methods =================================
 * ----------------------- LocalDate Methods ---------------------------------
 * - of() - static factory method that produces a LocalDate object 
 * with (year, month, day) as parameters
 * - now() - obtains the current date from the system clock 
 * - getYear(), getMonth(), getDayOfMonth(), getDayOfWeek() - field getters
 * - lengthOfMonth() - returns number of days within that month
 * - isLeapYear() - true if leap year, false otherwise
 * - parse() - creates date object by parsing a String
 * 
 *  ----------------------- LocalTime Methods ---------------------------------
 * - of() - static factory method that produces a LocalTime object 
 * with (hour, minute, second) as parameters
 * - now() - obtains the current time from the system clock 
 * - getHour(), getMinute(), getSecond() - field getters
 * - parse() - creates date object by parsing a String
 * 
 *  ------------------- LocalDateTime Methods ---------------------------------
 *  - of() - static factory method that produces a LocalDateTime
 * object with (year, month, day, hour, minute, second) as parameters
 * - atTime(LocalTime) - passing a time to LocalDate creates a LocalDateTime
 * - atDate(LocalDate) - passing a Date to LocalTime creates a LocalDateTime
 * - toLocalDate() - extracts LocalDate component of LocalDateTime
 * - toLocalTime() - extracts LocalTime component of LocalDateTime
 * 
 *  ------------------------- Instant Methods ---------------------------------
 * - ofEpochSecond() - static factory method that creates an instance of Instant
 * by passing number of seconds as a parameter
 * - ofEpochSecond(seconds, nanoAdjustment) - overloaded method that adjusts the
 * passed number of seconds by nanosecond precision
 * - now() - static factory method that captures a timestamp of the current moment
 * 
 * ------------------------- Duration Methods ---------------------------------
 * - of() - static factory method that creates instance of a Duration directly
 * without defining them as a difference between two temporal objects
 * - between() - static factory method that takes two temporal objects to 
 * create a Duration. Cannot mix Instant and LocalDateTime. Cannot pass LocalDate.
 * 
 * --------------------------- Period Methods ---------------------------------
 * - of() - static factory method that creates instance of a Period directly
 * without defining them as a difference between two temporal objects
 * - between() - static factory method that takes two LocalDates to create a
 * Period, an amount of time in terms of years, months, and days. 
 * 
 * Duration & Period are date-time classess that represent an Interval so
 * share the following methods: 
 * - between() - creates an interval between two points in time
 * - from() - creates an interval from a temporal unit
 * - of() - creates an instance of this interval from its constituent parts
 * - parse() - creates an instance of this interval from a String
 * - addTo() - creates a copy of thhis interval, adding it to the specified 
 * temporal object
 * - get() - reads part of the state of this interval
 * - isNegative - checks whether this interval is negative, excluding zero
 * - is Zero() - checks whether this interval is zero-length
 * - minus() - creates a copy of this interval with an amount of time subtracted
 * - multipliedBy() - creates a copy of this interval multipled by the given scalar
 * - negated() - creates a copy of this interval with the length negated
 * - plus()  - creates a copy of this interval with an amount of time added
 * - subtractFrom() - subtracts this interval from the specified temporal object
 */
public class DateTime {
    // EnumSet instead of bit flag, determines which objects to output in main
    public enum Flag { 
        // From Summary
        LOCAL_DATE, LOCAL_TIME, LOCAL_DATE_TIME, INSTANT, DURATION, PERIOD;
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
     * Demonstrate ways to instantiate Instant class. 
     */
    public static void makeInstant(){
        Instant currentInstant = Instant.now();
        // Following invocations of the ofEpochSecond() return exactly the
        // the same Instant
        Instant i1 = Instant.ofEpochSecond(3);
        Instant i2 = Instant.ofEpochSecond(3, 0);
        Instant i3 = Instant.ofEpochSecond(2, 1_000_000_000);
        Instant i4 = Instant.ofEpochSecond(4, -1_000_000_000);


        System.out.println("Instant(3s) =\t" + i1);
        System.out.println("Instant(3s,0ns) =\t" + i2);
        System.out.println("Instant(2s, 1,000,000,000 ns) =\t" + i3);
        System.out.println("Instant(4s, -1,000,000,000 ns) =\t" + i4);

        System.out.println("\n---- Capture Timestamp of Current Moment ----");
        System.out.println("Current Instant:\t" + currentInstant);
    }

    /**
     * Creates a Duration between two temporal objects. Using between(), a
     * Duration can be made between:
     * - Two LocalTimes
     * - Two LocalDateTimes
     * - Two Instants
     * Note: Cannot Mix Instant and LocalDateTime. Also cannot pass LocalDate
     * to between() as Duration represents amount of time measured in seconds
     * or nanoseconds. Use Period instead of Duration if time needs to be 
     * modeled after years, months, and days. 
     */
    public static void makeDuration(){
        LocalTime time1 = LocalTime.of(18, 45, 00);  // 6:45 PM
        LocalTime time2 = LocalTime.of(21, 45, 00);  // 9:45 PM
        LocalDateTime dateTime1 = LocalDateTime.of(2017, Month.SEPTEMBER,
             21, 18, 45, 20);   // 2017-9-21, 18:45:20
        LocalDateTime dateTime2 = LocalDateTime.of(2017, Month.SEPTEMBER,
             22, 19, 45, 20);   // 2017-9-22, 19:45:20
        Instant instant1 = Instant.ofEpochSecond(3);
        Instant instant2 = Instant.ofEpochSecond(7);
        Duration d1 = Duration.between(time1, time2);
        Duration d2 = Duration.between(dateTime1, dateTime2);
        Duration d3 = Duration.between(instant1, instant2);

        System.out.printf("Duration between {%s} and {%s} is {%s}\n",time1, time2, d1);
        System.out.printf("Duration between {%s} and {%s} is {%s}\n",time2, time1,
                Duration.between(time2,time1) ); // Duration in reverse
        System.out.printf("Duration between {%s} and {%s} is {%s}\n",dateTime1, dateTime2, d2);
        System.out.printf("Duration between {%s} and {%s} is {%s}\n",instant1, instant2, d3);

        System.out.println("\n---- Creating Duration Directly ----");
        Duration threeMinutes = Duration.ofMinutes(3);
        Duration sevenMinutes = Duration.of(7, ChronoUnit.MINUTES);
        System.out.println("Duration of 3 mins:\t" + threeMinutes);
        System.out.println("Duration of 7 mins:\t" + sevenMinutes);
    }

    /**
     * To model an amount of time in terms of years, months, and days one can
     * use Period class. Using between() static factory method finds the 
     * difference between two LocalDates.
     */
    public static void makePeriod(){
        LocalDate date1 = LocalDate.of(2017, 9, 11);
        LocalDate date2 = LocalDate.of(2017, 9, 21);
        Period tenDays = Period.between(date1, date2);
        System.out.printf("The period between {%s} and {%s} is {%s}\n",
                          date1, date2, tenDays);

        System.out.println("\n---- Creating Period Directly ----");
        tenDays = Period.ofDays(10);
        Period threeWeeks = Period.ofWeeks(3);
        Period twoYearsSixMonthsOneDay = Period.of(2, 6, 1);
        System.out.println("Period of 10 Days:\t" + tenDays);
        System.out.println("Period of 3 Weeks:\t" + threeWeeks);
        System.out.println("Period of 2 Years, 6 Months, 1 Day:\t" 
            + twoYearsSixMonthsOneDay);
    }

    public static void execute(EnumSet<Flag> flags){
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

        // 4. Duration
        if(flags.contains(Flag.DURATION)) {
            System.out.println("\n======== Working with Duration ========");
            makeDuration();
        }

        // 5. Period
        if(flags.contains(Flag.PERIOD)) {
            System.out.println("\n======== Working with Period ========");
            makePeriod(); 
        }
    }

    public static void main(String[] args) {
        EnumSet<Flag> allOptions = EnumSet.allOf(Flag.class); 
        execute(allOptions);
    }
}
