package Java.Java8.DateAndTime;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.EnumSet;

/**
 * Manipulating, Parsing, and Formatting dates. This class will showcase ways
 * to perform these actions. 
 * 
 * ================================= Summary =================================
 * (1) Create a modified version of an existing LocalDate, absolute way
 * (2) Create a modified version of an existing LocalDate, relative way
 * (3) Manipulating a LocalDate, chaining and concatenating manipulations
 * 
 * ================================= Methods =================================
 * - get() - reads fields of a Temporal object
 * - with() - modifies fields of a Temporal object
 * - withYear() - returns a LocalDate with modified year attribute
 * - withMonth() - returns a LocalDate with modified month attribute
 * - withDayOfMonth - returns a LocalDate with modified day attribute
 * - plus() - move a Temporal forward a given amount of time
 * - minus() - move a Temporal backward a given amount of time 
 * - plusWeeks() - adds weeks to the date
 * - minusYears() - subtracts years to the date
 */
public class WorkingWithDates {

    /** (1)
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

    /** (2)
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

    /** (3)
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

    private enum Flags {
        One, Two, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
            System.out.println("\t====================================");
            System.out.println("\tManipulating Attributes of LocalDate");
            System.out.println("\t====================================");
            manipulateAttributesOfLocalDateAbsolute();
            manipulateAttributesOfLocalDateRelative();
            manipulateDate();
        }
        if(flags.contains(Flags.Two)) {
            // System.out.println("Right");
        }
        if(flags.contains(Flags.Three)) {
            // System.out.println("Top");
        }
        if(flags.contains(Flags.Four)) {
            // System.out.println("Bottom");
        }
    }

    public static void main(String[] args) {
        // EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        // execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.One);
        execute(currentOpt);
    }
}
