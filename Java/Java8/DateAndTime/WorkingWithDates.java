package Java.Java8.DateAndTime;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.util.EnumSet;

/**
 * Manipulating, Parsing, and Formatting dates. This class will showcase ways
 * to perform these actions. 
 * 
 * ================================= Summary =================================
 * 1. Create a modified version of an existing LocalDate
 * ================================= Methods =================================
 * - get() - reads fields of a Temporal object
 * - with() - modifies fields of a Temporal object
 * - withYear() - returns a LocalDate with modified year attribute
 * - withMonth() - returns a LocalDate with modified month attribute
 * - withDayOfMonth - returns a LocalDate with modified day attribute
 */
public class WorkingWithDates {

    /**
     * To create a modified version of an existing LocalDate is to change one
     * of its attributes using one of its withAttribute methods. Each of these
     * methods return a new object with the modified attribute, they do not 
     * mutate the existing object.
     */
    public static void manipulateAttributesOfLocalDateAbsolute(){
        LocalDate date1 = LocalDate.of(2017, 9, 21);
        LocalDate date2 = date1.withYear(2011);
        LocalDate date3 = date2.withDayOfMonth(25);
        LocalDate date4 = date3.with(ChronoField.MONTH_OF_YEAR, 2);

        System.out.println("LocalDate:\t " + date1);
        System.out.println("Changed Year:\t " + date2);
        System.out.println("Changed Day:\t " + date3);
        System.out.println("Changed Month:\t " + date4);
    }

    public static void manipulateAttributesOfLocalDateRelative(){

    }

    private enum Flags {
        One, Two, Three, Four
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.One)) {
           manipulateAttributesOfLocalDateAbsolute();
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
