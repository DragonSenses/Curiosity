package Java.Java8.DateAndTime;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import static java.time.temporal.TemporalAdjusters.*;

import java.time.DayOfWeek;
import java.util.EnumSet;

/**
 * Manipulating, Parsing, and Formatting dates. This class will showcase ways
 * to perform these actions. 
 * 
 * To perform advanced operations such as adjusting a date to the next Sunday,
 * the next working day, or the last day of the month pass a TemporalAdjuster
 * to overloaded version of with() method. 
 * 
 * Temporal Adjusters provides a more customizable way to define the 
 * manipulation needed to operate on a specific date. 
 * ================================= Summary =================================
 * (1) Create a modified version of an existing LocalDate, absolute way
 * (2) Create a modified version of an existing LocalDate, relative way
 * (3) Manipulating a LocalDate, chaining and concatenating manipulations
 * (4) Using predefined TemporalAdjusters
 * (5) Using a custom TemporalAdjuster
 * (6) Printing & Parsing Date-Time Objects using DateTimeFormatter
 * (7) Creating a DateTimeFormatter from a pattern
 * ================================= Methods ==================================
 * - get() - reads fields of a Temporal object
 * - with() - modifies fields of a Temporal object
 * - withYear() - returns a LocalDate with modified year attribute
 * - withMonth() - returns a LocalDate with modified month attribute
 * - withDayOfMonth - returns a LocalDate with modified day attribute
 * - plus() - move a Temporal forward a given amount of time
 * - minus() - move a Temporal backward a given amount of time 
 * - plusWeeks() - adds weeks to the date
 * - minusYears() - subtracts years to the date
 * 
 * --------------- Temporal Adjusters Methods ---------------------------------
 * List of static factory methods of TemporalAdjusters
 * - dayOfWeekInMonth, firstDayOfMonth, firstDayOfNextMonth, firstDayOfNextYear,
 * firstDayOfYear, firstInMonth, lastDayOfMonth, lastDayOfNextMonth,
 * lastDayOfNextYear, lastDayOfYear, lastInMonth, next, previous, nextOrSame,
 * previousOrSame
 * 
 * ---------------- DateTimeFormatter Methods ---------------------------------
 * Instances are thread-safe. Can create singleton formatters like the ones 
 * defined by DateTimeFormatter constants and share them among multiple threads.
 * -format() - formats a date-time object using this formatter (Date to String)
 * -parse() - fully parses the text producing a temporal object (String to Date)
 * -
 */
public class WorkingWithDates {

    /** (1) Create a modified version of an existing LocalDate, absolute way
     * To create a modified version of an existing LocalDate is to change one
     * of its attributes using one of its withAttribute methods. Each of these
     * methods return a new object with the modified attribute, they do not 
     * mutate the existing object.
     */
    public static void manipulateAttributesOfLocalDateAbsolute(){
        System.out.println("\n------- Manipulating Attributes in an Absolute way -------");
        LocalDate date1 = LocalDate.of(2017, 9, 21);    //2017-09-21
        LocalDate date2 = date1.withYear(2011);                           //2011-09-21
        LocalDate date3 = date2.withDayOfMonth(25);                 //2011-09-25
        LocalDate date4 = date3.with(ChronoField.MONTH_OF_YEAR, 2);   //2011-02-25

        System.out.println("LocalDate:\t " + date1);
        System.out.println("Changed Year:\t " + date2);
        System.out.println("Changed Day:\t " + date3);
        System.out.println("Changed Month:\t " + date4);
    }

    /** (2) Create a modified version of an existing LocalDate, relative way
     * Manipulating a LocalDate in a declarative manner, can add or subtract
     * a given amount of time. 
     */
    public static void manipulateAttributesOfLocalDateRelative(){
        System.out.println("\n------- Manipulating Attributes in a Relative way -------");
        LocalDate date1 = LocalDate.of(2017, 9, 21);    // 2017-09-21
        LocalDate date2 = date1.plusWeeks(1);                       // 2017-09-28
        LocalDate date3 = date2.minusYears(6);                 // 2011-09-28
        LocalDate date4 = date3.plus(6, ChronoUnit.MONTHS);        // 2012-03-28

        System.out.println("LocalDate:\t " + date1);
        System.out.println("Add 1 Week:\t " + date2);
        System.out.println("Sub 6 Years:\t " + date3);
        System.out.println("Add 6 Months:\t " + date4);
    }

    /** (3) Manipulating a LocalDate, chaining and concatenating manipulations
     * Can manipulate date in both absolute and relative way. One can also
     * concatenate more manipulations in a single statement! Each change
     * creates a new LocalDate object, and subsequent invocation manipulates
     * the object created by former one. 
     */
    public static void manipulateDate(){
        System.out.println("\n------- Manipulating LocalDate -------");
        LocalDate date = LocalDate.of(2014, 3, 18); // 2014-3-18
        System.out.println("LocalDate:\t " + date);

        date = date.with(ChronoField.MONTH_OF_YEAR, 9);
        date = date.plusYears(2).minusDays(10); 
        date.withYear(2011); // No effect as date is not assigned to new obj created
        System.out.println("LocalDate:\t " + date);
    }

    /** (4) Using predefined TemporalAdjusters
     * Date and Time API provides many predefined TemporalAdjusters for common 
     * use cases. Can access them by using static factory methods contained in
     * TemporalAdjusters class. 
     */
    public static void predefinedTemporalAdjusters(){
        System.out.println("\n------- Predefined Temporal Adjusters -------");
        LocalDate date1 = LocalDate.of(2014, 3, 18); // 2014-03-18
        LocalDate date2 = date1.with(nextOrSame(DayOfWeek.SUNDAY));
        LocalDate date3 = date2.with(lastDayOfMonth());

        System.out.println("LocalDate:\t " + date1);
        System.out.println("Next Sunday:\t " + date2);
        System.out.println("Last Day of the Month:\t " + date3);
    }

    // Defines how to convert a Temporal object to another Temporal
    // @FunctionalInterface
    // public interface TemporalAdjuster {
    //     Temporal adjustInto(Temporal temporal);
    // }

    /** (5) Using a custom TemporalAdjuster
     * Here we use a separate class that implements TemporalAdjuster interface
     * that moves a date forward by one day but skips weekends. This is passed
     * in to the generic with() method which returns a new adjusted date. 
     */
    public static void customTemporalAdjuster(){
        System.out.println("\n------- Custom Temporal Adjuster -------");
        LocalDate date = LocalDate.now(); // Get the current date from system clock
        LocalDate date1 = date.with(new NextWorkingDay()); 
        LocalDate date2 = date1.with(new NextWorkingDay()); 
        LocalDate date3 = date2.with(new NextWorkingDay()); 
        LocalDate date4 = date3.with(new NextWorkingDay()); 
        LocalDate date5 = date4.with(new NextWorkingDay()); 
        LocalDate date6 = date5.with(new NextWorkingDay()); 
        LocalDate date7 = date6.with(new NextWorkingDay()); 

        System.out.println("Today is: " + date + " a " + date.getDayOfWeek());
        System.out.println("Cycling through 7 workdays skipping weekends...");
        System.out.println("1)\t " + date1 + " a " + date1.getDayOfWeek());
        System.out.println("2)\t " + date2 + " a " + date2.getDayOfWeek());
        System.out.println("3)\t " + date3 + " a " + date3.getDayOfWeek());
        System.out.println("4)\t " + date4 + " a " + date4.getDayOfWeek());
        System.out.println("5)\t " + date5 + " a " + date5.getDayOfWeek());
        System.out.println("6)\t " + date6 + " a " + date6.getDayOfWeek());
        System.out.println("7)\t " + date7 + " a " + date7.getDayOfWeek());
    }

    /** (6) Printing & Parsing Date-Time Objects using DateTimeFormatter
     * Using java.time.format's DateTimeFormatter class allows creation of 
     * formatters through its static factory methods and constants. 
     */
    public static void dateTimeFormatters(){
        System.out.println("------- Formatting Date to a String -------");
        LocalDate date = LocalDate.now(); // Get the current date from system clock
        String s1 = date.format(DateTimeFormatter.BASIC_ISO_DATE); // YYYYMMDD
        String s2 = date.format(DateTimeFormatter.ISO_LOCAL_DATE); // YYYY-MM-DD

        System.out.println("Today is:\t" + date);
        System.out.println("BASIC_ISO_DATE:\t" + s1);
        System.out.println("ISO_LOCAL_DATE:\t" + s2);

        System.out.println("\n------- Parsing a String to a Date -------");
        LocalDate date1 = LocalDate.parse(s1, DateTimeFormatter.BASIC_ISO_DATE); // YYYYMMDD
        LocalDate date2 = LocalDate.parse(s2, DateTimeFormatter.ISO_LOCAL_DATE); // YYYY-MM-DD
        System.out.printf("Parsing String:{%s} into Date:{%s}\n",s1,date1);
        System.out.printf("Parsing String:{%s} into Date:{%s}\n",s2,date2);
    }

    /** (7) Creating a DateTimeFormatter from a pattern
     * First LocalDate's format() produces a String representing the date with
     * the requested pattern. Next, the static parse method re-cretes the same
     * date by parsing the generating String, using the same formatter. 
     */
    public static void createDateTimeFormatterFromPattern(){
        System.out.println("\n------- Creating a DateTimeFormatter from a pattern -------");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date1 = LocalDate.of(2014, 3, 18);
        String formattedDate = date1.format(formatter);
        LocalDate date2 = LocalDate.parse(formattedDate, formatter);

        System.out.println("Date:\t" + date1);
        System.out.println("Pattern: [dd/MM/yyyy]");
        System.out.println("Formatted Date:\t" + formattedDate);
        System.out.println("Parsed Date:\t" + date2);
    }

    private enum Flags {
        Manipulate, TemporalAdjuster, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.Manipulate)) {
            System.out.println("\t====================================");
            System.out.println("\tManipulating Attributes of LocalDate");
            System.out.println("\t====================================");
            manipulateAttributesOfLocalDateAbsolute();
            manipulateAttributesOfLocalDateRelative();
            manipulateDate();
        }
        if(flags.contains(Flags.TemporalAdjuster)) {
            System.out.println("\t=======================");
            System.out.println("\tUsing TemporalAdjusters");
            System.out.println("\t=======================");
            predefinedTemporalAdjusters();
            customTemporalAdjuster();
        }
        if(flags.contains(Flags.Three)) {
            System.out.println("\t====================================");
            System.out.println("\tPrinting & Parsing Date-Time Objects");
            System.out.println("\t====================================");
            dateTimeFormatters();
            createDateTimeFormatterFromPattern();
        }
        if(flags.contains(Flags.Four)) {
            // System.out.println("Bottom");
        }
    }

    public static void main(String[] args) {
        // EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        // execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.Three);
        execute(currentOpt);
    }
}
